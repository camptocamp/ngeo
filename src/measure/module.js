/**
 * @module ngeo map namespace
 */
goog.provide('ngeo.measure.module');

goog.require('ngeo');
goog.require('ngeo.measure.area');
goog.require('ngeo.measure.azimut');
goog.require('ngeo.measure.length');

/**
 * @type {!angular.Module}
 */
ngeo.map.module = angular.module('ngeoMeasureModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.measure.area.name,
  ngeo.measure.azimut.name,
  ngeo.measure.length.name
]);
