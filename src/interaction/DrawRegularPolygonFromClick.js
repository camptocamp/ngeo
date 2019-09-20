import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import {listen, unlistenByKey} from 'ol/events.js';
import olFeature from 'ol/Feature.js';
import {TRUE} from 'ol/functions.js';
import olGeomCircle from 'ol/geom/Circle.js';
import {fromCircle, makeRegular} from 'ol/geom/Polygon.js';
import olInteractionInteraction from 'ol/interaction/Interaction.js';
import MapBrowserEvent from 'ol/MapBrowserEvent.js';

/**
 * DrawRegularPolygonFromClick Interaction.
 *
 * @typedef {Object} DrawRegularPolygonFromClickOptions
 * @property {number} [angle=0] Angle in radians. A value of 0 will have one of the shape's point facing up
 * @property {number} radius Radius size in map units.
 * @property {number} [sides=3] The number of sides for the regular polygon.
 */


/**
 * This interactions allows drawing regular polygons of a pre-determined number
 * of sides and size a a clicked location on the map.
 * @hidden
 */
export default class extends olInteractionInteraction {
  /**
   * @fires DrawEvent
   * @param {DrawRegularPolygonFromClickOptions} options Options
   */
  constructor(options) {
    super({
      handleEvent: TRUE
    });

    /**
     * @type {number}
     * @private
     */
    this.angle_ = options.angle !== undefined ? options.angle : 0;

    /**
     * @type {number}
     * @private
     */
    this.radius_ = options.radius;

    /**
     * @type {number}
     * @private
     */
    this.sides_ = options.sides !== undefined ? options.sides : 3;

    /**
     * @type {Array<import("ol/events.js").EventsKey>}
     * @private
     */
    this.listenerKeys_ = [];
  }

  /**
   * Activate or deactivate the interaction.
   * @param {boolean} active Active.
   * @override
   */
  setActive(active) {
    super.setActive.call(this, active);

    if (this.getMap()) {
      if (active) {
        this.enable_();
      } else {
        this.disable_();
      }
    }
  }

  /**
   * @param {import("ol/PluggableMap.js").default} map The map that the
   * overlay is part of.
   */
  setMap(map) {
    const active = this.getActive();

    const currentMap = this.getMap();
    if (currentMap && active) {
      this.disable_();
    }

    super.setMap.call(this, map);

    if (map && active) {
      this.enable_();
    }

  }

  /**
   * Enable the interaction. Called when added to a map AND active.
   * @private
   */
  enable_() {
    const map = this.getMap();
    console.assert(map, 'Map should be set.');
    this.listenerKeys_.push(
      listen(map, 'click', this.handleMapClick_, this)
    );
  }

  /**
   * Disable the interaction. Called when removed from a map or deactivated.
   * @private
   */
  disable_() {
    const map = this.getMap();
    console.assert(map, 'Map should be set.');
    this.listenerKeys_.forEach(unlistenByKey);
    this.listenerKeys_.length = 0;
  }

  /**
   * Called the the map is clicked. Create a regular polygon at the clicked
   * location using the configuration
   * @param {Event|import('ol/events/Event.js').default} evt Map browser event.
   * @private
   */
  handleMapClick_(evt) {
    if (evt instanceof MapBrowserEvent) {
      const center = evt.coordinate;
      const geometry = fromCircle(
        new olGeomCircle(center), this.sides_
      );

      makeRegular(geometry, center, this.radius_, this.angle_);

      /** @type {import('ngeo/interaction/common.js').DrawEvent} */
      const event = new ngeoCustomEvent('drawend', {feature: new olFeature(geometry)});
      this.dispatchEvent(event);
    }
  }
}
