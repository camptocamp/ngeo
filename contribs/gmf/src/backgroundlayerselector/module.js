goog.provide('gmf.backgroundlayerselector.module');

goog.require('gmf.backgroundlayerselector.component');


/**
 * @type {!angular.Module}
 */
gmf.backgroundlayerselector.module = angular.module('gmfBackgroundlayerselectorModule', [
  gmf.backgroundlayerselector.component.name,
]);
