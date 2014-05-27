


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);

app.module.constant('gmfTreeUrl', 'data/themes.json');


/**
 * @constructor
 * @param {angular.$http} $http Angular's $http service.
 * @param {gmf.Themes} gmfThemes Themes service.
 * @ngInject
 */
app.MainController = function($http, gmfThemes) {

  /**
   * @param {Object} theme Theme.
   * @return {boolean} Theme is 'Enseignement'
   * @export
   */
  this.filter = function(theme) {
    return theme.name !== 'Enseignement';
  };

  /**
   * @type {Object|undefined}
   * @export
   */
  this.theme = undefined;

  gmfThemes.loadThemes();
};


app.module.controller('MainController', app.MainController);
