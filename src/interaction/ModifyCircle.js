/**
 * @module ngeo.interaction.ModifyCircle
 */
import googAsserts from 'goog/asserts.js';
import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';
import ngeoInteractionCommon from 'ngeo/interaction/common.js';
import ngeoInteractionMeasureAzimut from 'ngeo/interaction/MeasureAzimut.js';
import * as olBase from 'ol/index.js';
import olFeature from 'ol/Feature.js';
import olMapBrowserPointerEvent from 'ol/MapBrowserPointerEvent.js';
import * as olCoordinate from 'ol/coordinate.js';
import * as olEvents from 'ol/events.js';
import * as olExtent from 'ol/extent.js';
import olGeomCircle from 'ol/geom/Circle.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olGeomPoint from 'ol/geom/Point.js';
import {fromCircle} from 'ol/geom/Polygon.js';
import olInteractionPointer, {handleEvent as pointerHandleEvent} from 'ol/interaction/Pointer.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceVector from 'ol/source/Vector.js';
import olStructsRBush from 'ol/structs/RBush.js';

/**
 * @classdesc
 * Interaction for modifying feature geometries.
 *
 * @constructor
 * @struct
 * @extends {ol.interaction.Pointer}
 * @param {olx.interaction.ModifyOptions} options Options.
 * @fires ngeo.interaction.ModifyCircleEvent
 * @api
 */
