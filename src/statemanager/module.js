/**
 * @module ngeo map namespace
 */
goog.provide('ngeo.statemanager.module');

goog.require('ngeo');
goog.require('ngeo.statemanager.Location');
goog.require('ngeo.statemanager.Service');

/**
 * Also related to the statemanager but not included in the module:
 *  - ngeo.statemanager.Wfspermalink (require it manually)
 *
 * @type {!angular.Module}
 */
ngeo.map.module = angular.module('ngeoStatemanagerModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.statemanager.Location.module.name,
  ngeo.statemanager.Service.module.name
]);
