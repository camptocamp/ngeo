/**
 * @module ngeo.message.extraModule
 */
import ngeoMessageNotification from 'ngeo/message/Notification.js';
import ngeoMessageDisclaimer from 'ngeo/message/Disclaimer.js';
import ngeoMessageDisplaywindowComponent from 'ngeo/message/displaywindowComponent.js';
import ngeoMessagePopupComponent from 'ngeo/message/popupComponent.js';
import ngeoMessagePopup from 'ngeo/message/Popup.js';
import ngeoMessagePopoverComponent from 'ngeo/message/popoverComponent.js';
import ngeoMessageModalComponent from 'ngeo/message/modalComponent.js';

/**
 * @type {angular.Module}
 */
const exports = angular.module('ngeoMessageExtraModule', [
  ngeoMessageNotification.module.name,
  ngeoMessageDisplaywindowComponent.name,
  ngeoMessageDisclaimer.module.name,
  ngeoMessagePopupComponent.name,
  ngeoMessagePopup.module.name,
  ngeoMessagePopoverComponent.name,
  ngeoMessageModalComponent.name,
]);


export default exports;
