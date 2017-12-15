goog.provide('ngeo.Disclaimer');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ngeo.Popup');
goog.require('ngeo.Message');


/**
 * Provides methods to display any sort of messages, disclaimers, errors,
 * etc. Requires Bootstrap library (both CSS and JS) to display the alerts
 * properly.
 *
 * @param {angular.$sce} $sce Angular sce service.
 * @param {angularGettext.Catalog} gettextCatalog Gettext service.
 * @param {ngeo.Popup.Factory} ngeoCreatePopup Popup service.
 * @constructor
 * @struct
 * @extends {ngeo.Message}
 * @ngdoc service
 * @ngname ngeoDisclaimer
 * @ngInject
 */
ngeo.Disclaimer = function($sce, gettextCatalog, ngeoCreatePopup) {

  /**
   * @private
   * @type {angular.$sce}
   */
  this.sce_ = $sce;

  /**
   * @type {angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @private
   * @type {ngeo.Popup.Factory}
   */
  this.createPopup_ = ngeoCreatePopup;

  ngeo.Message.call(this);

  const container = angular.element('<div class="ngeo-disclaimer"></div>');
  angular.element(document.body).append(container);

  /**
   * @type {angular.JQLite}
   * @private
   */
  this.container_ = container;

  /**
   * Cache of messages.
   * @type {Object.<string, angular.JQLite|ngeo.Popup>}
   * @private
   */
  this.messages_ = {};

};
ol.inherits(ngeo.Disclaimer, ngeo.Message);


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
  const msgObjects = this.getMessageObjects(object);
  msgObjects.forEach(this.closeMessage_, this);
};


/**
 * Show the message.
 * @param {ngeox.Message} message Message.
 * @protected
 * @override
 */
ngeo.Disclaimer.prototype.showMessage = function(message) {
  const gettextCatalog = this.gettextCatalog_;
  const type = message.type;
  goog.asserts.assertString(type, 'Type should be set.');

  // No need to do anything if message already exist.
  const uid = this.getMessageUid_(message);
  if (this.messages_[uid] !== undefined) {
    return;
  }

  const showInPopup = message.popup === true;

  if (showInPopup) {
    // display the message in a popup, i.e. using the ngeo create popup
    const popup = this.createPopup_();
    const content = this.sce_.trustAsHtml(message.msg);
    popup.open({
      autoDestroy: true,
      content: content,
      title: '&nbsp;'
    });

    // Watch the open property
    popup.scope.$watch('open', (newVal, oldVal) => {
      if (!newVal) {
        this.closeMessage_(message);
      }
    });

    this.messages_[uid] =  popup;

  } else {
    // display the message using a boostrap dismissible alert
    const classNames = ['alert', 'fade', 'alert-dismissible'];
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

    const el = angular.element(
      `<div role="alert" class="${classNames.join(' ')}"></div>`);
    const button = angular.element(
      `<button type="button" class="close" data-dismiss="alert" aria-label="${
        gettextCatalog.getString('Close')
      }"><span aria-hidden="true" class="fa fa-times"></span></button>`);
    const msg = angular.element('<span />').html(message.msg);
    el.append(button).append(msg);

    let container;

    if (message.target) {
      container = angular.element(message.target);
    } else {
      container = this.container_;
    }

    container.append(el);
    el.addClass('in');

    // Listen when the message gets closed to cleanup the cache of messages
    el.on('closed.bs.alert', () => {
      this.closeMessage_(message);
    });

    this.messages_[uid] =  el;
  }
};


/**
 * @param {ngeox.Message} message Message.
 * @return {string} The uid.
 * @private
 */
ngeo.Disclaimer.prototype.getMessageUid_ = function(message) {
  return `${message.msg}-${message.type}`;
};


/**
 * Close the message.
 * @param {ngeox.Message} message Message.
 * @protected
 */
ngeo.Disclaimer.prototype.closeMessage_ = function(message) {
  const uid = this.getMessageUid_(message);
  const obj = this.messages_[uid];

  // (1) No need to do anything if message doesn't exist
  if (obj === undefined) {
    return;
  }

  // (2) Close message (popup or alert)
  if (obj instanceof ngeo.Popup) {
    // (2.1) Close popup, if not already closed
    if (obj.getOpen()) {
      obj.setOpen(false);
    }
  } else {
    // (2.2) Check if the message hasn't been closed using the UI, i.e. by
    //       clicking the close button. If not, then close it.
    if (obj.hasClass('in')) {
      obj.alert('close');
    }
  }

  // (3) Remove message from cache since it's closed now.
  delete this.messages_[uid];
};


ngeo.module.service('ngeoDisclaimer', ngeo.Disclaimer);
