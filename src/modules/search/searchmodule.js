/**
 * @module ngeo search namespace
 */
goog.provide('ngeo.modules.search.searchModule');

goog.require('ngeo.modules.search.search');
goog.require('ngeo.modules.search.creategeojsonbloodhound');


/**
 * @type {!angular.Module}
 */
ngeo.modules.search.searchModule.module = angular.module('ngeoSearchModule', [
  ngeo.modules.search.search.module.name,
  ngeo.modules.search.creategeojsonbloodhound.module.name
]);
