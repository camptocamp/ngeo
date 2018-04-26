/**
 * @module gmf.theme.module
 */
import gmfThemeManager from 'gmf/theme/Manager.js';
import gmfThemeSelectorComponent from 'gmf/theme/selectorComponent.js';
import gmfThemeThemes from 'gmf/theme/Themes.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfThemeModule', [
  gmfThemeSelectorComponent.name,
  gmfThemeManager.module.name,
  gmfThemeThemes.module.name,
]);


export default exports;
