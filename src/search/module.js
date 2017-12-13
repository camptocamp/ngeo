goog.provide('ngeo.search.module');

goog.require('ngeo.search.searchDirective');
goog.require('ngeo.search.createGeoJSONBloodhound');
goog.require('ngeo.search.createLocationSearchBloodhound');


/**
 * @type {!angular.Module}
 */
ngeo.search.module = angular.module('ngeoSearchModule', [
  ngeo.search.searchDirective.module.name,
  ngeo.search.createGeoJSONBloodhound.module.name,
  ngeo.search.createLocationSearchBloodhound.module.name
]);
