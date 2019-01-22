import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';
import {getDefaultModifyStyleFunction} from 'ngeo/interaction/common.js';
import ngeoInteractionMeasureAzimut from 'ngeo/interaction/MeasureAzimut.js';
import {
  getUid as olUtilGetUid,
  inherits as olUtilInherits
} from 'ol/util.js';
import olFeature from 'ol/Feature.js';
import olMapBrowserPointerEvent from 'ol/MapBrowserPointerEvent.js';
import * as olCoordinate from 'ol/coordinate.js';
import * as olEvents from 'ol/events.js';
import * as olExtent from 'ol/extent.js';
import olGeomCircle from 'ol/geom/Circle.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olGeomPoint from 'ol/geom/Point.js';
import {fromCircle} from 'ol/geom/Polygon.js';
import olInteractionPointer from 'ol/interaction/Pointer.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceVector from 'ol/source/Vector.js';
import olStructsRBush from 'ol/structs/RBush.js';

/**
 * @classdesc
 * Interaction for modifying feature geometries.
 *
 * @constructor
 * @extends {import("ol/interaction/Pointer.js").default}
 * @param {olx.interaction.ModifyOptions} options Options.
 * @fires import("ngeo/interaction/ModifyCircleEvent.js").default
 * @api
 */
function ModifyCircle(options) {

  console.assert(options.features);

  olInteractionPointer.call(this, {
    handleDownEvent: handleDownEvent_,
    handleDragEvent: handleDragEvent_,
    handleEvent: handleEvent,
    handleUpEvent: handleUpEvent_
  });

  /**
   * Editing vertex.
   * @type {import("ol/Feature.js").default}
   * @private
   */
  this.vertexFeature_ = null;

  /**
   * @type {import("ol/Pixel.js").default}
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
   * @type {import("ol/structs/RBush.js").default.<import("ol/ModifySegmentDataType.js").default>}
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
   * @type {import("ol/layer/Vector.js").default}
   * @private
   */
  this.overlay_ = new olLayerVector({
    source: new olSourceVector({
      useSpatialIndex: false,
      wrapX: !!options.wrapX
    }),
    style: options.style || getDefaultModifyStyleFunction(),
    updateWhileAnimating: true,
    updateWhileInteracting: true
  });

  /**
   * @type {!import("ol/Collection.js").default.<import("ol/Feature.js").default>}
   * @private
   */
  this.features_ = options.features;

  this.features_.forEach(feature => this.addFeature_(feature));
  olEvents.listen(this.features_, 'add', this.handleFeatureAdd_, this);
  olEvents.listen(this.features_, 'remove', this.handleFeatureRemove_, this);

}

olUtilInherits(ModifyCircle, olInteractionPointer);


/**
 * @param {import("ol/Feature.js").default} feature Feature.
 * @private
 */
ModifyCircle.prototype.addFeature_ = function(feature) {
  if (feature.getGeometry().getType() === 'Polygon' &&
      !!feature.get(ngeoFormatFeatureProperties.IS_CIRCLE)) {
    const geometry = /** @type {import("ol/geom/Polygon.js").default}*/ (feature.getGeometry());
    this.writeCircleGeometry_(feature, geometry);

    const map = this.getMap();
    if (map) {
      this.handlePointerAtPixel_(this.lastPixel_, map);
    }
  }
};


/**
 * @param {import("ol/MapBrowserPointerEvent.js").default} evt Map browser event
 * @private
 */
ModifyCircle.prototype.willModifyFeatures_ = function(evt) {
  if (!this.modified_) {
    this.modified_ = true;
    /** @type {ModifyEvent} */
    const event = new ngeoCustomEvent('modifystart', {features: this.features_});
    this.dispatchEvent(event);
  }
};


/**
 * @param {import("ol/Feature.js").default} feature Feature.
 * @private
 */
ModifyCircle.prototype.removeFeature_ = function(feature) {
  this.removeFeatureSegmentData_(feature);
  // Remove the vertex feature if the collection of canditate features
  // is empty.
  if (this.vertexFeature_ && this.features_.getLength() === 0) {
    this.overlay_.getSource().removeFeature(this.vertexFeature_);
    this.vertexFeature_ = null;
  }
};


