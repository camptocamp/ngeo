goog.provide('gmf.drawing.module');

goog.require('gmf.drawing.drawFeatureComponent');
goog.require('gmf.drawing.featureStyleComponent');


/**
 * @type {!angular.Module}
 */
gmf.drawing.module = angular.module('gmfDrawingModule', [
  gmf.drawing.drawFeatureComponent.name,
  gmf.drawing.featureStyleComponent.name,
]);
