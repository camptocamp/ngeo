/**
 * @module ngeo map namespace
 */
goog.provide('ngeo.googlestreetview.module');

goog.require('ngeo');
goog.require('ngeo.googlestreetview.component');

/**
 * @type {!angular.Module}
 */
ngeo.googlestreetview.module = angular.module('ngeoGooglestreetviewModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.googlestreetview.component.name
]);