/**
 * @param {import("ol/Feature.js").default} feature Feature.
 * @private
 */
ModifyCircle.prototype.removeFeatureSegmentData_ = function(feature) {
  const rBush = this.rBush_;
  const /** @type {Array.<import("ol/ModifySegmentDataType.js").default>} */ nodesToRemove = [];
  rBush.forEach(
    /**
       * @param {import("ol/ModifySegmentDataType.js").default} node RTree node.
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
ModifyCircle.prototype.setMap = function(map) {
  this.overlay_.setMap(map);
  olInteractionPointer.prototype.setMap.call(this, map);
};


/**
 * @param {import("ol/Collection/Event.js").default} evt Event.
 * @private
 */
ModifyCircle.prototype.handleFeatureAdd_ = function(evt) {
  const feature = evt.element;
  console.assert(feature instanceof olFeature, 'feature should be an ol.Feature');
  this.addFeature_(feature);
};


/**
 * @param {import("ol/Collection/Event.js").default} evt Event.
 * @private
 */
ModifyCircle.prototype.handleFeatureRemove_ = function(evt) {
  const feature = /** @type {import("ol/Feature.js").default} */ (evt.element);
  this.removeFeature_(feature);
};


/**
 * @param {import("ol/Feature.js").default} feature Feature
 * @param {import("ol/geom/Polygon.js").default} geometry Geometry.
 * @private
 */
ModifyCircle.prototype.writeCircleGeometry_ = function(feature, geometry) {
  const rings = geometry.getCoordinates();
  let coordinates, i, ii, j, jj, segment, segmentData;
  for (j = 0, jj = rings.length; j < jj; ++j) {
    coordinates = rings[j];
    for (i = 0, ii = coordinates.length - 1; i < ii; ++i) {
      segment = coordinates.slice(i, i + 2);
      segmentData = /** @type {import("ol/ModifySegmentDataType.js").default} */ ({
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
 * @param {import("ol/coordinate.js").Coordinate} coordinates Coordinates.
 * @return {import("ol/Feature.js").default} Vertex feature.
 * @private
 */
ModifyCircle.prototype.createOrUpdateVertexFeature_ = function(coordinates) {
  let vertexFeature = this.vertexFeature_;
  if (!vertexFeature) {
    vertexFeature = new olFeature(new olGeomPoint(coordinates));
    this.vertexFeature_ = vertexFeature;
    this.overlay_.getSource().addFeature(vertexFeature);
  } else {
    const geometry = /** @type {import("ol/geom/Point.js").default} */ (vertexFeature.getGeometry());
    geometry.setCoordinates(coordinates);
  }
  return vertexFeature;
};


/**
 * @param {import("ol/ModifySegmentDataType.js").default} a The first segment data.
 * @param {import("ol/ModifySegmentDataType.js").default} b The second segment data.
 * @return {number} The difference in indexes.
 */
function compareIndexes(a, b) {
  return a.index - b.index;
}


/**
 * @param {import("ol/MapBrowserPointerEvent.js").default} evt Event.
 * @return {boolean} Start drag sequence?
 * @this {import("ngeo/interaction/ModifyCircle.js").default}
 * @private
 */
function handleDownEvent_(evt) {
  this.handlePointerAtPixel_(evt.pixel, evt.map);
  this.dragSegments_ = [];
  this.modified_ = false;
  const vertexFeature = this.vertexFeature_;
  if (vertexFeature) {
    const geometry = /** @type {import("ol/geom/Point.js").default} */ (vertexFeature.getGeometry());
    const vertex = geometry.getCoordinates();
    const vertexExtent = olExtent.boundingExtent([vertex]);
    const segmentDataMatches = this.rBush_.getInExtent(vertexExtent);
    const componentSegments = {};
    segmentDataMatches.sort(compareIndexes);
    for (let i = 0, ii = segmentDataMatches.length; i < ii; ++i) {
      const segmentDataMatch = segmentDataMatches[i];
      const segment = segmentDataMatch.segment;
      let uid = olUtilGetUid(segmentDataMatch.feature);
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
}


/**
 * @param {import("ol/MapBrowserPointerEvent.js").default} evt Event.
 * @this {import("ngeo/interaction/ModifyCircle.js").default}
 * @private
 */
function handleDragEvent_(evt) {
  this.willModifyFeatures_(evt);
  const vertex = evt.coordinate;
  const geometry = /** @type {import("ol/geom/Polygon.js").default}*/ (this.dragSegments_[0][0].geometry);
  const center = olExtent.getCenter(geometry.getExtent());

  const line = new olGeomLineString([center, vertex]);


  /**
   * @type {import("ol/geom/Circle.js").default}
   */
  const circle = new olGeomCircle(center, line.getLength());
  const coordinates = fromCircle(circle, 64).getCoordinates();
  this.setGeometryCoordinates_(geometry, coordinates);


  const azimut = ngeoInteractionMeasureAzimut.getAzimut(line);
  this.features_.getArray()[0].set(ngeoFormatFeatureProperties.AZIMUT, azimut);

  this.createOrUpdateVertexFeature_(vertex);
}


/**
 * @param {import("ol/MapBrowserPointerEvent.js").default} evt Event.
 * @return {boolean} Stop drag sequence?
 * @this {import("ngeo/interaction/ModifyCircle.js").default}
 * @private
 */
function handleUpEvent_(evt) {
  this.rBush_.clear();
  this.writeCircleGeometry_(this.dragSegments_[0][0].feature,
    this.dragSegments_[0][0].geometry);

  if (this.modified_) {
    /** @type {ModifyEvent} */
    const event = new ngeoCustomEvent('modifyend', {features: this.features_});
    this.dispatchEvent(event);
    this.modified_ = false;
  }
  return false;
}


/**
 * Handles the {@link import("ol/MapBrowserEvent.js").default map browser event} and may modify the
 * geometry.
 * @param {import("ol/MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} `false` to stop event propagation.
 * @this {import("ngeo/interaction/ModifyCircle.js").default}
 * @api
 */
function handleEvent(mapBrowserEvent) {
  if (!(mapBrowserEvent instanceof olMapBrowserPointerEvent)) {
    return true;
  }

  let handled;
  if (!mapBrowserEvent.map.getView().getInteracting() &&
      mapBrowserEvent.type == 'pointermove' && !this.handlingDownUpSequence) {
    this.handlePointerMove_(mapBrowserEvent);
  }

  return olInteractionPointer.prototype.handleEvent.call(this, mapBrowserEvent) && !handled;
}


/**
 * @param {import("ol/MapBrowserEvent.js").default} evt Event.
 * @private
 */
ModifyCircle.prototype.handlePointerMove_ = function(evt) {
  this.lastPixel_ = evt.pixel;
  this.handlePointerAtPixel_(evt.pixel, evt.map);
};


/**
 * @param {import("ol/Pixel.js").default} pixel Pixel
 * @param {import("ol/PluggableMap.js").default} map Map.
 * @private
 */
ModifyCircle.prototype.handlePointerAtPixel_ = function(pixel, map) {
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
        vertexSegments[olUtilGetUid(closestSegment)] = true;
        let segment;
        for (let i = 1, ii = nodes.length; i < ii; ++i) {
          segment = nodes[i].segment;
          if ((olCoordinate.equals(closestSegment[0], segment[0]) &&
              olCoordinate.equals(closestSegment[1], segment[1]) ||
              (olCoordinate.equals(closestSegment[0], segment[1]) &&
              olCoordinate.equals(closestSegment[1], segment[0])))) {
            vertexSegments[olUtilGetUid(segment)] = true;
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
 * @param {import("ol/geom/SimpleGeometry.js").default} geometry Geometry.
 * @param {Array} coordinates Coordinates.
 * @private
 */
ModifyCircle.prototype.setGeometryCoordinates_ = function(geometry, coordinates) {
  this.changingFeature_ = true;
  geometry.setCoordinates(coordinates);
  this.changingFeature_ = false;
};


export default ModifyCircle;
