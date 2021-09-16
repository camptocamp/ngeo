// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import ngeoCustomEvent from 'ngeo/CustomEvent';
import {removeChildren} from 'ol/dom';
import {transform} from 'ol/proj';
import olOverlay from 'ol/Overlay';
import {getArea, getDistance} from 'ol/sphere';
import {listen, unlistenByKey} from 'ol/events';
import olInteractionInteraction from 'ol/interaction/Interaction';
import olLayerVector from 'ol/layer/Vector';
import olSourceVector from 'ol/source/Vector';
import olStyleFill from 'ol/style/Fill';
import olStyleStroke from 'ol/style/Stroke';
import olStyleStyle from 'ol/style/Style';
import VectorSource from 'ol/source/Vector';

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
 * @property {import('ol/style/Style').StyleLike} [style] The style to be used when
 * drawing is finished.
 * @property {import('ol/style/Style').StyleLike} [sketchStyle] The style to be used
 * while drawing.
 * @property {import('ol/source/Vector').default<unknown>} [source] The source.
 */

/**
 * @typedef {Object} MeasureEventItem
 * @property {import('ol/Feature').default<import('ol/geom/Geometry').default>} feature
 */

/**
 * @typedef {import('ngeo/CustomEvent').default<MeasureEventItem>} MeasureEvent
 */

/**
 * Interaction that allows measuring (length, area, ...).
 *
 * @private
 * @hidden
 */
