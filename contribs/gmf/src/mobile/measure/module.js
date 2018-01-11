goog.provide('gmf.mobile.measure.module');

goog.require('gmf.mobile.measure.lengthComponent');
goog.require('gmf.mobile.measure.pointComponent');


/**
 * @type {!angular.Module}
 */
gmf.mobile.measure.module = angular.module('gmfMobileMeasureModule', [
  gmf.mobile.measure.lengthComponent.name,
  gmf.mobile.measure.pointComponent.name,
]);
