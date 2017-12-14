goog.provide('ngeo.MeasureEvent');
goog.provide('ngeo.MeasureEventType');
goog.provide('ngeo.interaction.Measure');

goog.require('goog.asserts');
goog.require('ol.dom');
goog.require('ol.Feature');
goog.require('ol.MapBrowserEvent');
goog.require('ol.Overlay');
goog.require('ol.Sphere');
goog.require('ol.events');
goog.require('ol.interaction.DrawEventType');
goog.require('ol.interaction.Interaction');
goog.require('ol.layer.Vector');
goog.require('ol.proj.EPSG4326');
goog.require('ol.source.Vector');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


/**
 * Interactions for measure tools base class.
 * @typedef {{
 *    decimals: (number|undefined),
 *    precision: (number|undefined),
 *    displayHelpTooltip: (boolean|undefined),
 *    startMsg: (Element|undefined),
 *    style: (ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined),
 *    sketchStyle: (ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined)
 * }}
 */
ngeo.interaction.MeasureBaseOptions;


/**
 * @enum {string}
 */
ngeo.MeasureEventType = {
  /**
   * Triggered upon feature draw end
   * @event ngeo.MeasureEvent#measureend
   */
  MEASUREEND: 'measureend'
};


/**
 * Events emitted by {@link ngeo.interaction.Interaction} instances are
 * instances of this type.
 *
 * @constructor
 * @struct
 * @extends {ol.events.Event}
 * @implements {ngeox.MeasureEvent}
 * @param {ngeo.MeasureEventType} type Type.
 * @param {ol.Feature} feature The feature drawn.
 */
ngeo.MeasureEvent = function(type, feature) {

  ol.events.Event.call(this, type);

  /**
   * The feature being drawn.
   * @type {ol.Feature}
   * @api stable
   */
  this.feature = feature;

};
ol.inherits(ngeo.MeasureEvent, ol.events.Event);


/**
 * Interaction that allows measuring (length, area, ...).
 *
 * @constructor
 * @struct
 * @abstract
 * @extends {ol.interaction.Interaction}
 * @param {ngeo.interaction.MeasureBaseOptions=} opt_options Options
 */
ngeo.interaction.Measure = function(opt_options) {

  const options = opt_options !== undefined ? opt_options : {};

  ol.interaction.Interaction.call(this, {
    handleEvent: ngeo.interaction.Measure.handleEvent_
  });

  /**
   * The help tooltip element.
   * @type {Element}
   * @private
   */
  this.helpTooltipElement_ = null;


  /**
   * Overlay to show the help messages.
   * @type {ol.Overlay}
   * @private
   */
  this.helpTooltipOverlay_ = null;


  /**
   * The measure tooltip element.
   * @type {Element}
   * @private
   */
  this.measureTooltipElement_ = null;


  /**
   * Overlay to show the measurement.
   * @type {ol.Overlay}
   * @private
   */
  this.measureTooltipOverlay_ = null;


  /**
   * The measurement overlay coordinate.
   * @type {ol.Coordinate}
   * @private
   */
  this.measureTooltipOverlayCoord_ = null;


  /**
   * The sketch feature.
   * @type {ol.Feature}
   * @protected
   */
  this.sketchFeature = null;

  /**
   * Message to show after the first point is clicked.
   * @type {?Element}
   */
  this.continueMsg = null;

  /**
   * Defines the number of decimals to keep in the measurement. If not defined,
   * then the default behaviour occurs depending on the measure type.
   * @type {number|undefined}
   * @protected
   */
  this.decimals = options.decimals;

  /**
   * Defines the number of precision to keep in the measurement. If not defined,
   * then the default behaviour occurs depending on the measure type.
   * @type {number|undefined}
   * @protected
   */
  this.precision = options.precision;

  /**
   * Whether or not to display any tooltip
   * @type {boolean}
   * @private
   */
  this.displayHelpTooltip_ = options.displayHelpTooltip !== undefined ?
    options.displayHelpTooltip : true;

  /**
   * The message to show when user is about to start drawing.
   * @type {Element}
   */
  this.startMsg;
  if (options.startMsg !== undefined) {
    this.startMsg = options.startMsg;
  } else {
    this.startMsg = document.createElement('span');
    this.startMsg.textContent =  'Click to start drawing.';
  }

  /**
   * The key for geometry change event.
   * @type {?ol.EventsKey}
   * @private
   */
  this.changeEventKey_ = null;

  /**
   * The key for map postcompose event.
   * @type {?ol.EventsKey}
   * @private
   */
  this.postcomposeEventKey_ = null;

  const style = options.style !== undefined ? options.style : [
    new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      })
    }),
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'white',
        width: 5
      })
    }),
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 3
      })
    })
  ];

  /**
   * The vector layer used to show final measure features.
   * @type {ol.layer.Vector}
   * @private
   */
  this.vectorLayer_ = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style
  });

  /**
   * The draw interaction to be used.
   * @type {ol.interaction.Draw|ngeo.interaction.DrawAzimut|ngeo.interaction.MobileDraw}
   * @private
   */
  this.drawInteraction_ = this.createDrawInteraction(options.sketchStyle,
    this.vectorLayer_.getSource());

  /**
   * @type {boolean}
   * @private
   */
  this.shouldHandleDrawInteractionActiveChange_ = true;

  ol.events.listen(this.drawInteraction_,
    ol.Object.getChangeEventType(ol.interaction.Property.ACTIVE),
    this.handleDrawInteractionActiveChange_, this);
  ol.events.listen(this.drawInteraction_,
    ol.interaction.DrawEventType.DRAWSTART, this.onDrawStart_, this);
  ol.events.listen(this.drawInteraction_,
    ol.interaction.DrawEventType.DRAWEND, this.onDrawEnd_, this);

  ol.events.listen(this,
    ol.Object.getChangeEventType(ol.interaction.Property.ACTIVE),
    this.updateState_, this);
};
ol.inherits(ngeo.interaction.Measure, ol.interaction.Interaction);


