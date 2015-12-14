goog.provide('gmf-themeselector');

goog.require('gmf.Themes');
goog.require('gmf.ThemesEventType');
goog.require('gmf.themeselectorDirective');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);

app.module.constant('treeUrl', 'data/themes.json');



/**
 * @constructor
 * @param {angular.$http} $http Angular's $http service.
 * @param {gmf.Themes} gmfThemes Themes service.
 * @ngInject
 */
app.MainController = function($http, gmfThemes) {

  /**
   * @type {Object|undefined}
   * @export
   */
  this.theme = undefined;

  gmfThemes.loadThemes();
};


app.module.controller('MainController', app.MainController);
