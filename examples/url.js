/**
 * Base url for the GeoMapFish demo server.
 * @type {string}
 */
export const GMF_DEMO = 'https://geomapfish-demo-dc.camptocamp.com/2.4/';

/**
 * WFS feature namespace for MapServer
 * @type {string}
 */
export const MAPSERVER_WFS_FEATURE_NS = 'http://mapserver.gis.umn.edu/mapserver';

/**
 * MapServer proxy
 * @type {string}
 */
export const MAPSERVER_PROXY = `${GMF_DEMO}mapserv_proxy`;

/**
 * MapServer proxy
 * @type {string}
 */
export const PRINT_PROXY = `${GMF_DEMO}printproxy`;

/**
 * Search service
 * @type {string}
 */
export const SEARCH = `${GMF_DEMO}fulltextsearch?query=%QUERY`;
