goog.provide('ngeo.interaction.ModifyCircle');

goog.require('goog.asserts');
goog.require('ngeo.interaction.MeasureAzimut');
goog.require('ol');
goog.require('ol.Collection');
goog.require('ol.Feature');
goog.require('ol.MapBrowserEventType');
goog.require('ol.MapBrowserPointerEvent');
goog.require('ol.ViewHint');
goog.require('ol.coordinate');
goog.require('ol.events');
goog.require('ol.extent');
goog.require('ol.geom.GeometryType');
goog.require('ol.geom.Circle');
goog.require('ol.geom.LineString');
goog.require('ol.geom.Point');
goog.require('ol.geom.Polygon');
goog.require('ol.interaction.Modify');
goog.require('ol.interaction.ModifyEventType');
goog.require('ol.interaction.Pointer');
goog.require('ol.layer.Vector');
goog.require('ol.source.Vector');
goog.require('ol.structs.RBush');
goog.require('ol.style.Style');


/**
 * @classdesc
 * Interaction for modifying feature geometries.
 *
 * @constructor
 * @struct
 * @extends {ol.interaction.Pointer}
 * @param {olx.interaction.ModifyOptions} options Options.
 * @fires ngeo.interaction.ModifyCircleEvent
 * @export
 * @api
 */
ngeo.interaction.ModifyCircle = function(options) {

  goog.asserts.assert(options.features);

  ol.interaction.Pointer.call(this, {
    handleDownEvent: ngeo.interaction.ModifyCircle.handleDownEvent_,
    handleDragEvent: ngeo.interaction.ModifyCircle.handleDragEvent_,
    handleEvent: ngeo.interaction.ModifyCircle.handleEvent,
    handleUpEvent: ngeo.interaction.ModifyCircle.handleUpEvent_
  });

  /**
   * Editing vertex.
   * @type {ol.Feature}
   * @private
   */
  this.vertexFeature_ = null;

  /**
   * @type {ol.Pixel}
   * @private
   */
  this.lastPixel_ = [0, 0];

  /**
   * @type {boolean}
   * @private
   */
  this.modified_ = false;

  /**
   * Segment RTree for each layer
   * @type {ol.structs.RBush.<ol.ModifySegmentDataType>}
   * @private
   */
  this.rBush_ = new ol.structs.RBush();

  /**
   * @type {number}
   * @private
   */
  this.pixelTolerance_ = options.pixelTolerance !== undefined ?
    options.pixelTolerance : 10;

  /**
   * @type {boolean}
   * @private
   */
  this.snappedToVertex_ = false;

  /**
   * Indicate whether the interaction is currently changing a feature's
   * coordinates.
   * @type {boolean}
   * @private
   */
  this.changingFeature_ = false;

  /**
   * @type {Array}
   * @private
   */
  this.dragSegments_ = null;

  /**
   * Draw overlay where sketch features are drawn.
   * @type {ol.layer.Vector}
   * @private
   */
  this.overlay_ = new ol.layer.Vector({
    source: new ol.source.Vector({
      useSpatialIndex: false,
      wrapX: !!options.wrapX
    }),
    style: options.style ? options.style :
      ngeo.interaction.ModifyCircle.getDefaultStyleFunction(),
    updateWhileAnimating: true,
    updateWhileInteracting: true
  });

  /**
   * @type {!ol.Collection.<ol.Feature>}
   * @private
   */
  this.features_ = options.features;

  this.features_.forEach(this.addFeature_, this);
  ol.events.listen(this.features_, ol.CollectionEventType.ADD,
    this.handleFeatureAdd_, this);
  ol.events.listen(this.features_, ol.CollectionEventType.REMOVE,
    this.handleFeatureRemove_, this);

};
ol.inherits(ngeo.interaction.ModifyCircle, ol.interaction.Pointer);


/**
 * @param {ol.Feature} feature Feature.
 * @private
 */
ngeo.interaction.ModifyCircle.prototype.addFeature_ = function(feature) {
  if (feature.getGeometry().getType() === ol.geom.GeometryType.POLYGON &&
      !!feature.get(ngeo.FeatureProperties.IS_CIRCLE)) {
    const geometry = /** @type {ol.geom.Polygon}*/ (feature.getGeometry());
    this.writeCircleGeometry_(feature, geometry);

    const map = this.getMap();
    if (map) {
      this.handlePointerAtPixel_(this.lastPixel_, map);
    }
  }
};


