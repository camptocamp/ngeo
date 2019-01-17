/**
 */
const exports = {};

/**
 * Base url for the GeoMapFish demo server.
 * @type {string}
 */
exports.GMF_DEMO = 'https://geomapfish-demo-dc.camptocamp.com/2.4/';

/**
 * Base url for the GeoMapFish demo server.
 * @type {string}
 */
exports.GMF_LAYERS = `${exports.GMF_DEMO}layers`;

/**
 * Base url for the GeoMapFish demo server.
 * @type {string}
 */
exports.GMF_THEMES = `${exports.GMF_DEMO}themes?version=2&background=background`;

/**
 * WFS feature namespace for MapServer
 * @type {string}
 */
exports.MAPSERVER_WFS_FEATURE_NS = 'http://mapserver.gis.umn.edu/mapserver';

/**
 * MapServer proxy
 * @type {string}
 */
exports.MAPSERVER_PROXY = `${exports.GMF_DEMO}mapserv_proxy`;

/**
 * MapServer proxy
 * @type {string}
 */
exports.PRINT_PROXY = `${exports.GMF_DEMO}printproxy`;

/**
 * Search service
 * @type {string}
 */
exports.PROFILE = `${exports.GMF_DEMO}profile.json`;

/**
 * Search service
 * @type {string}
 */
exports.RASTER = `${exports.GMF_DEMO}raster`;

/**
 * Search service
 * @type {string}
 */
exports.SEARCH = `${exports.GMF_DEMO}fulltextsearch`;

/**
 * Search service
 * @type {string}
 */
exports.SHORT_CREATE = `${exports.GMF_DEMO}short/create`;

export default exports;
