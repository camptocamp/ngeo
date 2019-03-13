import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';


export default {
  themesUrl: undefined,
  projection: EPSG21781,
  resolutions: [250, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05],
  extent: [420000, 30000, 660000, 350000],
  /**
   * The name of the layer to use as background. May be a single value
   * (WMTS) or a comma-separated list of layer names (WMS).
   */
  backgroundLayer: 'OSM map',
};
