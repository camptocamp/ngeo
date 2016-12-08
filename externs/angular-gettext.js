/**
 * @externs
 * @see https://angular-gettext.rocketeer.be
 */


/**
 * @typedef {function(string): string}
 */
var gettext;


/**
 * @const
 */
var angularGettext = {};


/**
 * @interface
 */
angularGettext.Catalog = function() {};


/**
 * @type {string}
 */
angularGettext.Catalog.prototype.currentLanguage;


/**
 * @type {boolean}
 */
angularGettext.Catalog.prototype.debug;


/**
 * @param {number} n
 * @param {string} string
 * @param {string} stringPlural
 * @param {Object.<string, string>=} opt_context
 * @return {string}
 */
angularGettext.Catalog.prototype.getPlural = function(n, string, stringPlural, opt_context) {};


/**
 * @param {string} string
 * @param {number} n
 * @return {string}
 */
angularGettext.Catalog.prototype.getStringForm = function(string, n) {};


/**
 * @param {string} string
 * @param {Object.<string, string>=} opt_scope
 * @param {Object.<string, string>=} opt_context
 * @return {string}
 */
angularGettext.Catalog.prototype.getString = function(string, opt_scope, opt_context) {};


/**
 * @param {string} url
 */
angularGettext.Catalog.prototype.loadRemote = function(url) {};


/**
 * @param {string} lang
 */
angularGettext.Catalog.prototype.setCurrentLanguage = function(lang) {};


/**
 * @return {string} lang
 */
angularGettext.Catalog.prototype.getCurrentLanguage = function() {};


/**
 * @param {string} language
 * @param {Object.<string, string>} strings
 */
angularGettext.Catalog.prototype.setStrings = function(language, strings) {};


/**
 * @type {Object.<string, string>}
 */
angularGettext.Catalog.prototype.strings;
