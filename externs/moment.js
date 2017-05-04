/**
 * @constructor
 */
var Moment = function() {};


/**
 * @param {moment.UnitObject=} opt_add
 * @return {Moment}
 */
Moment.prototype.add = function(opt_add) {};


/**
 * @param {string=} opt_options
 * @return {string}
 */
Moment.prototype.format = function(opt_options) {};


/**
 * @param {moment.UnitObject=} opt_subtract
 * @return {Moment}
 */
Moment.prototype.subtract = function(opt_subtract) {};


/**
 * See: http://momentjs.com/docs/#/parsing/string-format/
 *      http://momentjs.com/docs/#/parsing/string-formats/
 *      http://momentjs.com/docs/#/parsing/unix-timestamp/
 *      http://momentjs.com/docs/#/parsing/date/
 *      http://momentjs.com/docs/#/parsing/array/
 *      http://momentjs.com/docs/#/parsing/moment-clone/
 * @param {Moment|Date|number|string|Array.<number>|Object.<string,*>=} opt_option1
 * @param {string|Array.<string>=} opt_option2
 * @param {string|boolean=} opt_option3
 * @param {boolean=} opt_option4
 * @return {Moment}
 */
var moment = function(opt_option1, opt_option2, opt_option3, opt_option4) {};


// ---------------------------------------------------------------------------
// @type {moment.UnitObject}
// ---------------------------------------------------------------------------


/**
 * Contains string:(string|number) values such as year, months, ms, etc...
 * @see http://momentjs.com/docs/#/parsing/object/
 * @typedef {{
 *     d: (number|string|undefined),
 *     date: (number|string|undefined),
 *     day: (number|string|undefined),
 *     days: (number|string|undefined),
 *
 *     h: (number|string|undefined),
 *     hour: (number|string|undefined),
 *     hours: (number|string|undefined),
 *
 *     ms: (number|string|undefined),
 *     millisecond: (number|string|undefined),
 *     milliseconds: (number|string|undefined),
 *
 *     m: (number|string|undefined),
 *     minute: (number|string|undefined),
 *     minutes: (number|string|undefined),
 *
 *     M: (number|string|undefined),
 *     month: (number|string|undefined),
 *     months: (number|string|undefined),
 *
 *     s: (number|string|undefined),
 *     second: (number|string|undefined),
 *     seconds: (number|string|undefined),
 *
 *     y: (number|string|undefined),
 *     year: (number|string|undefined),
 *     years: (number|string|undefined)
 * }}
 * @api stable
 */
moment.UnitObject;
