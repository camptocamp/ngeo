goog.provide('ngeo.print.module');

goog.require('ngeo.print.Service');
goog.require('ngeo.print.Utils');

/**
 * @type {angular.Module}
 */
ngeo.print.module = angular.module('ngeoPrintModule', [
  ngeo.print.Service.module.name,
  ngeo.print.Utils.module.name
]);
