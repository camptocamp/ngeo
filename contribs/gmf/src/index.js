/**
 * @module gmf
 */
const exports = {};

/**
 * The default template base URL for modules, used as-is by the template cache.
 * @type {string}
 */

/**
 * @const
 * @export
 */
exports.DATALAYERGROUP_NAME = 'data';

/**
 * @const
 * @export
 */
exports.EXTERNALLAYERGROUP_NAME = 'external';

/**
 * @const
 * @export
 */
exports.COORDINATES_LAYER_NAME = 'gmfCoordinatesLayerName';


/**
 * @enum {string}
 */
exports.PermalinkParam = {
  BG_LAYER: 'baselayer_ref',
  EXTERNAL_DATASOURCES_NAMES: 'eds_n',
  EXTERNAL_DATASOURCES_URLS: 'eds_u',
  FEATURES: 'rl_features',
  MAP_CROSSHAIR: 'map_crosshair',
  MAP_TOOLTIP: 'map_tooltip',
  MAP_X: 'map_x',
  MAP_Y: 'map_y',
  MAP_Z: 'map_zoom',
  TREE_GROUPS: 'tree_groups',
  WFS_LAYER: 'wfs_layer',
  WFS_NGROUPS: 'wfs_ngroups',
  WFS_SHOW_FEATURES: 'wfs_showFeatures'
};


export default exports;
