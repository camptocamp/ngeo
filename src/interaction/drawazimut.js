goog.provide('ngeo.interaction.DrawAzimut');

goog.require('goog.asserts');
goog.require('ol.Feature');
goog.require('ol.MapBrowserEvent');
goog.require('ol.events');
goog.require('ol.functions');
goog.require('ol.geom.Circle');
goog.require('ol.geom.GeometryCollection');
goog.require('ol.geom.LineString');
goog.require('ol.geom.Point');
goog.require('ol.interaction.Draw');
goog.require('ol.interaction.Pointer');
goog.require('ol.layer.Vector');
goog.require('ol.source.Vector');


/**
 * @classdesc
 * Interaction dedicated to measure azimut.
 *
 * @constructor
 * @struct
 * @extends {ol.interaction.Pointer}
 * @param {olx.interaction.PointerOptions} options Options.
 */
ngeo.interaction.DrawAzimut = function(options) {

  ol.interaction.Pointer.call(this, {
    handleDownEvent: ngeo.interaction.DrawAzimut.handleDownEvent_,
    handleEvent: ngeo.interaction.DrawAzimut.handleEvent_,
    handleUpEvent: ngeo.interaction.DrawAzimut.handleUpEvent_
  });

  /**
   * @type {ol.Pixel}
   * @private
   */
  this.downPx_ = null;

  /**
   * Target source for drawn features.
   * @type {ol.source.Vector}
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
   * @type {ol.layer.Vector}
   * @private
   */
  this.sketchLayer_ = new ol.layer.Vector({
    source: new ol.source.Vector({
      useSpatialIndex: false,
      wrapX: false
    }),
    style: options.style !== undefined ?
      options.style : ol.interaction.Draw.getDefaultStyleFunction()
  });

  ol.events.listen(this, 'change:active', this.updateState_, this);
};
ol.inherits(ngeo.interaction.DrawAzimut, ol.interaction.Pointer);


/**
 * @param {ol.MapBrowserPointerEvent} event Event.
 * @return {boolean} Start drag sequence?
 * @this {ngeo.interaction.DrawAzimut}
 * @private
 */
ngeo.interaction.DrawAzimut.handleDownEvent_ = function(event) {
  this.downPx_ = event.pixel;
  return true;
};


/**
 * @param {ol.MapBrowserPointerEvent} event Event.
 * @return {boolean} Stop drag sequence?
 * @this {ngeo.interaction.DrawAzimut}
 * @private
 */
ngeo.interaction.DrawAzimut.handleUpEvent_ = function(event) {
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
ngeo.interaction.DrawAzimut.handleEvent_ = function(mapBrowserEvent) {
  let pass = true;
  if (mapBrowserEvent.type === 'pointermove') {
    pass = this.handlePointerMove_(mapBrowserEvent);
  } else if (mapBrowserEvent.type === 'dblclick') {
    pass = false;
  }
  return ol.interaction.Pointer.handleEvent.call(this, mapBrowserEvent) && pass;
};


/**
 * Handle move events.
 * @param {ol.MapBrowserEvent} event A move event.
 * @return {boolean} Pass the event to other interactions.
 * @private
 */
ngeo.interaction.DrawAzimut.prototype.handlePointerMove_ = function(event) {
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
ngeo.interaction.DrawAzimut.prototype.createOrUpdateSketchPoint_ = function(event) {
  const coordinates = event.coordinate.slice();
  if (this.sketchPoint_ === null) {
    this.sketchPoint_ = new ol.Feature(new ol.geom.Point(coordinates));
    this.updateSketchFeatures_();
  } else {
    const sketchPointGeom = this.sketchPoint_.getGeometry();
    goog.asserts.assertInstanceof(sketchPointGeom, ol.geom.Point);
    sketchPointGeom.setCoordinates(coordinates);
  }
};


/**
 * Redraw the skecth features.
 * @private
 */
ngeo.interaction.DrawAzimut.prototype.updateSketchFeatures_ = function() {
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
ngeo.interaction.DrawAzimut.prototype.startDrawing_ = function(event) {
  const start = event.coordinate;
  this.started_ = true;
  const line = new ol.geom.LineString([start.slice(), start.slice()]);
  const circle = new ol.geom.Circle(start, 0);
  const geometry = new ol.geom.GeometryCollection([line, circle]);
  goog.asserts.assert(geometry !== undefined);
  this.sketchFeature_ = new ol.Feature();
  this.sketchFeature_.setGeometry(geometry);
  this.updateSketchFeatures_();
  this.dispatchEvent(new ol.interaction.Draw.Event(
    /** @type {ol.interaction.DrawEventType} */ ('drawstart'), this.sketchFeature_));
};


/**
 * Modify the drawing.
 * @param {ol.MapBrowserEvent} event Event.
 * @private
 */
ngeo.interaction.DrawAzimut.prototype.modifyDrawing_ = function(event) {
  const coordinate = event.coordinate;
  const geometry = goog.asserts.assertInstanceof(
    this.sketchFeature_.getGeometry(), ol.geom.GeometryCollection);
  const geometries = geometry.getGeometriesArray();
  const line = geometries[0];
  goog.asserts.assertInstanceof(line, ol.geom.LineString);
  const coordinates = line.getCoordinates();
  const sketchPointGeom = this.sketchPoint_.getGeometry();
  goog.asserts.assertInstanceof(sketchPointGeom, ol.geom.Point);
  sketchPointGeom.setCoordinates(coordinate);
  const last = coordinates[coordinates.length - 1];
  last[0] = coordinate[0];
  last[1] = coordinate[1];
  goog.asserts.assertInstanceof(line, ol.geom.LineString);
  line.setCoordinates(coordinates);
  const circle = goog.asserts.assertInstanceof(geometries[1], ol.geom.Circle);
  circle.setRadius(line.getLength());
  this.updateSketchFeatures_();
};


/**
 * Stop drawing without adding the sketch feature to the target layer.
 * @return {ol.Feature} The sketch feature (or null if none).
 * @private
 */
ngeo.interaction.DrawAzimut.prototype.abortDrawing_ = function() {
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
ngeo.interaction.DrawAzimut.prototype.shouldStopEvent = ol.functions.FALSE;


/**
 * @private
 */
ngeo.interaction.DrawAzimut.prototype.updateState_ = function() {
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
ngeo.interaction.DrawAzimut.prototype.finishDrawing_ = function() {
  const sketchFeature = this.abortDrawing_();
  goog.asserts.assert(sketchFeature !== null);

  if (this.source_ !== null) {
    this.source_.addFeature(sketchFeature);
  }

  this.dispatchEvent(new ol.interaction.Draw.Event(
    /** @type {ol.interaction.DrawEventType} */ ('drawend'), sketchFeature));
};


/**
 * @inheritDoc
 */
ngeo.interaction.DrawAzimut.prototype.setMap = function(map) {
  ol.interaction.Pointer.prototype.setMap.call(this, map);
  this.updateState_();
};
