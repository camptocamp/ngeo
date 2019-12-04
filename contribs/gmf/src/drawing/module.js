/**
 */
import angular from 'angular';
import gmfDrawingDrawFeatureComponent from 'gmf/drawing/drawFeatureComponent.js';
import gmfDrawingDrawFeatureOptionsComponent from 'gmf/drawing/drawFeatureOptionsComponent.js';
import gmfDrawingFeatureStyleComponent from 'gmf/drawing/featureStyleComponent.js';

/**
 * @type {angular.IModule}
 */
export default angular.module('gmfDrawingModule', [
  gmfDrawingDrawFeatureComponent.name,
  gmfDrawingDrawFeatureOptionsComponent.name,
  gmfDrawingFeatureStyleComponent.name,
]);
