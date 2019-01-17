/**
 * @module ngeo.interaction.DrawAzimut
 */
import googAsserts from 'goog/asserts.js';
import ngeoInteractionCommon from 'ngeo/interaction/common.js';
import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import {inherits as olUtilInherits} from 'ol/util.js';
import olFeature from 'ol/Feature.js';
import * as olEvents from 'ol/events.js';
import {FALSE} from 'ol/functions.js';
import olGeomCircle from 'ol/geom/Circle.js';
import olGeomGeometryCollection from 'ol/geom/GeometryCollection.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olGeomPoint from 'ol/geom/Point.js';
import olInteractionPointer from 'ol/interaction/Pointer.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceVector from 'ol/source/Vector.js';

/**
 * @classdesc
 * Interaction dedicated to measure azimut.
 *
 * @constructor
 * @extends {import("ol/interaction/Pointer.js").default}
 * @param {olx.interaction.PointerOptions} options Options.
 */
const exports = function(options) {

  olInteractionPointer.call(this, {
    handleDownEvent: exports.handleDownEvent_,
    handleEvent: exports.handleEvent_,
    handleUpEvent: exports.handleUpEvent_
  });

  /**
   * @type {ol.Pixel}
   * @private
   */
  this.downPx_ = null;

  /**
   * Target source for drawn features.
   * @type {import("ol/source/Vector.js").default}
   * @private
   */
  this.source_ = options.source !== undefined ? options.source : null;

  /**
   * Tglls whether the drawing has started or not.
   * @type {boolean}
   * @private
   */
  this.started_ = false;

  /**
   * Sketch feature.
   * @type {ol.Feature}
   * @private
   */
  this.sketchFeature_ = null;

  /**
   * Sketch point.
   * @type {ol.Feature}
   * @private
   */
  this.sketchPoint_ = null;


  /**
   * Squared tolerance for handling up events.  If the squared distance
   * between a down and up event is greater than this tolerance, up events
   * will not be handled.
   * @type {number}
   * @private
   */
  this.squaredClickTolerance_ = 4;


  /**
   * Vector layer where our sketch features are drawn.
   * @type {import("ol/layer/Vector.js").default}
   * @private
   */
  this.sketchLayer_ = new olLayerVector({
    source: new olSourceVector({
      useSpatialIndex: false,
      wrapX: false
    }),
    style: options.style || ngeoInteractionCommon.getDefaultDrawStyleFunction()
  });

  olEvents.listen(this, 'change:active', this.updateState_, this);
};

olUtilInherits(exports, olInteractionPointer);


/**
 * @param {ol.MapBrowserPointerEvent} event Event.
 * @return {boolean} Start drag sequence?
 * @this {ngeo.interaction.DrawAzimut}
 * @private
 */
exports.handleDownEvent_ = function(event) {
  this.downPx_ = event.pixel;
  return true;
};


/**
 * @param {ol.MapBrowserPointerEvent} event Event.
 * @return {boolean} Stop drag sequence?
 * @this {ngeo.interaction.DrawAzimut}
 * @private
 */
exports.handleUpEvent_ = function(event) {
  const downPx = this.downPx_;
  const clickPx = event.pixel;
  const dx = downPx[0] - clickPx[0];
  const dy = downPx[1] - clickPx[1];
  const squaredDistance = dx * dx + dy * dy;
  let pass = true;
  if (squaredDistance <= this.squaredClickTolerance_) {
    this.handlePointerMove_(event);
    if (!this.started_) {
      this.startDrawing_(event);
    } else {
      this.finishDrawing_();
    }
    pass = false;
  }
  return pass;
};


/**
 * @param {ol.MapBrowserEvent} mapBrowserEvent Map browser event.
 * @return {boolean} `false` to stop event propagation.
 * @this {ngeo.interaction.DrawAzimut}
 * @private
 */
exports.handleEvent_ = function(mapBrowserEvent) {
  let pass = true;
  if (mapBrowserEvent.type === 'pointermove') {
    pass = this.handlePointerMove_(mapBrowserEvent);
  } else if (mapBrowserEvent.type === 'dblclick') {
    pass = false;
  }
  return olInteractionPointer.prototype.handleEvent.call(this, mapBrowserEvent) && pass;
};


/**
 * Handle move events.
 * @param {ol.MapBrowserEvent} event A move event.
 * @return {boolean} Pass the event to other interactions.
 * @private
 */
exports.prototype.handlePointerMove_ = function(event) {
  if (this.started_) {
    this.modifyDrawing_(event);
  } else {
    this.createOrUpdateSketchPoint_(event);
  }
  return true;
};


