goog.provide('ngeo.statemanager.module');

goog.require('ngeo');
goog.require('ngeo.statemanager.Location');
goog.require('ngeo.statemanager.Service');

/**
 * @type {!angular.Module}
 */
ngeo.statemanager.module = angular.module('ngeoStatemanagerModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.statemanager.Location.module.name,
  ngeo.statemanager.Service.module.name
]);
