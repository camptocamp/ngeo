// Missing exported class from OpenLayers

/**
 * @module
 */

import Event from 'ol/events/Event.js';

/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/Draw~Draw} instances are
 * instances of this type.
 */
export class DrawEvent extends Event {
  /**
   * @param {import('ol/interaction/Draw.js').DrawEventType} type Type.
   * @param {import('ol/Feature.js').default<import('ol/geom/Geometry.js').default>} feature The feature drawn.
   */
  constructor(type, feature) {
    super(type);

    /**
     * The feature being drawn.
     * @type {import('ol/Feature.js').default<import('ol/geom/Geometry.js').default>}
     * @api
     */
    this.feature = feature;
  }
}
