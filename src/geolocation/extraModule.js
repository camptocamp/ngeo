goog.provide('ngeo.geolocation.extraModule');

goog.require('ngeo');
goog.require('ngeo.geolocation.desktop');
goog.require('ngeo.geolocation.mobile');

/**
 * @type {!angular.Module}
 */
ngeo.geolocation.extraModule = angular.module('ngeoGeolocationExtraModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.geolocation.desktop.name,
  ngeo.geolocation.mobile.name
]);
