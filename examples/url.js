/**
 * Base url for the GeoMapFish demo server.
 * @type {string}
 * @hidden
 */
export const GMF_DEMO = 'https://geomapfish-demo-2-7.camptocamp.com/';

/**
 * WFS feature namespace for MapServer
 * @type {string}
 * @hidden
 */
export const MAPSERVER_WFS_FEATURE_NS = 'http://mapserver.gis.umn.edu/mapserver';

/**
 * MapServer proxy
 * @type {string}
 * @hidden
 */
export const MAPSERVER_PROXY = `${GMF_DEMO}mapserv_proxy?ogcserver=Main+PNG`;

/**
 * MapServer proxy
 * @type {string}
 * @hidden
 */
export const PRINT_PROXY = `${GMF_DEMO}printproxy`;

/**
 * Search service
 * @type {string}
 * @hidden
 */
export const SEARCH = `${GMF_DEMO}search?query=%QUERY`;
