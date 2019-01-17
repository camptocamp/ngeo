/**
 */
import googAsserts from 'goog/asserts.js';
import ngeoInteractionCommon from 'ngeo/interaction/common.js';
import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import {inherits as olUtilInherits} from 'ol/util.js';
import * as olEvents from 'ol/events.js';
import olFeature from 'ol/Feature.js';
import {TRUE} from 'ol/functions.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olGeomPoint from 'ol/geom/Point.js';
import olGeomPolygon from 'ol/geom/Polygon.js';
import olGeomSimpleGeometry from 'ol/geom/SimpleGeometry.js';
import olInteractionInteraction from 'ol/interaction/Interaction.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceVector from 'ol/source/Vector.js';


/**
 * MobileDraw Interaction.
 *
 * minPoints: The number of points that must be drawn before a polygon ring or line string
 * can be finished. Default is `3` for polygon rings and `2` for line strings.
 *
 * style: Style for sketch features.
 *
 * type: Drawing type ('Point' or 'LineString'.
 *
 * wrapX: Wrap the world horizontally on the sketch overlay. Default is `false`.
 *
 * @typedef {{
 *     minPoints: (number|undefined),
 *     style: (ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined),
 *     type: ol.geom.GeometryType,
 *     wrapX: (boolean|undefined)
 * }} MobileDrawOptions
 */


/**
 * @classdesc
 * Interaction for drawing feature geometries from a mobile device using the
 * center of the map view as entry for points added.
 *
 * Supports:
 * - point
 * - line string
 * - polygon
 *
 * @constructor
 * @fires DrawEvent
 * @extends {import("ol/interaction/Interaction.js").default}
 * @param {MobileDrawOptions} options Options
 */
const exports = function(options) {

  olInteractionInteraction.call(this, {
    handleEvent: TRUE
  });

  /**
   * The key for view center change event.
   * @type {?import("ol/EventsKey.js").default}
   * @private
   */
  this.changeEventKey_ = null;

  /**
   * Geometry type.
   * @type {import("ol/geom/GeometryType.js").default}
   * @private
   */
  this.type_ = options.type;

  /**
   * The number of points that must be drawn before a polygon ring or line
   * string can be finished.  The default is 3 for polygon rings and 2 for
   * line strings.
   * @type {number}
   * @private
   */
  this.minPoints_ = options.minPoints ?
    options.minPoints :
    (this.type_ === 'Polygon' ? 3 : 2);

  /**
   * Sketch feature.
   * @type {import("ol/Feature.js").default}
   * @private
   */
  this.sketchFeature_ = null;

  /**
   * Previous sketch points, saved to be able to display them on the layer.
   * @type {Array.<import("ol/Feature.js").default>}
   * @private
   */
  this.sketchPoints_ = [];

  /**
   * Current sketch point.
   * @type {import("ol/Feature.js").default}
   * @private
   */
  this.sketchPoint_ = null;

  /**
   * Draw overlay where our sketch features are drawn.
   * @type {import("ol/layer/Vector.js").default}
   * @private
   */
  this.overlay_ = new olLayerVector({
    source: new olSourceVector({
      useSpatialIndex: false,
      wrapX: options.wrapX ? options.wrapX : false
    }),
    style: options.style || ngeoInteractionCommon.getDefaultDrawStyleFunction(),
    updateWhileAnimating: true,
    updateWhileInteracting: true
  });

  olEvents.listen(this, 'change:active', this.updateState_, this);

  this.set('dirty', false);
  this.set('drawing', false);
  this.set('valid', false);

};

olUtilInherits(exports, olInteractionInteraction);


/**
 * @inheritDoc
 */
exports.prototype.setMap = function(map) {

  const currentMap = this.getMap();
  if (currentMap) {
    if (this.changeEventKey_) {
      olEvents.unlistenByKey(this.changeEventKey_);
    }
  }

  olInteractionInteraction.prototype.setMap.call(this, map);

  if (map) {
    this.changeEventKey_ = olEvents.listen(map.getView(),
      'change:center',
      this.handleViewCenterChange_, this);
  }

  this.updateState_();
};


// === PUBLIC METHODS - PROPERTY GETTERS ===


/**
 * Return whether the interaction is currently dirty. It is if the sketch
 * feature has its geometry last coordinate set to the center without the
 * use of the `addToDrawing` method.
 * @return {boolean} `true` if the interaction is dirty, `false` otherwise.
 * @observable
 */
exports.prototype.getDirty = function() {
  return /** @type {boolean} */ (
    this.get('dirty'));
};


/**
 * Return whether the interaction is currently drawing.
 * @return {boolean} `true` if the interaction is drawing, `false` otherwise.
 * @observable
 */
