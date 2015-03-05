goog.provide('ngeo.MeasureEvent');
goog.provide('ngeo.MeasureEventType');
goog.provide('ngeo.interaction.Measure');

goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('ol.DrawEvent');
goog.require('ol.DrawEventType');
goog.require('ol.Feature');
goog.require('ol.FeatureOverlay');
goog.require('ol.MapBrowserEvent');
goog.require('ol.Observable');
goog.require('ol.Overlay');
goog.require('ol.interaction.Interaction');
goog.require('ol.style.Style');


/**
 * Interactions for measure tools base class.
 * @typedef {{
 *    startMsg: (Element|undefined),
 *    style:(ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined)
 * }}
 */
ngeo.interaction.MeasureBaseOptions;


/**
 * @enum {string}
 */
ngeo.MeasureEventType = {
  /**
   * Triggered upon feature draw end
   * @event ol.MeasureEvent#measureend
   */
  MEASUREEND: 'measureend'
};



/**
 * @classdesc
 * Events emitted by {@link ngeo.interaction.Interaction} instances are
 * instances of this type.
 *
 * @constructor
 * @extends {goog.events.Event}
 * @implements {ngeox.MeasureEvent}
 * @param {ngeo.MeasureEventType} type Type.
 * @param {ol.Feature} feature The feature drawn.
 */
ngeo.MeasureEvent = function(type, feature) {

  goog.base(this, type);

  /**
   * The feature being drawn.
   * @type {ol.Feature}
   * @api stable
   */
  this.feature = feature;

};
goog.inherits(ngeo.MeasureEvent, goog.events.Event);



/**
 * Interaction that allows measuring (length, area, ...).
 *
 * @constructor
 * @extends {ol.interaction.Interaction}
 * @param {ngeo.interaction.MeasureBaseOptions=} opt_options Options
 */
