/**
 * @module ngeo map namespace
 */
goog.provide('ngeo.grid.module');

goog.require('ngeo');
goog.require('ngeo.grid.Config');
goog.require('ngeo.grid.component');

/**
 * Also related to the grid but not included in the module:
 *  - ngeo.grid.Config (already required by ngeo.grid.component)
 *
 * @type {!angular.Module}
 */
ngeo.grid.module = angular.module('ngeoGridModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.grid.Config.module.name,
  ngeo.grid.component.name
]);
