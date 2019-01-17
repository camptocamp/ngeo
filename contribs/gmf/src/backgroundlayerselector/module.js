/**
 * @module import("gmf/backgroundlayerselector/module.js").default
 */
import angular from 'angular';
import gmfBackgroundlayerselectorComponent from 'gmf/backgroundlayerselector/component.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('gmfBackgroundlayerselectorModule', [
  gmfBackgroundlayerselectorComponent.name,
]);
