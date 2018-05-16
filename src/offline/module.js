goog.provide('ngeo.offline.module');

goog.require('ngeo');
goog.require('ngeo.offline.component');

/**
 * @type {!angular.Module}
 */
ngeo.offline.module = angular.module('ngeoOfflineModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.offline.component.name,
]);
