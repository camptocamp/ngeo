/**
 * @module gmf.drawing.module
 */
import gmfDrawingDrawFeatureComponent from 'gmf/drawing/drawFeatureComponent.js';
import gmfDrawingFeatureStyleComponent from 'gmf/drawing/featureStyleComponent.js';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('gmfDrawingModule', [
  gmfDrawingDrawFeatureComponent.name,
  gmfDrawingFeatureStyleComponent.name,
]);


export default exports;
