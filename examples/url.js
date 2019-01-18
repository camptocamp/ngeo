/**
 */
const exports = {};

/**
 * Base url for the GeoMapFish demo server.
 * @type {string}
 */
exports.GMF_DEMO = 'https://geomapfish-demo-dc.camptocamp.com/2.4/';

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
exports.SEARCH = `${exports.GMF_DEMO}fulltextsearch?query=%QUERY`;

export default exports;
