// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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
import {listen, unlistenByKey} from 'ol/events';
import olFeature from 'ol/Feature';
import {TRUE} from 'ol/functions';
import olGeomCircle from 'ol/geom/Circle';
import {fromCircle, makeRegular} from 'ol/geom/Polygon';
import olInteractionInteraction from 'ol/interaction/Interaction';
import MapBrowserEvent from 'ol/MapBrowserEvent';

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
 *
 * @hidden
 */
export default class extends olInteractionInteraction {
  /**
   * @fires DrawEvent
   * @param {DrawRegularPolygonFromClickOptions} options Options
   */
  constructor(options) {
    super({
      handleEvent: TRUE,
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
     * @type {import('ol/events').EventsKey[]}
     * @private
     */
    this.listenerKeys_ = [];
  }

  /**
   * Activate or deactivate the interaction.
   *
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
   * @param {import('ol/PluggableMap').default} map The map that the
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
   *
   * @private
   */
  enable_() {
    const map = this.getMap();
    console.assert(map, 'Map should be set.');
    this.listenerKeys_.push(listen(map, 'click', this.handleMapClick_, this));
  }

  /**
   * Disable the interaction. Called when removed from a map or deactivated.
   *
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
   *
   * @param {Event|import('ol/events/Event').default} evt Map browser event.
   * @private
   */
  handleMapClick_(evt) {
    if (evt instanceof MapBrowserEvent) {
      const center = evt.coordinate;
      const geometry = fromCircle(new olGeomCircle(center), this.sides_);

      makeRegular(geometry, center, this.radius_, this.angle_);

      /** @type {import('ngeo/interaction/common').DrawEvent} */
      const event = new ngeoCustomEvent('drawend', {feature: new olFeature(geometry)});
      this.dispatchEvent(event);
    }
  }
}
