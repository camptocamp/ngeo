/**
 * @externs
 */

/**
 * @private
 * @type {Object}
 */
var ngeox;


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
 *   yLowerBound: (number|undefined),
 *   ratioXYRule: (function(number): number|undefined),
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
 * Lower bound for the y domain.
 * @type {number|undefined}
 */
ngeox.profile.ProfileOptions.prototype.yLowerBound;


/**
 * Return a ratio value for constraining the y domain based on the maximum
 * value from the x domain. In the absence of constraint, use a negative value.
 * @type {function(number):number|undefined}
 */
ngeox.profile.ProfileOptions.prototype.ratioXYRule;


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
