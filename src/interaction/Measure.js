import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import * as olDom from 'ol/dom.js';
import * as olProj from 'ol/proj.js';
import olOverlay from 'ol/Overlay.js';
import * as olSphere from 'ol/sphere.js';
import * as olEvents from 'ol/events.js';
import olInteractionInteraction from 'ol/interaction/Interaction.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceVector from 'ol/source/Vector.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';

/**
 * Interactions for measure tools.
 *
 * @typedef {Object} MeasureOptions
 * @property {Element} [startMsg] Element including the message to display in the help tooltip when the user
 * just activated the interaction.
 * @property {Element} [continueMsg] Element including the message to display in the help tooltip when the
 * user already added the first point.
 * @property {number} [precision] Defines the number of digits to keep in the measurement. If not defined,
 * then the default behaviour occurs depending on the measure type.
 * @property {number} [decimals] Defines the number of decimals to keep in the measurement. If not defined,
 * then the default behaviour occurs depending on the measure type.
 * @property {number} [tolerance] Defines the tolerance.
 * @property {import("ol/style/Style.js").StyleLike} [style] The style to be used when
 * drawing is finished.
 * @property {import("ol/style/Style.js").StyleLike} [sketchStyle] The style to be used
 * while drawing.
 * @property {import('ol/source/Vector.js').default} [source] The source.
 */

/**
 * @typedef {Object} MeasureEventItem
 * @property {import("ol/Feature.js").default} feature
 */

/**
 * @typedef {import('ngeo/CustomEvent.js').default<MeasureEventItem>} MeasureEvent
 */

/**
 * Interaction that allows measuring (length, area, ...).
 * @private
 * @hidden
 */
class Measure extends olInteractionInteraction {
  /**
   * @param {import("ngeo/interaction/MeasureBaseOptions.js").MeasueBaseOptions=} options Options
   */
  constructor(options = {}) {
    super({
      handleEvent: handleEvent_,
    });

    /**
     * The help tooltip element.
     * @type {HTMLElement}
     * @private
     */
    this.helpTooltipElement_ = null;

    /**
     * Overlay to show the help messages.
     * @type {import("ol/Overlay.js").default}
     * @private
     */
    this.helpTooltipOverlay_ = null;

    /**
     * The measure tooltip element.
     * @type {HTMLElement}
     * @private
     */
    this.measureTooltipElement_ = null;

    /**
     * Overlay to show the measurement.
     * @type {import("ol/Overlay.js").default}
     * @private
     */
    this.measureTooltipOverlay_ = null;

    /**
     * The measurement overlay coordinate.
     * @type {import("ol/coordinate.js").Coordinate}
     * @private
     */
    this.measureTooltipOverlayCoord_ = null;

    /**
     * The sketch feature.
     * @type {import("ol/Feature.js").default}
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
    this.displayHelpTooltip_ = options.displayHelpTooltip !== undefined ? options.displayHelpTooltip : true;

    /**
     * The message to show when user is about to start drawing.
     * @type {Element}
     */
    this.startMsg;
    if (options.startMsg !== undefined) {
      this.startMsg = options.startMsg;
    } else {
      this.startMsg = document.createElement('span');
      this.startMsg.textContent = 'Click to start drawing.';
    }

    /**
     * The key for geometry change event.
     * @type {?import("ol/events.js").EventsKey}
     * @private
     */
    this.changeEventKey_ = null;

    /**
     * The key for map postcompose event.
     * @type {?import("ol/events.js").EventsKey}
     * @private
     */
    this.postcomposeEventKey_ = null;

    const style =
      options.style !== undefined
        ? options.style
        : [
            new olStyleStyle({
              fill: new olStyleFill({
                color: 'rgba(255, 255, 255, 0.2)',
              }),
            }),
            new olStyleStyle({
              stroke: new olStyleStroke({
                color: 'white',
                width: 5,
              }),
            }),
            new olStyleStyle({
              stroke: new olStyleStroke({
                color: '#ffcc33',
                width: 3,
              }),
            }),
          ];

    /**
     * The vector layer used to show final measure features.
     * @type {import("ol/layer/Vector.js").default}
     * @private
     */
    this.vectorLayer_ = new olLayerVector({
      source: new olSourceVector(),
      style: style,
    });

    /**
     * The draw interaction to be used.
     * @type {import("ol/interaction/Draw.js").default|import("ngeo/interaction/DrawAzimut.js").default|import("ngeo/interaction/MobileDraw.js").default}
     * @private
     */
    this.drawInteraction_ = this.createDrawInteraction(
      options.sketchStyle,
      /** @type {olSourceVector} */ (this.vectorLayer_.getSource())
    );

    /**
     * @type {boolean}
     * @private
     */
    this.shouldHandleDrawInteractionActiveChange_ = true;

    olEvents.listen(this.drawInteraction_, 'change:active', this.handleDrawInteractionActiveChange_, this);
    olEvents.listen(this.drawInteraction_, 'drawstart', this.onDrawStart_, this);
    olEvents.listen(this.drawInteraction_, 'drawend', this.onDrawEnd_, this);

    olEvents.listen(this, 'change:active', this.updateState_, this);
  }

