/**
 * @type {Object}
 */
var gmfx;

/**
 * Datasource configuration options for the search directive.
 * @typedef {{
 *    title: (string|undefined),
 *    groupByProperties: (Array.<string|undefined>|undefined),
 *    projection: (string|undefined),
 *    url: (string|undefined)
 * }}
 */
gmfx.SearchDirectiveDatasource;

/**
 * The title of this set of data.
 * @type {string|undefined}
 */
gmfx.SearchDirectiveDatasource.prototype.title;

/**
 * An array of propertie's keys used to group data.
 * @type {Array.<string>|undefined}
 */
gmfx.SearchDirectiveDatasource.prototype.groupByProperties;

/**
 * The geometry's projection for this set of data.
 * @type {string|undefined}
 */
gmfx.SearchDirectiveDatasource.prototype.projection;

/**
 * Url of the search service.
 * @type {string|undefined}
 */
gmfx.SearchDirectiveDatasource.prototype.url;
