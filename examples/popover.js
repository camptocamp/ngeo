goog.provide('app.popover');

// webpack: import './popover.css';
// webpack: import './common_dependencies.js';
/** @suppress {extraRequire} */
goog.require('ngeo.message.popoverComponent');


/** @type {!angular.Module} **/
app.popover.module = angular.module('app', [
  ngeo.message.popoverComponent.name,
]);
