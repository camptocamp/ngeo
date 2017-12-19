goog.provide('ngeo.query.module');

goog.require('ngeo');
goog.require('ngeo.query.Service');
goog.require('ngeo.query.Querent');
goog.require('ngeo.query.MapQuerent');
goog.require('ngeo.query.mapQueryDirective');
goog.require('ngeo.query.bboxQueryDirective');

/**
 * @type {angular.Module}
 */
ngeo.query.module = angular.module('ngeoQueryModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.query.Service.module.name,
  ngeo.query.Querent.module.name,
  ngeo.query.MapQuerent.module.name,
  ngeo.query.mapQueryDirective.module.name,
  ngeo.query.bboxQueryDirective.module.name,
]);