ngeo.interaction.Measure = function(opt_options) {

  var options = goog.isDef(opt_options) ? opt_options : {};

  goog.base(this, {
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
   * The sketch feature.
   * @type {ol.Feature}
   * @protected
   */
  this.sketchFeature = null;

  /**
   * The message to show when user is about to start drawing.
   * @type {Element}
   */
  this.startMsg = goog.isDef(options.startMsg) ? options.startMsg :
      goog.dom.createDom(goog.dom.TagName.SPAN, {}, 'Click to start drawing.');

  var style = goog.isDef(options.style) ? options.style :
      [
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
   * The draw overlay
   * @type {ol.FeatureOverlay}
   * @private
   */
  this.overlay_ = new ol.FeatureOverlay({
    style: style
  });


  /**
   * The draw interaction to be used.
   * @type {ol.interaction.Draw|ngeo.interaction.DrawAzimut}
   * @private
   */
  this.drawInteraction_ = this.getDrawInteraction(options.sketchStyle,
      this.overlay_);

  goog.events.listen(this.drawInteraction_, ol.DrawEventType.DRAWSTART,
      this.onDrawStart_, false, this);
  goog.events.listen(this.drawInteraction_, ol.DrawEventType.DRAWEND,
      this.onDrawEnd_, false, this);

  goog.events.listen(this,
      ol.Object.getChangeEventType(ol.interaction.InteractionProperty.ACTIVE),
      this.updateState_, false, this);
};
goog.inherits(ngeo.interaction.Measure, ol.interaction.Interaction);


/**
 * Handle map browser event.
 * @param {ol.MapBrowserEvent} evt Map browser event.
 * @return {boolean} `false` if event propagation should be stopped.
 * @this {ngeo.interaction.Measure}
 * @private
 */
ngeo.interaction.Measure.handleEvent_ = function(evt) {
  if (evt.type != ol.MapBrowserEvent.EventType.POINTERMOVE || evt.dragging) {
    return true;
  }

  var helpMsg = this.startMsg;
  if (!goog.isNull(this.sketchFeature)) {
    this.handleMeasure(goog.bind(function(measure, coord, helpMsg_) {
      if (!goog.isNull(coord)) {
        this.measureTooltipElement_.innerHTML = measure;
        this.measureTooltipOverlay_.setPosition(coord);
      }
      helpMsg = helpMsg_;
    }, this));
  }

  goog.dom.removeChildren(this.helpTooltipElement_);
  goog.dom.appendChild(this.helpTooltipElement_, helpMsg);
  this.helpTooltipOverlay_.setPosition(evt.coordinate);

  return true;
};


/**
 * Creates the draw interaction.
 * @param {ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined}
 *     style The sketchStyle used for the drawing interaction.
 * @param {ol.FeatureOverlay} overlay The feature overlay.
 * @return {ol.interaction.Draw|ngeo.interaction.DrawAzimut}
 * @protected
 */
ngeo.interaction.Measure.prototype.getDrawInteraction = goog.abstractMethod;


/**
 * @inheritDoc
 */
ngeo.interaction.Measure.prototype.setMap = function(map) {
  goog.base(this, 'setMap', map);

  this.overlay_.setMap(map);

  var prevMap = this.drawInteraction_.getMap();
  if (!goog.isNull(prevMap)) {
    prevMap.removeInteraction(this.drawInteraction_);
  }

  if (!goog.isNull(map)) {
    map.addInteraction(this.drawInteraction_);
  }
};


/**
 * Handle draw interaction `drawstart` event.
 * @param {ol.DrawEvent} evt
 * @private
 */
ngeo.interaction.Measure.prototype.onDrawStart_ = function(evt) {
  this.sketchFeature = evt.feature;
  this.overlay_.getFeatures().clear();
  this.createMeasureTooltip_();
};


/**
 * Handle draw interaction `drawend` event.
 * @param {ol.DrawEvent} evt
 * @private
 */
ngeo.interaction.Measure.prototype.onDrawEnd_ = function(evt) {
  goog.dom.classlist.add(this.measureTooltipElement_, 'tooltip-static');
  this.measureTooltipOverlay_.setOffset([0, -7]);
  this.sketchFeature = null;
  this.dispatchEvent(new ngeo.MeasureEvent(ngeo.MeasureEventType.MEASUREEND,
      this.sketchFeature));
};


/**
 * Creates a new help tooltip
 * @private
 */
ngeo.interaction.Measure.prototype.createHelpTooltip_ = function() {
  this.removeHelpTooltip_();
  this.helpTooltipElement_ = goog.dom.createDom(goog.dom.TagName.DIV);
  goog.dom.classlist.add(this.helpTooltipElement_, 'tooltip');
  this.helpTooltipOverlay_ = new ol.Overlay({
    element: this.helpTooltipElement_,
    offset: [15, 0],
    positioning: 'center-left'
  });
  this.getMap().addOverlay(this.helpTooltipOverlay_);
};


/**
 * Destroy the help tooltip
 * @private
 */
ngeo.interaction.Measure.prototype.removeHelpTooltip_ = function() {
  this.getMap().removeOverlay(this.helpTooltipOverlay_);
  if (!goog.isNull(this.helpTooltipElement_)) {
    this.helpTooltipElement_.parentNode.removeChild(this.helpTooltipElement_);
  }
  this.helpTooltipElement_ = null;
  this.helpTooltipOverlay_ = null;
};


/**
 * Creates a new measure tooltip
 * @private
 */
ngeo.interaction.Measure.prototype.createMeasureTooltip_ = function() {
  this.removeMeasureTooltip_();
  this.measureTooltipElement_ = goog.dom.createDom(goog.dom.TagName.DIV);
  goog.dom.classlist.addAll(this.measureTooltipElement_,
      ['tooltip', 'tooltip-measure']);
  this.measureTooltipOverlay_ = new ol.Overlay({
    element: this.measureTooltipElement_,
    offset: [0, -15],
    positioning: 'bottom-center'
  });
  this.getMap().addOverlay(this.measureTooltipOverlay_);
};


/**
 * Destroy the help tooltip
 * @private
 */
ngeo.interaction.Measure.prototype.removeMeasureTooltip_ = function() {
  if (!goog.isNull(this.measureTooltipElement_)) {
    this.measureTooltipElement_.parentNode.removeChild(
        this.measureTooltipElement_);
    this.measureTooltipElement_ = null;
    this.measureTooltipOverlay_ = null;
  }
};


/**
 * @private
 */
ngeo.interaction.Measure.prototype.updateState_ = function() {
  var active = this.getActive();
  this.drawInteraction_.setActive(active);
  if (!this.getMap()) {
    return;
  }
  if (active) {
    this.createMeasureTooltip_();
    this.createHelpTooltip_();
  } else {
    this.overlay_.getFeatures().clear();
    this.getMap().removeOverlay(this.measureTooltipOverlay_);
    this.removeMeasureTooltip_();
    this.removeHelpTooltip_();
  }
};


/**
 * Format measure output.
 * @param {ol.geom.LineString} line
 * @return {string}
 * @protected
 */
ngeo.interaction.Measure.prototype.formatLength = function(line) {
  var length = 0;
  var map = this.getMap();
  var sourceProj = map.getView().getProjection();
  var coordinates = line.getCoordinates();
  for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
    var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
    var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
    length += ol.sphere.WGS84.haversineDistance(c1, c2);
  }
  var output;
  if (length > 1000) {
    output = parseFloat((length / 1000).toPrecision(3)) +
        ' ' + 'km';
  } else {
    output = parseFloat(length.toPrecision(3)) +
        ' ' + 'm';
  }
  return output;
};


/**
 * Function implemented in inherited classes to compute measurement, determine
 * where to place the tooltip and determine which help message to display.
 * @param {function(string, ?ol.Coordinate, Element)} callback The function
 *     to be called.
 * @protected
 */
ngeo.interaction.Measure.prototype.handleMeasure = goog.abstractMethod;


/**
 * Get a reference to the tooltip element.
 * @return {Element}
 */
ngeo.interaction.Measure.prototype.getTooltipElement = function() {
  return this.measureTooltipElement_;
};
