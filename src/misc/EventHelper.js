import angular from 'angular';
import * as olEvents from 'ol/events.js';

/**
 * Provides methods to manage the listening/unlistening of OpenLayers events
 *
 * @constructor
 * @ngdoc service
 * @ngname ngeoEventHelper
 * @ngInject
 * @hidden
 */
export function EventHelper() {
  /**
   * @type {Object.<number|string, Array.<import("ol/events.js").EventsKey>>}
   * @private
   */
  this.listenerKeys_ = {};
}

/**
 * Utility method to add a listener key bound to a unique id. The key has
 * to come from `ol.events`.
 * @param {number|string} uid Unique id.
 * @param {import("ol/events.js").EventsKey} key Key.
 */
EventHelper.prototype.addListenerKey = function (uid, key) {
  if (!this.listenerKeys_[uid]) {
    this.initListenerKey_(uid);
  }
  this.listenerKeys_[uid].push(/** @type {import("ol/events.js").EventsKey} */ (key));
};

/**
 * Clear all listener keys from the given unique id.
 * @param {number|string} uid Unique id.
 */
EventHelper.prototype.clearListenerKey = function (uid) {
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
EventHelper.prototype.initListenerKey_ = function (uid) {
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
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoEventHelper', []);
module.service('ngeoEventHelper', EventHelper);

export default module;
