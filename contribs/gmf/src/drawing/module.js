/**
 * @module gmf.drawing.module
 */
import angular from 'angular';
import gmfDrawingDrawFeatureComponent from 'gmf/drawing/drawFeatureComponent.js';
import gmfDrawingFeatureStyleComponent from 'gmf/drawing/featureStyleComponent.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('gmfDrawingModule', [
  gmfDrawingDrawFeatureComponent.name,
  gmfDrawingFeatureStyleComponent.name,
]);
