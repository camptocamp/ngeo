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

export default /** @type {APIConfig} */({
  // The URL to the themes service.
  themesUrl: 'https://www.example.com',
  localeUrl: undefined,

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
  backgroundLayer: 'orthophoto',

  // The list of layers (names) that can be queried on mouse click
  queryableLayers: ['osm_open', 'many_attributes', 'polygon']
});
