/**
 * @module gmfapp.themeselector
 */
const exports = {};

import './themeselector.css';
/** @suppress {extraRequire} */
import gmfThemeModule from 'gmf/theme/module.js';

import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';

/** @type {!angular.Module} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfLayertreeTreeManager.module.name,
  gmfThemeModule.name,
]);

exports.module.value('gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.com/2.3/wsgi/themes?version=2&background=background');

exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @constructor
 * @param {angular.$http} $http Angular's $http service.
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
