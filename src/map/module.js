/**
 * @module ngeo map namespace
 */
goog.provide('ngeo.map.module');

goog.require('ngeo');
goog.require('ngeo.map.directive');
goog.require('ngeo.map.recenter');
goog.require('ngeo.map.resizemap');

/**
 * @type {!angular.Module}
 */
ngeo.map.module = angular.module('ngeoMapModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.map.directive.name,
  ngeo.map.recenter.name,
  ngeo.map.resizemap.name
]);
