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
 *    elevationExtractor: ngeox.profile.ElevationExtractor,
 *    poiExtractor: ngeox.profile.PoiExtractor,
 *    light: (boolean|undefined),
 *    hoverCallback: (function(Object)|undefined),
 *    outCallback: (function()|undefined)
 *  }}
 */
ngeox.profile.ProfileOptions;


/**
 * @type {ngeox.profile.ElevationExtractor}
 */
ngeox.profile.ProfileOptions.prototype.elevationExtractor;


/**
 * @type {ngeox.profile.PoiExtractor}
 */
ngeox.profile.ProfileOptions.prototype.poiExtractor;


/**
 * @type {boolean|undefined}
 */
ngeox.profile.ProfileOptions.prototype.light;


/**
 * @type {function(Object)|undefined}
 */
ngeox.profile.ProfileOptions.prototype.hoverCallback;


/**
 * @type {function()|undefined}
 */
ngeox.profile.ProfileOptions.prototype.outCallback;


/**
 * Elevation data extractor.
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
 * POI data extractor.
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
 * Extract the id of a point.
 * @type {function(Object): string}
 */
ngeox.profile.PoiExtractor.prototype.id;


/**
 * Extract the distance from origin of a point.
 * @type {function(Object): number}
 */
ngeox.profile.PoiExtractor.prototype.dist;


/**
 * Extract the elevation of a point.
 * @type {function(Object, number=): number}
 */
ngeox.profile.PoiExtractor.prototype.z;


/**
 * Extract the sequence number of a point.
 * @type {function(Object): number}
 */
ngeox.profile.PoiExtractor.prototype.sort;


/**
 * Extract the title of a point.
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

