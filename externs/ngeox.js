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
 *    startMsg: (string|undefined),
 *    continueMsg: (string|undefined),
 *    style: (ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined),
 *    sketchStyle: (ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined)
 * }}
 */
ngeox.interaction.MeasureOptions;


/**
 * The message to show in the help tooltip when the user just activated the
 * interaction.
 * @type {string|undefined}
 */
ngeox.interaction.MeasureOptions.prototype.startMsg;


/**
 * The message to show in the help tooltip when the user already added the
 * first point.
 * @type {string|undefined}
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
 *    extractor: ngeox.profile.ProfileExtractor,
 *    light: (boolean|undefined),
 *    hoverCallback: (function(Object)|undefined),
 *    outCallback: (function()|undefined)
 *  }}
 */
ngeox.profile.ProfileOptions;


/**
 * @type {ngeox.profile.ProfileExtractor}
 */
ngeox.profile.ProfileOptions.prototype.extractor;


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
 * Profile data extractor.
 * @typedef {{
 *   z: function(Object): number,
 *   dist: function(Object): number
 * }}
 */
ngeox.profile.ProfileExtractor;


/**
 * @type {function(Object, string=): number}
 */
ngeox.profile.ProfileExtractor.prototype.z;


/**
 * @type {function(Object): number}
 */
ngeox.profile.ProfileExtractor.prototype.dist;
