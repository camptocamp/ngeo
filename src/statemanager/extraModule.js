goog.provide('ngeo.statemanager.extraModule');

goog.require('ngeo');
goog.require('ngeo.statemanager.WfsPermalink');

/**
 * @type {!angular.Module}
 */
ngeo.statemanager.extraModule = angular.module('ngeoStatemanagerExtraModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.statemanager.WfsPermalink.module.name,
]);
