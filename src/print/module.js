/**
 * @module ngeo print namespace
 */
goog.provide('ngeo.print.module');

goog.require('ngeo');
goog.require('ngeo.print.Service');

/**
 * @type {angular.Module}
 */
ngeo.print.module = angular.module('ngeoPrint', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.print.Service.module.name,
]);
