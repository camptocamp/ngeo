goog.provide('ngeo.statemanager.module');

goog.require('ngeo.statemanager.Location');
goog.require('ngeo.statemanager.Service');

/**
 * @type {!angular.Module}
 */
ngeo.statemanager.module = angular.module('ngeoStatemanagerModule', [
  ngeo.statemanager.Location.module.name,
  ngeo.statemanager.Service.module.name
]);
