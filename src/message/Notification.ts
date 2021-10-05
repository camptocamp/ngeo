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

import 'bootstrap/js/src/alert';

import ngeoMessageMessage, {Message, MessageType} from 'ngeo/message/Message';
import {getUid as olUtilGetUid} from 'ol/util';

/**
 * Default delay (in milliseconds) a message should be displayed.
 *
 * @private
 */
const DEFAULT_DELAY = 7000;

type CacheItem = {
  el: Element;
  promise?: number;
};

/**
 * Provides methods to display any sort of messages, notifications, errors,
 * etc. Requires Bootstrap library (both CSS and JS) to display the alerts
 * properly.
 *
 * @abstract
 */
export class MessageNotification extends ngeoMessageMessage {
  /**
   * @private
   */
  container_: HTMLElement;

  /**
   * @private
   */
  cache_: {[key: string]: CacheItem};

  /**
   * Provides methods to display any sort of messages, notifications, errors,
   * etc. Requires Bootstrap library (both CSS and JS) to display the alerts
   * properly.
   */
  constructor() {
    super();

    const container = document.createElement('div');
    container.classList.add('ngeo-notification');
    document.body.append(container);

    /**
     * @private
     */
    this.container_ = container;

    /**
     * @private
     */
    this.cache_ = {};
  }

  // MAIN API METHODS

  /**
   * Display the given message string or object or list of message strings or
   * objects.
   *
   * @param object
   *     A message or list of messages as text or configuration objects.
   */
  notify(object: string | string[] | Message | Message[]): void {
    this.show(object);
  }

  /**
   * Clears all messages that are currently being shown.
   */
  clear(): void {
    for (const uid in this.cache_) {
      this.clearMessageByCacheItem_(this.cache_[parseInt(uid, 10)]);
    }
  }

  /**
   * @override
   * @param message Message.
   */
  showMessage(message: Message): void {
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

    const el = document.createElement('div');
    classNames.forEach((style) => el.classList.add(style));
    let container;

    if (message.target) {
      container = message.target;
    } else {
      container = this.container_;
    }

    container.append(el);
    el.innerHTML = message.msg.normalize('NFD').replace(/([\u0300-\u036f]|[\u003C\u003E])/g, '');
    el.classList.add('show');

    const delay = message.delay !== undefined ? message.delay : DEFAULT_DELAY;

    const item = {
      el,
    } as CacheItem;

    // Keep a reference to the promise, in case we want to manually cancel it
    // before the delay
    const uid = olUtilGetUid(el);

    item.promise = window.setTimeout(() => {
      // Close the message
      // This use the bootstrap way to do it, using itself jQuery API:
      // https://getbootstrap.com/docs/4.1/components/alerts/#dismissing
      $(el).alert('close');
      delete this.cache_[uid];
    }, delay);

    this.cache_[uid] = item;
  }

  /**
   * Clear a message using its cache item.
   *
   * @param item Cache item.
   * @private
   */
  clearMessageByCacheItem_(item: CacheItem): void {
    const el = item.el;
    const promise = item.promise;
    const uid = olUtilGetUid(el);

    // Close the message
    // This use the bootstrap way to do it, using itself jQuery API:
    // https://getbootstrap.com/docs/4.1/components/alerts/#dismissing
    $(el).alert('close');

    // Cancel timeout in case we want to stop before delay. If called by the
    // timeout itself, then this has no consequence.
    clearTimeout(promise);

    // Delete the cache item
    delete this.cache_[uid];
  }
}

const ngeoMessageNotification = new MessageNotification();
export default ngeoMessageNotification;
