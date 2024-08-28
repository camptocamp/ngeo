Controller.$inject = ['$scope', 'gmfThemeManager', 'gmfThemes'];
// The MIT License (MIT)
//
// Copyright (c) 2016-2024 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import {gmfBackgroundlayerStatus} from 'gmf/backgroundlayerselector/status';
import gmfThemeManager from 'gmf/theme/Manager';
import gmfThemeThemes from 'gmf/theme/Themes';
import {listen, unlistenByKey} from 'ol/events';
import 'bootstrap/js/src/dropdown';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfThemeSelectorComponent', [gmfThemeManager.name, gmfThemeThemes.name]);
myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  [
    '$templateCache',
    ($templateCache) => {
      // @ts-ignore: webpack
      $templateCache.put('gmf/theme/selectorComponent', require('./selectorComponent.html'));
    },
  ],
);
myModule.value(
  'gmfThemeSelectorTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs.gmfThemeSelectorTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'gmf/theme/selectorComponent';
  },
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} gmfThemeSelectorTemplateUrl Template function.
 * @returns {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
gmfThemeSelectorTemplateUrl.$inject = ['$attrs', 'gmfThemeSelectorTemplateUrl'];
function gmfThemeSelectorTemplateUrl($attrs, gmfThemeSelectorTemplateUrl) {
  return gmfThemeSelectorTemplateUrl($attrs);
}

/**
 * Note that this component works with the
 * {@link import('gmf/layertree/TreeManager').LayertreeTreeManager}.
 * Setting the theme will update the "tree" object of
 * this {@link import('gmf/layertree/TreeManager').LayertreeTreeManager}.
 *
 * Example:
 *
 *      <a href class="btn btn-block btn-primary dropdown-toggle" data-toggle="dropdown">
 *          <span class="fa fa-grid"></span>
 *          <span ng-if="mainCtrl.gmfThemeManager.modeFlush">
 *            <span translate>Theme:</span>
 *            <b ng-if="!mainCtrl.gmfThemeManager.getThemeName()" translate>Loading..</b>
 *            <b ng-if="mainCtrl.gmfThemeManager.getThemeName()">
 *              {{mainCtrl.gmfThemeManager.getThemeName()|translate}}
 *            </b>
 *          </span>
 *          <span ng-if="!mainCtrl.gmfThemeManager.modeFlush">
 *            <b ng-if="!mainCtrl.gmfThemeManager.themeName" translate>Themes</b>
 *          </span>
 *      </a>
 *      <gmf-themeselector class="dropdown-menu"
 *          gmf-themeselector-currenttheme="mainCtrl.theme"
 *          gmf-themeselector-filter="::mainCtrl.filter">
 *      </gmf-themeselector>
 *
 * The theme selector can operate in a 'flush' (as above) or 'add' mode. For more information
 * about these modes, refer to the documentation of
 * {@link import('gmf/layertree/TreeManager').LayertreeTreeManager}.
 *
 * To use the 'add' mode just add the constants:
 *
 *    gmfTreeManagerModeFlush: false
 *
 * @htmlAttribute {Function} gmf-themeselector-filter The themes filter.
 * @type {angular.IComponentOptions}
 */
const themeSelectorComponent = {
  bindings: {
    'filter': '<gmfThemeselectorFilter',
  },
  controller: 'gmfThemeselectorController',
  templateUrl: gmfThemeSelectorTemplateUrl,
};
myModule.component('gmfThemeselector', themeSelectorComponent);

/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {import('gmf/theme/Manager').ThemeManagerService} gmfThemeManager Tree manager service.
 * @param {import('gmf/theme/Themes').ThemesService} gmfThemes Themes service.
 * @class
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname gmfThemeselectorController
 */
export function Controller($scope, gmfThemeManager, gmfThemes) {
  /**
   * @type {import('gmf/theme/Manager').ThemeManagerService}
   */
  this.gmfThemeManager = gmfThemeManager;

  /**
   * @type {import('gmf/theme/Themes').ThemesService}
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {import('gmf/themes').GmfTheme[]}
   */
  this.themes = [];

  /**
   * @type {function(import('gmf/themes').GmfTheme): boolean|undefined}
   */
  this.filter = (theme) => undefined;

  /**
   * @type {import('ol/events').EventsKey[]}
   */
  this.listenerKeys_ = [];
  this.listenerKeys_.push(listen(this.gmfThemes_, 'change', this.setThemes_, this));
  $scope.$on('$destroy', this.handleDestroy_.bind(this));
}

/**
 * Store the loaded themes locally applying a filter (if any), then set the current theme.
 */
Controller.prototype.setThemes_ = function () {
  this.gmfThemes_.getThemesObject().then((themes) => {
    // Keep only the themes dedicated to the theme switcher
    this.themes = this.filter ? themes.filter(this.filter) : themes;
  });
};

/**
 * @param {import('gmf/themes').GmfTheme} theme Theme.
 * @param {boolean} [opt_silent] if true it will be no user message if
 *     the theme should be added but it's already added.
 */
Controller.prototype.setTheme = function (theme, opt_silent) {
  gmfBackgroundlayerStatus.touchedByUser = true;
  if (theme) {
    this.gmfThemeManager.addTheme(theme, opt_silent);
  }
};
Controller.prototype.handleDestroy_ = function () {
  this.listenerKeys_.forEach(unlistenByKey);
  this.listenerKeys_.length = 0;
};
myModule.controller('gmfThemeselectorController', Controller);
export default myModule;
