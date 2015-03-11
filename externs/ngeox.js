/**
 * @type {Object}
 */
var ngeox;

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
 *  @typedef {{
 *    styleDefs: (string|undefined),
 *    elevationExtractor: ngeox.profile.ElevationExtractor,
 *    poiExtractor: ngeox.profile.PoiExtractor,
 *    light: (boolean|undefined),
 *    hoverCallback: (function(Object)|undefined),
 *    outCallback: (function()|undefined)
 *  }}
 */
ngeox.profile.ProfileOptions;


/**
 * Inline CSS style definition to inject in the SVG.
 * @type {string|undefined}
 */
ngeox.profile.ProfileOptions.prototype.styleDefs;


/**
 * Extractor for parsing elevation data.
 * @type {ngeox.profile.ElevationExtractor}
 */
ngeox.profile.ProfileOptions.prototype.elevationExtractor;


/**
 * Extractor for parsing POI data.
 * @type {ngeox.profile.PoiExtractor}
 */
ngeox.profile.ProfileOptions.prototype.poiExtractor;


/**
 * Show a simplified profile when true.
 * @type {boolean|undefined}
 */
ngeox.profile.ProfileOptions.prototype.light;


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
 * }}
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
 * @interface
 */
ngeox.MeasureEvent = function() {};


/**
 * @type {ol.Feature}
 */
ngeox.MeasureEvent.prototype.feature;

