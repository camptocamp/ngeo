/**
 * @externs
 * @see https://angular-gettext.rocketeer.be
 */


/**
 * @typedef {function(string):string}
 */
var gettext;


/**
 * @const
 */
var angularGettext = {};


/**
 * @typedef {{
 *   currentLanguage: string,
 *   debug: boolean,
 *   getPlural: function(number, string, string, Object.<string, string>=):string,
 *   getStringForm: function(string, number):string,
 *   getString: function(string, Object.<string, string>=),
 *   loadRemote: function(string),
 *   setCurrentLanguage: function(string),
 *   setStrings: function(string, Object.<string, string>),
 *   strings: Object.<string, string>
 *   }}
 */
angularGettext.Catalog;


/**
 * @type {string}
 */
angularGettext.Catalog.currentLanguage;


/**
 * @type {boolean}
 */
angularGettext.Catalog.debug;


/**
 * @param {number} n
 * @param {string} string
 * @param {string} stringPlural
 * @param {Object.<string, string>=} opt_context
 * @return {string}
 */
angularGettext.Catalog.getPlural = function(n, string, stringPlural, opt_context) {};


/**
 * @param {string} string
 * @param {number} n
 * @return {string}
 */
angularGettext.Catalog.getStringForm = function(string, n) {};


/**
 * @param {string} string
 * @param {Object.<string, string>=} opt_context
 * @return {string}
 */
angularGettext.Catalog.getString = function(string, opt_context) {};


/**
 * @param {string} url
 */
angularGettext.Catalog.loadRemote = function(url) {};


/**
 * @param {string} lang
 */
angularGettext.Catalog.setCurrentLanguage = function(lang) {};


/**
 * @param {string} language
 * @param {Object.<string, string>} strings
 */
angularGettext.Catalog.setStrings = function(language, strings) {};


/**
 * @type {Object.<string, string>}
 */
angularGettext.Catalog.strings;
