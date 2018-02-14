goog.provide('ngeo.googlestreetview.module');

goog.require('ngeo.googlestreetview.component');

/**
 * @type {!angular.Module}
 */
ngeo.googlestreetview.module = angular.module('ngeoGooglestreetviewModule', [
  ngeo.googlestreetview.component.name
]);
