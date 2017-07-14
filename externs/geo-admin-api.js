/**
 * Externs for the GeoAdmin API.
 * See: http://api3.geo.admin.ch/services/sdiservices.html
 * @externs
 */


/**
 * @private
 * @type {Object}
 */
let geoAdminx;


/**
 * Response returned by the Location Search API.
 * See: http://api3.geo.admin.ch/services/sdiservices.html#id26
 * @typedef {{
 *     results: Array.<geoAdminx.SearchLocationResult>
 * }}
 */
geoAdminx.SearchLocationResponse;


/**
 * @typedef {{
 *     weight: number,
 *     attrs: geoAdminx.SearchLocationResultAttrs
 * }}
 */
geoAdminx.SearchLocationResult;


/**
 * @typedef {{
 *     label: string,
 *     lon: number,
 *     lat: number,
 *     detail: string,
 *     x: number,
 *     y: number,
 *     geom_st_box2d: string,
 *     origin: string,
 *     geom_quadindex: string,
 *     layerBodId: (string|undefined),
 *     featureId: (string|undefined),
 *     rank: number,
 *     num: number
 * }}
 */
geoAdminx.SearchLocationResultAttrs;
