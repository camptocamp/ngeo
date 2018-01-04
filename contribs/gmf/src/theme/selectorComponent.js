goog.provide('gmf.theme.selectorComponent');

goog.require('gmf');
goog.require('gmf.theme.Manager');
goog.require('gmf.theme.Themes');
goog.require('ol.events');


/**
 * @type {!angular.Module}
 */
gmf.theme.selectorComponent = angular.module('gmfThemeSelectorComponent', [
  gmf.theme.Manager.module.name,
  gmf.theme.Themes.module.name,
]);

gmf.module.requires.push(gmf.theme.selectorComponent.name);


/**
 * Note that this component works with the {@link gmf.TreeManager}. Setting the
 * theme will update the "tree" object of this {@link gmf.TreeManager}.
 *
 * Example:
 *
 *      <a href class="btn btn-default btn-block btn-primary" data-toggle="dropdown">
 *          <span class="fa fa-grid"></span>
 *          <span ng-if="mainCtrl.gmfThemeManager.modeFlush">
 *            <span translate>Theme:</span>
 *            <b ng-if="!mainCtrl.gmfThemeManager.getThemeName()" translate>Loading...</b>
 *            <b ng-if="mainCtrl.gmfThemeManager.getThemeName()">{{mainCtrl.gmfThemeManager.getThemeName()|translate}}</b>
 *          </span>
 *          <span ng-if="!mainCtrl.gmfThemeManager.modeFlush">
 *            <b ng-if="!mainCtrl.gmfThemeManager.themeName" translate>Themes</b>
 *          </span>
 *          <span class="caret"></span>
 *      </a>
 *      <gmf-themeselector
 *         id="themes"
 *         data-header-title="Themes"
 *         gmf-themeselector-filter="::mainCtrl.filter">
 *      </gmf-themeselector>
 *
 * The theme selector can operate in a 'flush' (as above) or 'add' mode. For more information
 * about these modes, refer to the documentation of {@link gmf.TreeManager}.
 *
 * Example in 'add' mode:
 *
 *      <a href class="btn btn-default btn-block btn-primary" data-toggle="dropdown">
 *          <span class="fa fa-grid"></span>
 *          <span translate>Themes</span>
 *          <span class="caret"></span>
 *      </a>
 *      <gmf-themeselector
 *         id="themes"
 *         data-header-title="Themes"
 *         gmf-themeselector-filter="::mainCtrl.filter">
 *      </gmf-themeselector>
 *      <script>
 *        (function() {
 *          let module = angular.module('app');
 *          module.value('gmfTreeManagerModeFlush', false);
 *        })();
 *      </script>
 *
 * @htmlAttribute {Function} gmf-themeselector-filter The themes filter.
 *
 * @type {!angular.Component}
 */
gmf.theme.selectorComponent.component_ = {
  bindings: {
    'filter': '<gmfThemeselectorFilter'
  },
  controller: 'gmfThemeselectorController',
  templateUrl: () => `${gmf.baseModuleTemplateUrl}/theme/selectorComponent.html`
};

gmf.theme.selectorComponent.component('gmfThemeselector', gmf.theme.selectorComponent.component_);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {gmf.theme.Manager} gmfThemeManager Tree manager service.
 * @param {gmf.theme.Themes} gmfThemes Themes service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname gmfThemeselectorController
 */
gmf.theme.selectorComponent.Controller_ = function($scope, gmfThemeManager, gmfThemes) {

  /**
   * @type {gmf.theme.Manager}
   * @export
   */
  this.gmfThemeManager = gmfThemeManager;

  /**
   * @type {gmf.theme.Themes}
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
   * @private
   */
  this.listenerKeys_ = [];

  this.listenerKeys_.push(ol.events.listen(this.gmfThemes_, 'change', this.setThemes_, this));

  $scope.$on('$destroy', this.handleDestroy_.bind(this));

};

/**
 * Store the loaded themes locally applying a filter (if any), then set the
 * current theme.
 * @private
 */
gmf.theme.selectorComponent.Controller_.prototype.setThemes_ = function() {
  this.gmfThemes_.getThemesObject().then((themes) => {
    // Keep only the themes dedicated to the theme switcher
    this.themes = this.filter ? themes.filter(this.filter) : themes;
  });
};


/**
 * @param {gmfThemes.GmfTheme} theme Theme.
 * @param {boolean=} opt_silent if true it will be no user message if
 *     the theme should be added but it's already added.
 * @export
 */
gmf.theme.selectorComponent.Controller_.prototype.setTheme = function(theme, opt_silent) {
  if (theme) {
    this.gmfThemeManager.addTheme(theme, opt_silent);
  }
};


/**
 * @private
 */
gmf.theme.selectorComponent.Controller_.prototype.handleDestroy_ = function() {
  this.listenerKeys_.forEach(ol.events.unlistenByKey);
  this.listenerKeys_.length = 0;
};


gmf.theme.selectorComponent.controller('gmfThemeselectorController',
  gmf.theme.selectorComponent.Controller_);