  /**
   * @return {import("ol/interaction/Draw.js").default|import("ngeo/interaction/DrawAzimut.js").default|import("ngeo/interaction/MobileDraw.js").default}
   *    The draw interaction.
   */
  getDrawInteraction() {
    return this.drawInteraction_;
  }

  /**
   * Creates the draw interaction.
   *
   * @param {import("ol/style/Style.js").StyleLike|undefined}
   *     style The sketchStyle used for the drawing interaction.
   * @param {import("ol/source/Vector.js").default} source Vector source.
   * @return {import("ol/interaction/Draw.js").default|import("ngeo/interaction/DrawAzimut.js").default|import("ngeo/interaction/MobileDraw.js").default}
   *    The interaction
   */
  createDrawInteraction(style, source) {
    return undefined;
  }

  /**
   * @inheritDoc
   */
  setMap(map) {
    olInteractionInteraction.prototype.setMap.call(this, map);

    this.vectorLayer_.setMap(map);

    const prevMap = this.drawInteraction_.getMap();
    if (prevMap !== null) {
      prevMap.removeInteraction(this.drawInteraction_);
    }

    if (map !== null) {
      map.addInteraction(this.drawInteraction_);
    }
  }

  /**
   * Handle draw interaction `drawstart` event.
   * @param { import('ol/events/Event.js').default|import('ngeo/interaction/common.js').DrawEvent} evt Event.
   * @private
   */
  onDrawStart_(evt) {
    // @ts-ignore: evt should be of type {import('ol/interaction/Draw.js').DrawEvent but he is private
    this.sketchFeature = evt.feature || evt.detail.feature;
    /** @type {olSourceVector} */ (this.vectorLayer_.getSource()).clear(true);
    this.createMeasureTooltip_();

    const geometry = this.sketchFeature.getGeometry();

    console.assert(geometry !== undefined);
    this.changeEventKey_ = olEvents.listen(geometry, 'change', () => {
      this.handleMeasure((measure, coord) => {
        if (coord !== null) {
          this.measureTooltipElement_.innerHTML = measure;
          this.measureTooltipOverlayCoord_ = coord;
        }
      });
    });

    this.postcomposeEventKey_ = olEvents.listen(this.getMap(), 'postcompose', () => {
      this.measureTooltipOverlay_.setPosition(this.measureTooltipOverlayCoord_);
    });
  }

  /**
   * Handle draw interaction `drawend` event.
   * @param {import('ol/events/Event.js').default|import('ngeo/interaction/common.js').DrawEvent} evt Event.
   * @private
   */
  onDrawEnd_(evt) {
    this.measureTooltipElement_.classList.add('ngeo-tooltip-static');
    this.measureTooltipOverlay_.setOffset([0, -7]);
    /** @type {MeasureEvent} */
    const event = new ngeoCustomEvent('measureend', {feature: this.sketchFeature});
    this.dispatchEvent(event);
    this.sketchFeature = null;
    this.unlistenerEvent_();
  }

  /**
   * Handle unlistener events for 'end of drawing' interaction
   * @private
   */
  unlistenerEvent_() {
    if (this.changeEventKey_ !== null && this.postcomposeEventKey_ !== null) {
      olEvents.unlistenByKey(this.changeEventKey_);
      olEvents.unlistenByKey(this.postcomposeEventKey_);
      this.changeEventKey_ = null;
      this.postcomposeEventKey_ = null;
    }
  }

  /**
   * Creates a new help tooltip
   * @private
   */
  createHelpTooltip_() {
    this.removeHelpTooltip_();
    if (this.displayHelpTooltip_) {
      this.helpTooltipElement_ = document.createElement('div');
      this.helpTooltipElement_.classList.add('tooltip');
      this.helpTooltipOverlay_ = new olOverlay({
        element: this.helpTooltipElement_,
        offset: [15, 0],
        positioning: 'center-left',
      });
      this.getMap().addOverlay(this.helpTooltipOverlay_);
    }
  }

  /**
   * Destroy the help tooltip
   * @private
   */
  removeHelpTooltip_() {
    if (this.displayHelpTooltip_) {
      this.getMap().removeOverlay(this.helpTooltipOverlay_);
      if (this.helpTooltipElement_ !== null) {
        this.helpTooltipElement_.parentNode.removeChild(this.helpTooltipElement_);
      }
      this.helpTooltipElement_ = null;
      this.helpTooltipOverlay_ = null;
    }
  }

  /**
   * Creates a new measure tooltip
   * @private
   */
  createMeasureTooltip_() {
    this.removeMeasureTooltip_();
    this.measureTooltipElement_ = document.createElement('div');
    this.measureTooltipElement_.classList.add('tooltip');
    this.measureTooltipElement_.classList.add('ngeo-tooltip-measure');
    this.measureTooltipOverlay_ = new olOverlay({
      element: this.measureTooltipElement_,
      offset: [0, -15],
      positioning: 'bottom-center',
      stopEvent: false,
    });
    this.getMap().addOverlay(this.measureTooltipOverlay_);
  }

