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
goog.require('ol.interaction.DrawEventType');
goog.require('ol.interaction.Property');
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
 * @param {!ngeox.unitPrefix} unitPrefixFormat The format function
 * @param {!ngeox.number} numberFormat The format function
 * @param {!ngeox.interaction.MeasureOptions=} opt_options Options
 * @export
 */
ngeo.interaction.MeasureAzimut = function(unitPrefixFormat, numberFormat, opt_options) {

  const options = opt_options || {};

  ngeo.interaction.Measure.call(this, options);


  /**
   * Message to show after the first point is clicked.
   * @type {Element}
   */
  this.continueMsg;
  if (options.continueMsg !== undefined) {
    this.continueMsg = options.continueMsg;
  } else {
    this.continueMsg = document.createElement('span');
    this.continueMsg.textContent = 'Click to finish.';
  }

  /**
   * The format function
   * @type {ngeox.number}
   */
  this.numberFormat = goog.asserts.assert(numberFormat);

  /**
   * The format function
   * @type {ngeox.unitPrefix}
   */
  this.unitPrefixFormat = goog.asserts.assert(unitPrefixFormat);

};
ol.inherits(ngeo.interaction.MeasureAzimut, ngeo.interaction.Measure);


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureAzimut.prototype.createDrawInteraction = function(style,
  source) {

  return new ngeo.interaction.DrawAzimut({
    source,
    style
  });


};


/**
 * @inheritDoc
 */
ngeo.interaction.MeasureAzimut.prototype.handleMeasure = function(callback) {
  const geom = goog.asserts.assertInstanceof(this.sketchFeature.getGeometry(), ol.geom.GeometryCollection);
  const line = goog.asserts.assertInstanceof(geom.getGeometries()[0], ol.geom.LineString);
  const output = ngeo.interaction.MeasureAzimut.getFormattedAzimutRadius(
    line, goog.asserts.assertInstanceof(this.getMap().getView().getProjection(), ol.proj.Projection),
    this.decimals, this.precision, this.unitPrefixFormat, this.numberFormat);
  callback(output, line.getLastCoordinate());
};


/**
 * Format measure output of azimut and radius.
 * @param {!ol.geom.LineString} line LineString.
 * @param {!ol.proj.Projection} projection Projection of the polygon coords.
 * @param {number|undefined} decimals Decimals.
 * @param {number|undefined} precision Precision.
 * @param {!ngeox.unitPrefix} formatLength The format function.
 * @param {!ngeox.number} formatAzimut The format function.
 * @return {string} Formatted measure.
 */
ngeo.interaction.MeasureAzimut.getFormattedAzimutRadius = function(
  line, projection, decimals, precision, formatLength, formatAzimut) {

  let output = ngeo.interaction.MeasureAzimut.getFormattedAzimut(line, decimals, formatAzimut);

  output += `, ${ngeo.interaction.Measure.getFormattedLength(
    line, projection, precision, formatLength)}`;

  return output;
};


/**
 * Format measure output of azimut.
 * @param {!ol.geom.LineString} line LineString.
 * @param {number|undefined} decimals Decimals.
 * @param {!ngeox.number} format The format function.
 * @return {string} Formatted measure.
 */
ngeo.interaction.MeasureAzimut.getFormattedAzimut = function(line, decimals, format) {
  const azimut = ngeo.interaction.MeasureAzimut.getAzimut(line);
  return `${format(azimut, decimals)}°`;
};


/**
 * Compute azimut from a 2 points line.
 * @param {ol.geom.LineString} line LineString.
 * @return {number} Azimut value.
 */
ngeo.interaction.MeasureAzimut.getAzimut = function(line) {
  const coords = line.getCoordinates();
  const dx = coords[1][0] - coords[0][0];
  const dy = coords[1][1] - coords[0][1];
  const rad = Math.acos(dy / Math.sqrt(dx * dx + dy * dy));
  const factor = dx > 0 ? 1 : -1;
  return (factor * rad * 180 / Math.PI) % 360;
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
    ol.Object.getChangeEventType(ol.interaction.Property.ACTIVE),
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
    ol.interaction.DrawEventType.DRAWSTART, this.sketchFeature_));
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
    ol.interaction.DrawEventType.DRAWEND, sketchFeature));
};


/**
 * @inheritDoc
 */
ngeo.interaction.DrawAzimut.prototype.setMap = function(map) {
  ol.interaction.Pointer.prototype.setMap.call(this, map);
  this.updateState_();
};
