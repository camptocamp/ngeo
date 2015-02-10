goog.provide('ngeo.interaction');
goog.provide('ngeo.interaction.Measure');

goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('ol.DrawEvent');
goog.require('ol.Feature');
goog.require('ol.FeatureOverlay');
goog.require('ol.MapBrowserEvent');
goog.require('ol.Observable');
goog.require('ol.Overlay');
goog.require('ol.interaction.Pointer');
goog.require('ol.style.Style');


/**
 * Interactions for measure tools base class.
 * @typedef {{
 *    startMsg: (string|undefined),
 *    style:(ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined)
 * }}
 */
ngeo.interaction.MeasureBaseOptions;



/**
 * Interaction that allows measuring (length, area, ...).
 *
 * @constructor
 * @extends {ol.interaction.Pointer}
 * @param {ngeo.interaction.MeasureBaseOptions=} opt_options Options
 */
ngeo.interaction.Measure = function(opt_options) {

  var options = goog.isDef(opt_options) ? opt_options : {};

  goog.base(this, {
    handleMoveEvent: this.handlePointerMoveEvent_
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
  this.helpTooltip_ = null;


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
  this.measureTooltip_ = null;


  /**
   * The sketch feature.
   * @type {ol.Feature}
   * @protected
   */
  this.sketchFeature = null;

  /**
   * The message to show when user is about to start drawing.
   * @type {string}
   */
  this.startMsg = goog.isDef(options.startMsg) ? options.startMsg :
      'Click to start drawing';

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
  this.drawInteraction_ = this.getDrawInteraction(style, this.overlay_);

  goog.events.listen(this,
      ol.Object.getChangeEventType(ol.interaction.InteractionProperty.ACTIVE),
      this.updateState_, false, this);
};
goog.inherits(ngeo.interaction.Measure, ol.interaction.Pointer);


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
  if (goog.isNull(map)) {
    var prevMap = this.drawInteraction_.getMap();
    if (!goog.isNull(prevMap)) {
      prevMap.removeInteraction(this.drawInteraction_);
    }
  } else {
    map.addInteraction(this.drawInteraction_);

    this.drawInteraction_.on('drawstart', goog.bind(this.onDrawStart_, this));
    this.drawInteraction_.on('drawend', goog.bind(this.onDrawEnd_, this));
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
  this.measureTooltip_.setOffset([0, -7]);
  this.sketchFeature = null;
};


/**
 * Creates a new help tooltip
 * @private
 */
ngeo.interaction.Measure.prototype.createHelpTooltip_ = function() {
  this.removeHelpTooltip_();
  this.helpTooltipElement_ = goog.dom.createDom(goog.dom.TagName.DIV);
  goog.dom.classlist.add(this.helpTooltipElement_, 'tooltip');
  this.helpTooltip_ = new ol.Overlay({
    element: this.helpTooltipElement_,
    offset: [15, 0],
    positioning: 'center-left'
  });
  this.getMap().addOverlay(this.helpTooltip_);
};


/**
 * Destroy the help tooltip
 * @private
 */
ngeo.interaction.Measure.prototype.removeHelpTooltip_ = function() {
  this.getMap().removeOverlay(this.helpTooltip_);
  if (!goog.isNull(this.helpTooltipElement_)) {
    this.helpTooltipElement_.parentNode.removeChild(this.helpTooltipElement_);
  }
  this.helpTooltipElement_ = null;
  this.helpTooltip_ = null;
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
  this.measureTooltip_ = new ol.Overlay({
    element: this.measureTooltipElement_,
    offset: [0, -15],
    positioning: 'bottom-center'
  });
  this.getMap().addOverlay(this.measureTooltip_);
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
    this.measureTooltip_ = null;
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
    this.getMap().removeOverlay(this.measureTooltip_);
    this.removeMeasureTooltip_();
    this.removeHelpTooltip_();
  }
};


/**
 * Handle pointer move.
 * @param {ol.MapBrowserEvent} evt
 * @private
 */
ngeo.interaction.Measure.prototype.handlePointerMoveEvent_ = function(evt) {
  if (evt.dragging) {
    return;
  }

  var helpMsg = this.startMsg;
  if (!goog.isNull(this.sketchFeature)) {
    this.handleMeasure(goog.bind(function(measure, coord, helpMsg_) {
      if (!goog.isNull(coord)) {
        this.measureTooltipElement_.innerHTML = measure;
        this.measureTooltip_.setPosition(coord);
      }
      helpMsg = helpMsg_;
    }, this));
  }

  this.helpTooltipElement_.innerHTML = helpMsg;
  this.helpTooltip_.setPosition(evt.coordinate);
};


/**
 * Function implemented in inherited classes to compute measurement, determine
 * where to place the tooltip and determine which help message to display.
 * @param {function(string, ?ol.Coordinate, string)} callback The function
 * to be called.
 * @protected
 */
ngeo.interaction.Measure.prototype.handleMeasure = goog.abstractMethod;
