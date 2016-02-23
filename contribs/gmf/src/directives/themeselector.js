goog.provide('gmf.ThemeselectorController');
goog.provide('gmf.themeselectorDirective');

goog.require('gmf');
goog.require('gmf.Themes');
goog.require('ngeo.Location');


/**
 * Example:
 *
 *     <gmf-themeselector
 *         id="themes"
 *         class="slide"
 *         data-header-title="Themes"
 *         gmf-themeselector-currenttheme="mainCtrl.theme"
 *         gmf-themeselector-filter="::mainCtrl.filter">
 *     </gmf-themeselector>
 *
 * @htmlAttribute {string} gmf-themeselector-defaulttheme The default theme.
 * @htmlAttribute {Object} gmf-themeselector-currenttheme The selected theme.
 * @htmlAttribute {Function} gmf-themeselector-filter The themes filter.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfThemeselector
 */
gmf.themeselectorDirective = function() {
  return {
    restrict: 'E',
    controller: 'gmfThemeselectorController',
    scope: {
      'defaultTheme': '@gmfThemeselectorDefaulttheme',
      'currentTheme': '=gmfThemeselectorCurrenttheme',
      'filter': '=gmfThemeselectorFilter'
    },
    bindToController: true,
    controllerAs: 'tsCtrl',
    templateUrl: gmf.baseTemplateUrl + '/themeselector.html'
  };
};

gmf.module.directive('gmfThemeselector', gmf.themeselectorDirective);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {ngeo.Location} ngeoLocation ngeo Location service.
 * @param {gmf.Themes} gmfThemes Themes service.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname gmfThemeselectorController
 */
gmf.ThemeselectorController = function($scope, ngeoLocation, gmfThemes) {

  /**
   * @type {Array.<Object>}
   * @export
   */
  this.themes;

  /**
   * @type {Object}
   * @export
   */
  this.currentTheme;

  $scope.$watch(goog.bind(function() {
    return this.currentTheme;
  }, this), goog.bind(function(theme) {
    if (theme) {
      this.setLocationPath_(theme['name']);
    }
  }, this));

  /**
   * @type {string}
   * @export
   */
  this.defaultTheme = this.defaultTheme || 'main';

  /**
   * @type {Function|undefined}
   * @export
   */
  this.filter;

  /**
   * @type {ngeo.Location}
   * @private
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {gmf.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;


  this.setThemes_();
};


/**
 * Return true if there is a theme specified in the URL path.
 * @param {Array.<string>} pathElements Array of path elements.
 * @return {boolean} theme in path.
 */
gmf.ThemeselectorController.themeInUrl = function(pathElements) {
  var indexOfTheme = pathElements.indexOf('theme');
  return indexOfTheme >= 0 &&
      pathElements.indexOf('theme') == pathElements.length - 2;
};


/**
 * @param {string} themeId The theme id to set in the path of the URL.
 * @private
 */
gmf.ThemeselectorController.prototype.setLocationPath_ = function(themeId) {
  var pathElements = this.ngeoLocation_.getPath().split('/');
  goog.asserts.assert(pathElements.length > 1);
  if (pathElements[pathElements.length - 1] === '') {
    // case where the path is just "/"
    pathElements.splice(pathElements.length - 1);
  }
  if (gmf.ThemeselectorController.themeInUrl(pathElements)) {
    pathElements[pathElements.length - 1] = themeId;
  } else {
    pathElements.push('theme', themeId);
  }
  this.ngeoLocation_.setPath(pathElements.join('/'));
};


/**
 * Store the loaded themes locally applying a filter (if any), then set the
 * current theme.
 * @private
 */
gmf.ThemeselectorController.prototype.setThemes_ = function() {
  this.gmfThemes_.getThemesObject().then(goog.bind(
      /**
       * @param {Array.<Object>} themes Array of theme objects.
       */
      function(themes) {
        // Keep only the themes dedicated to the theme switcher
        this.themes = this.filter ? themes.filter(this.filter) : themes;

        // Then set current theme by looking first in the URL, otherwise use
        // the default theme and add it to the URL.
        var currentTheme;
        var themeId = this.defaultTheme;
        var pathElements = this.ngeoLocation_.getPath().split('/');
        if (gmf.ThemeselectorController.themeInUrl(pathElements)) {
          themeId = pathElements[pathElements.length - 1];
        }
        currentTheme = goog.array.find(this.themes, function(object) {
          return object['name'] === themeId;
        });

        this.switchTheme(currentTheme);

      }, this));
};


/**
 * @param {Object} theme Theme.
 * @export
 */
gmf.ThemeselectorController.prototype.switchTheme = function(theme) {
  if (theme) {
    this.currentTheme = theme;
  }
};


gmf.module.controller('gmfThemeselectorController',
    gmf.ThemeselectorController);
