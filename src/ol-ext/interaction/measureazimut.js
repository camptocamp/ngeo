goog.provide('ngeo.interaction.DrawAzimut');
goog.provide('ngeo.interaction.MeasureAzimut');

goog.require('goog.asserts');
goog.require('ngeo.interaction.Measure');
goog.require('ol.Feature');
goog.require('ol.MapBrowserEvent');
goog.require('ol.events');
goog.require('ol.functions');
goog.require('ol.geom.Circle');
goog.require('ol.geom.GeometryCollection');
goog.require('ol.geom.LineString');
goog.require('ol.geom.Point');
goog.require('ol.interaction.Draw');
goog.require('ol.interaction.Interaction');
goog.require('ol.interaction.Pointer');
goog.require('ol.layer.Vector');
goog.require('ol.source.Vector');


/**
 * @classdesc
 * Interaction dedicated to measure length.
 *
 * See our live example: [../examples/measure.html](../examples/measure.html)
 *
 * @constructor
 * @struct
 * @fires ol.interaction.Draw.Event
 * @extends {ngeo.interaction.Measure}
 * @param {ngeox.unitPrefix} format The format function
 * @param {ngeox.interaction.MeasureOptions=} opt_options Options
 * @export
 */
ngeo.interaction.MeasureAzimut = function(format, opt_options) {

  var options = opt_options !== undefined ? opt_options : {};

  ngeo.interaction.Measure.call(this, options);


  /**
   * Message to show after the first point is clicked.
   * @type {Element}
   */
  this.continueMsg = options.continueMsg !== undefined ? options.continueMsg :
      goog.dom.createDom('SPAN', {}, 'Click to finish.');

  /**
   * The format function
   * @type {ngeox.unitPrefix}
   */
  this.format = format;

};
ol.inherits(ngeo.interaction.MeasureAzimut, ngeo.interaction.Measure);


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureAzimut.prototype.createDrawInteraction = function(style,
    source) {

  return new ngeo.interaction.DrawAzimut({
    source: source,
    style: style
  });


};


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureAzimut.prototype.handleMeasure = function(callback) {
  var geom = /** @type {ol.geom.GeometryCollection} */
      (this.sketchFeature.getGeometry());
  var line = /** @type {ol.geom.LineString} */ (geom.getGeometries()[0]);
  var output = ngeo.interaction.MeasureAzimut.getFormattedAzimutRadius(line, this.getMap().getView().getProjection(), this.decimals, this.format);
  callback(output, line.getLastCoordinate());
};


/**
 * Format measure output of azimut and radius.
 * @param {ol.geom.LineString} line LineString.
 * @param {ol.proj.Projection} projection Projection of the polygon coords.
 * @param {?number} decimals Decimals.
 * @param {ngeox.unitPrefix} format The format function.
 * @return {string} Formated measure.
 */
ngeo.interaction.MeasureAzimut.getFormattedAzimutRadius = function(
    line, projection, decimals, format) {

  var output = ngeo.interaction.MeasureAzimut.getFormattedAzimut(line);

  output += ', ' + ngeo.interaction.Measure.getFormattedLength(
      line, projection, decimals, format);

  return output;
};


/**
 * Format measure output of azimut.
 * @param {ol.geom.LineString} line LineString.
 * @return {string} Formated measure.
 */
ngeo.interaction.MeasureAzimut.getFormattedAzimut = function(line) {
  var azimut = ngeo.interaction.MeasureAzimut.getAzimut(line);
  return azimut + '°';
};


/**
 * Compute azimut from a 2 points line.
 * @param {ol.geom.LineString} line LineString.
 * @return {number} Azimut value.
 */
ngeo.interaction.MeasureAzimut.getAzimut = function(line) {
  var coords = line.getCoordinates();
  var dx = coords[1][0] - coords[0][0];
  var dy = coords[1][1] - coords[0][1];
  var rad = Math.acos(dy / Math.sqrt(dx * dx + dy * dy));
  var factor = dx > 0 ? 1 : -1;
  return Math.round(factor * rad * 180 / Math.PI) % 360;
};


