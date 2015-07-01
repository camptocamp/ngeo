/**
 * @fileoverview Definitions for externs that are missing in the
 * current Closure Compiler.
 *
 * @externs
 */


/**
 * @type {Array.<string>}
 */
Navigator.prototype.languages;


/**
 * @type {string}
 */
Navigator.prototype.systemLanguage;


/**
 * @type {string}
 */
Navigator.prototype.userLanguage;


/**
 * @param {(string|function(!angular.Scope))=} opt_exp
 */
angular.Scope.prototype.$applyAsync = function(opt_exp) {};


/**
 * @param {string} event
 * @param {JQLiteSelector} container
 * @param {function(JQLiteSelector, string)} callback
 */
angular.$animate.prototype.on = function(event, container, callback) {};