/**
 * @const
 * @type {ol.Sphere}
 */
ngeo.interaction.Measure.SPHERE_WGS84 = new ol.Sphere(ol.proj.EPSG4326.RADIUS);


/**
 * Calculate the area of the passed polygon and return a formatted string
 * of the area.
 * @param {!ol.geom.Polygon} polygon Polygon.
 * @param {!ol.proj.Projection} projection Projection of the polygon coords.
 * @param {number|undefined} precision Precision.
 * @param {!ngeox.unitPrefix} format The format function.
 * @return {string} Formatted string of the area.
 * @export
 * @this {ngeo.interaction.Measure}
 */
ngeo.interaction.Measure.getFormattedArea = function(
  polygon, projection, precision, format) {
  const geom = /** @type {ol.geom.Polygon} */ (
    polygon.clone().transform(projection, 'EPSG:4326'));
  const coordinates = geom.getLinearRing(0).getCoordinates();
  const area = Math.abs(ngeo.interaction.Measure.SPHERE_WGS84.geodesicArea(coordinates));
  return format(area, 'm²', 'square', precision);
};


/**
 * Calculate the area of the passed circle and return a formatted string
 * of the area.
 * @param {!ol.geom.Circle} circle Circle
 * @param {number|undefined} precision Precision.
 * @param {!ngeox.unitPrefix} format The format function.
 * @return {string} Formatted string of the area.
 * @export
 */
ngeo.interaction.Measure.getFormattedCircleArea = function(
  circle, precision, format) {
  const area = Math.PI * Math.pow(circle.getRadius(), 2);
  return format(area, 'm²', 'square', precision);
};


/**
 * Calculate the length of the passed line string and return a formatted
 * string of the length.
 * @param {!ol.geom.LineString} lineString Line string.
 * @param {!ol.proj.Projection} projection Projection of the line string coords.
 * @param {number|undefined} precision Precision.
 * @param {!ngeox.unitPrefix} format The format function.
 * @return {string} Formatted string of length.
 * @export
 */
ngeo.interaction.Measure.getFormattedLength = function(lineString, projection,
  precision, format) {
  let length = 0;
  const coordinates = lineString.getCoordinates();
  for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
    const c1 = ol.proj.transform(coordinates[i], projection, 'EPSG:4326');
    const c2 = ol.proj.transform(coordinates[i + 1], projection, 'EPSG:4326');
    length += ngeo.interaction.Measure.SPHERE_WGS84.haversineDistance(c1, c2);
  }
  return format(length, 'm', 'unit', precision);
};


