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

import olSourceWMTS from 'ol/source/WMTS';
import olTilegridWMTS from 'ol/tilegrid/WMTS';

/**
 * @typedef {Object} AsitVDOptions
 * @property {string} layer Layer name. Possible values are `asitvd.fond_couleur`, `asitvd.fond_gris`
 * and `asitvd.fond_pourortho`.
 */

/**
 * @type {number[]}
 * @private
 * @hidden
 */
const asitVDResolutions = [
  4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250, 1000, 750, 650, 500, 250, 100, 50,
  20, 10, 5, 2.5, 2, 1.5, 1, 0.5,
];

/**
 * @type {import('ol/tilegrid/WMTS').default}
 * @private
 * @hidden
 */
const asitVDTileGrid = new olTilegridWMTS({
  extent: [2420000, 130000, 2900000, 1350000],
  resolutions: asitVDResolutions,
  matrixIds: asitVDResolutions.map((value, index) => `${index}`),
});

/**
 * Layer source for the ASIT VD tile server.
 * @see https://www.asitvd.ch/chercher/geoservices/fond-de-plan-asit-vd.html
 * @hidden
 */
export default class extends olSourceWMTS {
  /**
   * @param {AsitVDOptions} options WMTS options.
   */
  constructor(options) {
    super({
      attributions: 'géodonnées &copy; Etat de Vaud & &copy; contributeurs OpenStreetMap',
      url:
        'https://ows{1-4}.asitvd.ch/wmts/1.0.0/{Layer}/default/default/0/' +
        '2056/{TileMatrix}/{TileRow}/{TileCol}.png',
      projection: 'EPSG:2056',
      requestEncoding: 'REST',
      layer: options.layer,
      style: 'default',
      matrixSet: '2056',
      format: 'image/png',
      tileGrid: asitVDTileGrid,
    });
  }
}
