goog.provide('ngeo.misc.extraModule');

goog.require('ngeo');
goog.require('ngeo.misc.AutoProjection');
goog.require('ngeo.misc.Time');

/**
 * @type {!angular.Module}
 */
ngeo.misc.extaModule = angular.module('ngeoMiscExtraModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.misc.AutoProjection.module.name,
  ngeo.misc.Time.module.name,
]);
