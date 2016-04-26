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
 * Configuration options for the permalink service.
 * @typedef {{
 *     crosshairStyle: (Array<(null|ol.style.Style)>|null|ol.FeatureStyleFunction|ol.style.Style|undefined)
 * }}
 */
gmfx.PermalinkOptions;


/**
 * An alternate style for the crosshair feature added by the permalink service.
 * @type {Array<(null|ol.style.Style)>|null|ol.FeatureStyleFunction|ol.style.Style|undefined}
 */
gmfx.PermalinkOptions.prototype.crosshairStyle;


/**
 * Fields that can come from a print v3 server and can be used in the partial
 * of the gmf print panel.
 * @typedef {{
 *   customs: (Array.<gmfx.CustomField>|undefined),
 *   dpi: (number|undefined),
 *   dpis: (Array.<number>|undefined),
 *   formats: (Object.<string, boolean>|undefined),
 *   layout: (string|undefined),
 *   layouts: (Array.<string>|undefined),
 *   legend: (boolean|undefined),
 *   scale: (number|undefined),
 *   scales: (Array.<number>|undefined)
 * }}
 */
gmfx.PrintFields;

/**
 * Custom print fields.
 * @type {Array.<gmfx.CustomField>|undefined}
 */
gmfx.PrintFields.prototype.customs;


/**
 * The selected 'dpi'.
 * @type {number|undefined}
 */
gmfx.PrintFields.prototype.dpi;


/**
 * The list of 'dpis'.
 * @type {Array.<number>|undefined}
 */
gmfx.PrintFields.prototype.dpis;


/**
 * The list of active 'formats' (png, pdf, ...).
 * @type {Object.<string, boolean>|undefined}
 */
gmfx.PrintFields.prototype.formats;


/**
 * The selected 'layout'.
 * @type {string|undefined}
 */
gmfx.PrintFields.prototype.layout;


/**
 * The list of 'layouts'.
 * @type {Array.<string>|undefined}
 */
gmfx.PrintFields.prototype.layouts;


/**
 * The list of 'scales'.
 * @type {boolean|undefined}
 */
gmfx.PrintFields.prototype.legend;


/**
 * The selected 'scale'.
 * @type {number|undefined}
 */
gmfx.PrintFields.prototype.scale;


/**
 * The 'debug' field.
 * @type {Array.<number>|undefined}
 */
gmfx.PrintFields.prototype.scales;


/**
 * Object that can be used to generate a form field.
 * @typedef {{
 *   default: (string|boolean|number|undefined),
 *   name: string,
 *   type: string
 * }}
 */
gmfx.CustomField;


/**
 * Default value of the form field.
 * @type {(string|boolean|number|undefined)}
 */
gmfx.CustomField.prototype.default;


/**
 * Name of the form field.
 * @type {string}
 */
gmfx.CustomField.prototype.name;


/**
 * Type of the field.
 * Can be 'String', 'Boolean' or 'Number'.
 * @type {string}
 */
gmfx.CustomField.prototype.type;


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
