// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import {unlistenByKey} from 'ol/events.js';

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
   * @type {Object<number|string, Array<import("ol/events.js").EventsKey>>}
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
 */
EventHelper.prototype.initListenerKey_ = function (uid) {
  if (!this.listenerKeys_[uid]) {
    this.listenerKeys_[uid] = [];
  } else {
    if (this.listenerKeys_[uid].length) {
      this.listenerKeys_[uid].forEach(unlistenByKey);
      this.listenerKeys_[uid].length = 0;
    }
  }
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoEventHelper', []);
module.service('ngeoEventHelper', EventHelper);

export default module;
