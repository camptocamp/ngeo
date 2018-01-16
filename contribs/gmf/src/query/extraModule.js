goog.provide('gmf.query.extraModule');

goog.require('gmf.query.gridComponent');
goog.require('gmf.query.windowComponent');


/**
 * @type {!angular.Module}
 */
gmf.query.extraModule = angular.module('gmfQueryExtraModule', [
  gmf.query.gridComponent.name,
  gmf.query.windowComponent.name,
]);
