goog.provide('gmf.ThemeselectorController');
goog.provide('gmf.themeselectorDirective');

goog.require('gmf');
goog.require('gmf.TreeManager');
goog.require('gmf.Themes');
goog.require('ngeo.Location');


/**
 * Note that this directive works with the gmf TreeManager service. Set the
 * theme will update the "tree" object of this TreeManager service.
 * Example:
 *
 *     <gmf-themeselector
 *         id="themes"
 *         class="slide"
 *         data-header-title="Themes"
 *         gmf-themeselector-filter="::mainCtrl.filter">
 *     </gmf-themeselector>
 *
 * @htmlAttribute {string} gmf-themeselector-defaulttheme The default theme.
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
 * @param {gmf.TreeManager} gmfTreeManager Tree manager service.
 * @param {gmf.Themes} gmfThemes Themes service.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname gmfThemeselectorController
 */
gmf.ThemeselectorController = function($scope, ngeoLocation, gmfTreeManager,
    gmfThemes) {

  /**
   * @type {ngeo.Location}
   * @private
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {gmf.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;

  /**
   * @type {gmf.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {Array.<Object>}
   * @export
   */
  this.themes;

  /**
   * @type {Object}
   * @export
   */
  this.currentTheme = this.gmfTreeManager_.tree;

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

  $scope.$watchCollection(function() {
    return this.currentTheme;
  }.bind(this), function(newTheme, oldTheme) {
    if (newTheme && newTheme !== oldTheme &&
        this.gmfTreeManager_.isModeFlush()) {
      this.setLocationPath_(newTheme['name']);
    }
  }.bind(this));

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

  /**
   * @param {Array.<GmfThemesNode>} themes Array of theme objects.
   */
  var getThemesObjectSuccessFn = function(themes) {
    // Keep only the themes dedicated to the theme switcher
    this.themes = this.filter ? themes.filter(this.filter) : themes;

    // Then set current theme by looking first in the URL (only in,
    // otherwise use the default theme and add it to the URL.
    var currentTheme;
    var themeName = this.defaultTheme;
    if (this.gmfTreeManager_.isModeFlush()) {
      var pathElements = this.ngeoLocation_.getPath().split('/');
      if (gmf.ThemeselectorController.themeInUrl(pathElements)) {
        themeName = pathElements[pathElements.length - 1];
      }
    }
    currentTheme = gmf.Themes.findThemeByName(this.themes, themeName);
    if (currentTheme === null) {
      // if the current theme is not available (e.g. a restricted theme is no
      // longer available after a logout), use the default
      currentTheme = gmf.Themes.findThemeByName(this.themes, this.defaultTheme);
    }

    this.setTheme(/** @type {GmfThemesNode} */ (currentTheme), true);

  }.bind(this);

  this.gmfThemes_.getThemesObject().then(getThemesObjectSuccessFn);
};


/**
 * @param {GmfThemesNode} theme Theme.
 * @param {boolean=} opt_init set to true for initialization phase.
 * @export
 */
gmf.ThemeselectorController.prototype.setTheme = function(theme, opt_init) {
  if (theme) {
    this.gmfTreeManager_.addTheme(theme, opt_init);
  }
};


gmf.module.controller('gmfThemeselectorController',
    gmf.ThemeselectorController);