const exports = function(options) {

  googAsserts.assert(options.features);

  olInteractionPointer.call(this, {
    handleDownEvent: exports.handleDownEvent_,
    handleDragEvent: exports.handleDragEvent_,
    handleEvent: exports.handleEvent,
    handleUpEvent: exports.handleUpEvent_
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
  this.rBush_ = new olStructsRBush();

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
  this.overlay_ = new olLayerVector({
    source: new olSourceVector({
      useSpatialIndex: false,
      wrapX: !!options.wrapX
    }),
    style: options.style || ngeoInteractionCommon.getDefaultModifyStyleFunction(),
    updateWhileAnimating: true,
    updateWhileInteracting: true
  });

  /**
   * @type {!ol.Collection.<ol.Feature>}
   * @private
   */
  this.features_ = options.features;

  this.features_.forEach(feature => this.addFeature_(feature));
  olEvents.listen(this.features_, 'add', this.handleFeatureAdd_, this);
  olEvents.listen(this.features_, 'remove', this.handleFeatureRemove_, this);

};

olBase.inherits(exports, olInteractionPointer);


/**
 * @param {ol.Feature} feature Feature.
 * @private
 */
exports.prototype.addFeature_ = function(feature) {
  if (feature.getGeometry().getType() === 'Polygon' &&
      !!feature.get(ngeoFormatFeatureProperties.IS_CIRCLE)) {
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
exports.prototype.willModifyFeatures_ = function(evt) {
  if (!this.modified_) {
    this.modified_ = true;
    /** @type {ngeox.ModifyEvent} */
    const event = new ngeoCustomEvent('modifystart', {features: this.features_});
    this.dispatchEvent(event);
  }
};


/**
 * @param {ol.Feature} feature Feature.
 * @private
 */
exports.prototype.removeFeature_ = function(feature) {
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
exports.prototype.removeFeatureSegmentData_ = function(feature) {
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
exports.prototype.setMap = function(map) {
  this.overlay_.setMap(map);
  olInteractionPointer.prototype.setMap.call(this, map);
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
exports.prototype.handleFeatureAdd_ = function(evt) {
  const feature = evt.element;
  googAsserts.assertInstanceof(feature, olFeature,
    'feature should be an ol.Feature');
  this.addFeature_(feature);
};


/**
 * @param {ol.Collection.Event} evt Event.
 * @private
 */
exports.prototype.handleFeatureRemove_ = function(evt) {
  const feature = /** @type {ol.Feature} */ (evt.element);
  this.removeFeature_(feature);
};


/**
 * @param {ol.Feature} feature Feature
 * @param {ol.geom.Polygon} geometry Geometry.
 * @private
 */
exports.prototype.writeCircleGeometry_ = function(feature, geometry) {
  const rings = geometry.getCoordinates();
  let coordinates, i, ii, j, jj, segment, segmentData;
  for (j = 0, jj = rings.length; j < jj; ++j) {
    coordinates = rings[j];
    for (i = 0, ii = coordinates.length - 1; i < ii; ++i) {
      segment = coordinates.slice(i, i + 2);
      segmentData = /** @type {ol.ModifySegmentDataType} */ ({
        feature: feature,
        geometry: geometry,
        depth: [j],
        index: i,
        segment: segment
      });
      this.rBush_.insert(olExtent.boundingExtent(segment), segmentData);
    }
  }
};


/**
 * @param {ol.Coordinate} coordinates Coordinates.
 * @return {ol.Feature} Vertex feature.
 * @private
 */
exports.prototype.createOrUpdateVertexFeature_ = function(coordinates) {
  let vertexFeature = this.vertexFeature_;
  if (!vertexFeature) {
    vertexFeature = new olFeature(new olGeomPoint(coordinates));
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
exports.compareIndexes_ = function(a, b) {
  return a.index - b.index;
};


/**
 * @param {ol.MapBrowserPointerEvent} evt Event.
 * @return {boolean} Start drag sequence?
 * @this {ngeo.interaction.ModifyCircle}
 * @private
 */
exports.handleDownEvent_ = function(evt) {
  this.handlePointerAtPixel_(evt.pixel, evt.map);
  this.dragSegments_ = [];
  this.modified_ = false;
  const vertexFeature = this.vertexFeature_;
  if (vertexFeature) {
    const geometry = /** @type {ol.geom.Point} */ (vertexFeature.getGeometry());
    const vertex = geometry.getCoordinates();
    const vertexExtent = olExtent.boundingExtent([vertex]);
    const segmentDataMatches = this.rBush_.getInExtent(vertexExtent);
    const componentSegments = {};
    segmentDataMatches.sort(exports.compareIndexes_);
    for (let i = 0, ii = segmentDataMatches.length; i < ii; ++i) {
      const segmentDataMatch = segmentDataMatches[i];
      const segment = segmentDataMatch.segment;
      let uid = olBase.getUid(segmentDataMatch.feature);
      const depth = segmentDataMatch.depth;
      if (depth) {
        uid += `-${depth.join('-')}`; // separate feature components
      }
      if (!componentSegments[uid]) {
        componentSegments[uid] = new Array(2);
      }
      if (olCoordinate.equals(segment[0], vertex) &&
          !componentSegments[uid][0]) {
        this.dragSegments_.push([segmentDataMatch, 0]);
        componentSegments[uid][0] = segmentDataMatch;
      } else if (olCoordinate.equals(segment[1], vertex) &&
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
exports.handleDragEvent_ = function(evt) {
  this.willModifyFeatures_(evt);
  const vertex = evt.coordinate;
  const geometry = /** @type {ol.geom.Polygon}*/ (this.dragSegments_[0][0].geometry);
  const center = olExtent.getCenter(geometry.getExtent());

  const line = new olGeomLineString([center, vertex]);


  /**
   * @type {ol.geom.Circle}
   */
  const circle = new olGeomCircle(center, line.getLength());
  const coordinates = fromCircle(circle, 64).getCoordinates();
  this.setGeometryCoordinates_(geometry, coordinates);


  const azimut = ngeoInteractionMeasureAzimut.getAzimut(line);
  this.features_.getArray()[0].set(ngeoFormatFeatureProperties.AZIMUT, azimut);

  this.createOrUpdateVertexFeature_(vertex);
};


/**
 * @param {ol.MapBrowserPointerEvent} evt Event.
 * @return {boolean} Stop drag sequence?
 * @this {ngeo.interaction.ModifyCircle}
 * @private
 */
exports.handleUpEvent_ = function(evt) {
  this.rBush_.clear();
  this.writeCircleGeometry_(this.dragSegments_[0][0].feature,
    this.dragSegments_[0][0].geometry);

  if (this.modified_) {
    /** @type {ngeox.ModifyEvent} */
    const event = new ngeoCustomEvent('modifyend', {features: this.features_});
    this.dispatchEvent(event);
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
exports.handleEvent = function(mapBrowserEvent) {
  if (!(mapBrowserEvent instanceof olMapBrowserPointerEvent)) {
    return true;
  }

  let handled;
  if (!mapBrowserEvent.map.getView().getInteracting() &&
      mapBrowserEvent.type == 'pointermove' && !this.handlingDownUpSequence) {
    this.handlePointerMove_(mapBrowserEvent);
  }

  return pointerHandleEvent.call(this, mapBrowserEvent) &&
      !handled;
};


/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @private
 */
exports.prototype.handlePointerMove_ = function(evt) {
  this.lastPixel_ = evt.pixel;
  this.handlePointerAtPixel_(evt.pixel, evt.map);
};


/**
 * @param {ol.Pixel} pixel Pixel
 * @param {ol.PluggableMap} map Map.
 * @private
 */
exports.prototype.handlePointerAtPixel_ = function(pixel, map) {
  const pixelCoordinate = map.getCoordinateFromPixel(pixel);
  const sortByDistance = function(a, b) {
    return olCoordinate.squaredDistanceToSegment(pixelCoordinate, a.segment) -
        olCoordinate.squaredDistanceToSegment(pixelCoordinate, b.segment);
  };

  const lowerLeft = map.getCoordinateFromPixel(
    [pixel[0] - this.pixelTolerance_, pixel[1] + this.pixelTolerance_]);
  const upperRight = map.getCoordinateFromPixel(
    [pixel[0] + this.pixelTolerance_, pixel[1] - this.pixelTolerance_]);
  const box = olExtent.boundingExtent([lowerLeft, upperRight]);

  const rBush = this.rBush_;
  const nodes = rBush.getInExtent(box);
  if (nodes.length > 0) {
    nodes.sort(sortByDistance);
    const node = nodes[0];
    const closestSegment = node.segment;
    let vertex = (olCoordinate.closestOnSegment(pixelCoordinate,
      closestSegment));
    const vertexPixel = map.getPixelFromCoordinate(vertex);
    if (Math.sqrt(olCoordinate.squaredDistance(pixel, vertexPixel)) <=
        this.pixelTolerance_) {
      const pixel1 = map.getPixelFromCoordinate(closestSegment[0]);
      const pixel2 = map.getPixelFromCoordinate(closestSegment[1]);
      const squaredDist1 = olCoordinate.squaredDistance(vertexPixel, pixel1);
      const squaredDist2 = olCoordinate.squaredDistance(vertexPixel, pixel2);
      const dist = Math.sqrt(Math.min(squaredDist1, squaredDist2));
      this.snappedToVertex_ = dist <= this.pixelTolerance_;
      if (this.snappedToVertex_) {
        vertex = squaredDist1 > squaredDist2 ?
          closestSegment[1] : closestSegment[0];
        this.createOrUpdateVertexFeature_(vertex);
        const vertexSegments = {};
        vertexSegments[olBase.getUid(closestSegment)] = true;
        let segment;
        for (let i = 1, ii = nodes.length; i < ii; ++i) {
          segment = nodes[i].segment;
          if ((olCoordinate.equals(closestSegment[0], segment[0]) &&
              olCoordinate.equals(closestSegment[1], segment[1]) ||
              (olCoordinate.equals(closestSegment[0], segment[1]) &&
              olCoordinate.equals(closestSegment[1], segment[0])))) {
            vertexSegments[olBase.getUid(segment)] = true;
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
exports.prototype.setGeometryCoordinates_ = function(geometry, coordinates) {
  this.changingFeature_ = true;
  geometry.setCoordinates(coordinates);
  this.changingFeature_ = false;
};


export default exports;