/**
 * Return a formatted string of the point.
 * @param {!ol.geom.Point} point Point.
 * @param {number|undefined} decimals Decimals.
 * @param {!ngeox.numberCoordinates} format A function to format coordinate into text
 * @param {string=} opt_template The template.
 * @return {string} Formatted string of coordinate.
 */
ngeo.interaction.Measure.getFormattedPoint = function(
  point, decimals, format, opt_template) {
  return format(point.getCoordinates(), decimals, opt_template);
};


/**
 * Handle map browser event.
 * @param {ol.MapBrowserEvent} evt Map browser event.
 * @return {boolean} `false` if event propagation should be stopped.
 * @this {ngeo.interaction.Measure}
 * @private
 */
ngeo.interaction.Measure.handleEvent_ = function(evt) {
  if (evt.type != ol.MapBrowserEventType.POINTERMOVE || evt.dragging) {
    return true;
  }

  let helpMsg = this.startMsg;
  if (this.sketchFeature !== null) {
    helpMsg = this.continueMsg;
  }

  if (this.displayHelpTooltip_) {
    ol.dom.removeChildren(this.helpTooltipElement_);
    this.helpTooltipElement_.appendChild(helpMsg);
    this.helpTooltipOverlay_.setPosition(evt.coordinate);
  }

  return true;
};


/**
 * @return {ol.interaction.Draw|ngeo.interaction.DrawAzimut|ngeo.interaction.MobileDraw} The draw interaction.
 * @export
 */
ngeo.interaction.Measure.prototype.getDrawInteraction = function() {
  return this.drawInteraction_;
};


/**
 * Creates the draw interaction.
 *
 * @abstract
 * @param {ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined}
 *     style The sketchStyle used for the drawing interaction.
 * @param {ol.source.Vector} source Vector source.
 * @return {ol.interaction.Draw|ngeo.interaction.DrawAzimut|ngeo.interaction.MobileDraw} The interaction
 * @protected
 */
ngeo.interaction.Measure.prototype.createDrawInteraction = function(style, source) {};


/**
 * @inheritDoc
 */
ngeo.interaction.Measure.prototype.setMap = function(map) {

  ol.interaction.Interaction.prototype.setMap.call(this, map);

  this.vectorLayer_.setMap(map);

  const prevMap = this.drawInteraction_.getMap();
  if (prevMap !== null) {
    prevMap.removeInteraction(this.drawInteraction_);
  }

  if (map !== null) {
    map.addInteraction(this.drawInteraction_);
  }
};


/**
 * Handle draw interaction `drawstart` event.
 * @param {ol.interaction.Draw.Event} evt Event.
 * @private
 */
ngeo.interaction.Measure.prototype.onDrawStart_ = function(evt) {
  this.sketchFeature = evt.feature;
  this.vectorLayer_.getSource().clear(true);
  this.createMeasureTooltip_();

  const geometry = this.sketchFeature.getGeometry();

  goog.asserts.assert(geometry !== undefined);
  this.changeEventKey_ = ol.events.listen(geometry, 'change', () => {
    this.handleMeasure((measure, coord) => {
      if (coord !== null) {
        this.measureTooltipElement_.innerHTML = measure;
        this.measureTooltipOverlayCoord_ = coord;
      }
    });
  });

  this.postcomposeEventKey_ = ol.events.listen(this.getMap(), 'postcompose', () => {
    this.measureTooltipOverlay_.setPosition(this.measureTooltipOverlayCoord_);
  });
};


/**
 * Handle draw interaction `drawend` event.
 * @param {ol.interaction.Draw.Event} evt Event.
 * @private
 */
ngeo.interaction.Measure.prototype.onDrawEnd_ = function(evt) {
  this.measureTooltipElement_.classList.add('ngeo-tooltip-static');
  this.measureTooltipOverlay_.setOffset([0, -7]);
  this.dispatchEvent(new ngeo.MeasureEvent(ngeo.MeasureEventType.MEASUREEND,
    this.sketchFeature));
  this.sketchFeature = null;
  this.unlistenerEvent_();
};

/**
 * Handle unlistener events for 'end of drawing' interaction
 * @private
 */
