/**
 * @module gmf.theme.selectorComponent
 */
import gmfThemeManager from 'gmf/theme/Manager.js';
import gmfThemeThemes from 'gmf/theme/Themes.js';
import * as olEvents from 'ol/events.js';

import 'bootstrap/js/src/dropdown.js';


/**
 * @type {!angular.IModule}
 */
const exports = angular.module('gmfThemeSelectorComponent', [
  gmfThemeManager.module.name,
  gmfThemeThemes.module.name,
]);


exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/theme/selectorComponent', require('./selectorComponent.html'));
});


exports.value('gmfThemeSelectorTemplateUrl',
  /**
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['gmfThemeSelectorTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'gmf/theme/selectorComponent';
  });


/**
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.Attributes): string} gmfThemeSelectorTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfThemeSelectorTemplateUrl($attrs, gmfThemeSelectorTemplateUrl) {
  return gmfThemeSelectorTemplateUrl($attrs);
}


/**
 * Note that this component works with the {@link gmf.layertree.TreeManager}.
 * Setting the theme will update the "tree" object of
 * this {@link gmf.layertree.TreeManager}.
 *
 * Example:
 *
 *      <a href class="btn btn-block btn-primary dropdown-toggle" data-toggle="dropdown">
 *          <span class="fa fa-grid"></span>
 *          <span ng-if="mainCtrl.gmfThemeManager.modeFlush">
 *            <span translate>Theme:</span>
 *            <b ng-if="!mainCtrl.gmfThemeManager.getThemeName()" translate>Loading...</b>
 *            <b ng-if="mainCtrl.gmfThemeManager.getThemeName()">{{mainCtrl.gmfThemeManager.getThemeName()|translate}}</b>
 *          </span>
 *          <span ng-if="!mainCtrl.gmfThemeManager.modeFlush">
 *            <b ng-if="!mainCtrl.gmfThemeManager.themeName" translate>Themes</b>
 *          </span>
 *      </a>
 *      <gmf-themeselector
 *         id="themes"
 *         data-header-title="Themes"
 *         gmf-themeselector-filter="::mainCtrl.filter">
 *      </gmf-themeselector>
 *
 * The theme selector can operate in a 'flush' (as above) or 'add' mode. For more information
 * about these modes, refer to the documentation of {@link gmf.layertree.TreeManager}.
 *
 * Example in 'add' mode:
 *
 *      <a href class="btn btn-block btn-primary dropdown-toggle" data-toggle="dropdown">
 *          <span class="fa fa-grid"></span>
 *          <span translate>Themes</span>
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
const component = {
  bindings: {
    'filter': '<gmfThemeselectorFilter'
  },
  controller: 'gmfThemeselectorController',
  templateUrl: gmfThemeSelectorTemplateUrl
};

exports.component('gmfThemeselector', component);


/**
 * @param {!angular.IScope} $scope Angular scope.
 * @param {gmf.theme.Manager} gmfThemeManager Tree manager service.
 * @param {gmf.theme.Themes} gmfThemes Themes service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname gmfThemeselectorController
 */
exports.Controller_ = function($scope, gmfThemeManager, gmfThemes) {

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

  this.listenerKeys_.push(olEvents.listen(this.gmfThemes_, 'change', this.setThemes_, this));

  $scope.$on('$destroy', this.handleDestroy_.bind(this));

};

/**
 * Store the loaded themes locally applying a filter (if any), then set the
 * current theme.
 * @private
 */
exports.Controller_.prototype.setThemes_ = function() {
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
exports.Controller_.prototype.setTheme = function(theme, opt_silent) {
  if (theme) {
    this.gmfThemeManager.addTheme(theme, opt_silent);
  }
};


/**
 * @private
 */
exports.Controller_.prototype.handleDestroy_ = function() {
  this.listenerKeys_.forEach(olEvents.unlistenByKey);
  this.listenerKeys_.length = 0;
};


exports.controller('gmfThemeselectorController',
  exports.Controller_);


export default exports;
