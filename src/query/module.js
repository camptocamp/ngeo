goog.provide('ngeo.query.module');

goog.require('ngeo.query.Service');
goog.require('ngeo.query.Querent');
goog.require('ngeo.query.MapQuerent');
goog.require('ngeo.query.mapQueryComponent');
goog.require('ngeo.query.bboxQueryComponent');

/**
 * @type {angular.Module}
 */
ngeo.query.module = angular.module('ngeoQueryModule', [
  ngeo.query.Service.module.name,
  ngeo.query.Querent.module.name,
  ngeo.query.MapQuerent.module.name,
  ngeo.query.mapQueryComponent.name,
  ngeo.query.bboxQueryComponent.name,
]);
