/**
 * @type {Object}
 */
var gmfx;

/**
 * Datasource configuration options for the search directive.
 * @typedef {{
 *    datasetTitle: (string|undefined),
 *    labelKey: (string),
 *    groupsKey: (string|undefined),
 *    groupValues: (Array.<string>|undefined),
 *    projection: (string|undefined),
 *    url: (string)
 * }}
 */
gmfx.SearchDirectiveDatasource;

/**
 * The title of this set of data.
 * @type {string|undefined}
 */
gmfx.SearchDirectiveDatasource.prototype.datasetTitle;

/**
 * The name of a corresponding GeoJSON property key in the current dataset.
 * The bound value of this property key will be used as label.
 * @type {string|undefined}
 */
gmfx.SearchDirectiveDatasource.prototype.labelKey;

/**
 * The GeoJSON property key that will be used to group data.
 * If set, the option 'groupValues' must be set too.
 * @type {string}
 */
gmfx.SearchDirectiveDatasource.prototype.groupsKey;

/**
 * Possible values for the 'groupsKey' key. Will be ignored if option
 * 'groupsKey' is not set. Used to define groups of dataset.
 * @type {Array.<string>|undefined}
 */
gmfx.SearchDirectiveDatasource.prototype.groupValues;

/**
 * The geometry's projection for this set of data.
 * @type {string|undefined}
 */
gmfx.SearchDirectiveDatasource.prototype.projection;

/**
 * Url of the search service. Must contain a '%QUERY' term that will be
 * replaced by the input string.
 * @type {string}
 */
gmfx.SearchDirectiveDatasource.prototype.url;
