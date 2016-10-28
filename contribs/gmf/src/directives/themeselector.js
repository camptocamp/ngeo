goog.provide('gmf.ThemeselectorController');
goog.provide('gmf.themeselectorDirective');

goog.require('gmf');
goog.require('gmf.ThemeManager');
goog.require('gmf.Themes');
goog.require('gmf.ThemesEventType');


/**
 * Note that this directive works with the {@link gmf.TreeManager}. Setting the
 * theme will update the "tree" object of this {@link gmf.TreeManager}.
 * Example:
 *
 *     <gmf-themeselector
 *         id="themes"
 *         data-header-title="Themes"
 *         gmf-themeselector-filter="::mainCtrl.filter">
 *     </gmf-themeselector>
 *
 * The theme selector can operate in a 'flush' or 'add' mode. For more information
 * about these modes, refer to the documentation of {@link gmf.TreeManager}.
 *
 * When used in 'flush' mode, the current theme can be shown as follows:
 *
 *     <b ng-if="!mainCtrl.gmfThemeManager.themeName" translate>Loading...</b>
 *     <b ng-if="mainCtrl.gmfThemeManager.themeName">{{mainCtrl.gmfThemeManager.themeName|translate}}</b>
 *
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
 * @param {gmf.ThemeManager} gmfThemeManager Tree manager service.
 * @param {gmf.Themes} gmfThemes Themes service.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname gmfThemeselectorController
 */
gmf.ThemeselectorController = function($scope, gmfThemeManager, gmfThemes) {

  /**
   * @type {gmf.ThemeManager}
   * @export
   */
  this.gmfThemeManager = gmfThemeManager;

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
   * @type {Function|undefined}
   * @export
   */
  this.filter;

  /**
   * @type {Array.<ol.EventsKey>}
   * @export
   */
  this.listenerKeys_ = [];

  this.listenerKeys_.push(ol.events.listen(this.gmfThemes_,
      gmf.ThemesEventType.CHANGE, this.setThemes_, this));

  $scope.$on('$destroy', this.handleDestroy_.bind(this));

};

/**
 * Store the loaded themes locally applying a filter (if any), then set the
 * current theme.
 * @private
 */
gmf.ThemeselectorController.prototype.setThemes_ = function() {

  this.gmfThemeManager.removeAll();

  this.gmfThemes_.getThemesObject().then(function(themes) {
    // Keep only the themes dedicated to the theme switcher
    this.themes = this.filter ? themes.filter(this.filter) : themes;
  }.bind(this));
};


/**
 * @param {gmfThemes.GmfTheme} theme Theme.
 * @export
 */
gmf.ThemeselectorController.prototype.setTheme = function(theme) {
  if (theme) {
    this.gmfThemeManager.addTheme(theme);
  }
};


/**
 * @private
 */
gmf.ThemeselectorController.prototype.handleDestroy_ = function() {
  this.listenerKeys_.forEach(ol.events.unlistenByKey);
  this.listenerKeys_.length = 0;
};


gmf.module.controller('gmfThemeselectorController', gmf.ThemeselectorController);