/**
 * @param {ol.MapBrowserPointerEvent} evt Map browser event
 * @private
 */
ngeo.interaction.ModifyCircle.prototype.willModifyFeatures_ = function(evt) {
  if (!this.modified_) {
    this.modified_ = true;
    this.dispatchEvent(new ol.interaction.Modify.Event(
      ol.interaction.ModifyEventType.MODIFYSTART, this.features_, evt));
  }
};


/**
 * @param {ol.Feature} feature Feature.
 * @private
 */
ngeo.interaction.ModifyCircle.prototype.removeFeature_ = function(feature) {
  this.removeFeatureSegmentData_(feature);
  // Remove the vertex feature if the collection of canditate features
  // is empty.
  if (this.vertexFeature_ && this.features_.getLength() === 0) {
    this.overlay_.getSource().removeFeature(this.vertexFeature_);
    this.vertexFeature_ = null;
  }
};


/**
 * @param {ol.Feature} feature Feature.
 * @private
 */
ngeo.interaction.ModifyCircle.prototype.removeFeatureSegmentData_ = function(feature) {
  const rBush = this.rBush_;
  const /** @type {Array.<ol.ModifySegmentDataType>} */ nodesToRemove = [];
  rBush.forEach(
    /**
       * @param {ol.ModifySegmentDataType} node RTree node.
       */
    (node) => {
      if (feature === node.feature) {
        nodesToRemove.push(node);
      }
    });
  for (let i = nodesToRemove.length - 1; i >= 0; --i) {
    rBush.remove(nodesToRemove[i]);
  }
};


/**
 * @inheritDoc
 */
