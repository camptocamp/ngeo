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

import ngeoInteractionMeasure, {getFormattedArea} from 'ngeo/interaction/Measure';
import olInteractionDraw from 'ol/interaction/Draw';
import Polygon from 'ol/geom/Polygon';

/**
 * Interaction dedicated to measure length.
 *
 * See our live example: [../examples/measure.html](../examples/measure.html)
 */
export default class extends ngeoInteractionMeasure {
  /**
   * @param {import('ngeo/misc/filters').unitPrefix} format The format function
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import('ngeo/interaction/Measure').MeasureOptions} [options] Options
   */
  constructor(format, gettextCatalog, options = {}) {
    super(options);

    let continueMsg;
    if (options.continueMsg !== undefined) {
      continueMsg = options.continueMsg;
    } else {
      continueMsg = document.createElement('span');
      continueMsg.textContent = gettextCatalog.getString('Click to continue drawing the polygon.');
      const br = document.createElement('br');
      br.textContent = gettextCatalog.getString('Double-click or click starting point to finish.');
      continueMsg.appendChild(br);
    }
    /**
     * Message to show after the first point is clicked.
     * @type {Element}
     */
    this.continueMsg = continueMsg;

    /**
     * The format function
     * @type {import('ngeo/misc/filters').unitPrefix}
     */
    this.format = format;
  }

  /**
   * @param {import('ol/style/Style').StyleLike} style The sketchStyle used for the drawing
   *    interaction.
   * @param {import('ol/source/Vector').default<import('ol/geom/Polygon').default>} source Vector source.
   * @return {olInteractionDraw|import('ngeo/interaction/MobileDraw').default} The interaction
   */
  createDrawInteraction(style, source) {
    return new olInteractionDraw({
      type: 'Polygon',
      source: source,
      style: style,
    });
  }

  /**
   * @param {function(string, ?import('ol/coordinate').Coordinate): void} callback The function
   *     to be called.
   */
  handleMeasure(callback) {
    if (!this.sketchFeature) {
      throw new Error('Missing sketchFeature');
    }
    const geom = this.sketchFeature.getGeometry();
    if (!(geom instanceof Polygon)) {
      throw new Error('Missing geometry');
    }
    const proj = this.getMap().getView().getProjection();
    console.assert(proj);
    const output = getFormattedArea(geom, proj, this.precision, this.format);
    const verticesCount = geom.getCoordinates()[0].length;
    let coord = null;
    if (verticesCount > 3) {
      coord = geom.getInteriorPoint().getCoordinates();
    }
    callback(output, coord);
  }
}
