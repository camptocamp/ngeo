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


/**
 * Availables functionalities.
 * @typedef {{
 *     default_basemap: Array.<string>,
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
 * Enum for the time property of a GmfThemesNode
 * Type of the widget to use
 * @enum {string}
 */
gmfx.TimePropertyWidgetEnum = {
  SLIDER : 'slider',
  DATEPICKER : 'datepicker'
};

/**
 * Enum for the time property of a GmfThemesNode
 * Mode of the widget
 * @enum {string}
 */
gmfx.TimePropertyModeEnum = {
  RANGE : 'range',
  VALUE : 'value',
  DISABLED : 'disabled'
};

/**
 * Enum for the time property of a GmfThemesNode
 * resolution of the widget
 * @enum {string}
 */
gmfx.TimePropertyResolutionEnum = {
  DAY : 'day',
  MONTH : 'month',
  YEAR : 'year',
  SECOND : 'second'
};

/**
 * Time object for WMS layer
 * @typedef {{
 *  widget : gmfx.TimePropertyWidgetEnum,
 *  maxValue: string,
 *  minValue: string,
 *  maxDefValue: (string|null),
 *  minDefValue: (string|null),
 *  resolution: gmfx.TimePropertyResolutionEnum,
 *  mode: gmfx.TimePropertyModeEnum,
 *  values: (Array<string>|undefined),
 *  interval : Array<number>
 * }}
 */
gmfx.TimeProperty;
