goog.provide('ngeo.message.extraModule');

goog.require('ngeo');
goog.require('ngeo.message.Notification');
goog.require('ngeo.message.Disclaimer');
goog.require('ngeo.message.popupComponent');
goog.require('ngeo.message.Popup');
goog.require('ngeo.message.popoverComponent');
goog.require('ngeo.message.modalComponent');

/**
 * @type {angular.Module}
 */
ngeo.message.extraModule = angular.module('ngeoMessageExtraModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.message.Notification.module.name,
  ngeo.message.Disclaimer.module.name,
  ngeo.message.popupComponent.name,
  ngeo.message.Popup.module.name,
  ngeo.message.popoverComponent.name,
  ngeo.message.modalComponent.name,
]);
