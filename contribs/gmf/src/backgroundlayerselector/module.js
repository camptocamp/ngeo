/**
 * @module gmf.backgroundlayerselector.module
 */
import gmfBackgroundlayerselectorComponent from 'gmf/backgroundlayerselector/component.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfBackgroundlayerselectorModule', [
  gmfBackgroundlayerselectorComponent.name,
]);


export default exports;
