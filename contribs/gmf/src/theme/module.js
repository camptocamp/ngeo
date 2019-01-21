/**
 */
import angular from 'angular';
import gmfThemeManager from 'gmf/theme/Manager.js';
import gmfThemeSelectorComponent from 'gmf/theme/selectorComponent.js';
import gmfThemeThemes from 'gmf/theme/Themes.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('gmfThemeModule', [
  gmfThemeSelectorComponent.name,
  gmfThemeManager.name,
  gmfThemeThemes.name,
]);
