/**
 * This file contains the typedefs of the options of the methods.
 * It can be included as extern if you want to prevent renaming.
 * @externs
 */


/**
 * @type {Object}
 */
let gmfx;


/**
 * @typedef {{
 *     operator: (string),
 *     property: (string),
 *     value: (string)
 * }}
 */
gmfx.ComparisonFilter;


/**
 * The type of operator for the comparison filter.
 * @type {string}
 */
gmfx.ComparisonFilter.prototype.operator;


/**
 * The name of the property for the comparison filter.
 * @type {string}
 */
gmfx.ComparisonFilter.prototype.property;


/**
 * The value for the comparison filter that must match the combinaison of
 * the operator and property.
 * @type {string}
 */
gmfx.ComparisonFilter.prototype.value;


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
 * The options to create a `gmf.DataSource` with.
 * @record
 * @struct
 * @extends gmfThemes.GmfBaseNode
 */
gmfx.DataSource;


/**
 * A reference to the GMF layer node that was used to create the data source.
 * It may contains additionnal information, such as metadata, about the data
 * source.
 * @type {gmfThemes.GmfLayer}
 */
gmfx.DataSourceOptions.prototype.gmfLayer;


/**
 * Configuration for a grid tab.
 * @typedef {{
 *     configuration: ngeo.GridConfig,
 *     source: ngeox.QueryResultSource
 * }}
 */
gmfx.GridSource;


/**
 * Configuration used to initialize a grid.
 * @type {ngeo.GridConfig}
 */
gmfx.GridSource.prototype.configuration;


/**
 * Results of the query source.
 * @type {ngeox.QueryResultSource}
 */
gmfx.GridSource.prototype.source;


/**
 * Configuration option for {@link gmf.displayquerygridComponent} to merge
 * grid tabs.
 *
 * E.g. `'my_merged_source': ['123', '234']}` merges the sources with id `123`
 * and `234` into a new source `my_merged_source`.
 *
 * @typedef {Object<string, Array.<string>>}
 */
gmfx.GridMergeTabs;


/**
 * Projection object for the MousePositionDirective. Define a label and a filter
 * to use to display coordinates for a projection.
 * @typedef {{
 *   code: string,
 *   label: string,
 *   filter: string
 * }}
 */
gmfx.MousePositionProjection;


/**
 * The epsg name of a projection.
 * @type {string}
 */
gmfx.MousePositionProjection.prototype.code;


/**
 * The label to diplay with this projection.
 * @type {string}
 */
gmfx.MousePositionProjection.prototype.label;


/**
 * The filter function to use to format this projection. Arguments can be passed
 * with colon as separator (example: MyFilter:args1:args2:...)
 * @type {string}
 */
gmfx.MousePositionProjection.prototype.filter;


/**
 * Additional configuration options for the object editing tools directive.
 * @typedef {{
 *     regularPolygonRadius: (number|undefined)
 * }}
 */
gmfx.ObjectEditingToolsOptions;


/**
 * The radius of the shapes created by the regular polygon radius creation
 * tool. Default value is `100`. The value is in map units.
 * @type {number|undefined}
 */
gmfx.ObjectEditingToolsOptions.prototype.regularPolygonRadius;



/**
 * Configuration options for the permalink service.
 * @typedef {{
 *     crosshairStyle: (Array<(null|ol.style.Style)>|null|ol.FeatureStyleFunction|ol.style.Style|undefined),
 *     projectionCodes: (Array.<string>|undefined),
 *     useLocalStorage: (boolean|undefined)
 * }}
 */
gmfx.PermalinkOptions;


/**
 * An alternate style for the crosshair feature added by the permalink service.
 * @type {Array<(null|ol.style.Style)>|null|ol.FeatureStyleFunction|ol.style.Style|undefined}
 */
gmfx.PermalinkOptions.prototype.crosshairStyle;


/**
 * EPSG codes (e.g. 'EPSG:3857' or '3857'). The permalink service
 * will accept coordinates in these projections and try to detect which projection
 * the given coordinates are in.
 * @type {Array.<string>|undefined}
 */
gmfx.PermalinkOptions.prototype.projectionCodes;


/**
 * Store the values in the local storage. Default is `true`.
 * @type {boolean|undefined}
 */
gmfx.PermalinkOptions.prototype.useLocalStorage;


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
 * The legend checkbox.
 * @type {boolean|undefined}
 */
gmfx.PrintFields.prototype.legend;


/**
 * The selected 'scale'.
 * @type {number|undefined}
 */
gmfx.PrintFields.prototype.scale;


/**
 * The list of 'scales'
 * @type {Array.<number>|undefined}
 */
gmfx.PrintFields.prototype.scales;


/**
 * Configuration object for one profile's line.
 * @typedef {{
 *   color: (string|undefined),
 *   zExtractor: (function(Object): number|undefined)
 * }}
 */
gmfx.ProfileLineConfiguration;


/**
 * Color of the line (hex color string).
 * @type {(string|undefined)}
 */
gmfx.ProfileLineConfiguration.prototype.color;


/**
 * Extract the elevation of a point (an item of the elevation data array).
 * @type {(function(Object): number|undefined)}
 */
gmfx.ProfileLineConfiguration.prototype.zExtractor;