ngeo.interaction.Measure.prototype.unlistenerEvent_ = function() {
  if (this.changeEventKey_ !== null && this.postcomposeEventKey_ !== null) {
    ol.events.unlistenByKey(this.changeEventKey_);
    ol.events.unlistenByKey(this.postcomposeEventKey_);
    this.changeEventKey_ = null;
    this.postcomposeEventKey_ = null;
  }
};

/**
 * Creates a new help tooltip
 * @private
 */
ngeo.interaction.Measure.prototype.createHelpTooltip_ = function() {
  this.removeHelpTooltip_();
  if (this.displayHelpTooltip_) {
    this.helpTooltipElement_ = document.createElement('div');
    this.helpTooltipElement_.classList.add('tooltip');
    this.helpTooltipOverlay_ = new ol.Overlay({
      element: this.helpTooltipElement_,
      offset: [15, 0],
      positioning: 'center-left'
    });
    this.getMap().addOverlay(this.helpTooltipOverlay_);
  }
};


/**
 * Destroy the help tooltip
 * @private
 */
ngeo.interaction.Measure.prototype.removeHelpTooltip_ = function() {
  if (this.displayHelpTooltip_) {
    this.getMap().removeOverlay(this.helpTooltipOverlay_);
    if (this.helpTooltipElement_ !== null) {
      this.helpTooltipElement_.parentNode.removeChild(this.helpTooltipElement_);
    }
    this.helpTooltipElement_ = null;
    this.helpTooltipOverlay_ = null;
  }
};


/**
 * Creates a new measure tooltip
 * @private
 */
ngeo.interaction.Measure.prototype.createMeasureTooltip_ = function() {
  this.removeMeasureTooltip_();
  this.measureTooltipElement_ = document.createElement('div');
  this.measureTooltipElement_.classList.add('tooltip');
  this.measureTooltipElement_.classList.add('ngeo-tooltip-measure');
  this.measureTooltipOverlay_ = new ol.Overlay({
    element: this.measureTooltipElement_,
    offset: [0, -15],
    positioning: 'bottom-center',
    stopEvent: false
  });
  this.getMap().addOverlay(this.measureTooltipOverlay_);
};


/**
 * Destroy the help tooltip
 * @private
 */
ngeo.interaction.Measure.prototype.removeMeasureTooltip_ = function() {
  if (this.measureTooltipElement_ !== null) {
    this.measureTooltipElement_.parentNode.removeChild(this.measureTooltipElement_);
    this.measureTooltipElement_ = null;
    this.measureTooltipOverlay_ = null;
    this.measureTooltipOverlayCoord_ = null;
  }
};


/**
 * @private
 */
ngeo.interaction.Measure.prototype.updateState_ = function() {
  const active = this.getActive();
  this.shouldHandleDrawInteractionActiveChange_ = false;
  this.drawInteraction_.setActive(active);
  this.shouldHandleDrawInteractionActiveChange_ = true;
  if (!this.getMap()) {
    return;
  }
  if (active) {
    if (!this.measureTooltipOverlay_) {
      this.createMeasureTooltip_();
      this.createHelpTooltip_();
    }
  } else {
    this.vectorLayer_.getSource().clear(true);
    this.getMap().removeOverlay(this.measureTooltipOverlay_);
    this.removeMeasureTooltip_();
    this.removeHelpTooltip_();
    this.unlistenerEvent_();
  }
};


/**
 * Function implemented in inherited classes to compute measurement, determine
 * where to place the tooltip and determine which help message to display.
 *
 * @abstract
 * @param {function(string, ?ol.Coordinate)} callback The function
 *     to be called.
 * @protected
 */
ngeo.interaction.Measure.prototype.handleMeasure = function(callback) {};


/**
 * Get a reference to the tooltip element.
 * @return {Element} Tooltip Element.
 * @export
 */
ngeo.interaction.Measure.prototype.getTooltipElement = function() {
  return this.measureTooltipElement_;
};


/**
 * Called when the draw interaction `active` property changes. If the
 * change is due to something else than this measure interactino, then
 * update follow the its active state accordingly.
 *
 * @private
 */
ngeo.interaction.Measure.prototype.handleDrawInteractionActiveChange_ = function() {
  if (this.shouldHandleDrawInteractionActiveChange_) {
    this.setActive(this.drawInteraction_.getActive());
  }
};
