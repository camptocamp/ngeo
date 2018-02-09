goog.provide('ngeo.measure.module');

goog.require('ngeo');
goog.require('ngeo.measure.area');
goog.require('ngeo.measure.azimut');
goog.require('ngeo.measure.length');

/**
 * @type {!angular.Module}
 */
ngeo.measure.module = angular.module('ngeoMeasureModule', [
  ngeo.measure.area.name,
  ngeo.measure.azimut.name,
  ngeo.measure.length.name
]);
