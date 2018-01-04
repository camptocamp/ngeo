goog.provide('ngeo.editing.extraModule');

goog.require('ngeo');
goog.require('ngeo.editing.exportfeaturesComponent');

/**
 * @type {angular.Module}
 */
ngeo.editing.extraModule = angular.module('ngeoEditingExtraModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.editing.exportfeaturesComponent.name,
]);
