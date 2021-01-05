// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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
import gmfThemeManager from 'gmf/theme/Manager.js';
import gmfThemeThemes from 'gmf/theme/Themes.js';
import {listen, unlistenByKey} from 'ol/events.js';

import 'bootstrap/js/src/dropdown.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfThemeSelectorComponent', [gmfThemeManager.name, gmfThemeThemes.name]);

module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/theme/selectorComponent', require('./selectorComponent.html'));
  }
);

module.value(
  'gmfThemeSelectorTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs.gmfThemeSelectorTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'gmf/theme/selectorComponent';
  }
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} gmfThemeSelectorTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function gmfThemeSelectorTemplateUrl($attrs, gmfThemeSelectorTemplateUrl) {
  return gmfThemeSelectorTemplateUrl($attrs);
}

/**
 * Note that this component works with the
 * {@link import("gmf/layertree/TreeManager.js").LayertreeTreeManager}.
 * Setting the theme will update the "tree" object of
 * this {@link import("gmf/layertree/TreeManager.js").LayertreeTreeManager}.
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
 * {@link import("gmf/layertree/TreeManager.js").LayertreeTreeManager}.
 *
 * To use the 'add' mode just add the constants:
 *
 *    gmfTreeManagerModeFlush: false
 *
 * @htmlAttribute {Function} gmf-themeselector-filter The themes filter.
 *
 * @type {angular.IComponentOptions}
 */
const themeSelectorComponent = {
  bindings: {
    'filter': '<gmfThemeselectorFilter',
  },
  controller: 'gmfThemeselectorController',
  templateUrl: gmfThemeSelectorTemplateUrl,
};

module.component('gmfThemeselector', themeSelectorComponent);

/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {import("gmf/theme/Manager.js").ThemeManagerService} gmfThemeManager Tree manager service.
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes Themes service.
 * @constructor
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname gmfThemeselectorController
 */
export function Controller($scope, gmfThemeManager, gmfThemes) {
  /**
   * @type {import("gmf/theme/Manager.js").ThemeManagerService}
   */
  this.gmfThemeManager = gmfThemeManager;

  /**
   * @type {import("gmf/theme/Themes.js").ThemesService}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {Object[]}
   */
  this.themes = [];

  /**
   * @type {function(import('gmf/themes.js').GmfTheme): boolean|undefined}
   */
  this.filter = (theme) => undefined;

  /**
   * @type {Array<import("ol/events.js").EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  this.listenerKeys_.push(listen(this.gmfThemes_, 'change', this.setThemes_, this));

  $scope.$on('$destroy', this.handleDestroy_.bind(this));
}

/**
 * Store the loaded themes locally applying a filter (if any), then set the
 * current theme.
 * @private
 */
Controller.prototype.setThemes_ = function () {
  this.gmfThemes_.getThemesObject().then((themes) => {
    // Keep only the themes dedicated to the theme switcher
    this.themes = this.filter ? themes.filter(this.filter) : themes;
  });
};

/**
 * @param {import('gmf/themes.js').GmfTheme} theme Theme.
 * @param {boolean=} opt_silent if true it will be no user message if
 *     the theme should be added but it's already added.
 */
Controller.prototype.setTheme = function (theme, opt_silent) {
  if (theme) {
    this.gmfThemeManager.addTheme(theme, opt_silent);
  }
};

/**
 * @private
 */
Controller.prototype.handleDestroy_ = function () {
  this.listenerKeys_.forEach(unlistenByKey);
  this.listenerKeys_.length = 0;
};

module.controller('gmfThemeselectorController', Controller);

export default module;
