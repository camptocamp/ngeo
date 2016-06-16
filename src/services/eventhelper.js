goog.provide('ngeo.EventHelper');

goog.require('ngeo');


/**
 * Provides methods to manage the listening/unlistening of all sorts of
 * events:
 * - events from OpenLayers
 * - events from Closure Library
 *
 * @constructor
 * @ngdoc service
 * @ngname ngeoEventHelper
 * @ngInject
 */
ngeo.EventHelper = function() {

  /**
   * @type {Object.<number, ngeo.EventHelper.ListenerKeys>}
   * @private
   */
  this.listenerKeys_ = {};

};


/**
 * Utility method to add a listener key bound to a unique id. The key can
 * come from an `ol.events` (default) or `goog.events`.
 * @param {number} uid Unique id.
 * @param {ol.EventsKey|goog.events.Key} key Key.
 * @param {boolean=} opt_isol Whether it's an OpenLayers event or not. Defaults
 *     to true.
 * @export
 */
ngeo.EventHelper.prototype.addListenerKey = function(uid, key, opt_isol) {
  if (!this.listenerKeys_[uid]) {
    this.initListenerKey_(uid);
  }

  var isol = opt_isol !== undefined ? opt_isol : true;
  if (isol) {
    this.listenerKeys_[uid].ol.push(/** @type {ol.EventsKey} */ (key));
  } else {
    this.listenerKeys_[uid].goog.push(/** @type {goog.events.Key} */ (key));
  }
};


/**
 * Clear all listener keys from the given unique id.
 * @param {number} uid Unique id.
 * @export
 */
ngeo.EventHelper.prototype.clearListenerKey = function(uid) {
  this.initListenerKey_(uid);
};


/**
 * Utility method that does 2 things:
 * - initialize the listener keys of a given uid with an array (if that key
 *   has not array set yet)
 * - unlisten any events if the array already exists for the given uid and
 *   empty the array.
 * @param {number} uid Unique id.
 * @private
 */
ngeo.EventHelper.prototype.initListenerKey_ = function(uid) {
  if (!this.listenerKeys_[uid]) {
    this.listenerKeys_[uid] = {
      goog: [],
      ol: []
    };
  } else {
    if (this.listenerKeys_[uid].goog.length) {
      this.listenerKeys_[uid].goog.forEach(function(key) {
        goog.events.unlistenByKey(key);
      }, this);
      this.listenerKeys_[uid].goog.length = 0;
    }
    if (this.listenerKeys_[uid].ol.length) {
      this.listenerKeys_[uid].ol.forEach(function(key) {
        ol.events.unlistenByKey(key);
      }, this);
      this.listenerKeys_[uid].ol.length = 0;
    }
  }
};


/**
 * @typedef {{
 *     goog: (Array.<goog.events.Key>),
 *     ol: (Array.<ol.EventsKey>)
 * }}
 */
ngeo.EventHelper.ListenerKeys;


ngeo.module.service('ngeoEventHelper', ngeo.EventHelper);
