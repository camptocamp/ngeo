goog.provide('ngeo.grid.module');

goog.require('ngeo.grid.component');

/**
 * Also related to the grid but not included in the module:
 *  - ngeo.grid.Config (already required by ngeo.grid.component)
 *
 * @type {!angular.Module}
 */
ngeo.grid.module = angular.module('ngeoGridModule', [
  ngeo.grid.component.name
]);
