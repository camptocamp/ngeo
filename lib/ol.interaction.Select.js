// Missing exported class from OpenLayers

/**
 * @module
 */

import Event from 'ol/events/Event.js';

/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/Select~Select} instances are instances of
 * this type.
 */
export class SelectEvent extends Event {
  /**
   * @param {string} type The event type.
   * @param {Array<import("ol/Feature.js").default<import('ol/geom/Geometry.js').default>>} selected Selected features.
   * @param {Array<import("ol/Feature.js").default<import('ol/geom/Geometry.js').default>>} deselected Deselected features.
   * @param {import("ol/MapBrowserEvent.js").default<unknown>} mapBrowserEvent Associated
   *     {@link module:ol/MapBrowserEvent}.
   */
  constructor(type, selected, deselected, mapBrowserEvent) {
    super(type);

    /**
     * Selected features array.
     *
     * @type {Array<import("ol/Feature.js").default<import('ol/geom/Geometry.js').default>>}
     * @api
     */
    this.selected = selected;

    /**
     * Deselected features array.
     *
     * @type {Array<import("ol/Feature.js").default<import('ol/geom/Geometry.js').default>>}
     * @api
     */
    this.deselected = deselected;

    /**
     * Associated {@link module:ol/MapBrowserEvent}.
     *
     * @type {import("ol/MapBrowserEvent.js").default<unknown>}
     * @api
     */
    this.mapBrowserEvent = mapBrowserEvent;
  }
}
