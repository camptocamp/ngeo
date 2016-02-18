/**
 * @externs
 */

/**
 * @private
 * @type {Object}
 */
var ngeox;


/**
 * The options for the query service.
 * @typedef {{
 *     limit: (number|undefined),
 *     sourceIdProperty: (string|undefined),
 *     sourceIdsProperty: (string|undefined)
 * }}
 */
ngeox.QueryOptions;


/**
 * The maximum number of records per request the query service should ask.
 * Defaults to `50`. Note that sources sharing the same url are combined
 * together in a single request. This limit will still apply to those.
 * @type {number|undefined}
 */
ngeox.QueryOptions.prototype.limit;


/**
 * Defines the name of the layer property that holds the id for the source.
 * Only used if a source is configured without a reference to its layer.
 * Defaults to `querySourceId`.
 * @type {string|undefined}
 */
ngeox.QueryOptions.prototype.sourceIdProperty;


/**
 * Defines the name of the layer property that holds the ids of the sources.
 * Use this if you have more than one source bound to a layer.  Defaults to
 * `querySourceIds`.
 * @type {string|undefined}
 */
ngeox.QueryOptions.prototype.sourceIdsProperty;


/**
 * The configuration of a source for the Query service
 * @typedef {{
 *     format: (ol.format.Feature|undefined),
 *     id: (number|string),
 *     identifierAttributeField: (string|undefined),
 *     infoFormat: (string|undefined),
 *     label: (string|undefined),
 *     layer: (ol.layer.Base|undefined),
 *     params: (Object.<string, *>|undefined),
 *     serverType: (string|undefined),
 *     url: (string|undefined),
 *     validateLayerParams: (boolean|undefined),
 *     wmsSource: (ol.source.ImageWMS|ol.source.TileWMS|undefined)
 * }}
 */
ngeox.QuerySource;


/**
 * The used to read the returned features from query requests for this source.
 * @type {ol.format.Feature|undefined}
 */
ngeox.QuerySource.prototype.format;


/**
 * The unique identifier of the source.
 * @type {number|string}
 */
ngeox.QuerySource.prototype.id;


/**
 * The key that identify the title attribute in features.
 * @type {string|undefined}
 */
ngeox.QuerySource.prototype.identifierAttributeField;


/**
 * The info format to request and read the returned features. Optional.
 * Default value is `geojson`. Possible values are: `geojson`, `gml`.
 * @type {string|undefined}
 */
ngeox.QuerySource.prototype.infoFormat;


/**
 * The human-readable name of the source. If not set, the `name` property
 * is used instead.
 * @type {string|undefined}
 */
ngeox.QuerySource.prototype.label;


/**
 * A reference to the ol3 layer object. If not defined, will be automatically
 * fetched using the source `name` and the according layer property that has
 * the same value.
 * @type {ol.layer.Base|undefined}
 */
ngeox.QuerySource.prototype.layer;


/**
 * Additionnal params to use when querying this source.
 * @type {Object.<string, *>|undefined}
 */
ngeox.QuerySource.prototype.params;


/**
 * Server type of the source. Can be `mapserver` or `geoserver`.
 * @type {string|undefined}
 */
ngeox.QuerySource.prototype.serverType;


/**
 * Url to use for the request. Required if the layer object doesn't support
 * WMS GetFeatureInfo requests.
 * @type {string|undefined}
 */
ngeox.QuerySource.prototype.url;


/**
 * Whether to validate the LAYERS params of the layer currently being
 * queried. Useful if the source configuration was not given a direct
 * reference to the ol3 WMS source object, i.e. it was given an `url` and
 * `params` properties instead, which resulted in the creation of an
 * inner `ol.source.ImageWMS` object. If that source configuration is attached
 * to a layer that also has an ol3 WMS source object, then the latter may
 * contain more than one layer name within the LAYERS param. In that case,
 * this `validateLayerParams` property, when enabled, will make the query
 * service check if the layer name within its LAYERS params is currently inside
 * the layer source LAYERS params. If it's not there, then the source should
 * not be queried.
 *
 * When setting this option, you must not set the wmsSource or layer if
 * it has an inner ol3 wms source object.
 *
 * Also, when using this option, your config `params` must also only have
 * one layer name set in the LAYERS property.
 * @type {boolean|undefined}
 */
