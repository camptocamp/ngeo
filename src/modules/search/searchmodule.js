/**
 * @module ngeo search namespace
 */
goog.provide('ngeo.search.searchModule');

goog.require('ngeo.search.searchDirective');
goog.require('ngeo.search.createGeoJSONBloodhound');


/**
 * @type {!angular.Module}
 */
ngeo.search.searchModule.module = angular.module('ngeoSearchModule', [
  ngeo.search.searchDirective.module.name,
  ngeo.search.createGeoJSONBloodhound.module.name
]);
