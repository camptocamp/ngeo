goog.provide('gmf.theme.module');

goog.require('gmf.theme.Manager');
goog.require('gmf.theme.selectorComponent');
goog.require('gmf.theme.Themes');


/**
 * @type {!angular.Module}
 */
gmf.theme.module = angular.module('gmfThemeModule', [
  gmf.theme.selectorComponent.name,
  gmf.theme.Manager.module.name,
  gmf.theme.Themes.module.name,
]);
