/**
 * Definitions for externs that are missing in the
 * current Closure Compiler.
 *
 * @externs
 */


/**
 * @type {string}
 */
Navigator.prototype.systemLanguage;


/**
 * @type {string}
 */
Navigator.prototype.userLanguage;


/**
 * Missing in angular
 * @typedef {{
 *     GROUP_SEP: (string),
 *     DECIMAL_SEP: (string)
 * }}
 */
angular.NUMBER_FORMATS;

/**
 * Missing in angular
 * @type {angular.NUMBER_FORMATS}
 */
angular.$locale.prototype.NUMBER_FORMATS;


// See https://github.com/google/closure-compiler/pull/2201
/**
 * @param {boolean=} opt_enabled
 * @return {boolean|!angular.$compileProvider}
 */
angular.$compileProvider.prototype.preAssignBindingsEnabled = function(opt_enabled) {};