/**
 * @classdesc
 * Interaction dedicated to measure azimut.
 *
 * @constructor
 * @struct
 * @extends {ol.interaction.Pointer}
 * @param {olx.interaction.PointerOptions} options Options.
 * @export
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


  ol.events.listen(this,
      ol.Object.getChangeEventType(ol.interaction.Interaction.Property.ACTIVE),
      this.updateState_, this);
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
  var downPx = this.downPx_;
  var clickPx = event.pixel;
  var dx = downPx[0] - clickPx[0];
  var dy = downPx[1] - clickPx[1];
  var squaredDistance = dx * dx + dy * dy;
  var pass = true;
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
  var pass = true;
  if (mapBrowserEvent.type === ol.MapBrowserEvent.EventType.POINTERMOVE) {
    pass = this.handlePointerMove_(mapBrowserEvent);
  } else if (mapBrowserEvent.type === ol.MapBrowserEvent.EventType.DBLCLICK) {
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
  var coordinates = event.coordinate.slice();
  if (this.sketchPoint_ === null) {
    this.sketchPoint_ = new ol.Feature(new ol.geom.Point(coordinates));
    this.updateSketchFeatures_();
  } else {
    var sketchPointGeom = this.sketchPoint_.getGeometry();
    goog.asserts.assertInstanceof(sketchPointGeom, ol.geom.Point);
    sketchPointGeom.setCoordinates(coordinates);
  }
};


/**
 * Redraw the skecth features.
 * @private
 */
ngeo.interaction.DrawAzimut.prototype.updateSketchFeatures_ = function() {
  var sketchFeatures = [];
  if (this.sketchFeature_ !== null) {
    sketchFeatures.push(this.sketchFeature_);
  }
  if (this.sketchPoint_ !== null) {
    sketchFeatures.push(this.sketchPoint_);
  }
  var source = this.sketchLayer_.getSource();
  source.clear(true);
  source.addFeatures(sketchFeatures);
};


/**
 * Start the drawing.
 * @param {ol.MapBrowserEvent} event Event.
 * @private
 */
ngeo.interaction.DrawAzimut.prototype.startDrawing_ = function(event) {
  var start = event.coordinate;
  this.started_ = true;
  var line = new ol.geom.LineString([start.slice(), start.slice()]);
  var circle = new ol.geom.Circle(start, 0);
  var geometry = new ol.geom.GeometryCollection([line, circle]);
  goog.asserts.assert(geometry !== undefined);
  this.sketchFeature_ = new ol.Feature();
  this.sketchFeature_.setGeometry(geometry);
  this.updateSketchFeatures_();
  this.dispatchEvent(new ol.interaction.Draw.Event(
      ol.interaction.Draw.EventType.DRAWSTART, this.sketchFeature_));
};


/**
 * Modify the drawing.
 * @param {ol.MapBrowserEvent} event Event.
 * @private
 */
ngeo.interaction.DrawAzimut.prototype.modifyDrawing_ = function(event) {
  var coordinate = event.coordinate;
  var geometry = /** @type {ol.geom.GeometryCollection} */
      (this.sketchFeature_.getGeometry());
  var geometries = geometry.getGeometriesArray();
  var line = geometries[0];
  var coordinates, last;
  goog.asserts.assertInstanceof(line, ol.geom.LineString);
  coordinates = line.getCoordinates();
  var sketchPointGeom = this.sketchPoint_.getGeometry();
  goog.asserts.assertInstanceof(sketchPointGeom, ol.geom.Point);
  sketchPointGeom.setCoordinates(coordinate);
  last = coordinates[coordinates.length - 1];
  last[0] = coordinate[0];
  last[1] = coordinate[1];
  goog.asserts.assertInstanceof(line, ol.geom.LineString);
  line.setCoordinates(coordinates);
  var circle = /** @type {ol.geom.Circle} */ (geometries[1]);
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
  var sketchFeature = this.sketchFeature_;
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
  var map = this.getMap();
  var active = this.getActive();
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
  var sketchFeature = this.abortDrawing_();
  goog.asserts.assert(sketchFeature !== null);

  if (this.source_ !== null) {
    this.source_.addFeature(sketchFeature);
  }

  this.dispatchEvent(new ol.interaction.Draw.Event(
      ol.interaction.Draw.EventType.DRAWEND, sketchFeature));
};


/**
 * @inheritDoc
 */
ngeo.interaction.DrawAzimut.prototype.setMap = function(map) {
  ol.interaction.Pointer.prototype.setMap.call(this, map);
  this.updateState_();
};
