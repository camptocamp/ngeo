/* eslint max-len: ["error", { "code": 110, "ignoreComments": true }] */

import angular from 'angular';
import 'bootstrap/js/src/alert.js';

import ngeoMessagePopup, {MessagePopup} from 'ngeo/message/Popup.js';
import ngeoMessageMessage, {MessageType} from 'ngeo/message/Message.js';
import 'ngeo/sass/font.scss';


/**
 * Provides methods to display any sort of messages, disclaimers, errors,
 * etc. Requires Bootstrap library (both CSS and JS) to display the alerts
 * properly.
 * @hidden
 */
export class MessageDisclaimerService extends ngeoMessageMessage {
  /**
   * @param {angular.ISCEService} $sce Angular sce service.
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext service.
   * @param {import('ngeo/message/Popup.js').PopupFactory} ngeoCreatePopup Popup service.
   * @ngInject
   */
  constructor($sce, gettextCatalog, ngeoCreatePopup) {
    super();

    /**
     * @private
     * @type {angular.ISCEService}
     */
    this.sce_ = $sce;

    /**
     * @type {angular.gettext.gettextCatalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;

    /**
     * @private
     * @type {import('ngeo/message/Popup.js').PopupFactory}
     */
    this.createPopup_ = ngeoCreatePopup;

    const container = angular.element('<div class="ngeo-disclaimer"></div>');
    angular.element(document.body).append(container);

    /**
     * @type {JQuery}
     * @private
     */
    this.container_ = container;

    /**
     * Cache of messages.
     * @type {Object<string, JQuery|import("ngeo/message/Popup.js").MessagePopup>}
     * @private
     */
    this.messages_ = {};
  }

  /**
   * Show disclaimer message string or object or list of disclaimer message
   * strings or objects.
   * @param {string|import('ngeo/message/Message.js').Message|Array<string|import('ngeo/message/Message.js').Message>}
   *     object A message or list of messages as text or configuration objects.
   */
  alert(object) {
    this.show(object);
  }

  /**
   * Close disclaimer message string or object or list of disclaimer message
   * strings or objects.
   * @param {string|import('ngeo/message/Message.js').Message|Array<string|import('ngeo/message/Message.js').Message>}
   *     object A message or list of messages as text or configuration objects.
   */
  close(object) {
    const msgObjects = this.getMessageObjects(object);
    msgObjects.forEach(this.closeMessage_, this);
  }

  /**
   * Show the message.
   * @param {import('ngeo/message/Message.js').Message} message Message.
   * @protected
   * @override
   */
  showMessage(message) {
    const gettextCatalog = this.gettextCatalog_;
    const type = message.type;
    console.assert(typeof type == 'string', 'Type should be set.');

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

      this.messages_[uid] = popup;

    } else {
      // display the message using a bootstrap dismissible alert
      const classNames = ['alert', 'fade', 'alert-dismissible', 'show'];
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
      el.addClass('show');

      // Listen when the message gets closed to cleanup the cache of messages
      el.on('closed.bs.alert', () => {
        this.closeMessage_(message);
      });

      this.messages_[uid] = el;
    }
  }

  /**
   * @param {import('ngeo/message/Message.js').Message} message Message.
   * @return {string} The uid.
   * @private
   */
  getMessageUid_(message) {
    return `${message.msg}-${message.type}`;
  }

  /**
   * Close the message.
   * @param {import('ngeo/message/Message.js').Message} message Message.
   * @protected
   */
  closeMessage_(message) {
    const uid = this.getMessageUid_(message);
    const obj = this.messages_[uid];

    // (1) No need to do anything if message doesn't exist
    if (obj === undefined) {
      return;
    }

    // (2) Close message (popup or alert)
    if (obj instanceof MessagePopup) {
      // (2.1) Close popup, if not already closed
      const mpObj = /** @type {MessagePopup} */(obj);
      if (mpObj.getOpen()) {
        mpObj.setOpen(false);
      }
    } else {
      // (2.2) Check if the message hasn't been closed using the UI, i.e. by
      //       clicking the close button. If not, then close it.
      const jqueryObj = /** @type {JQuery} */(obj);
      if (jqueryObj.hasClass('show')) {
        jqueryObj.alert('close');
      }
    }

    // (3) Remove message from cache since it's closed now.
    delete this.messages_[uid];
  }
}


/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoDisclaimer', [
  ngeoMessagePopup.name,
]);

module.service('ngeoDisclaimer', MessageDisclaimerService);


export default module;