class Measure extends olInteractionInteraction {
  /**
   * @param {import('ngeo/interaction/MeasureBaseOptions').MeasueBaseOptions} [options] Options
   */
  constructor(options = {}) {
    super({
      handleEvent: handleEvent_,
    });

    /**
     * The help tooltip element.
     *
     * @type {?HTMLElement}
     */
    this.helpTooltipElement_ = null;

    /**
     * Overlay to show the help messages.
     *
     * @type {?import('ol/Overlay').default}
     */
    this.helpTooltipOverlay_ = null;

    /**
     * The measure tooltip element.
     *
     * @type {?HTMLElement}
     * @private
     */
    this.measureTooltipElement_ = null;

    /**
     * Overlay to show the measurement.
     *
     * @type {?import('ol/Overlay').default}
     * @private
     */
    this.measureTooltipOverlay_ = null;

    /**
     * The measurement overlay coordinate.
     *
     * @type {?import('ol/coordinate').Coordinate}
     * @private
     */
    this.measureTooltipOverlayCoord_ = null;

    /**
     * The sketch feature.
     *
     * @type {?import('ol/Feature').default<import('ol/geom/Geometry').default>}
     */
    this.sketchFeature = null;

    /**
     * Message to show after the first point is clicked.
     *
     * @type {?Element}
     */
    this.continueMsg = null;

    /**
     * Defines the number of decimals to keep in the measurement. If not defined,
     * then the default behaviour occurs depending on the measure type.
     *
     * @type {number|undefined}
     * @protected
     */
    this.decimals = options.decimals;

    /**
     * Defines the number of precision to keep in the measurement. If not defined,
     * then the default behaviour occurs depending on the measure type.
     *
     * @type {number|undefined}
     * @protected
     */
    this.precision = options.precision;

    /**
     * Whether or not to display any tooltip
     *
     * @type {boolean}
     */
    this.displayHelpTooltip_ = options.displayHelpTooltip !== undefined ? options.displayHelpTooltip : true;

    let startMsg;
    if (options.startMsg !== undefined) {
      startMsg = options.startMsg;
    } else {
      startMsg = document.createElement('span');
      startMsg.textContent = 'Click to start drawing.';
    }
    /**
     * The message to show when user is about to start drawing.
     *
     * @type {Element}
     */
    this.startMsg = startMsg;

    /**
     * The key for geometry change event.
     *
     * @type {?import('ol/events').EventsKey}
     * @private
     */
    this.changeEventKey_ = null;

    /**
     * The key for map postcompose event.
     *
     * @type {?import('ol/events').EventsKey}
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
     *
     * @type {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
     * @private
     */
    this.vectorLayer_ =
      options.layer !== undefined
        ? options.layer
        : new olLayerVector({
            source: new olSourceVector(),
            style: style,
          });

    const source = this.vectorLayer_.getSource();
    if (!(source instanceof VectorSource)) {
      throw new Error('Missing source');
    }
    const drawInteraction = this.createDrawInteraction(options.sketchStyle, source);
    if (!drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    /**
     * The draw interaction to be used.
     *
     * @type {import('ol/interaction/Draw').default|import('ngeo/interaction/DrawAzimut').default|import('ngeo/interaction/MobileDraw').default}
     * @private
     */
    this.drawInteraction_ = drawInteraction;

    /**
     * @type {boolean}
     * @private
     */
    this.shouldHandleDrawInteractionActiveChange_ = true;

    listen(this.drawInteraction_, 'change:active', this.handleDrawInteractionActiveChange_, this);
    listen(
      this.drawInteraction_,
      'drawstart',
      /** @type {import('ol/events').ListenerFunction} */ (this.onDrawStart_),
      this
    );
    listen(this.drawInteraction_, 'drawend', this.onDrawEnd_, this);
    listen(this, 'change:active', this.updateState_, this);
  }

  /**
   * @returns {import('ol/interaction/Draw').default|import('ngeo/interaction/DrawAzimut').default|import('ngeo/interaction/MobileDraw').default}
   *    The draw interaction.
   */
  getDrawInteraction() {
    return this.drawInteraction_;
  }

  /**
   * Creates the draw interaction.
   *
   * @param {import('ol/style/Style').StyleLike} style The sketchStyle used for the drawing
   *    interaction.
   * @param {VectorSource<import('ol/geom/Geometry').default>} source Vector source.
   * @returns {?import('ol/interaction/Draw').default|import('ngeo/interaction/DrawAzimut').default|import('ngeo/interaction/MobileDraw').default}
   *    The interaction
   */
  createDrawInteraction(style, source) {
    return null;
  }

  /**
   * @param {import('ol/PluggableMap').default} map Map.
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
   *
   * @param {import('lib/ol.interaction.Draw').DrawEvent|import('ngeo/CustomEvent').default<import('lib/ol.interaction.Draw').DrawEvent>} evt Event.
   * @private
   */
  onDrawStart_(evt) {
    /** @type {import('lib/ol.interaction.Draw').DrawEvent} */
    // @ts-ignore
    const event = evt.detail ? evt.detail : evt;
    this.sketchFeature = event.feature;
    const source = this.vectorLayer_.getSource();
    if (!(source instanceof VectorSource)) {
      throw new Error('Missing source');
    }
    source.clear(true);
    this.createMeasureTooltip_();

    if (!this.sketchFeature) {
      throw new Error('Missing sketchFeature');
    }
    const geometry = this.sketchFeature.getGeometry();
    if (!geometry) {
      throw new Error('Missing geometry');
    }

    this.changeEventKey_ = listen(
      geometry,
      'change',
      /** @type {import('ol/events').ListenerFunction} */
      (evt) => {
        this.handleMeasure((measure, coord) => {
          if (coord !== null) {
            if (!this.measureTooltipElement_) {
              throw new Error('Missing measureTooltipElement');
            }
            this.measureTooltipElement_.innerHTML = measure;
            this.measureTooltipOverlayCoord_ = coord;
          }
        });
      }
    );

    this.postcomposeEventKey_ = listen(
      this.getMap(),
      'postcompose',
      /** @type {import('ol/events').ListenerFunction} */
      () => {
        if (this.measureTooltipOverlay_ && this.measureTooltipOverlayCoord_) {
          this.measureTooltipOverlay_.setPosition(this.measureTooltipOverlayCoord_);
        }
      }
    );
  }

  /**
   * Handle draw interaction `drawend` event.
   *
   * @param {Event|import('ol/events/Event').default|import('ngeo/interaction/common').DrawEvent} evt Event.
   * @private
   */
  onDrawEnd_(evt) {
    if (!this.measureTooltipElement_) {
      throw new Error('Missing measureTooltipElement');
    }
    if (!this.measureTooltipOverlay_) {
      throw new Error('Missing measureTooltipOverlay');
    }
    if (!this.sketchFeature) {
      throw new Error('Missing sketchFeature');
    }
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
   *
   * @private
   */
  unlistenerEvent_() {
    if (this.changeEventKey_ !== null && this.postcomposeEventKey_ !== null) {
      unlistenByKey(this.changeEventKey_);
      unlistenByKey(this.postcomposeEventKey_);
      this.changeEventKey_ = null;
      this.postcomposeEventKey_ = null;
    }
  }

  /**
   * Creates a new help tooltip
   *
   * @private
   */
  createHelpTooltip_() {
    this.removeHelpTooltip_();
    if (this.displayHelpTooltip_) {
      this.helpTooltipElement_ = document.createElement('div');
      this.helpTooltipElement_.classList.add('tooltip');
      this.helpTooltipOverlay_ = new olOverlay({
        stopEvent: false,
        element: this.helpTooltipElement_,
        offset: [15, 0],
        positioning: 'center-left',
      });
      this.getMap().addOverlay(this.helpTooltipOverlay_);
    }
  }

  /**
   * Destroy the help tooltip
   *
   * @private
   */
  removeHelpTooltip_() {
    if (this.displayHelpTooltip_) {
      if (this.helpTooltipOverlay_ !== null) {
        this.getMap().removeOverlay(this.helpTooltipOverlay_);
        this.helpTooltipOverlay_ = null;
      }
      if (this.helpTooltipElement_ !== null) {
        if (this.helpTooltipElement_.parentNode) {
          this.helpTooltipElement_.parentNode.removeChild(this.helpTooltipElement_);
        }
        this.helpTooltipElement_ = null;
      }
    }
  }

  /**
   * Creates a new measure tooltip
   *
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
   *
   * @private
   */
  removeMeasureTooltip_() {
    if (this.measureTooltipElement_ !== null) {
      if (!this.measureTooltipElement_.parentNode) {
        throw new Error('Missing measureTooltipElement_.parentNode');
      }
      this.measureTooltipElement_.parentNode.removeChild(this.measureTooltipElement_);
      this.measureTooltipElement_ = null;
      this.measureTooltipOverlay_ = null;
      this.measureTooltipOverlayCoord_ = null;
    }
  }

  /**
   * @param {Event|import('ol/events/Event').default} evt
   * @private
   */
  updateState_(evt) {
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
      if (!this.measureTooltipOverlay_) {
        throw new Error('Missing measureTooltipOverlay');
      }
      const source = this.vectorLayer_.getSource();
      if (!(source instanceof VectorSource)) {
        throw new Error('Missing measureTooltipOverlay');
      }
      source.clear(true);
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
   * @param {function(string, ?import('ol/coordinate').Coordinate): void} callback The function
   *     to be called.
   */
  handleMeasure(callback) {}

  /**
   * Get a reference to the tooltip element.
   *
   * @returns {Element} Tooltip Element.
   */
  getTooltipElement() {
    if (!this.measureTooltipElement_) {
      throw new Error('Missing measureTooltipElement');
    }
    return this.measureTooltipElement_;
  }

  /**
   * Called when the draw interaction `active` property changes. If the
   * change is due to something else than this measure interactino, then
   * update follow the its active state accordingly.
   *
   * @param {Event|import('ol/events/Event').default} evt
   * @private
   */
  handleDrawInteractionActiveChange_(evt) {
    if (this.shouldHandleDrawInteractionActiveChange_) {
      this.setActive(this.drawInteraction_.getActive());
    }
  }
}

/**
 * Calculate the area of the passed polygon and return a formatted string
 * of the area.
 *
 * @param {import('ol/geom/Polygon').default} polygon Polygon.
 * @param {import('ol/proj/Projection').default} projection Projection of the polygon coords.
 * @param {number|undefined} precision Precision.
 * @param {import('ngeo/misc/filters').unitPrefix} format The format function.
 * @param {boolean} [spherical=false] Whether to use the spherical area.
 * @returns {string} Formatted string of the area.
 * @hidden
 */
export function getFormattedArea(polygon, projection, precision, format, spherical = false) {
  let area;
  if (spherical) {
    const geom = /** @type {import('ol/geom/Polygon').default} */ (
      polygon.clone().transform(projection, 'EPSG:4326')
    );
    area = Math.abs(getArea(geom, {'projection': 'EPSG:4326'}));
  } else {
    area = polygon.getArea();
  }
  return format(area, 'm²', 'square', precision);
}

/**
 * Calculate the area of the passed circle and return a formatted string of the area.
 *
 * @param {import('ol/geom/Circle').default} circle Circle
 * @param {number|undefined} precision Precision.
 * @param {import('ngeo/misc/filters').unitPrefix} format The format function.
 * @returns {string} Formatted string of the area.
 * @hidden
 */
export function getFormattedCircleArea(circle, precision, format) {
  const area = Math.PI * Math.pow(circle.getRadius(), 2);
  return format(area, 'm²', 'square', precision);
}

/**
 * Calculate the length of the passed line string and return a formatted
 * string of the length.
 *
 * @param {import('ol/geom/LineString').default} lineString Line string.
 * @param {import('ol/proj/Projection').default} projection Projection of the line string coords.
 * @param {number|undefined} precision Precision.
 * @param {import('ngeo/misc/filters').unitPrefix} format The format function.
 * @param {boolean} [spherical=false] Whether to use the spherical distance.
 * @returns {string} Formatted string of length.
 * @hidden
 */
export function getFormattedLength(lineString, projection, precision, format, spherical = false) {
  let length = 0;
  if (spherical) {
    const coordinates = lineString.getCoordinates();
    for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
      const c1 = transform(coordinates[i], projection, 'EPSG:4326');
      const c2 = transform(coordinates[i + 1], projection, 'EPSG:4326');
      length += getDistance(c1, c2);
    }
  } else {
    length = lineString.getLength();
  }
  return format(length, 'm', 'unit', precision);
}

/**
 * Return a formatted string of the point.
 *
 * @param {import('ol/geom/Point').default} point Point.
 * @param {number|undefined} decimals Decimals.
 * @param {import('ngeo/misc/filters').numberCoordinates} format A function to format coordinate into
 * text
 * @param {string} [opt_template] The template.
 * @returns {string} Formatted string of coordinate.
 * @hidden
 */
export function getFormattedPoint(point, decimals, format, opt_template) {
  return format(point.getCoordinates(), decimals, opt_template);
}

/**
 * Handle map browser event.
 *
 * @param {import('ol/MapBrowserEvent').default<unknown>} evt Map browser event.
 * @returns {boolean} `false` if event propagation should be stopped.
 * @private
 * @hidden
 * @this {Measure}
 */
export function handleEvent_(evt) {
  if (evt.type != 'pointermove' || evt.dragging) {
    return true;
  }

  const helpMsg = this.sketchFeature === null ? this.startMsg : this.continueMsg;

  if (this.displayHelpTooltip_ && helpMsg) {
    if (!this.helpTooltipElement_) {
      throw new Error('Missing helpTooltipElement');
    }
    if (!this.helpTooltipOverlay_) {
      throw new Error('Missing helpTooltipOverlay');
    }
    removeChildren(this.helpTooltipElement_);
    this.helpTooltipElement_.appendChild(helpMsg);
    this.helpTooltipOverlay_.setPosition(evt.coordinate);
  }

  return true;
}

export default Measure;
