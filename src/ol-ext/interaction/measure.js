goog.provide('ngeo.MeasureEvent');
goog.provide('ngeo.MeasureEventType');
goog.provide('ngeo.interaction.Measure');

goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('ol.Feature');
goog.require('ol.MapBrowserEvent');
goog.require('ol.Overlay');
goog.require('ol.events');
goog.require('ol.interaction.DrawEvent');
goog.require('ol.interaction.DrawEventType');
goog.require('ol.interaction.Interaction');
goog.require('ol.layer.Vector');
goog.require('ol.source.Vector');
goog.require('ol.sphere.WGS84');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
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
   * @event ngeo.MeasureEvent#measureend
   */
  MEASUREEND: 'measureend'
};


/**
 * @classdesc
 * Events emitted by {@link ngeo.interaction.Interaction} instances are
 * instances of this type.
 *
 * @constructor
 * @extends {ol.events.Event}
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
goog.inherits(ngeo.MeasureEvent, ol.events.Event);


/**
 * Interaction that allows measuring (length, area, ...).
 *
 * @constructor
 * @extends {ol.interaction.Interaction}
 * @param {ngeo.interaction.MeasureBaseOptions=} opt_options Options
 */
ngeo.interaction.Measure = function(opt_options) {

  var options = opt_options !== undefined ? opt_options : {};

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
   * Message to show after the first point is clicked.
   * @type {?Element}
   */
  this.continueMsg = null;

  /**
   * Defines the number of decimals to keep in the measurement. If not defined,
   * then the default behaviour occurs depending on the measure type.
   * @type {?number}
   * @protected
   */
  this.decimals = options.decimals !== undefined ? options.decimals : null;

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
  this.startMsg = options.startMsg !== undefined ? options.startMsg :
      goog.dom.createDom(goog.dom.TagName.SPAN, {}, 'Click to start drawing.');

  /**
   * The key for geometry change event.
   * @type {?ol.events.Key}
   * @private
   */
  this.changeEventKey_ = null;

  var style = options.style !== undefined ? options.style :
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
   * The vector layer used to show final measure features.
   * @type {ol.layer.Vector}
   * @private
   */
  this.vectorLayer_ = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: style
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
      ol.Object.getChangeEventType(ol.interaction.InteractionProperty.ACTIVE),
      this.handleDrawInteractionActiveChange_, this);
  ol.events.listen(this.drawInteraction_,
      ol.interaction.DrawEventType.DRAWSTART, this.onDrawStart_, this);
  ol.events.listen(this.drawInteraction_,
      ol.interaction.DrawEventType.DRAWEND, this.onDrawEnd_, this);

  ol.events.listen(this,
      ol.Object.getChangeEventType(ol.interaction.InteractionProperty.ACTIVE),
      this.updateState_, this);
};
goog.inherits(ngeo.interaction.Measure, ol.interaction.Interaction);


/**
 * Calculate the area of the passed polygon and return a formatted string
 * of the area.
 * @param {ol.geom.Polygon} polygon Polygon.
 * @param {ol.proj.Projection} projection Projection of the polygon coords.
 * @param {?number} decimals Decimals.
 * @return {string} Formatted string of the area.
 */
ngeo.interaction.Measure.getFormattedArea = function(
    polygon, projection, decimals) {
  var geom = /** @type {ol.geom.Polygon} */ (
      polygon.clone().transform(projection, 'EPSG:4326'));
  var coordinates = geom.getLinearRing(0).getCoordinates();
  var area = Math.abs(ol.sphere.WGS84.geodesicArea(coordinates));
  var output;
  if (area > 1000000) {
    if (decimals !== null) {
      output = goog.string.padNumber(area / 1000000, 0, decimals);
    } else {
      output = parseFloat((area / 1000000).toPrecision(3));
    }
    output += ' ' + 'km<sup>2</sup>';
  } else {
    if (decimals !== null) {
      output = goog.string.padNumber(area, 0, decimals);
    } else {
      output = parseFloat(area.toPrecision(3));
    }
    output += ' ' + 'm<sup>2</sup>';
  }
  return output;
};


/**
 * Calculate the length of the passed line string and return a formatted
 * string of the length.
 * @param {ol.geom.LineString} lineString Line string.
 * @param {ol.proj.Projection} projection Projection of the line string coords.
 * @param {?number} decimals Decimals.
 * @return {string} Formatted string of length.
 */
ngeo.interaction.Measure.getFormattedLength = function(lineString, projection,
    decimals) {
  var length = 0;
  var coordinates = lineString.getCoordinates();
  for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
    var c1 = ol.proj.transform(coordinates[i], projection, 'EPSG:4326');
    var c2 = ol.proj.transform(coordinates[i + 1], projection, 'EPSG:4326');
    length += ol.sphere.WGS84.haversineDistance(c1, c2);
  }
  var output;
  if (length > 1000) {
    if (decimals !== null) {
      output = goog.string.padNumber(length / 1000, 0, decimals);
    } else {
      output = parseFloat((length / 1000).toPrecision(3));
    }
    output += ' ' + 'km';
  } else {
    if (decimals !== null) {
      output = goog.string.padNumber(length, 0, decimals);
    } else {
      output = parseFloat(length.toPrecision(3));
    }
    output += ' ' + 'm';
  }
  return output;
};


