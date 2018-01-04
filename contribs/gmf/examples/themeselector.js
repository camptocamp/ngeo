goog.provide('gmfapp.themeselector');

/** @suppress {extraRequire} */
goog.require('gmf.theme.module');
/** @suppress {extraRequire} */
goog.require('gmf.TreeManager');

/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', [
  gmf.module.name,
  gmf.theme.module.name,
]);

gmfapp.module.value('gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?version=2&background=background');


/**
 * @constructor
 * @param {angular.$http} $http Angular's $http service.
 * @param {gmf.theme.Themes} gmfThemes Themes service.
 * @param {gmf.theme.Manager} gmfThemeManager gmf Tree Manager service.
 * @ngInject
 */
gmfapp.MainController = function($http, gmfThemes, gmfThemeManager) {

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


gmfapp.module.controller('MainController', gmfapp.MainController);
