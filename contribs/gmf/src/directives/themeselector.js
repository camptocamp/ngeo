goog.provide('gmf.ThemeselectorController');
goog.provide('gmf.themeselectorDirective');

goog.require('gmf');
goog.require('gmf.Themes');
goog.require('gmf.ThemesEventType');
goog.require('goog.array');
goog.require('goog.events');
goog.require('ngeo.Location');


/**
 *
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
      'currentTheme': '=gmfThemeselectorCurrenttheme'
    },
    bindToController: true,
    controllerAs: 'tsCtrl',
    templateUrl: gmf.baseTemplateUrl + '/themeselector.html'
  };
};

gmfModule.directive('gmfThemeselector', gmf.themeselectorDirective);



/**
 * @param {ngeo.Location} ngeoLocation ngeo Location service.
 * @param {gmf.Themes} gmfThemes Themes service.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname gmfThemeselectorController
 */
gmf.ThemeselectorController = function(ngeoLocation, gmfThemes) {

  /**
   * @type {string}
   * @export
   */
  this.currentTheme = gmf.ThemeselectorController.DEFAULT_THEME_;

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


  goog.events.listen(gmfThemes, gmf.ThemesEventType.LOAD,
      /**
       * @param {goog.events.Event} evt Event.
       */
      function(evt) {
        this.setThemes_();
      }, undefined, this);

  // Get the theme from the URL if specified, otherwise we use the default
  // theme and add it to the URL.
  var pathElements = ngeoLocation.getPath().split('/');
  if (gmf.ThemeselectorController.themeInUrl(pathElements)) {
    this.currentTheme = pathElements[pathElements.length - 1];
  } else {
    this.setLocationPath_(this.currentTheme);
  }
};


/**
 * @const
 * @private
 */
gmf.ThemeselectorController.DEFAULT_THEME_ = 'main';


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
 * @private
 */
gmf.ThemeselectorController.prototype.setThemes_ = function() {
  this.gmfThemes_.getThemesObject().then(goog.bind(
      /**
       * Keep only the themes dedicated to the theme switcher
       * @param {Array.<Object>} themes Array of theme objects.
       */
      function(themes) {

        /**
         * @type {Array.<Object>}
         * @export
         */
        this.themes = themes.filter(function(theme) {
          return true; // == theme['metadata']['display_in_switcher'];
        });
      }, this));
};


/**
 * @param {string} themeId The id of the theme.
 * @export
 */
gmf.ThemeselectorController.prototype.switchTheme = function(themeId) {
  this.currentTheme = themeId;
  this.setLocationPath_(themeId);
};


gmfModule.controller('gmfThemeselectorController',
    gmf.ThemeselectorController);

