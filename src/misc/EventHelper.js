/**
 * @module ngeo.misc.EventHelper
 */
import * as olEvents from 'ol/events.js';

/**
 * Provides methods to manage the listening/unlistening of OpenLayers events
 *
 * @constructor
 * @struct
 * @ngdoc service
 * @ngname ngeoEventHelper
 * @ngInject
 */
const exports = function() {

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
exports.prototype.addListenerKey = function(uid, key) {
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
exports.prototype.clearListenerKey = function(uid) {
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
exports.prototype.initListenerKey_ = function(uid) {
  if (!this.listenerKeys_[uid]) {
    this.listenerKeys_[uid] = [];
  } else {
    if (this.listenerKeys_[uid].length) {
      this.listenerKeys_[uid].forEach(olEvents.unlistenByKey);
      this.listenerKeys_[uid].length = 0;
    }
  }
};


/**
 * @type {!angular.Module}
 */
exports.module = angular.module('ngeoEventHelper', []);
exports.module.service('ngeoEventHelper', exports);


export default exports;
