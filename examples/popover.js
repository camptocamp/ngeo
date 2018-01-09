goog.provide('app.popover');

/** @suppress {extraRequire} */
goog.require('ngeo.message.popoverComponent');


/** @type {!angular.Module} **/
app.module = angular.module('app', [
  ngeo.module.name,
  ngeo.message.popoverComponent.name,
]);