exports.prototype.getDrawing = function() {
  return /** @type {boolean} */ (
    this.get('drawing'));
};


/**
 * Return whether the interaction as a valid sketch feature, i.e. its geometry
 * is valid.
 * @return {boolean} `true` if the interaction has a valid sketch feature,
 *     `false` otherwise.
 * @observable
 */
exports.prototype.getValid = function() {
  return /** @type {boolean} */ (
    this.get('valid'));
};


/**
 * Returns the current sketch feature.
 * @return {?import("ol/Feature.js").default} The sketch feature, or null if none.
 */
exports.prototype.getFeature = function() {
  return this.sketchFeature_;
};


// === PUBLIC METHODS ===


/**
 * Add current sketch point to sketch feature if the latter exists, else create
 * it.
 */
exports.prototype.addToDrawing = function() {

  // no need to do anything if interaction is not active, nor drawing
  const active = this.getActive();
  const drawing = this.getDrawing();

  if (!active || !drawing) {
    return;
  }

  let sketchFeatureGeom;
  const sketchPointGeom = this.getSketchPointGeometry_();
  const coordinate = sketchPointGeom.getCoordinates();
  let coordinates;

  // == point ==
  if (this.type_ === 'Point') {
    if (!this.sketchFeature_) {
      this.sketchFeature_ = new olFeature(new olGeomPoint(coordinate));
      /** @type {DrawEvent} */
      const event = new ngeoCustomEvent('drawstart', {feature: this.sketchFeature_});
      this.dispatchEvent(event);
    }
    sketchFeatureGeom = this.sketchFeature_.getGeometry();
    googAsserts.assertInstanceof(sketchFeatureGeom, olGeomSimpleGeometry);
    sketchFeatureGeom.setCoordinates(coordinate);
    return;
  }

  // == line string ==
  if (this.type_ === 'LineString') {
    this.sketchPoints_.push(this.sketchPoint_);
    if (!this.sketchFeature_) {
      coordinates = [coordinate.slice(), coordinate.slice()];
      this.sketchFeature_ = new olFeature(new olGeomLineString(coordinates));
      /** @type {DrawEvent} */
      const event = new ngeoCustomEvent('drawstart', {feature: this.sketchFeature_});
      this.dispatchEvent(event);
    } else {
      sketchFeatureGeom = this.sketchFeature_.getGeometry();
      googAsserts.assertInstanceof(sketchFeatureGeom, olGeomSimpleGeometry);
      coordinates = sketchFeatureGeom.getCoordinates();
      coordinates.push(coordinate.slice());
      sketchFeatureGeom.setCoordinates(coordinates);
    }
  }

  // == polygon ==
  if (this.type_ === 'Polygon') {
    this.sketchPoints_.push(this.sketchPoint_);
    if (!this.sketchFeature_) {
      coordinates = [coordinate.slice(), coordinate.slice(), coordinate.slice()];
      this.sketchFeature_ = new olFeature(new olGeomPolygon([coordinates]));
      /** @type {DrawEvent} */
      const event = new ngeoCustomEvent(
        'drawstart',
        {
          feature: this.sketchFeature_
        }
      );
      this.dispatchEvent(event);
    } else {
      sketchFeatureGeom = this.sketchFeature_.getGeometry();
      googAsserts.assertInstanceof(sketchFeatureGeom, olGeomPolygon);
      const coordinatess = sketchFeatureGeom.getCoordinates();
      coordinates = coordinatess[0];
      coordinates.push(coordinate.slice());
      sketchFeatureGeom.setCoordinates(coordinatess);
    }
  }

  const dirty = this.getDirty();
  if (dirty) {
    this.set('dirty', false);
  }

  // minPoints validation
  const valid = this.getValid();
  if (this.type_ === 'LineString' || this.type_ === 'Polygon') {
    if (coordinates.length >= this.minPoints_) {
      if (!valid) {
        this.set('valid', true);
      }
    } else {
      if (valid) {
        this.set('valid', false);
      }
    }
  }

  // reset sketch point
  this.sketchPoint_ = null;

  // update sketch features
  this.updateSketchFeatures_();
};


/**
 * Clear the drawing
 */
exports.prototype.clearDrawing = function() {
  this.setActive(false);
  this.setActive(true);
};


/**
 * Finish drawing. If there's a sketch point, it's added first.
 */
exports.prototype.finishDrawing = function() {

  // no need to do anything if interaction is not active, nor drawing
  const active = this.getActive();
  const drawing = this.getDrawing();

  if (!active || !drawing) {
    return;
  }

  if (this.sketchPoint_) {
    this.addToDrawing();
  }

  this.set('drawing', false);

  /** @type {DrawEvent} */
  const event = new ngeoCustomEvent('drawend', {feature: this.sketchFeature_});
  this.dispatchEvent(event);
};


