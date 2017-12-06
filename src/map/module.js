/**
 * @module ngeo map namespace
 */
goog.provide('ngeo.map.module');

goog.require('ngeo');
goog.require('ngeo.map.BackgroundLayerMgr');
goog.require('ngeo.map.directive');
goog.require('ngeo.map.recenter');
goog.require('ngeo.map.resizemap');
goog.require('ngeo.map.scaleselector');

/**
 * Also related to the map but not included in the module (require it manually):
 *   - ngeo.map.LayerHelper
 *
 * @type {!angular.Module}
 */
ngeo.map.module = angular.module('ngeoMapModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.map.BackgroundLayerMgr.module.name,
  ngeo.map.directive.name,
  ngeo.map.recenter.name,
  ngeo.map.resizemap.name,
  ngeo.map.scaleselector.name
]);
