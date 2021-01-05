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
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';
import gmfThemeThemes, {findThemeByName} from 'gmf/theme/Themes.js';
import ngeoStatemanagerService from 'ngeo/statemanager/Service.js';

/**
 * @enum {string}
 * @hidden
 */
export const ThemeEventType = {
  /**
   * Triggered when the theme name change.
   */
  THEME_NAME_SET: 'gmf-thememanager-theme_name_set',
};

/**
 * Manage a tree with children. This service can be used in mode 'flush'
 * (default) or not (mode 'add'). In mode 'flush', each theme, group or group
 * by layer that you add will replace the previous children's array. In mode
 * 'add', children will be just pushed in this array. The default state can be
 * changed by setting the value `gmfTreeManagerModeFlush`, e.g.:
 *
 *    let module = angular.module('app');
 *    module.value('gmfTreeManagerModeFlush', false);
 *
 * This service's theme is a GmfTheme with only children and a name.
 * Thought to be the tree source of the gmf layertree directive.
 * @constructor
 * @param {angular.IScope} $rootScope Angular rootScope.
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes gmf Themes service.
 * @param {boolean} gmfTreeManagerModeFlush Flush mode active?
 * @param {import("gmf/layertree/TreeManager.js").LayertreeTreeManager} gmfTreeManager the tree manager.
 * @param {import("ngeo/statemanager/Service.js").StatemanagerService} ngeoStateManager The ngeo statemanager
 *    service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfTreeManager
 * @hidden
 */
export function ThemeManagerService(
  $rootScope,
  gmfThemes,
  gmfTreeManagerModeFlush,
  gmfTreeManager,
  ngeoStateManager
) {
  /**
   * @type {angular.IScope}
   * @private
   */
  this.$rootScope_ = $rootScope;

  /**
   * @type {import("gmf/theme/Themes.js").ThemesService}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {boolean}
   */
  this.modeFlush = gmfTreeManagerModeFlush;

  /**
   * @type {import("gmf/layertree/TreeManager.js").LayertreeTreeManager}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;

  /**
   * @type {import("ngeo/statemanager/Service.js").StatemanagerService}
   * @private
   */
  this.ngeoStateManager_ = ngeoStateManager;

  /**
   * @type {string}
   * @private
   */
  this.themeName_ = '';
}

/**
 * Set the current theme name (mode 'flush' only) and add its children. Add
 * only groups that are not already in the tree.
 * @param {import('gmf/themes.js').GmfTheme} theme A theme object.
 * @param {boolean=} opt_silent if true it will be no user message if
 *     the theme should be added but it's already added.
 */
ThemeManagerService.prototype.addTheme = function (theme, opt_silent) {
  if (this.modeFlush) {
    this.ngeoStateManager_.updateState({
      'theme': theme.name,
    });
    this.setThemeName(theme.name);
    this.gmfTreeManager_.setFirstLevelGroups(theme.children);
  } else {
    this.gmfTreeManager_.addFirstLevelGroups(theme.children, false, opt_silent);
  }
};

/**
 * @return {string} The theme name. Will be empty on 'not flush' mode.
 */
ThemeManagerService.prototype.getThemeName = function () {
  return this.themeName_;
};

/**
 * @return {boolean} true if the theme is loading.
 */
ThemeManagerService.prototype.isLoading = function () {
  return !this.gmfThemes_.loaded;
};

/**
 * @param {?string} themeName wanted theme name.
 * @param {string} fallbackThemeName fallback theme name.
 * @param {boolean=} opt_silent if true notifyCantAddGroups_ is not called.
 * @export
 */
ThemeManagerService.prototype.updateCurrentTheme = function (themeName, fallbackThemeName, opt_silent) {
  this.gmfThemes_.getThemesObject().then((themes) => {
    if (!themeName && this.modeFlush) {
      // In flush mode load current theme private groups
      const fallbackTheme = findThemeByName(themes, fallbackThemeName);
      if (fallbackTheme) {
        this.gmfTreeManager_.setInitialFirstLevelGroups(fallbackTheme.children);
        this.gmfTreeManager_.addFirstLevelGroups(fallbackTheme.children, false, opt_silent);
      }
    }
    if (themeName) {
      const theme = findThemeByName(themes, themeName);
      if (theme) {
        this.addTheme(theme, true);
      }
    } else {
      this.setThemeName(fallbackThemeName);
    }
  });
};

/**
 * @param {string} name The new theme name.
 * @param {boolean=} opt_silent Don't emit a theme change event, default is false.
 */
ThemeManagerService.prototype.setThemeName = function (name, opt_silent) {
  this.themeName_ = name;
  if (!opt_silent) {
    this.$rootScope_.$emit(ThemeEventType.THEME_NAME_SET, name);
  }
};

/**
 * Remove all groups.
 */
ThemeManagerService.prototype.removeAll = function () {
  this.gmfTreeManager_.removeAll();
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfThemeManager', [
  gmfLayertreeTreeManager.name,
  gmfThemeThemes.name,
  ngeoStatemanagerService.name,
]);

/**
 * The default value for `modeFlush` that `gmf.layertree.TreeManager` is initialized with.
 */
module.value('gmfTreeManagerModeFlush', true);

module.service('gmfThemeManager', ThemeManagerService);

export default module;
