// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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

import ngeoInteractionMeasure, {getFormattedPoint} from 'ngeo/interaction/Measure.js';
import ngeoInteractionMobileDraw from 'ngeo/interaction/MobileDraw.js';
import Point from 'ol/geom/Point.js';

/**
 * Interaction dedicated to measure by coordinate (point) on mobile devices.
 * @hidden
 */
export default class extends ngeoInteractionMeasure {
  /**
   * @param {import('ngeo/misc/filters.js').numberCoordinates} format the number formatter
   * @param {string} coordFormat the coordinates formatter
   * @param {import('ngeo/interaction/Measure.js').MeasureOptions} [options] Options
   */
  constructor(format, coordFormat, options = {}) {
    Object.assign(options, {displayHelpTooltip: false});

    super(options);

    /**
     * @type {import('ngeo/misc/filters.js').numberCoordinates}
     * @private
     */
    this.format_ = format;

    /**
     * @type {string}
     * @private
     */
    this.coordFormat_ = coordFormat;
  }

  /**
   * @param {import("ol/style/Style.js").StyleLike} style The sketchStyle used for the drawing
   *    interaction.
   * @param {import('ol/source/Vector.js').default<import("ol/geom/Point.js").default>} source Vector source.
   * @return {import("ol/interaction/Draw.js").default|import("ngeo/interaction/DrawAzimut.js").default|
   *    import("ngeo/interaction/MobileDraw.js").default} The interaction
   */
  createDrawInteraction(style, source) {
    return new ngeoInteractionMobileDraw({
      type: 'Point',
      style: style,
    });
  }

  /**
   * @param {function(string, ?import("ol/coordinate.js").Coordinate): void} callback The function
   *     to be called.
   */
  handleMeasure(callback) {
    if (!this.sketchFeature) {
      throw new Error('Missing sketchFeature');
    }
    const geom = this.sketchFeature.getGeometry();
    if (!(geom instanceof Point)) {
      throw new Error('Missing geometry');
    }
    const dec = this.decimals;
    const output = getFormattedPoint(geom, dec, this.format_, this.coordFormat_);
    const coord = geom.getLastCoordinate();
    callback(output, coord);
  }
}
