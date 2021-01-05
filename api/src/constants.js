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

import EPSG2056 from '@geoblocks/proj/src/EPSG_2056.js';

/**
 * @typedef {Object} APIConfig
 * @property {?string} themesUrl
 * @property {?string} localeUrl
 * @property {string} projection
 * @property {number[]} resolutions
 * @property {[number, number, number, number]} [extent]
 * @property {string} backgroundLayer
 * @property {string[]} queryableLayers
 */

export default /** @type {APIConfig} */ ({
  // The URL to the themes service.
  themesUrl: 'https://www.example.com',
  localeUrl: undefined,
  searchUrl: undefined,

  // The projection of the map
  projection: EPSG2056,

  // The resolutions list.
  resolutions: [250, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05],

  // The extent restriction, must be in the same projection as `config.projection`.
  // the format is `[minx, miny, maxx, maxy]`for example: `[420000, 30000, 660000, 350000]`
  // the default is ǹo restriction.
  // extent: undefined,

  // The name of the layer to use as background, the layer must be present in the 'background_layers'
  // section of the theme
  backgroundLayer: 'OSM map',

  // The list of layers (names) that can be queried on mouse click
  queryableLayers: ['osm_open', 'many_attributes', 'polygon'],
});
