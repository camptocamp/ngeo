goog.provide('gmf.ThemeselectorController');
goog.provide('gmf.themeselectorDirective');

goog.require('gmf');
goog.require('gmf.TreeManager');
goog.require('gmf.Themes');
goog.require('gmf.ThemesEventType');


/**
 * Note that this directive works with the gmf TreeManager service. Set the
 * theme will update the "tree" object of this TreeManager service.
 * Example:
 *
 *     <gmf-themeselector
 *         id="themes"
 *         data-header-title="Themes"
 *         gmf-themeselector-filter="::mainCtrl.filter">
 *     </gmf-themeselector>
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
 * @param {gmf.TreeManager} gmfTreeManager Tree manager service.
 * @param {gmf.Themes} gmfThemes Themes service.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname gmfThemeselectorController
 */
gmf.ThemeselectorController = function($scope, gmfTreeManager, gmfThemes) {

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

  this.gmfTreeManager_.removeAll();

  this.gmfThemes_.getThemesObject().then(function(themes) {
    // Keep only the themes dedicated to the theme switcher
    this.themes = this.filter ? themes.filter(this.filter) : themes;
  }.bind(this));
};


/**
 * @param {GmfThemesTheme} theme Theme.
 * @param {boolean=} opt_init set to true for initialization phase.
 * @export
 */
gmf.ThemeselectorController.prototype.setTheme = function(theme, opt_init) {
  if (theme) {
    this.gmfTreeManager_.addTheme(theme, opt_init);
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
