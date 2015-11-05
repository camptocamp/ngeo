goog.provide('ngeo.interaction.DrawAzimut');
goog.provide('ngeo.interaction.MeasureAzimut');

goog.require('goog.asserts');
goog.require('goog.events');
goog.require('ngeo.interaction.Measure');
goog.require('ol.Feature');
goog.require('ol.MapBrowserEvent');
goog.require('ol.MapBrowserEvent.EventType');
goog.require('ol.geom.Circle');
goog.require('ol.geom.GeometryCollection');
goog.require('ol.geom.LineString');
goog.require('ol.geom.Point');
goog.require('ol.interaction.Draw');
goog.require('ol.interaction.DrawEvent');
goog.require('ol.interaction.InteractionProperty');
goog.require('ol.interaction.Pointer');
goog.require('ol.layer.Vector');
goog.require('ol.source.Vector');



/**
 * @classdesc
 * Interaction dedicated to measure length.
 *
 * @constructor
 * @fires ol.interaction.DrawEvent
 * @extends {ngeo.interaction.Measure}
 * @param {ngeox.interaction.MeasureOptions=} opt_options Options
 */
ngeo.interaction.MeasureAzimut = function(opt_options) {

  var options = goog.isDef(opt_options) ? opt_options : {};

  goog.base(this, options);


  /**
   * Message to show after the first point is clicked.
   * @type {Element}
   */
  this.continueMsg = goog.isDef(options.continueMsg) ? options.continueMsg :
      goog.dom.createDom(goog.dom.TagName.SPAN, {}, 'Click to finish.');

};
goog.inherits(ngeo.interaction.MeasureAzimut, ngeo.interaction.Measure);


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureAzimut.prototype.getDrawInteraction = function(style,
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
  var output = this.formatMeasure_(line);
  callback(output, line.getLastCoordinate());
};


/**
 * Format measure output.
 * @param {ol.geom.LineString} line
 * @return {string}
 * @private
 */
ngeo.interaction.MeasureAzimut.prototype.formatMeasure_ = function(line) {
  var coords = line.getCoordinates();
  var dx = coords[1][0] - coords[0][0];
  var dy = coords[1][1] - coords[0][1];
  var rad = Math.acos(dy / Math.sqrt(dx * dx + dy * dy));
  var factor = dx > 0 ? 1 : -1;
  var azimut = Math.round(factor * rad * 180 / Math.PI) % 360;
  var output = azimut + '°';
  var proj = this.getMap().getView().getProjection();
  output += '<br/>' + ngeo.interaction.Measure.getFormattedLength(line, proj);
  return output;
};



/**
 * @classdesc
 * Interaction dedicated to measure azimut.
 *
 * @constructor
 * @extends {ol.interaction.Pointer}
 * @param {olx.interaction.PointerOptions} options Options.
 * @export
 */
ngeo.interaction.DrawAzimut = function(options) {

  goog.base(this, {
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
  this.source_ = goog.isDef(options.source) ? options.source : null;

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
    style: goog.isDef(options.style) ?
        options.style : ol.interaction.Draw.getDefaultStyleFunction()
  });


  goog.events.listen(this,
      ol.Object.getChangeEventType(ol.interaction.InteractionProperty.ACTIVE),
      this.updateState_, false, this);
};
goog.inherits(ngeo.interaction.DrawAzimut, ol.interaction.Pointer);


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
  var map = mapBrowserEvent.map;
  if (!map.isDef()) {
    return true;
  }
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
ngeo.interaction.DrawAzimut.prototype.createOrUpdateSketchPoint_ =
    function(event) {
  var coordinates = event.coordinate.slice();
  if (goog.isNull(this.sketchPoint_)) {
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
  if (!goog.isNull(this.sketchFeature_)) {
    sketchFeatures.push(this.sketchFeature_);
  }
  if (!goog.isNull(this.sketchPoint_)) {
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
  goog.asserts.assert(goog.isDef(geometry));
  this.sketchFeature_ = new ol.Feature();
  this.sketchFeature_.setGeometry(geometry);
  this.updateSketchFeatures_();
  this.dispatchEvent(new ol.interaction.DrawEvent(
      ol.interaction.DrawEventType.DRAWSTART, this.sketchFeature_));
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
  if (!goog.isNull(sketchFeature)) {
    this.sketchFeature_ = null;
    this.sketchPoint_ = null;
    this.sketchLayer_.getSource().clear(true);
  }
  return sketchFeature;
};


/**
 * @inheritDoc
 */
ngeo.interaction.DrawAzimut.prototype.shouldStopEvent = goog.functions.FALSE;


/**
 * @private
 */
ngeo.interaction.DrawAzimut.prototype.updateState_ = function() {
  var map = this.getMap();
  var active = this.getActive();
  if (goog.isNull(map) || !active) {
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
  goog.asserts.assert(!goog.isNull(sketchFeature));

  if (!goog.isNull(this.source_)) {
    this.source_.addFeature(sketchFeature);
  }
  this.dispatchEvent(new ol.interaction.DrawEvent(
      ol.interaction.DrawEventType.DRAWEND, sketchFeature));
};


/**
 * @inheritDoc
 */
ngeo.interaction.DrawAzimut.prototype.setMap = function(map) {
  goog.base(this, 'setMap', map);
  this.updateState_();
};
