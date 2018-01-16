goog.provide('gmf.map.module');

goog.require('gmf.map.component');
goog.require('gmf.map.mousepositionComponent');


/**
 * @type {!angular.Module}
 */
gmf.map.module = angular.module('gmfMapModule', [
  gmf.map.component.name,
  gmf.map.mousepositionComponent.name,
]);
