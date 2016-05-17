goog.provide('ngeo.Notification');

goog.require('goog.asserts');
goog.require('ngeo');


/**
 * @enum {string}
 * @export
 */
ngeo.NotificationType = {
  /**
   * @type {string}
   * @export
   */
  ERROR: 'error',
  /**
   * @type {string}
   * @export
   */
  INFORMATION: 'information',
  /**
   * @type {string}
   * @export
   */
  SUCCESS: 'success',
  /**
   * @type {string}
   * @export
   */
  WARNING: 'warning'
};


/**
 * Provides methods to display any sort of messages, notifications, errors,
 * etc.
 *
 * @constructor
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @ngdoc service
 * @ngname ngeoNotification
 * @ngInject
 */
ngeo.Notification = function($timeout) {

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.timeout_ = $timeout;

  var container = angular.element('<div class="ngeo-notification"></div>');
  angular.element(document.body).append(container);

  /**
   * @type {angular.JQLite}
   * @private
   */
  this.container_ = container;

  /**
   * @type {Object.<number, ngeo.Notification.CacheItem>}
   * @private
   */
  this.cache_ = {};

};


/**
 * Default delay (in milliseconds) a message should be displayed.
 * @type {number}
 * @private
 */
ngeo.Notification.DEFAULT_DELAY_ = 7000;


// MAIN API METHODS


/**
 * Display the given message string or object or list of message strings or
 * objects.
 * @param {string|Array.<string>|ngeox.Message|Array.<ngeox.Message>}
 *     object A message or list of messages as text or configuration objects.
 * @export
 */
ngeo.Notification.prototype.notify = function(object) {
  var msgObjects = this.getMessageObjects_(object);
  msgObjects.forEach(this.notifyMessage_, this);
};


/**
 * Clears all messages that are currently being shown.
 * @export
 */
ngeo.Notification.prototype.clear = function() {
  for (var uid in this.cache_) {
    this.clearMessageByCacheItem_(this.cache_[parseInt(uid, 10)]);
  }
};


// SHORTCUT METHODS


/**
 * Display the given error message or list of error messages.
 * @param {string|Array.<string>} message Message or list of messages.
 * @export
 */
ngeo.Notification.prototype.error = function(message) {
  this.notify(this.getMessageObjects_(
      message, ngeo.NotificationType.ERROR));
};


/**
 * Display the given info message or list of info messages.
 * @param {string|Array.<string>} message Message or list of messages.
 * @export
 */
ngeo.Notification.prototype.info = function(message) {
  this.notify(this.getMessageObjects_(
      message, ngeo.NotificationType.INFORMATION));
};


/**
 * Display the given success message or list of success messages.
 * @param {string|Array.<string>} message Message or list of messages.
 * @export
 */
ngeo.Notification.prototype.success = function(message) {
  this.notify(this.getMessageObjects_(
      message, ngeo.NotificationType.SUCCESS));
};


/**
 * Display the given warning message or list of warning messages.
 * @param {string|Array.<string>} message Message or list of messages.
 * @export
 */
ngeo.Notification.prototype.warn = function(message) {
  this.notify(this.getMessageObjects_(
      message, ngeo.NotificationType.WARNING));
};


// UTILITY METHODS


/**
 * Display the message.
 * @param {ngeox.Message} message Message.
 * @private
 */
ngeo.Notification.prototype.notifyMessage_ = function(message) {
  var type = message.type;
  goog.asserts.assertString(type, 'Type should be set.');

  var classNames = ['alert', 'fade'];
  switch (type) {
    case ngeo.NotificationType.ERROR:
      classNames.push('alert-danger');
      break;
    case ngeo.NotificationType.INFORMATION:
      classNames.push('alert-info');
      break;
    case ngeo.NotificationType.SUCCESS:
      classNames.push('alert-success');
      break;
    case ngeo.NotificationType.WARNING:
      classNames.push('alert-warning');
      break;
    default:
      break;
  }

  var el = angular.element('<div class="' + classNames.join(' ') + '"></div>');
  var container;

  if (message.target) {
    container = angular.element(message.target);
  } else {
    container = this.container_;
  }

  container.append(el);
  el.html(message.msg).addClass('in');

  var delay = message.delay !== undefined ? message.delay :
      ngeo.Notification.DEFAULT_DELAY_;

  var item = /** @type {ngeo.Notification.CacheItem} */ ({
    el: el
  });

  // Keep a reference to the promise, in case we want to manually cancel it
  // before the delay
  var uid = goog.getUid(el);
  item.promise = this.timeout_(function() {
    el.alert('close');
    delete this.cache_[uid];
  }.bind(this), delay);

  this.cache_[uid] = item;
};


/**
 * Clear a message using its cache item.
 * @param {ngeo.Notification.CacheItem} item Cache item.
 * @private
 */
ngeo.Notification.prototype.clearMessageByCacheItem_ = function(item) {
  var el = item.el;
  var promise = item.promise;
  var uid = goog.getUid(el);

  // Close the message
  el.alert('close');

  // Cancel timeout in case we want to stop before delay. If called by the
  // timeout itself, then this has no consequence.
  this.timeout_.cancel(promise);

  // Delete the cache item
  delete this.cache_[uid];
};


/**
 * Returns an array of message object from any given message string, list of
 * message strings, message object or list message objects. The type can be
 * overriden here as well OR defined (if the message(s) is/are string(s),
 * defaults to 'information').
 * @param {string|Array.<string>|ngeox.Message|Array.<ngeox.Message>}
 *     object A message or list of messages as text or configuration objects.
 * @param {string=} opt_type The type of message to override the messages with.
 * @return {Array.<ngeox.Message>} List of message objects.
 * @private
 */
ngeo.Notification.prototype.getMessageObjects_ = function(object, opt_type) {
  var msgObjects = [];
  var msgObject = null;
  var defaultType = ngeo.NotificationType.INFORMATION;

  if (typeof object === 'string') {
    msgObjects.push({
      msg: object,
      type: opt_type !== undefined ? opt_type : defaultType
    });
  } else if (goog.isArray(object)) {
    object.forEach(function(msg) {
      if (typeof object === 'string') {
        msgObject = {
          msg: msg,
          type: opt_type !== undefined ? opt_type : defaultType
        };
      } else {
        msgObject = msg;
        if (opt_type !== undefined) {
          msgObject.type = opt_type;
        }
      }
      msgObjects.push(msgObject);
    }, this);
  } else {
    msgObject = object;
    if (opt_type !== undefined) {
      msgObject.type = opt_type;
    }
    msgObjects.push(msgObject);
  }

  return msgObjects;
};


/**
 * @typedef {{
 *     el: angular.JQLite,
 *     promise: angular.$q.Promise
 * }}
 */
ngeo.Notification.CacheItem;


ngeo.module.service('ngeoNotification', ngeo.Notification);
