goog.provide('ngeo.editing.extraModule');

goog.require('ngeo.editing.exportfeaturesComponent');

/**
 * @type {angular.Module}
 */
ngeo.editing.extraModule = angular.module('ngeoEditingExtraModule', [
  ngeo.editing.exportfeaturesComponent.name,
]);