/**
 * Information to display for a given point in the profile. The point is
 * typically given by the profile's hover.
 * @typedef {{
 *   coordinate: (ol.Coordinate|undefined),
 *   distance: (number|undefined),
 *   elevations: (Object.<string, number>|undefined),
 *   xUnits: (string|undefined),
 *   yUnits: (string|undefined)
 * }}
 */
gmfx.ProfileHoverPointInformations;


/**
 * Coordinate of the point.
 * @type {ol.Coordinate|undefined}
 */
gmfx.ProfileHoverPointInformations.prototype.coordinate;


/**
 * distance of the point on the line. Can be in meters or kilometers.
 * @type {number|undefined}
 */
gmfx.ProfileHoverPointInformations.prototype.distance;


/**
 * Elevations of the point (example: {aster: 556.5, srtm: 560}).
 * @type {Object.<string, number>|undefined}
 */
gmfx.ProfileHoverPointInformations.prototype.elevations;


/**
 * Units of the x axis.
 * @type {string|undefined}
 */
gmfx.ProfileHoverPointInformations.prototype.xUnits;


/**
 * Units of the y axis.
 * @type {string|undefined}
 */
gmfx.ProfileHoverPointInformations.prototype.yUnits;


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


/**
 * Availables functionalities.
 * @typedef {{
 *     default_basemap: Array.<string>,
 *     default_theme: Array.<string>,
 *     filtrable_layers: (Array.<string>|undefined),
 *     location: Array.<string>
 * }}
 */
gmfx.AuthenticationFunctionalities;


/**
 * Base maps to use by default.
 * @type {Array.<string>}
 */
gmfx.AuthenticationFunctionalities.prototype.default_basemap;


/**
 * Theme to use by default.
 * @type {Array.<string>}
 */
gmfx.AuthenticationFunctionalities.prototype.default_theme;


/**
 * A list of layer names that can be filtered.
 * @type {Array.<string>|undefined}
 */
gmfx.AuthenticationFunctionalities.prototype.filtrable_layers;


/**
 * Availables locations.
 * @type {Array.<string>}
 */
gmfx.AuthenticationFunctionalities.prototype.location;

/**
 * @typedef {{
 *     functionalities: (gmfx.AuthenticationFunctionalities|null),
 *     is_password_changed: (boolean|null),
 *     role_id: (number|null),
 *     role_name: (string|null),
 *     username: (string|null)
 * }}
 */
gmfx.User;


/**
 * Configured functionalities of the user.
 * @type {gmfx.AuthenticationFunctionalities|null}
 */
gmfx.User.prototype.functionalities;


/**
 * True if the password of the user has been changed. False otherwise.
 * @type {boolean|null}
 */
gmfx.User.prototype.is_password_changed;


/**
 * the role id of the user.
 * @type {number|null}
 */
gmfx.User.prototype.role_id;


/**
 * The role name of the user.
 * @type {string|null}
 */
gmfx.User.prototype.role_name;


/**
 * The name of the user.
 * @type {string|null}
 */
gmfx.User.prototype.username;

/**
 * @typedef {{
 *  columns : Array.<string>,
 *  data : Array.<Array.<string|number|boolean>>
 * }}
 */
gmfx.DataSourceTableObject;

/**
 * @typedef {{
 *  title : string,
 *  table : gmfx.DataSourceTableObject
 * }}
 */
gmfx.DataSourcePrintReportObject;

/**
 * @typedef {{
 *  data: gmfx.ShortenerAPIResponseData,
 *  status: number
 * }}
 */
gmfx.ShortenerAPIResponse;


/**
 * Response payload to the shortener API
 * @type {gmfx.ShortenerAPIResponseData}
 */
gmfx.ShortenerAPIResponse.data;


/**
 * HTTP status
 * @type {number|undefined}
 */
gmfx.ShortenerAPIResponse.status;


/**
 * @typedef {{
 *  short_url: string
 * }}
 */
gmfx.ShortenerAPIResponseData;


/**
 * @typedef {{
 *  url: string,
 *  email: (string|undefined),
 *  message : (string|undefined)
 * }}
 */
gmfx.ShortenerAPIRequestParams;

/**
 * Configuration options for the themes service.
 * @typedef {{
 *     addBlankBackgroundLayer: (boolean|undefined)
 * }}
 */
gmfx.ThemesOptions;


/**
 * Whether to add a blank background layer to the list of available backgrounds.
 * @type {boolean|undefined}
 */
gmfx.ThemesOptions.prototype.addBlankBackgroundLayer;


/**
 * Static function to create a popup with an iframe.
 * @param {string} url an url.
 * @param {string} title (text).
 * @param {string=} opt_width CSS width.
 * @param {string=} opt_height CSS height.
 */
gmfx.OpenIframePopup;


/**
 * Static function to create a popup with html content.
 * @param {string} content (text or html).
 * @param {string} title (text).
 * @param {string=} opt_width CSS width.
 * @param {string=} opt_height CSS height.
 */
gmfx.OpenTextPopup;


/**
 * @param {ngeo.Popup!} popup a ngeoPopup.
 * @param {string} title (text).
 * @param {string=} opt_width CSS width.
 * @param {string=} opt_height CSS height.
 */
gmfx.OpenPopup_
