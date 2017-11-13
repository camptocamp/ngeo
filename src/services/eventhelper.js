goog.provide('ngeo.EventHelper');

goog.require('ngeo');


/**
 * Provides methods to manage the listening/unlistening of OpenLayers events
 *
 * @constructor
 * @struct
 * @ngdoc service
 * @ngname ngeoEventHelper
 * @ngInject
 */
ngeo.EventHelper = function() {

  /**
   * @type {Object.<number|string, Array.<ol.EventsKey>>}
   * @private
   */
  this.listenerKeys_ = {};

};


/**
 * Utility method to add a listener key bound to a unique id. The key has
 * to come from `ol.events`.
 * @param {number|string} uid Unique id.
 * @param {ol.EventsKey} key Key.
 * @export
 */
ngeo.EventHelper.prototype.addListenerKey = function(uid, key) {
  if (!this.listenerKeys_[uid]) {
    this.initListenerKey_(uid);
  }
  this.listenerKeys_[uid].push(/** @type {ol.EventsKey} */ (key));
};


/**
 * Clear all listener keys from the given unique id.
 * @param {number|string} uid Unique id.
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
 * @param {number|string} uid Unique id.
 * @private
 */
ngeo.EventHelper.prototype.initListenerKey_ = function(uid) {
  if (!this.listenerKeys_[uid]) {
    this.listenerKeys_[uid] = [];
  } else {
    if (this.listenerKeys_[uid].length) {
      this.listenerKeys_[uid].forEach((key) => {
        ol.events.unlistenByKey(key);
      }, this);
      this.listenerKeys_[uid].length = 0;
    }
  }
};

ngeo.module.service('ngeoEventHelper', ngeo.EventHelper);