ngeox.QuerySource.prototype.validateLayerParams;


/**
 * The ol3 WMS source object used to build the query string. If not defined,
 * the layer source object will be used (if it's WMS), otherwise one will
 * be created by the query service using the `url` and `params` properties of
 * this source.
 * @type {ol.source.ImageWMS|ol.source.TileWMS|undefined}
 */
ngeox.QuerySource.prototype.wmsSource;


/**
 * MobileDraw Interaction
 * @typedef {{
 *     minPoints: (number|undefined),
 *     style: (ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined),
 *     type: ol.geom.GeometryType,
 *     wrapX: (boolean|undefined)
 * }}
 */
ngeox.interaction.MobileDrawOptions;


/**
 * The number of points that must be drawn before a polygon ring or line string
 * can be finished. Default is `3` for polygon rings and `2` for line strings.
 * @type {number|undefined}
 * @api
 */
ngeox.interaction.MobileDrawOptions.prototype.minPoints;


/**
 * Style for sketch features.
 * @type {ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined}
 */
ngeox.interaction.MobileDrawOptions.prototype.style;


/**
 * Drawing type ('Point' or 'LineString'.
 * @type {ol.geom.GeometryType}
 * @api
 */
ngeox.interaction.MobileDrawOptions.prototype.type;


/**
 * Wrap the world horizontally on the sketch overlay. Default is `false`.
 * @type {boolean|undefined}
 * @api
 */
ngeox.interaction.MobileDrawOptions.prototype.wrapX;


/**
 * Namespace.
 * @type {Object}
 */
ngeox.format;


/**
 * @typedef {{
 *    accuracy: (number|undefined),
 *    encodeStyles: (boolean|undefined),
 *    properties: (function(ol.Feature): Object.<string, (string|undefined)>|undefined)
 * }}
 */
ngeox.format.FeatureHashOptions;


/**
 * The encoding and decoding accuracy. Optional. Default value is 1.
 * @type {number|undefined}
 */
ngeox.format.FeatureHashOptions.prototype.accuracy;


/**
 * Encode styles. Optional. Default is `true`.
 * @type {boolean|undefined}
 */
ngeox.format.FeatureHashOptions.prototype.encodeStyles;


/**
 * A function that returns serializable properties for a feature. Optional. By
 * default the feature properties (as returned by `feature.getProperties()`)
 * are used. To be serializable the returned properties should be numbers or
 * strings.
 * @type {(function(ol.Feature): Object.<string, (string|undefined)>|undefined)}
 */
ngeox.format.FeatureHashOptions.prototype.properties;


/**
 * Namespace.
 * @type {Object}
 */
ngeox.interaction;

/**
 * Interactions for measure tools.
 * @typedef {{
 *    startMsg: (Element|undefined),
 *    continueMsg: (Element|undefined),
 *    decimals: (number|undefined),
 *    style: (ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined),
 *    sketchStyle: (ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined)
 * }}
 */
ngeox.interaction.MeasureOptions;


/**
 * Element including the message to display in the help tooltip when the user
 * just activated the interaction.
 * @type {Element|undefined}
 */
ngeox.interaction.MeasureOptions.prototype.startMsg;


/**
 * Element including the message to display in the help tooltip when the user
 * already added the first point.
 * @type {Element|undefined}
 */
ngeox.interaction.MeasureOptions.prototype.continueMsg;


/**
 * Defines the number of decimals to keep in the measurement. If not defined,
 * then the default behaviour occurs depending on the measure type.
 * @type {number|undefined}
 */
ngeox.interaction.MeasureOptions.prototype.decimals;


/**
 * The style to be used when drawing is finished.
 * @type {ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined}
 */
ngeox.interaction.MeasureOptions.prototype.style;


/**
 * The style to be used while drawing.
 * @type {ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined}
 */
ngeox.interaction.MeasureOptions.prototype.sketchStyle;


/**
 * Namespace.
 * @type {Object}
 */
ngeox.profile;


