goog.provide('ngeo.profile.module');

goog.require('ngeo');
goog.require('ngeo.profile.elevationComponent');

/**
 * @type {!angular.Module}
 */
ngeo.profile.module = angular.module('ngeoProfileModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.profile.elevationComponent.name,
]);
