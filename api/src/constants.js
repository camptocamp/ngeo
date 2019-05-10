import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';


/**
 * @typedef {Object} APIConfig
 * @property {?string} themesUrl
 * @property {string} projection
 * @property {Array<number>} resolutions
 * @property {[number, number, number, number]} [extent]
 * @property {string} backgroundLayer
 */

export default /** @type {APIConfig} */({
  // The URL to the themes service.
  themesUrl: 'https://www.example.com',

  // The projection of the map
  projection: EPSG21781,

  // The resolutions list.
  resolutions: [250, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05],

  // The extent restriction, must be in the same projection as `config.projection`.
  // the format is `[minx, miny, maxx, maxy]`for example: `[420000, 30000, 660000, 350000]`
  // the default is ǹo restriction.
  // extent: undefined,

  // The name of the GeoMapFish layer to use as background. May be a single value
  // (WMTS) or a comma-separated list of layer names (WMS).
  backgroundLayer: 'orthophoto',
});
