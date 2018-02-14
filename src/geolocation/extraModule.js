goog.provide('ngeo.geolocation.extraModule');

goog.require('ngeo.geolocation.desktop');
goog.require('ngeo.geolocation.mobile');

/**
 * @type {!angular.Module}
 */
ngeo.geolocation.extraModule = angular.module('ngeoGeolocationExtraModule', [
  ngeo.geolocation.desktop.name,
  ngeo.geolocation.mobile.name
]);
