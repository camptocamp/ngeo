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
import 'bootstrap/js/src/alert.js';

import ngeoMessageMessage, {MessageType} from 'ngeo/message/Message.js';
import {getUid as olUtilGetUid} from 'ol/util.js';

/**
 * Default delay (in milliseconds) a message should be displayed.
 * @type {number}
 * @private
 * @hidden
 */
const DEFAULT_DELAY = 7000;

/**
 * Provides methods to display any sort of messages, notifications, errors,
 * etc. Requires Bootstrap library (both CSS and JS) to display the alerts
 * properly.
 * @abstract
 * @hidden
 */
export class MessageNotification extends ngeoMessageMessage {
  /**
   * Provides methods to display any sort of messages, notifications, errors,
   * etc. Requires Bootstrap library (both CSS and JS) to display the alerts
   * properly.
   * @param {angular.ITimeoutService} $timeout Angular timeout service.
   * @ngInject
   */
  constructor($timeout) {
    super();

    /**
     * @type {angular.ITimeoutService}
     * @private
     */
    this.timeout_ = $timeout;

    const container = angular.element('<div class="ngeo-notification"></div>');
    angular.element(document.body).append(container);

    /**
     * @type {JQuery}
     * @private
     */
    this.container_ = container;

    /**
     * @type {Object<string, CacheItem>}
     * @private
     */
    this.cache_ = {};
  }

  // MAIN API METHODS

  /**
   * Display the given message string or object or list of message strings or
   * objects.
   * @param {string | string[] | import('ngeo/message/Message.js').Message | import('ngeo/message/Message.js').Message[]}
   *     object A message or list of messages as text or configuration objects.
   * @param object
   */
  notify(object) {
    this.show(object);
  }

  /**
   * Clears all messages that are currently being shown.
   */
  clear() {
    for (const uid in this.cache_) {
      this.clearMessageByCacheItem_(this.cache_[parseInt(uid, 10)]);
    }
  }

  /**
   * @override
   * @param {import('ngeo/message/Message.js').Message} message Message.
   */
  showMessage(message) {
    const type = message.type;
    console.assert(typeof type == 'string', 'Type should be set.');

    const classNames = ['alert', 'fade', 'show'];
    switch (type) {
      case MessageType.ERROR:
        classNames.push('alert-danger');
        break;
      case MessageType.INFORMATION:
        classNames.push('alert-info');
        break;
      case MessageType.SUCCESS:
        classNames.push('alert-success');
        break;
      case MessageType.WARNING:
        classNames.push('alert-warning');
        break;
      default:
        break;
    }

    const el = angular.element(`<div class="${classNames.join(' ')}"></div>`);
    let container;

    if (message.target) {
      container = angular.element(message.target);
    } else {
      container = this.container_;
    }

    container.append(el);
    el.html(message.msg).addClass('show');

    const delay = message.delay !== undefined ? message.delay : DEFAULT_DELAY;

    const item = /** @type {CacheItem} */ ({
      el,
    });

    // Keep a reference to the promise, in case we want to manually cancel it
    // before the delay
    const uid = olUtilGetUid(el);
    item.promise = this.timeout_(() => {
      el.alert('close');
      delete this.cache_[uid];
    }, delay);

    this.cache_[uid] = item;
  }

  /**
   * Clear a message using its cache item.
   * @param {CacheItem} item Cache item.
   * @private
   */
  clearMessageByCacheItem_(item) {
    const el = item.el;
    const promise = item.promise;
    const uid = olUtilGetUid(el);

    // Close the message
    el.alert('close');

    // Cancel timeout in case we want to stop before delay. If called by the
    // timeout itself, then this has no consequence.
    this.timeout_.cancel(promise);

    // Delete the cache item
    delete this.cache_[uid];
  }
}

/**
 * @typedef {Object} CacheItem
 * @property {JQuery} el
 * @property {angular.IPromise<void>} promise
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoNotification', []);

myModule.service('ngeoNotification', MessageNotification);

export default myModule;
