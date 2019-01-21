/**
 */
import angular from 'angular';
import ngeoMessageNotification from 'ngeo/message/Notification.js';
import ngeoMessageDisclaimer from 'ngeo/message/Disclaimer.js';
import ngeoMessageDisplaywindowComponent from 'ngeo/message/displaywindowComponent.js';
import ngeoMessagePopupComponent from 'ngeo/message/popupComponent.js';
import ngeoMessagePopup from 'ngeo/message/Popup.js';
import ngeoMessagePopoverComponent from 'ngeo/message/popoverComponent.js';
import ngeoMessageModalComponent from 'ngeo/message/modalComponent.js';

/**
 * @type {angular.IModule}
 */
export default angular.module('ngeoMessageExtraModule', [
  ngeoMessageNotification.name,
  ngeoMessageDisplaywindowComponent.name,
  ngeoMessageDisclaimer.name,
  ngeoMessagePopupComponent.name,
  ngeoMessagePopup.name,
  ngeoMessagePopoverComponent.name,
  ngeoMessageModalComponent.name,
]);