/**
 * Return a formatted string of the point.
 * @param {ol.geom.Point} point Point.
 * @param {ol.proj.Projection} projection Projection of the line string coords.
 * @param {?number} decimals Decimals.
 * @return {string} Formatted string of coordinate.
 */
ngeo.interaction.Measure.getFormattedPoint = function(
    point, projection, decimals) {
  var coordinates = point.getCoordinates();
  var x = coordinates[0];
  var y = coordinates[1];
  decimals = decimals !== null ? decimals : 0;
  x = goog.string.padNumber(x, 0, decimals);
  y = goog.string.padNumber(y, 0, decimals);
  return ['X: ', x, ', Y: ', y].join('');
};


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
  if (this.sketchFeature !== null) {
    helpMsg = this.continueMsg;
  }

  if (this.displayHelpTooltip_) {
    goog.dom.removeChildren(this.helpTooltipElement_);
    goog.dom.appendChild(this.helpTooltipElement_, helpMsg);
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
 * @param {ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined}
 *     style The sketchStyle used for the drawing interaction.
 * @param {ol.source.Vector} source Vector source.
 * @return {ol.interaction.Draw|ngeo.interaction.DrawAzimut|ngeo.interaction.MobileDraw}
 * @protected
 */
ngeo.interaction.Measure.prototype.createDrawInteraction = goog.abstractMethod;


/**
 * @inheritDoc
 */
ngeo.interaction.Measure.prototype.setMap = function(map) {
  goog.base(this, 'setMap', map);

  this.vectorLayer_.setMap(map);

  var prevMap = this.drawInteraction_.getMap();
  if (prevMap !== null) {
    prevMap.removeInteraction(this.drawInteraction_);
  }

  if (map !== null) {
    map.addInteraction(this.drawInteraction_);
  }
};


/**
 * Handle draw interaction `drawstart` event.
 * @param {ol.interaction.DrawEvent} evt Event.
 * @private
 */
ngeo.interaction.Measure.prototype.onDrawStart_ = function(evt) {
  this.sketchFeature = evt.feature;
  this.vectorLayer_.getSource().clear(true);
  this.createMeasureTooltip_();

  var geometry = this.sketchFeature.getGeometry();

  goog.asserts.assert(geometry !== undefined);
  this.changeEventKey_ = ol.events.listen(geometry,
      ol.events.EventType.CHANGE,
      function() {
        this.handleMeasure(function(measure, coord) {
          if (coord !== null) {
            this.measureTooltipElement_.innerHTML = measure;
            this.measureTooltipOverlay_.setPosition(coord);
          }
        }.bind(this));
      }, this);
};


/**
 * Handle draw interaction `drawend` event.
 * @param {ol.interaction.DrawEvent} evt Event.
 * @private
 */
ngeo.interaction.Measure.prototype.onDrawEnd_ = function(evt) {
  goog.dom.classlist.add(this.measureTooltipElement_, 'tooltip-static');
  this.measureTooltipOverlay_.setOffset([0, -7]);
  this.dispatchEvent(new ngeo.MeasureEvent(ngeo.MeasureEventType.MEASUREEND,
      this.sketchFeature));
  this.sketchFeature = null;
  if (this.changeEventKey_ !== null) {
    ol.events.unlistenByKey(this.changeEventKey_);
  }
};


/**
 * Creates a new help tooltip
 * @private
 */
ngeo.interaction.Measure.prototype.createHelpTooltip_ = function() {
  this.removeHelpTooltip_();
  if (this.displayHelpTooltip_) {
    this.helpTooltipElement_ = goog.dom.createDom(goog.dom.TagName.DIV);
    goog.dom.classlist.add(this.helpTooltipElement_, 'tooltip');
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
  this.measureTooltipElement_ = goog.dom.createDom(goog.dom.TagName.DIV);
  goog.dom.classlist.addAll(this.measureTooltipElement_,
      ['tooltip', 'tooltip-measure']);
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
  }
};


/**
 * Function implemented in inherited classes to compute measurement, determine
 * where to place the tooltip and determine which help message to display.
 * @param {function(string, ?ol.Coordinate)} callback The function
 *     to be called.
 * @protected
 */
ngeo.interaction.Measure.prototype.handleMeasure = goog.abstractMethod;


/**
 * Get a reference to the tooltip element.
 * @return {Element} Tooltip Element.
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
ngeo.interaction.Measure.prototype.handleDrawInteractionActiveChange_ =
    function() {
      if (this.shouldHandleDrawInteractionActiveChange_) {
        this.setActive(this.drawInteraction_.getActive());
      }
    };
