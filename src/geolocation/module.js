/**
 * @module ngeo map namespace
 */
goog.provide('ngeo.geolocation.module');

goog.require('ngeo');
goog.require('ngeo.geolocation.desktop');
goog.require('ngeo.geolocation.mobile');

/**
 * @type {!angular.Module}
 */
ngeo.geolocation.module = angular.module('ngeoGeolocationModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.geolocation.desktop.name,
  ngeo.geolocation.mobile.name
]);