/**
 * Options for the profile.
 * @typedef {{
 *   styleDefs: (string|undefined),
 *   poiLabelAngle: (number|undefined),
 *   formatter: (ngeox.profile.ProfileFormatter|undefined),
 *   elevationExtractor: ngeox.profile.ElevationExtractor,
 *   poiExtractor: (ngeox.profile.PoiExtractor|undefined),
 *   light: (boolean|undefined),
 *   lightXAxis: (boolean|undefined),
 *   scaleModifier: (function(function(), function(), number, number)|undefined),
 *   hoverCallback: (function(Object)|undefined),
 *   outCallback: (function()|undefined)
 * }} ngeox.profile.ProfileOptions
 */
ngeox.profile.ProfileOptions;


/**
 * Inline CSS style definition to inject in the SVG.
 * @type {string|undefined}
 */
ngeox.profile.ProfileOptions.prototype.styleDefs;


/**
 * Inline CSS style definition to inject in the SVG.
 * @type {number|undefined}
 */
ngeox.profile.ProfileOptions.prototype.poiLabelAngle;


/**
 * Formatter giving full control on how numbers are formatted.
 * @type {ngeox.profile.ProfileFormatter|undefined}
 */
ngeox.profile.ProfileOptions.prototype.formatter;


/**
 * Extractor for parsing elevation data.
 * @type {ngeox.profile.ElevationExtractor}
 */
ngeox.profile.ProfileOptions.prototype.elevationExtractor;


/**
 * Extractor for parsing POI data.
 * @type {ngeox.profile.PoiExtractor|undefined}
 */
ngeox.profile.ProfileOptions.prototype.poiExtractor;


/**
 * Show a simplified profile when true.
 * @type {boolean|undefined}
 */
ngeox.profile.ProfileOptions.prototype.light;


/**
 * Show a simplified x axis with only both end ticks.
 * @type {boolean|undefined}
 */
ngeox.profile.ProfileOptions.prototype.lightXAxis;


/**
 * Allows to modify the raw x and y scales.
 * Notably, it is possible to modify the y domain according to XY ratio rules,
 * add padding or enforce y lower bound.
 * @type {function(function(), function(), number, number)|undefined}
 */
ngeox.profile.ProfileOptions.prototype.scaleModifier;


/**
 * A callback called from the profile when the mouse moves over a point.
 * The point, an item of the elevation data array, is passed as the first
 * argument of the function.
 * @type {function(Object)|undefined}
 */
ngeox.profile.ProfileOptions.prototype.hoverCallback;


/**
 * A callback called from the profile when the mouse leaves the profile.
 * @type {function()|undefined}
 */
ngeox.profile.ProfileOptions.prototype.outCallback;


/**
 * The elevation data extractor is used to extract data from a point.
 * The point is an item of the elevation data array.
 * @typedef {{
 *   z: function(Object): number,
 *   dist: function(Object): number
 * }}
 */
ngeox.profile.ElevationExtractor;


/**
 * Extract the elevation of a point.
 * @type {function(Object): number}
 */
ngeox.profile.ElevationExtractor.prototype.z;


/**
 * Extract the distance from origin of a point.
 * @type {function(Object): number}
 */
ngeox.profile.ElevationExtractor.prototype.dist;


/**
 * The POI data extractor is used to extract data from a POI.
 * The POI is an item of the POI data array.
 * @typedef {{
 *   id: function(Object): string,
 *   dist: function(Object): number,
 *   z: function(Object, number=): number,
 *   sort: function(Object): number,
 *   title: function(Object): string
 * }} ngeox.profile.PoiExtractor
 */
ngeox.profile.PoiExtractor;


/**
 * Extract the id of a POI.
 * @type {function(Object): string}
 */
ngeox.profile.PoiExtractor.prototype.id;


/**
 * Extract the distance from origin of a POI.
 * @type {function(Object): number}
 */
ngeox.profile.PoiExtractor.prototype.dist;


/**
 * Extract the elevation of a POI.
 * @type {function(Object, number=): number}
 */
ngeox.profile.PoiExtractor.prototype.z;


/**
 * Extract the sequence number of a POI.
 * @type {function(Object): number}
 */
ngeox.profile.PoiExtractor.prototype.sort;


/**
 * Extract the title of a POI.
 * @type {function(Object): string}
 */
ngeox.profile.PoiExtractor.prototype.title;



