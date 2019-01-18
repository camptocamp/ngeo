/**
 */
const const = {};

/**
 * Base url for the GeoMapFish demo server.
 * @type {string}
 */
const GMF_DEMO = 'https://geomapfish-demo-dc.camptocamp.com/2.4/';

/**
 * WFS feature namespace for MapServer
 * @type {string}
 */
const MAPSERVER_WFS_FEATURE_NS = 'http://mapserver.gis.umn.edu/mapserver';

/**
 * MapServer proxy
 * @type {string}
 */
const MAPSERVER_PROXY = `${const GMF_DEMO}mapserv_proxy`;

/**
 * MapServer proxy
 * @type {string}
 */
const PRINT_PROXY = `${const GMF_DEMO}printproxy`;

/**
 * Search service
 * @type {string}
 */
const SEARCH = `${const GMF_DEMO}fulltextsearch?query=%QUERY`;

export default const 