// === PRIVATE METHODS ===


/**
 * Start drawing by adding the sketch point first.
 * @private
 */
exports.prototype.startDrawing_ = function() {
  this.set('drawing', true);
  this.createOrUpdateSketchPoint_();
  this.updateSketchFeatures_();

  if (this.type_ === 'Point') {
    this.addToDrawing();
  }
};


/**
 * Modify the geometry of the sketch feature to have its last coordinate
 * set to the center of the map.
 * @private
 */
exports.prototype.modifyDrawing_ = function() {
  if (!this.sketchFeature_) {
    return;
  }

  const center = this.getCenter_();

  if (this.type_ === 'LineString') {
    const sketchFeatureGeom = this.sketchFeature_.getGeometry();
    googAsserts.assertInstanceof(sketchFeatureGeom, olGeomSimpleGeometry);
    const coordinates = sketchFeatureGeom.getCoordinates();
    coordinates.pop();
    coordinates.push(center);
    sketchFeatureGeom.setCoordinates(coordinates);
  } else if (this.type_ === 'Polygon') {
    const sketchFeatureGeom = this.sketchFeature_.getGeometry();
    googAsserts.assertInstanceof(sketchFeatureGeom, olGeomPolygon);
    const coordinatess = sketchFeatureGeom.getCoordinates();
    const coordinates = coordinatess[0];
    coordinates.pop();
    coordinates.push(center);
    sketchFeatureGeom.setCoordinates([coordinates]);
  }

  const dirty = this.getDirty();
  if (!dirty) {
    this.set('dirty', true);
  }

};


/**
 * Stop drawing without adding the sketch feature to the target layer.
 * @return {?import("ol/Feature.js").default} The sketch feature (or null if none).
 * @private
 */
exports.prototype.abortDrawing_ = function() {
  const sketchFeature = this.sketchFeature_;
  if (sketchFeature || this.sketchPoints_.length > 0) {
    this.sketchFeature_ = null;
    this.sketchPoint_ = null;
    this.overlay_.getSource().clear(true);
  }
  this.sketchPoints_ = [];
  this.set('dirty', false);
  this.set('drawing', false);
  this.set('valid', false);
  return sketchFeature;
};


/**
 * @private
 */
exports.prototype.updateState_ = function() {
  const map = this.getMap();
  const active = this.getActive();
  if (!map || !active) {
    this.abortDrawing_();
  } else {
    this.startDrawing_();
  }
  this.overlay_.setMap(active ? map : null);
};


/**
 * @param {import("ol/Object/Event.js").default} evt Event.
 * @private
 */
exports.prototype.handleViewCenterChange_ = function(evt) {
  // no need to do anything if interaction is not active, nor drawing
  const active = this.getActive();
  const drawing = this.getDrawing();

  if (!active || !drawing) {
    return;
  }

  this.createOrUpdateSketchPoint_();

  if (this.type_ === 'Point') {
    this.addToDrawing();
  } else {
    this.modifyDrawing_();
    this.updateSketchFeatures_();
  }
};


/**
 * @private
 */
exports.prototype.createOrUpdateSketchPoint_ = function() {
  const center = this.getCenter_();

  if (this.sketchPoint_) {
    const geometry = this.getSketchPointGeometry_();
    geometry.setCoordinates(center);
  } else {
    this.sketchPoint_ = new olFeature(new olGeomPoint(center));
  }

};


/**
 * Redraw the sketch features.
 * @private
 */
exports.prototype.updateSketchFeatures_ = function() {
  const sketchFeatures = [];
  if (this.sketchFeature_) {
    sketchFeatures.push(this.sketchFeature_);
  }
  if (this.sketchPoint_) {
    sketchFeatures.push(this.sketchPoint_);
  }
  const overlaySource = this.overlay_.getSource();
  overlaySource.clear(true);
  overlaySource.addFeatures(sketchFeatures);
  overlaySource.addFeatures(this.sketchPoints_);
};


/**
 * Returns the geometry of the sketch point feature.
 * @return {import("ol/geom/Point.js").default} Point.
 * @private
 */
exports.prototype.getSketchPointGeometry_ = function() {
  googAsserts.assert(this.sketchPoint_, 'sketch point should be thruty');
  const geometry = this.sketchPoint_.getGeometry();
  googAsserts.assertInstanceof(geometry, olGeomPoint);
  return geometry;
};


/**
 * Returns the center of the map view
 * @return {import("ol/Coordinate.js").default} Coordinate.
 * @private
 */
exports.prototype.getCenter_ = function() {
  const center = this.getMap().getView().getCenter();
  googAsserts.assertArray(center);
  return center;
};


export default exports;
