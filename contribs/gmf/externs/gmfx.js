/**
 * Externs for GeoMapFish
 *
 * @externs
 */



/**
 * @type {Object}
 */
var gmfx;

/**
 * A part of the application config.
 * @typedef {{
 *    srid: (number),
 *    positionFeatureStyle: (ol.style.Style|undefined),
 *    accuracyFeatureStyle: (ol.style.Style|undefined),
 *    geolocationZoom: (number|undefined),
 *    mapViewConfig: (olx.ViewOptions|undefined),
 *    mapControls: (ol.Collection.<ol.control.Control>|Array.<ol.control.Control>|undefined),
 *    mapInteractions: (ol.Collection.<ol.interaction.Interaction>|Array.<ol.interaction.Interaction>|undefined)
 * }}
 */
gmfx.Config;

/**
 * Datasource configuration options for the search directive.
 * @typedef {{
 *    bloodhoundOptions: (BloodhoundOptions|undefined),
 *    labelKey: string,
 *    groupValues: (Array.<string>|undefined),
 *    groupActions: (Array.<string>|undefined),
 *    projection: (string|undefined),
 *    typeaheadDatasetOptions: (TypeaheadDataset|undefined),
 *    url: string
 * }}
 */
gmfx.SearchDirectiveDatasource;


/**
 * The optional Bloodhound configuration for this data set.
 * See: https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md
 * @type {BloodhoundOptions|undefined}
 */
gmfx.SearchDirectiveDatasource.prototype.bloodhoundOptions;


/**
 * The name of a corresponding GeoJSON property key in the current dataset.
 * The bound value of this property key will be used as label.
 * @type {string|undefined}
 */
gmfx.SearchDirectiveDatasource.prototype.labelKey;


/**
 * Possible values for the 'layer_name' key.
 * Used to define groups of dataset.
 * @type {Array.<string>|undefined}
 */
gmfx.SearchDirectiveDatasource.prototype.groupValues;


/**
 * List of allowed actions. The list may contain a combination of
 * `add_theme`, `add_group` or `add_layer`
 * @type {Array.<string>|undefined}
 */
gmfx.SearchDirectiveDatasource.prototype.groupActions;


/**
 * The geometry's projection for this set of data.
 * @type {string|undefined}
 */
gmfx.SearchDirectiveDatasource.prototype.projection;


/**
 * The optional Typeahead configuration for this dataset.
 * See: https://github.com/twitter/typeahead.js/blob/master/
 * doc/jquery_typeahead.md#datasets
 * @type {TypeaheadDataset|undefined}
 */
gmfx.SearchDirectiveDatasource.prototype.typeaheadDatasetOptions;


/**
 * Url of the search service. Must contain a '%QUERY' term that will be
 * replaced by the input string.
 * @type {string}
 */
gmfx.SearchDirectiveDatasource.prototype.url;


/**
 * @typedef {{layer: string}}
 */
gmfx.source.AsitVDOptions;


/**
 * Layer name. Possible values are `asitvd.fond_couleur`, `asitvd.fond_gris`
 * and `asitvd.fond_pourortho`.
 * @type {string}
 */
gmfx.source.AsitVDOptions.prototype.layer;


/**
 * @typedef {{
 *    layer: string,
 *    format: (string|undefined),
 *    timestamp: string
 * }}
 */
gmfx.source.SwisstopoOptions;


/**
 * Layer name.
 * @type {string}
 */
gmfx.source.SwisstopoOptions.prototype.layer;


/**
 * Image format. Default is `png`.
 * @type {string}
 */
gmfx.source.SwisstopoOptions.prototype.format;


/**
 * The `Time` dimension of the source.
 * @type {string}
 */
gmfx.source.SwisstopoOptions.prototype.timestamp;


/**
 * @typedef {{
 *     exportgpxkml: string
 * }}
 */
gmfx.ServiceUrls;


/**
 * URL to the "exportgpxkml" service.
 * @type {string}
 */
gmfx.ServiceUrls.prototype.exportgpxkml;
