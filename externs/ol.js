/**
 * @externs
 */


/**
 * @type {Object}
 */
var ol = {};


/**
 * @constructor
 * @extends {ol.Object}
 */
ol.Collection = function() {};


/**
 * @constructor
 */
ol.Map = function() {};

/**
 * @param {Element|string|undefined} target
 */
ol.Map.prototype.setTarget = function(target) {};


/**
 * @constructor
 * @extends {ol.Observable}
 */
ol.Object = function() {};


/**
 * @constructor
 */
ol.Observable = function() {};


/**
 * @param {string|Array.<string>} type The event type or array of event types.
 * @param {function(?): ?} listener The listener function.
 * @param {Object=} opt_this The object to use as `this` in `listener`.
 * @return {goog.events.Key} Unique key for the listener.
 */
ol.Observable.prototype.on = function(type, listener, opt_this) {};


/**
 * @type {Object}
 */
ol.layer = {};


/**
 * @constructor
 * @extends {ol.Object}
 */
ol.layer.Base = function() {};


/**
 * @return {boolean|undefined}
 */
ol.layer.Base.prototype.getVisible = function() {};


/**
 * @return {number|undefined}
 */
ol.layer.Base.prototype.getOpacity = function() {};


/**
 * @param {boolean|undefined} visible
 */
ol.layer.Base.prototype.setVisible = function(visible) {};


/**
 * @param {number|undefined} opacity
 */
ol.layer.Base.prototype.setOpacity = function(opacity) {};


/**
 * @constructor
 * @extends {ol.layer.Base}
 */
ol.layer.Layer = function() {};
