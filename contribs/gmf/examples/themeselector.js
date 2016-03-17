goog.provide('gmf-themeselector');

/** @suppress {extraRequire} */
goog.require('gmf.Themes');
/** @suppress {extraRequire} */
goog.require('gmf.TreeManager');
goog.require('gmf.themeselectorDirective');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);

app.module.constant('gmfTreeUrl', 'data/themes.json');


/**
 * @constructor
 * @param {angular.$http} $http Angular's $http service.
 * @param {gmf.Themes} gmfThemes Themes service.
 * @param {gmf.TreeManager} gmfTreeManager gmf Tree Manager service.
 * @ngInject
 */
app.MainController = function($http, gmfThemes, gmfTreeManager) {

  /**
   * @param {GmfThemesNode} theme Theme.
   * @return {boolean} Theme is 'Enseignement'
   * @export
   */
  this.filter = function(theme) {
    return theme.name !== 'Enseignement';
  };

  /**
   * @type {GmfThemesNode}
   * @export
   */
  this.theme = gmfTreeManager.tree;

  gmfThemes.loadThemes();
};


app.module.controller('MainController', app.MainController);
