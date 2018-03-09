goog.provide('app.popover');

// webpack: import './popover.css';
/** @suppress {extraRequire} */
goog.require('ngeo.message.popoverComponent');


/** @type {!angular.Module} **/
app.popover.module = angular.module('app', [
  'gettext',
  ngeo.message.popoverComponent.name,
]);
