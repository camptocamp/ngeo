goog.provide('app.popover');

// webpack: import './popover.css';
// webpack: import './common_dependencies.js';
goog.require('ngeo');
/** @suppress {extraRequire} */
goog.require('ngeo.message.popoverComponent');


/** @type {!angular.Module} **/
app.popover.module = angular.module('app', [
  ngeo.module.name,
  ngeo.message.popoverComponent.name,
]);
