goog.provide('ngeo.Disclaimer');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ngeo.Message');


/**
 * Provides methods to display any sort of messages, disclaimers, errors,
 * etc. Requires Bootstrap library (both CSS and JS) to display the alerts
 * properly.
 *
 * @constructor
 * @extends {ngeo.Message}
 * @ngdoc service
 * @ngname ngeoDisclaimer
 * @ngInject
 */
ngeo.Disclaimer = function() {

  goog.base(this);

  var container = angular.element('<div class="ngeo-disclaimer"></div>');
  angular.element(document.body).append(container);

  /**
   * @type {angular.JQLite}
   * @private
   */
  this.container_ = container;

  /**
   * Cache of messages.
   * @type {Object.<string, angular.JQLite>}
   * @private
   */
  this.messages_ = {};

};
goog.inherits(ngeo.Disclaimer, ngeo.Message);


/**
 * Show disclaimer message string or object or list of disclamer message
 * strings or objects.
 * @param {string|Array.<string>|ngeox.Message|Array.<ngeox.Message>}
 *     object A message or list of messages as text or configuration objects.
 * @export
 */
ngeo.Disclaimer.prototype.alert = function(object) {
  this.show(object);
};


/**
 * Close disclaimer message string or object or list of disclamer message
 * strings or objects.
 * @param {string|Array.<string>|ngeox.Message|Array.<ngeox.Message>}
 *     object A message or list of messages as text or configuration objects.
 * @export
 */
ngeo.Disclaimer.prototype.close = function(object) {
  var msgObjects = this.getMessageObjects(object);
  msgObjects.forEach(this.closeMessage_, this);
};


/**
 * Show the message.
 * @param {ngeox.Message} message Message.
 * @protected
 */
ngeo.Disclaimer.prototype.showMessage = function(message) {
  var type = message.type;
  goog.asserts.assertString(type, 'Type should be set.');

  var uid = this.getMessageUid_(message);
  if (this.messages_[uid] !== undefined) {
    return;
  }

  var classNames = ['alert', 'fade', 'alert-dismissible'];
  switch (type) {
    case ngeo.MessageType.ERROR:
      classNames.push('alert-danger');
      break;
    case ngeo.MessageType.INFORMATION:
      classNames.push('alert-info');
      break;
    case ngeo.MessageType.SUCCESS:
      classNames.push('alert-success');
      break;
    case ngeo.MessageType.WARNING:
      classNames.push('alert-warning');
      break;
    default:
      break;
  }

  var el = angular.element(
    '<div role="alert" class="' + classNames.join(' ') + '"></div>');
  var button = angular.element(
    '<button type="button" class="close" data-dismiss="alert" aria-label="' +
    'Close' +  // FIXME i18n
    '"><span aria-hidden="true">&times;</span></button>');
  var msg = angular.element('<span />').html(message.msg);
  el.append(button).append(msg);

  var container;

  if (message.target) {
    container = angular.element(message.target);
  } else {
    container = this.container_;
  }

  container.append(el);
  el.addClass('in');

  // Listen when the message gets closed to cleanup the cache of messages
  el.on('closed.bs.alert', function() {
    this.closeMessage_(message);
  }.bind(this));

  this.messages_[uid] =  el;
};


/**
 * @param {ngeox.Message} message Message.
 * @return {string} The uid.
 * @private
 */
ngeo.Disclaimer.prototype.getMessageUid_ = function(message) {
  return message.msg + '-' + message.type;
};


/**
 * Close the message.
 * @param {ngeox.Message} message Message.
 * @protected
 */
ngeo.Disclaimer.prototype.closeMessage_ = function(message) {
  var uid = this.getMessageUid_(message);

  // (1) No need to do anything if message doesn't exist
  if (this.messages_[uid] === undefined) {
    return;
  }

  // (2) Check if the message hasn't been closed using the UI, i.e. by
  //     clicking the close button. If not, then close it.
  if (this.messages_[uid].hasClass('in')) {
    this.messages_[uid].alert('close');
  }

  // (3) Remove message from cache since it's closed now.
  delete this.messages_[uid];
};


ngeo.module.service('ngeoDisclaimer', ngeo.Disclaimer);
