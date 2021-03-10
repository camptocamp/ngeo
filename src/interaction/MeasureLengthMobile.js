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

import ngeoInteractionMeasureLength from 'ngeo/interaction/MeasureLength.js';
import ngeoInteractionMobileDraw from 'ngeo/interaction/MobileDraw.js';

/**
 * Interaction dedicated to measure length on mobile devices.
 * @hidden
 */
export default class extends ngeoInteractionMeasureLength {
  /**
   * @param {import('ngeo/misc/filters.js').unitPrefix} format The format function
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import('ngeo/interaction/Measure.js').MeasureOptions} [opt_options] Options
   */
  constructor(format, gettextCatalog, opt_options) {
    const options = opt_options !== undefined ? opt_options : {};

    Object.assign(options, {displayHelpTooltip: false});

    super(format, gettextCatalog, options);
  }

  /**
   * @param {import("ol/style/Style.js").StyleLike} style
   *     The sketchStyle used for the drawing interaction.
   * @param {import("ol/source/Vector.js").default<import("ol/geom/LineString.js").default>} source Vector source.
   * @return {ngeoInteractionMobileDraw} The interaction
   */
  createDrawInteraction(style, source) {
    return new ngeoInteractionMobileDraw({
      type: 'LineString',
      style: style,
    });
  }
}
