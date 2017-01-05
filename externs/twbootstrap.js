/**
 * Externs for Twitter Bootstrap
 *
 * @externs
 */


/**
 * @param {string=} opt_action
 * @return {!jQuery}
 */
jQuery.prototype.alert = function(opt_action) {};


/**
 * @param {string=} opt_action
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.alert = function(opt_action) {};


/**
 * @param {string=} opt_action
 * @return {!jQuery}
 */
jQuery.prototype.dropdown = function(opt_action) {};


/**
 * @param {string=} opt_action
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.dropdown = function(opt_action) {};


/**
 * @param {(string|Object.<string,*>)=} opt_options
 * @return {jQuery}
 */
jQuery.prototype.modal = function(opt_options) {};


/**
 * @param {(string|Object.<string,*>)=} opt_options
 * @return {angular.JQLite}
 */
angular.JQLite.prototype.modal = function(opt_options) {};


/**
 * @param {string|Object.<string,*>=} opt_option
 * @return {!jQuery}
 */
jQuery.prototype.popover = function(opt_option) {};


/**
 * @param {(string|Object.<string,*>)=} opt_options
 * @return {angular.JQLite}
 */
angular.JQLite.prototype.popover = function(opt_options) {};


/**
 * @param {string} action
 * @return {!jQuery}
 */
jQuery.prototype.tab = function(action) {};


/**
 * @param {string} action
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.tab = function(action) {};

/**
 * @typedef {{
   * animation: (boolean|undefined),
   * container: (string|boolean|undefined),
   * delay: (number|Object.<string,*>|undefined),
   * html: (boolean|undefined),
   * placement: (string|function(Element, Element)|undefined),
   * selector: (string|undefined),
   * template: (string|undefined),
   * title: (string|function()|undefined),
   * trigger: (string|undefined),
   * viewport: (string|Object.<string,*>|function(Element)|undefined)
 * }}
 */
let TooltipOptions;


/**
 * @param {(string|TooltipOptions)=} opt_options
 * @return {jQuery}
 */
jQuery.prototype.tooltip = function(opt_options) {};


/**
 * @param {(string|TooltipOptions)=} opt_options
 * @return {angular.JQLite}
 */
angular.JQLite.prototype.tooltip = function(opt_options) {};
