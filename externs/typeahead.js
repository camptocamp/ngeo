/**
 * @fileoverview Externs for Typeahead and Bloodhound 0.11.1
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
 *   rateLimitBy: (string|undefined),
 *   rateLimitWait: (number|undefined),
 *   prepare: function(string, jQueryAjaxSettings):jQueryAjaxSettings,
 *   transform: (function(?):Array.<BloodhoundDatum>|undefined)
 * }}
 */
var BloodhoundRemoteOptions;

/**
 * @typedef {{
 *   url: string,
 *   cache: (boolean|undefined),
 *   ttl: (number|undefined),
 *   cacheKey: (string|undefined),
 *   thumbprint: (string|undefined)
 * }}
 */
var BloodhoundPrefetchOptions;

/**
 * @typedef {{
 *   datumTokenizer: function(BloodhoundDatum):Array.<string>,
 *   queryTokenizer: function(string):Array.<string>,
 *   initialize: (string|undefined),
 *   identify: (function(BloodhoundDatum):string|undefined),
 *   sufficient: (number|undefined),
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
 *   notFound: (function(Object):string|undefined),
 *   pending: (function(Object):string|undefined),
 *   footer: (function(Object):string|undefined),
 *   header: (function(Object):string|undefined),
 *   suggestion: (function(Object):string|undefined)
 * }}
 */
var TypeaheadTemplates;

/**
 * @typedef {{
 *   source: function(string,function(Array.<BloodhoundDatum>)),
 *   async: (boolean|undefined),
 *   name: (string|undefined),
 *   limit: (number|undefined),
 *   display: (string|function(Object):string|undefined),
 *   templates: (TypeaheadTemplates|undefined)
 * }}
 */
var TypeaheadDataset;

/**
 * @typedef {{
 *   wrapper: (string|undefined),
 *   input: (string|undefined),
 *   hint: (string|undefined),
 *   menu: (string|undefined),
 *   dataset: (string|undefined),
 *   suggestion: (string|undefined),
 *   selectable: (string|undefined),
 *   empty: (string|undefined),
 *   open: (string|undefined),
 *   cursor: (string|undefined),
 *   highlight: (string|undefined)
 * }}
 */
var TypeaheadClassNames;

/**
 * @typedef {{
 *   highlight: (boolean|undefined),
 *   hint: (boolean|undefined),
 *   minLength: (number|undefined),
 *   classNames: (TypeaheadClassNames|undefined)
 * }}
 */
var TypeaheadOptions;

/**
 * @param {TypeaheadOptions|string} options
 * @param {...TypeaheadDataset|string} var_dataset
 * @return {!jQuery}
 */
jQuery.prototype.typeahead = function(options, var_dataset) {};


/**
 * @param {TypeaheadOptions|string} options
 * @param {...TypeaheadDataset|string} var_dataset
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.typeahead = function(options, var_dataset) {};
