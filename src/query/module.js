goog.provide('ngeo.query.module');

goog.require('ngeo');
goog.require('ngeo.query.Query');
goog.require('ngeo.query.Querent');
goog.require('ngeo.query.MapQuerent');

/**
 * @type {angular.Module}
 */
ngeo.query.module = angular.module('ngeoQueryModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.query.Query.module.name,
  ngeo.query.Querent.module.name,
  ngeo.query.MapQuerent.module.name,
]);