/**
 * @typedef {{
 *   xhover: function(number, string): string,
 *   yhover: function(number, string): string,
 *   xtick: function(number, string): (string|number),
 *   ytick: function(number, string): (string|number)
 * }}
 */
ngeox.profile.ProfileFormatter;


/**
 * Format the xhover distance.
 * @type {function(number, string): string}
 */
ngeox.profile.ProfileFormatter.prototype.xhover;


/**
 * Format the yhover elevation.
 * @type {function(number, string): string}
 */
ngeox.profile.ProfileFormatter.prototype.yhover;


/**
 * Format the xtick, for graduating the x axis.
 * @type {function(number, string): (string|number)}
 */
ngeox.profile.ProfileFormatter.prototype.xtick;


/**
 * Format the ytick, for graduating the y axis.
 * @type {function(number, string): (string|number)}
 */
ngeox.profile.ProfileFormatter.prototype.ytick;


/**
 * @interface
 */
ngeox.MeasureEvent = function() {};


/**
 * @type {ol.Feature}
 */
ngeox.MeasureEvent.prototype.feature;


/**
 * Options for the mobile geolocations directive.
 * @typedef {{
 *    accuracyFeatureStyle: (ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined),
 *    positionFeatureStyle: (ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined),
 *    zoom: (number|undefined)
 * }}
 */
ngeox.MobileGeolocationDirectiveOptions;


/**
 * The style to use to sketch the accuracy feature, which is a regular polygon.
 * @type {ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined}
 */
ngeox.MobileGeolocationDirectiveOptions.prototype.accuracyFeatureStyle;


/**
 * The style to use to sketch the position feature, which is a point.
 * @type {ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined}
 */
ngeox.MobileGeolocationDirectiveOptions.prototype.positionFeatureStyle;


/**
 * If set, in addition to recentering the map view at the location, determines
 * the zoom level to set when obtaining a new position.
 * @type {number|undefined}
 */
ngeox.MobileGeolocationDirectiveOptions.prototype.zoom;


/**
 * Options for the mobile geolocations directive.
 * @typedef {{
 *    accuracyFeatureStyle: (ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined),
 *    positionFeatureStyle: (ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined),
 *    zoom: (number|undefined)
 * }}
 */
ngeox.DesktopGeolocationDirectiveOptions;


/**
 * The style to use to sketch the accuracy feature, which is a regular polygon.
 * @type {ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined}
 */
ngeox.DesktopGeolocationDirectiveOptions.prototype.accuracyFeatureStyle;


/**
 * The style to use to sketch the position feature, which is a point.
 * @type {ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined}
 */
ngeox.DesktopGeolocationDirectiveOptions.prototype.positionFeatureStyle;


/**
 * If set, in addition to recentering the map view at the location, determines
 * the zoom level to set when obtaining a new position.
 * @type {number|undefined}
 */
ngeox.DesktopGeolocationDirectiveOptions.prototype.zoom;


/**
 * @typedef {{
 *   open: (function()|undefined),
 *   close: (function()|undefined),
 *   cursorchange: (function(jQuery.Event, Object,
 *       TypeaheadDataset)|undefined),
 *   select: (function(jQuery.Event, Object,
 *       TypeaheadDataset)|undefined),
 *   autocomplete: (function(jQuery.Event, Object,
 *       TypeaheadDataset)|undefined)
 * }}
 */
ngeox.SearchDirectiveListeners;


/**
 * @type {function()|undefined}
 */
ngeox.SearchDirectiveListeners.prototype.open;


/**
 * @type {function()|undefined}
 */
ngeox.SearchDirectiveListeners.prototype.close;


/**
 * @type {function(jQuery.Event, Object, TypeaheadDataset)|undefined}
 */
ngeox.SearchDirectiveListeners.prototype.cursorchange;


/**
 * @type {function(jQuery.Event, Object, TypeaheadDataset)|undefined}
 */
ngeox.SearchDirectiveListeners.prototype.select;


/**
 * @type {function(jQuery.Event, Object, TypeaheadDataset)|undefined}
 */
ngeox.SearchDirectiveListeners.prototype.autocomplete;


/**
 * @interface
 */
ngeox.BackgroundEvent = function() {};


/**
 * @type {ol.layer.Base}
 */
ngeox.BackgroundEvent.prototype.previous;
