/**
 * @externs
 * @see https://angular-gettext.rocketeer.be
 */


/**
 * @typedef {function(string): string}
 */
let gettext;


/**
 * @const
 */
let angularGettext = {};


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


// https://github.com/rubenv/angular-gettext/blob/5a5b42ba4d0a2eff1d60bdff65a0e849aea19cf5/src/catalog.js#L265
/**
 * @param {number} n
 * @param {string} string
 * @param {string} stringPlural
 * @param {Object<string, string>=} opt_scope Scope to do interpolation against
 * @param {string=} opt_context translation key context
 * @return {string}
 */
angularGettext.Catalog.prototype.getPlural = function(n, string, stringPlural, opt_scope, opt_context) {};


// https://github.com/rubenv/angular-gettext/blob/5a5b42ba4d0a2eff1d60bdff65a0e849aea19cf5/src/catalog.js#L214
/**
 * @param {string} language
 * @param {string} key
 * @param {number=} opt_n
 * @param {string=} opt_context translation key context
 * @return {string|null}
 */
angularGettext.Catalog.prototype.getStringForm = function(language, key, opt_n, opt_context) {};


// https://github.com/rubenv/angular-gettext/blob/5a5b42ba4d0a2eff1d60bdff65a0e849aea19cf5/src/catalog.js#L243
/**
 * @param {string} string
 * @param {Object.<string, string>=} opt_scope Scope to do interpolation against
 * @param {string=} opt_context translation key context
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
