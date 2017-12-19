goog.provide('ngeo.misc.extraModule');

goog.require('ngeo');
goog.require('ngeo.misc.AutoProjection');

/**
 * @type {!angular.Module}
 */
ngeo.misc.extaModule = angular.module('ngeoMiscExtraModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.misc.AutoProjection.module.name,
]);
