/**
 * @fileoverview Externs for Typeahead and Bloodhound 0.10.5
 * @see https://github.com/twitter/typeahead.js/blob/master/doc/jquery_typeahead.md
 * @see https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md
 * @externs
 */


/**
 * @typedef {Object.<string,*>}
 */
var BloodhoundDatum;

/**
 * @typedef {{
 *   url: string,
 *   wildcard: (string|undefined),
 *   replace: (function(string,string):string|undefined),
 *   rateLimitBy: (string|undefined),
 *   rateLimitWait: (number|undefined),
 *   filter: (function(?):Array.<BloodhoundDatum>|undefined),
 *   ajax: (jQueryAjaxSettings|undefined)
 * }}
 */
var BloodhoundRemoteOptions;

/**
 * @typedef {{
 *   url: string,
 *   cacheKey: (string|undefined),
 *   ttl: (number|undefined),
 *   thumbprint: (string|undefined),
 *   filter: (function(?):Array.<BloodhoundDatum>|undefined),
 *   ajax: (Object.<string,*>|undefined)
 * }}
 */
var BloodhoundPrefetchOptions;

/**
 * @typedef {{
 *   datumTokenizer: function(BloodhoundDatum):Array.<string>,
 *   queryTokenizer: function(string):Array.<string>,
 *   limit: (number|undefined),
 *   dupDetector: (function():boolean|undefined),
 *   sorter: (function(BloodhoundDatum,BloodhoundDatum):number|undefined),
 *   local: (Array.<BloodhoundDatum>|function():Array.<BloodhoundDatum>|undefined),
 *   prefetch: (string|BloodhoundPrefetchOptions|undefined),
 *   remote: (string|BloodhoundRemoteOptions|undefined)
 * }}
 */
var BloodhoundOptions;

/**
 * @constructor
 * @param {BloodhoundOptions} options
 */
function Bloodhound(options) {};

/**
 * @param {boolean=} opt_reinitialize
 * @return {jQuery.Promise}
 */
Bloodhound.prototype.initialize = function(opt_reinitialize) {};

/**
 * @param {Array.<BloodhoundDatum>} datums
 */
Bloodhound.prototype.add = function(datums) {};

/**
 *
 */
Bloodhound.prototype.clear = function() {};

/**
 *
 */
Bloodhound.prototype.clearPrefetchCache = function() {};

/**
 *
 */
Bloodhound.prototype.clearRemoteCache = function() {};

/**
 * @return {Bloodhound}
 */
Bloodhound.prototype.noConflict = function() {};

/**
 * @param {string} query
 * @param {function(Array.<BloodhoundDatum>):?} callback
 */
Bloodhound.prototype.get = function(query, callback) {};

/**
 * @return {function(string, function(Array.<BloodhoundDatum>))}
 */
Bloodhound.prototype.ttAdapter = function() {};

Bloodhound.tokenizers = {};

/**
 * @param {string} datum
 * @return {Array.<string>}
 */
Bloodhound.tokenizers.whitespace = function(datum) {};

/**
 * @param {string} datum
 * @return {Array.<string>}
 */
Bloodhound.tokenizers.nonword = function(datum) {};

Bloodhound.tokenizers.obj = {};

/**
 * @param {string} key
 * @return {function(BloodhoundDatum):Array.<string>}
 */
Bloodhound.tokenizers.obj.whitespace = function(key) {};

/**
 * @param {string} key
 * @return {function(BloodhoundDatum):Array.<string>}
 */
Bloodhound.tokenizers.obj.nonword = function(key) {};


/**
 * @typedef {{
 *   empty: (function(Object):string|undefined),
 *   footer: (function(Object):string|undefined),
 *   header: (function(Object):string|undefined),
 *   suggestion: (function(Object):string|undefined)
 * }}
 */
var TypeaheadTemplates;

/**
 * @typedef {{
 *   source: function(string,function(Array.<BloodhoundDatum>)),
 *   name: (string|undefined),
 *   displayKey: (string|undefined),
 *   templates: (TypeaheadTemplates|undefined)
 * }}
 */
var TypeaheadDataset;

/**
 * @typedef {{
 *   highlight: (boolean|undefined),
 *   hint: (boolean|undefined),
 *   minLength: (number|undefined)
 * }}
 */
var TypeaheadOptions;

/**
 * @param {string|TypeaheadOptions} options
 * @param {...TypeaheadDataset} var_dataset
 * @return {!jQuery}
 */
jQuery.prototype.typeahead = function(options, var_dataset) {};


/**
 * @param {string|TypeaheadOptions} options
 * @param {...TypeaheadDataset} var_dataset
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.typeahead = function(options, var_dataset) {};
