/**
 * @module gmfapp.themeselector
 */
const exports = {};

import appURL from './url.js';
import './themeselector.css';
import gmfThemeModule from 'gmf/theme/module.js';

import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';

/** @type {!angular.IModule} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfLayertreeTreeManager.module.name,
  gmfThemeModule.name,
]);

exports.module.value('gmfTreeUrl', appURL.GMF_THEMES);

exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @constructor
 * @param {angular.IHttpService} $http Angular's $http service.
 * @param {gmf.theme.Themes} gmfThemes Themes service.
 * @param {gmf.theme.Manager} gmfThemeManager gmf Tree Manager service.
 * @ngInject
 */
exports.MainController = function($http, gmfThemes, gmfThemeManager) {

  /**
   * @param {gmfThemes.GmfTheme} theme Theme.
   * @return {boolean} Theme is 'Enseignement'
   * @export
   */
  this.filter = function(theme) {
    return theme.name !== 'Enseignement';
  };

  /**
   * @type {gmf.theme.Manager}
   * @export
   */
  this.manager = gmfThemeManager;

  gmfThemes.loadThemes();
};


exports.module.controller('MainController', exports.MainController);


export default exports;
