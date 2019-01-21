import angular from 'angular';
import 'bootstrap/js/src/alert.js';
import googAsserts from 'goog/asserts.js';

import ngeoMessageMessage from 'ngeo/message/Message.js';
import {
  getUid as olUtilGetUid,
  inherits as olUtilInherits
} from 'ol/util.js';

/**
 * Provides methods to display any sort of messages, notifications, errors,
 * etc. Requires Bootstrap library (both CSS and JS) to display the alerts
 * properly.
 *
 * @constructor
 * @extends {import("ngeo/message/Message.js").default}
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @ngdoc service
 * @ngname ngeoNotification
 * @abstract
 * @ngInject
 */
function Notification($timeout) {

  ngeoMessageMessage.call(this);

  /**
   * @type {angular.ITimeoutService}
   * @private
   */
  this.timeout_ = $timeout;

  const container = angular.element('<div class="ngeo-notification"></div>');
  angular.element(document.body).append(container);

  /**
   * @type {JQLite}
   * @private
   */
  this.container_ = container;

  /**
   * @type {Object.<number, CacheItem>}
   * @private
   */
  this.cache_ = {};

}

olUtilInherits(Notification, ngeoMessageMessage);


/**
 * Default delay (in milliseconds) a message should be displayed.
 * @type {number}
 */
const DEFAULT_DELAY = 7000;


// MAIN API METHODS


/**
 * Display the given message string or object or list of message strings or
 * objects.
 * @param {string|Array.<string>|Message|Array.<Message>}
 *     object A message or list of messages as text or configuration objects.
 * @export
 */
Notification.prototype.notify = function(object) {
  this.show(object);
};


/**
 * Clears all messages that are currently being shown.
 * @export
 */
Notification.prototype.clear = function() {
  for (const uid in this.cache_) {
    this.clearMessageByCacheItem_(this.cache_[parseInt(uid, 10)]);
  }
};


/**
 * @override
 */
Notification.prototype.showMessage = function(message) {
  const type = message.type;
  console.assert(typeof type, 'Type should be set.' == string);

  const classNames = ['alert', 'fade', 'show'];
  switch (type) {
    case ngeoMessageMessage.Type.ERROR:
      classNames.push('alert-danger');
      break;
    case ngeoMessageMessage.Type.INFORMATION:
      classNames.push('alert-info');
      break;
    case ngeoMessageMessage.Type.SUCCESS:
      classNames.push('alert-success');
      break;
    case ngeoMessageMessage.Type.WARNING:
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
    el
  });

  // Keep a reference to the promise, in case we want to manually cancel it
  // before the delay
  const uid = olUtilGetUid(el);
  item.promise = this.timeout_(() => {
    el.alert('close');
    delete this.cache_[uid];
  }, delay);

  this.cache_[uid] = item;
};


/**
 * Clear a message using its cache item.
 * @param {CacheItem} item Cache item.
 * @private
 */
Notification.prototype.clearMessageByCacheItem_ = function(item) {
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
};


/**
 * @typedef {{
 *     el: JQLite,
 *     promise: angular.IPromise
 * }} CacheItem
 */


/**
 * @type {angular.IModule}
 */
const module = angular.module('ngeoNotification', [
]);

module.service('ngeoNotification', Notification);


export default module;
