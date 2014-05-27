
/** @suppress {extraRequire} */
/** @suppress {extraRequire} */


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);

app.module.value('gmfTreeUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/themes?version=2&background=background');


/**
 * @constructor
 * @param {angular.$http} $http Angular's $http service.
 * @param {gmf.Themes} gmfThemes Themes service.
 * @param {gmf.ThemeManager} gmfThemeManager gmf Tree Manager service.
 * @ngInject
 */
app.MainController = function($http, gmfThemes, gmfThemeManager) {

  /**
   * @param {gmfThemes.GmfTheme} theme Theme.
   * @return {boolean} Theme is 'Enseignement'
   * @export
   */
  this.filter = function(theme) {
    return theme.name !== 'Enseignement';
  };

  /**
   * @type {gmf.ThemeManager}
   * @export
   */
  this.manager = gmfThemeManager;

  gmfThemes.loadThemes();
};


app.module.controller('MainController', app.MainController);