/**
 * @param {ol.MapBrowserEvent} event Event.
 * @private
 */
exports.prototype.createOrUpdateSketchPoint_ = function(event) {
  const coordinates = event.coordinate.slice();
  if (this.sketchPoint_ === null) {
    this.sketchPoint_ = new olFeature(new olGeomPoint(coordinates));
    this.updateSketchFeatures_();
  } else {
    const sketchPointGeom = this.sketchPoint_.getGeometry();
    googAsserts.assertInstanceof(sketchPointGeom, olGeomPoint);
    sketchPointGeom.setCoordinates(coordinates);
  }
};


/**
 * Redraw the skecth features.
 * @private
 */
exports.prototype.updateSketchFeatures_ = function() {
  const sketchFeatures = [];
  if (this.sketchFeature_ !== null) {
    sketchFeatures.push(this.sketchFeature_);
  }
  if (this.sketchPoint_ !== null) {
    sketchFeatures.push(this.sketchPoint_);
  }
  const source = this.sketchLayer_.getSource();
  source.clear(true);
  source.addFeatures(sketchFeatures);
};


/**
 * Start the drawing.
 * @param {ol.MapBrowserEvent} event Event.
 * @private
 */
exports.prototype.startDrawing_ = function(event) {
  const start = event.coordinate;
  this.started_ = true;
  const line = new olGeomLineString([start.slice(), start.slice()]);
  const circle = new olGeomCircle(start, 0);
  const geometry = new olGeomGeometryCollection([line, circle]);
  googAsserts.assert(geometry !== undefined);
  this.sketchFeature_ = new olFeature();
  this.sketchFeature_.setGeometry(geometry);
  this.updateSketchFeatures_();
  /** @type {DrawEvent} */
  const evt = new ngeoCustomEvent('drawstart', {feature: this.sketchFeature_});
  this.dispatchEvent(evt);
};


/**
 * Modify the drawing.
 * @param {ol.MapBrowserEvent} event Event.
 * @private
 */
exports.prototype.modifyDrawing_ = function(event) {
  const coordinate = event.coordinate;
  const geometry = googAsserts.assertInstanceof(
    this.sketchFeature_.getGeometry(), olGeomGeometryCollection);
  const geometries = geometry.getGeometriesArray();
  const line = geometries[0];
  googAsserts.assertInstanceof(line, olGeomLineString);
  const coordinates = line.getCoordinates();
  const sketchPointGeom = this.sketchPoint_.getGeometry();
  googAsserts.assertInstanceof(sketchPointGeom, olGeomPoint);
  sketchPointGeom.setCoordinates(coordinate);
  const last = coordinates[coordinates.length - 1];
  last[0] = coordinate[0];
  last[1] = coordinate[1];
  googAsserts.assertInstanceof(line, olGeomLineString);
  line.setCoordinates(coordinates);
  const circle = googAsserts.assertInstanceof(geometries[1], olGeomCircle);
  circle.setRadius(line.getLength());
  this.updateSketchFeatures_();
};


/**
 * Stop drawing without adding the sketch feature to the target layer.
 * @return {ol.Feature} The sketch feature (or null if none).
 * @private
 */
exports.prototype.abortDrawing_ = function() {
  this.started_ = false;
  const sketchFeature = this.sketchFeature_;
  if (sketchFeature !== null) {
    this.sketchFeature_ = null;
    this.sketchPoint_ = null;
    this.sketchLayer_.getSource().clear(true);
  }
  return sketchFeature;
};


/**
 * @inheritDoc
 */
exports.prototype.shouldStopEvent = FALSE;


/**
 * @private
 */
exports.prototype.updateState_ = function() {
  const map = this.getMap();
  const active = this.getActive();
  if (map === null || !active) {
    this.abortDrawing_();
  }
  this.sketchLayer_.setMap(active ? map : null);
};


/**
 * Stop drawing and add the sketch feature to the target layer.
 * @private
 */
exports.prototype.finishDrawing_ = function() {
  const sketchFeature = this.abortDrawing_();
  googAsserts.assert(sketchFeature !== null);

  if (this.source_ !== null) {
    this.source_.addFeature(sketchFeature);
  }

  /** @type {DrawEvent} */
  const event = new ngeoCustomEvent('drawend', {feature: this.sketchFeature_});
  this.dispatchEvent(event);
};


/**
 * @inheritDoc
 */
exports.prototype.setMap = function(map) {
  olInteractionPointer.prototype.setMap.call(this, map);
  this.updateState_();
};


export default exports;
