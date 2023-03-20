import angular from 'angular';
import appURL from './url.js';
import './themeselector.css';
import gmfThemeModule from 'gmf/theme/module.js';

import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';

/** @type {!angular.IModule} **/
const module = angular.module('gmfapp', ['gettext', gmfLayertreeTreeManager.name, gmfThemeModule.name]);

module.value('gmfTreeUrl', appURL.GMF_THEMES);

module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @constructor
 * @param {angular.IHttpService} $http Angular's $http service.
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes Themes service.
 * @param {import("gmf/theme/Manager.js").ThemeManagerService} gmfThemeManager gmf Tree Manager service.
 * @ngInject
 */
function MainController($http, gmfThemes, gmfThemeManager) {
  /**
   * @param {import('gmf/themes.js').GmfTheme} theme Theme.
   * @return {boolean} Theme is 'Enseignement'
   */
  this.filter = function (theme) {
    return theme.name !== 'Enseignement';
  };

  /**
   * @type {import("gmf/theme/Manager.js").ThemeManagerService}
   */
  this.manager = gmfThemeManager;

  gmfThemes.loadThemes();
}

module.controller('MainController', MainController);

export default module;
