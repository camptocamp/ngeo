goog.provide('ngeo.map.extraModule');

goog.require('ngeo');
goog.require('ngeo.map.LayerHelper');

/**
 * @type {!angular.Module}
 */
ngeo.map.extraModule = angular.module('ngeoMapExtraModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.map.LayerHelper.module.name,
]);