  /**
   * Destroy the help tooltip
   * @private
   */
  removeMeasureTooltip_() {
    if (this.measureTooltipElement_ !== null) {
      this.measureTooltipElement_.parentNode.removeChild(this.measureTooltipElement_);
      this.measureTooltipElement_ = null;
      this.measureTooltipOverlay_ = null;
      this.measureTooltipOverlayCoord_ = null;
    }
  }

  /**
   * @private
   */
  updateState_() {
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
      /** @type {olSourceVector} */ (this.vectorLayer_.getSource()).clear(true);
      this.getMap().removeOverlay(this.measureTooltipOverlay_);
      this.removeMeasureTooltip_();
      this.removeHelpTooltip_();
      this.unlistenerEvent_();
    }
  }

  /**
   * Function implemented in inherited classes to compute measurement, determine
   * where to place the tooltip and determine which help message to display.
   *
   * @param {function(string, ?import("ol/coordinate.js").Coordinate): void} callback The function
   *     to be called.
   */
  handleMeasure(callback) {}

  /**
   * Get a reference to the tooltip element.
   * @return {Element} Tooltip Element.
   */
  getTooltipElement() {
    return this.measureTooltipElement_;
  }

  /**
   * Called when the draw interaction `active` property changes. If the
   * change is due to something else than this measure interactino, then
   * update follow the its active state accordingly.
   *
   * @private
   */
  handleDrawInteractionActiveChange_() {
    if (this.shouldHandleDrawInteractionActiveChange_) {
      this.setActive(this.drawInteraction_.getActive());
    }
  }
}

/**
 * Calculate the area of the passed polygon and return a formatted string
 * of the area.
 * @param {!import("ol/geom/Polygon.js").default} polygon Polygon.
 * @param {!import("ol/proj/Projection.js").default} projection Projection of the polygon coords.
 * @param {number|undefined} precision Precision.
 * @param {!import('ngeo/misc/filters.js').unitPrefix} format The format function.
 * @return {string} Formatted string of the area.
 * @hidden
 */
export function getFormattedArea(polygon, projection, precision, format) {
  const geom = /** @type {import("ol/geom/Polygon.js").default} */ (
    polygon.clone().transform(projection, 'EPSG:4326')
  );
  const area = Math.abs(olSphere.getArea(geom, {'projection': 'EPSG:4326'}));
  return format(area, 'm²', 'square', precision);
}

/**
 * Calculate the area of the passed circle and return a formatted string of the area.
 * @param {!import("ol/geom/Circle.js").default} circle Circle
 * @param {number|undefined} precision Precision.
 * @param {!import('ngeo/misc/filters.js').unitPrefix} format The format function.
 * @return {string} Formatted string of the area.
 * @hidden
 */
export function getFormattedCircleArea(circle, precision, format) {
  const area = Math.PI * Math.pow(circle.getRadius(), 2);
  return format(area, 'm²', 'square', precision);
}

/**
 * Calculate the length of the passed line string and return a formatted
 * string of the length.
 * @param {!import("ol/geom/LineString.js").default} lineString Line string.
 * @param {!import("ol/proj/Projection.js").default} projection Projection of the line string coords.
 * @param {number|undefined} precision Precision.
 * @param {!import('ngeo/misc/filters.js').unitPrefix} format The format function.
 * @return {string} Formatted string of length.
 * @hidden
 */
export function getFormattedLength(lineString, projection, precision, format) {
  let length = 0;
  const coordinates = lineString.getCoordinates();
  for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
    const c1 = olProj.transform(coordinates[i], projection, 'EPSG:4326');
    const c2 = olProj.transform(coordinates[i + 1], projection, 'EPSG:4326');
    length += olSphere.getDistance(c1, c2);
  }
  return format(length, 'm', 'unit', precision);
}

/**
 * Return a formatted string of the point.
 * @param {!import("ol/geom/Point.js").default} point Point.
 * @param {number|undefined} decimals Decimals.
 * @param {!import('ngeo/misc/filters.js').numberCoordinates} format A function to format coordinate into
 * text
 * @param {string=} opt_template The template.
 * @return {string} Formatted string of coordinate.
 * @hidden
 */
export function getFormattedPoint(point, decimals, format, opt_template) {
  return format(point.getCoordinates(), decimals, opt_template);
}

/**
 * Handle map browser event.
 * @param {import("ol/MapBrowserEvent.js").default} evt Map browser event.
 * @return {boolean} `false` if event propagation should be stopped.
 * @private
 * @hidden
 */
function handleEvent_(evt) {
  if (evt.type != 'pointermove' || evt.dragging) {
    return true;
  }

  const helpMsg = this.sketchFeature === null ? this.startMsg : this.continueMsg;

  if (this.displayHelpTooltip_) {
    olDom.removeChildren(this.helpTooltipElement_);
    this.helpTooltipElement_.appendChild(helpMsg);
    this.helpTooltipOverlay_.setPosition(evt.coordinate);
  }

  return true;
}

export default Measure;