ngeo.interaction.ModifyCircle.prototype.setMap = function(map) {
  this.overlay_.setMap(map);
  ol.interaction.Pointer.prototype.setMap.call(this, map);
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
ngeo.interaction.ModifyCircle.prototype.handleFeatureAdd_ = function(evt) {
  const feature = evt.element;
  goog.asserts.assertInstanceof(feature, ol.Feature,
    'feature should be an ol.Feature');
  this.addFeature_(feature);
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
ngeo.interaction.ModifyCircle.prototype.handleFeatureRemove_ = function(evt) {
  const feature = /** @type {ol.Feature} */ (evt.element);
  this.removeFeature_(feature);
};


/**
 * @param {ol.Feature} feature Feature
 * @param {ol.geom.Polygon} geometry Geometry.
 * @private
 */
ngeo.interaction.ModifyCircle.prototype.writeCircleGeometry_ = function(feature, geometry) {
  const rings = geometry.getCoordinates();
  let coordinates, i, ii, j, jj, segment, segmentData;
  for (j = 0, jj = rings.length; j < jj; ++j) {
    coordinates = rings[j];
    for (i = 0, ii = coordinates.length - 1; i < ii; ++i) {
      segment = coordinates.slice(i, i + 2);
      segmentData = /** @type {ol.ModifySegmentDataType} */ ({
        feature,
        geometry,
        depth: [j],
        index: i,
        segment
      });
      this.rBush_.insert(ol.extent.boundingExtent(segment), segmentData);
    }
  }
};


/**
 * @param {ol.Coordinate} coordinates Coordinates.
 * @return {ol.Feature} Vertex feature.
 * @private
 */
ngeo.interaction.ModifyCircle.prototype.createOrUpdateVertexFeature_ = function(coordinates) {
  let vertexFeature = this.vertexFeature_;
  if (!vertexFeature) {
    vertexFeature = new ol.Feature(new ol.geom.Point(coordinates));
    this.vertexFeature_ = vertexFeature;
    this.overlay_.getSource().addFeature(vertexFeature);
  } else {
    const geometry = /** @type {ol.geom.Point} */ (vertexFeature.getGeometry());
    geometry.setCoordinates(coordinates);
  }
  return vertexFeature;
};


/**
 * @param {ol.ModifySegmentDataType} a The first segment data.
 * @param {ol.ModifySegmentDataType} b The second segment data.
 * @return {number} The difference in indexes.
 * @private
 */
ngeo.interaction.ModifyCircle.compareIndexes_ = function(a, b) {
  return a.index - b.index;
};


/**
 * @param {ol.MapBrowserPointerEvent} evt Event.
 * @return {boolean} Start drag sequence?
 * @this {ngeo.interaction.ModifyCircle}
 * @private
 */
ngeo.interaction.ModifyCircle.handleDownEvent_ = function(evt) {
  this.handlePointerAtPixel_(evt.pixel, evt.map);
  this.dragSegments_ = [];
  this.modified_ = false;
  const vertexFeature = this.vertexFeature_;
  if (vertexFeature) {
    const geometry = /** @type {ol.geom.Point} */ (vertexFeature.getGeometry());
    const vertex = geometry.getCoordinates();
    const vertexExtent = ol.extent.boundingExtent([vertex]);
    const segmentDataMatches = this.rBush_.getInExtent(vertexExtent);
    const componentSegments = {};
    segmentDataMatches.sort(ngeo.interaction.ModifyCircle.compareIndexes_);
    for (let i = 0, ii = segmentDataMatches.length; i < ii; ++i) {
      const segmentDataMatch = segmentDataMatches[i];
      const segment = segmentDataMatch.segment;
      let uid = ol.getUid(segmentDataMatch.feature);
      const depth = segmentDataMatch.depth;
      if (depth) {
        uid += `-${depth.join('-')}`; // separate feature components
      }
      if (!componentSegments[uid]) {
        componentSegments[uid] = new Array(2);
      }
      if (ol.coordinate.equals(segment[0], vertex) &&
          !componentSegments[uid][0]) {
        this.dragSegments_.push([segmentDataMatch, 0]);
        componentSegments[uid][0] = segmentDataMatch;
      } else if (ol.coordinate.equals(segment[1], vertex) &&
          !componentSegments[uid][1]) {
        this.dragSegments_.push([segmentDataMatch, 1]);
        componentSegments[uid][1] = segmentDataMatch;
      }
    }
  }
  return !!this.vertexFeature_;
};


/**
 * @param {ol.MapBrowserPointerEvent} evt Event.
 * @this {ngeo.interaction.ModifyCircle}
 * @private
 */
ngeo.interaction.ModifyCircle.handleDragEvent_ = function(evt) {
  this.willModifyFeatures_(evt);
  const vertex = evt.coordinate;
  const geometry =
      /** @type {ol.geom.Polygon}*/ (this.dragSegments_[0][0].geometry);
  const center = ol.extent.getCenter(geometry.getExtent());

  const line = new ol.geom.LineString([center, vertex]);


  /**
   * @type {ol.geom.Circle}
   */
  const circle = new ol.geom.Circle(center, line.getLength());
  const coordinates = ol.geom.Polygon.fromCircle(circle, 64).getCoordinates();
  this.setGeometryCoordinates_(geometry, coordinates);


  const azimut = ngeo.interaction.MeasureAzimut.getAzimut(line);
  this.features_.getArray()[0].set(ngeo.FeatureProperties.AZIMUT, azimut);

  this.createOrUpdateVertexFeature_(vertex);
};


/**
 * @param {ol.MapBrowserPointerEvent} evt Event.
 * @return {boolean} Stop drag sequence?
 * @this {ngeo.interaction.ModifyCircle}
 * @private
 */
ngeo.interaction.ModifyCircle.handleUpEvent_ = function(evt) {
  this.rBush_.clear();
  this.writeCircleGeometry_(this.dragSegments_[0][0].feature,
    this.dragSegments_[0][0].geometry);

  if (this.modified_) {
    this.dispatchEvent(new ol.interaction.Modify.Event(
      ol.interaction.ModifyEventType.MODIFYEND, this.features_, evt));
    this.modified_ = false;
  }
  return false;
};


/**
 * Handles the {@link ol.MapBrowserEvent map browser event} and may modify the
 * geometry.
 * @param {ol.MapBrowserEvent} mapBrowserEvent Map browser event.
 * @return {boolean} `false` to stop event propagation.
 * @this {ngeo.interaction.ModifyCircle}
 * @api
 */
ngeo.interaction.ModifyCircle.handleEvent = function(mapBrowserEvent) {
  if (!(mapBrowserEvent instanceof ol.MapBrowserPointerEvent)) {
    return true;
  }

  let handled;
  if (!mapBrowserEvent.map.getView().getHints()[ol.ViewHint.INTERACTING] &&
      mapBrowserEvent.type == ol.MapBrowserEventType.POINTERMOVE &&
      !this.handlingDownUpSequence) {
    this.handlePointerMove_(mapBrowserEvent);
  }

  return ol.interaction.Pointer.handleEvent.call(this, mapBrowserEvent) &&
      !handled;
};


/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @private
 */
ngeo.interaction.ModifyCircle.prototype.handlePointerMove_ = function(evt) {
  this.lastPixel_ = evt.pixel;
  this.handlePointerAtPixel_(evt.pixel, evt.map);
};


/**
 * @param {ol.Pixel} pixel Pixel
 * @param {ol.PluggableMap} map Map.
 * @private
 */
ngeo.interaction.ModifyCircle.prototype.handlePointerAtPixel_ = function(pixel, map) {
  const pixelCoordinate = map.getCoordinateFromPixel(pixel);
  const sortByDistance = function(a, b) {
    return ol.coordinate.squaredDistanceToSegment(pixelCoordinate, a.segment) -
        ol.coordinate.squaredDistanceToSegment(pixelCoordinate, b.segment);
  };

  const lowerLeft = map.getCoordinateFromPixel(
    [pixel[0] - this.pixelTolerance_, pixel[1] + this.pixelTolerance_]);
  const upperRight = map.getCoordinateFromPixel(
    [pixel[0] + this.pixelTolerance_, pixel[1] - this.pixelTolerance_]);
  const box = ol.extent.boundingExtent([lowerLeft, upperRight]);

  const rBush = this.rBush_;
  const nodes = rBush.getInExtent(box);
  if (nodes.length > 0) {
    nodes.sort(sortByDistance);
    const node = nodes[0];
    const closestSegment = node.segment;
    let vertex = (ol.coordinate.closestOnSegment(pixelCoordinate,
      closestSegment));
    const vertexPixel = map.getPixelFromCoordinate(vertex);
    if (Math.sqrt(ol.coordinate.squaredDistance(pixel, vertexPixel)) <=
        this.pixelTolerance_) {
      const pixel1 = map.getPixelFromCoordinate(closestSegment[0]);
      const pixel2 = map.getPixelFromCoordinate(closestSegment[1]);
      const squaredDist1 = ol.coordinate.squaredDistance(vertexPixel, pixel1);
      const squaredDist2 = ol.coordinate.squaredDistance(vertexPixel, pixel2);
      const dist = Math.sqrt(Math.min(squaredDist1, squaredDist2));
      this.snappedToVertex_ = dist <= this.pixelTolerance_;
      if (this.snappedToVertex_) {
        vertex = squaredDist1 > squaredDist2 ?
          closestSegment[1] : closestSegment[0];
        this.createOrUpdateVertexFeature_(vertex);
        const vertexSegments = {};
        vertexSegments[ol.getUid(closestSegment)] = true;
        let segment;
        for (let i = 1, ii = nodes.length; i < ii; ++i) {
          segment = nodes[i].segment;
          if ((ol.coordinate.equals(closestSegment[0], segment[0]) &&
              ol.coordinate.equals(closestSegment[1], segment[1]) ||
              (ol.coordinate.equals(closestSegment[0], segment[1]) &&
              ol.coordinate.equals(closestSegment[1], segment[0])))) {
            vertexSegments[ol.getUid(segment)] = true;
          } else {
            break;
          }
        }
        return;
      }
    }
  }
  if (this.vertexFeature_) {
    this.overlay_.getSource().removeFeature(this.vertexFeature_);
    this.vertexFeature_ = null;
  }
};


/**
 * @param {ol.geom.SimpleGeometry} geometry Geometry.
 * @param {Array} coordinates Coordinates.
 * @private
 */
ngeo.interaction.ModifyCircle.prototype.setGeometryCoordinates_ = function(geometry, coordinates) {
  this.changingFeature_ = true;
  geometry.setCoordinates(coordinates);
  this.changingFeature_ = false;
};


/**
 * @return {ol.StyleFunction} Styles.
 */
ngeo.interaction.ModifyCircle.getDefaultStyleFunction = function() {
  const style = ol.style.Style.createDefaultEditing();
  return function(feature, resolution) {
    return style[ol.geom.GeometryType.POINT];
  };
};
