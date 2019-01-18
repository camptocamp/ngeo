import angular from 'angular';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';
import gmfThemeThemes from 'gmf/theme/Themes.js';
import ngeoStatemanagerService from 'ngeo/statemanager/Service.js';


/**
 * @enum {string}
 */
export const EventType = {
  /**
   * Triggered when the theme name change.
   */
  THEME_NAME_SET: 'gmf-thememanager-theme_name_set'
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
 * @param {import("gmf/theme/Themes.js").default} gmfThemes gmf Themes service.
 * @param {boolean} gmfTreeManagerModeFlush Flush mode active?
 * @param {import("gmf/layertree/TreeManager.js").default} gmfTreeManager the tree manager.
 * @param {import("ngeo/statemanager/Service.js").default} ngeoStateManager The ngeo statemanager service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfTreeManager
 */
function Manager($rootScope, gmfThemes, gmfTreeManagerModeFlush,
  gmfTreeManager, ngeoStateManager) {

  /**
   * @type {angular.IScope}
   * @private
   */
  this.$rootScope_ = $rootScope;

  /**
   * @type {import("gmf/theme/Themes.js").default}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {boolean}
   * @export
   */
  this.modeFlush = gmfTreeManagerModeFlush;

  /**
   * @type {import("gmf/layertree/TreeManager.js").default}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;

  /**
   * @type {import("ngeo/statemanager/Service.js").default}
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
 * @param {!gmfThemes.GmfTheme} theme A theme object.
 * @param {boolean=} opt_silent if true it will be no user message if
 *     the theme should be added but it's already added.
 * @export
 */
Manager.prototype.addTheme = function(theme, opt_silent) {
  if (this.modeFlush) {
    this.ngeoStateManager_.updateState({
      'theme': theme.name
    });
    this.setThemeName(theme.name);
    this.gmfTreeManager_.setFirstLevelGroups(theme.children);
  } else {
    this.gmfTreeManager_.addFirstLevelGroups(theme.children, false, opt_silent);
  }
};


/**
 * @return {string} The theme name. Will be empty on 'not flush' mode.
 * @export
 */
Manager.prototype.getThemeName = function() {
  return this.themeName_;
};


/**
 * @return {boolean} true if the theme is loading.
 * @export
 */
Manager.prototype.isLoading = function() {
  return !this.gmfThemes_.loaded;
};

/**
 * @param {string} name The new theme name.
 * @param {boolean=} opt_silent Don't emit a theme change event, default is false.
 */
Manager.prototype.setThemeName = function(name, opt_silent) {
  this.themeName_ = name;
  if (!opt_silent) {
    this.$rootScope_.$emit(EventType.THEME_NAME_SET, name);
  }
};


/**
 * Remove all groups.
 * @export
 */
Manager.prototype.removeAll = function() {
  this.gmfTreeManager_.removeAll();
};


/**
 * @type {!angular.IModule}
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

module.service('gmfThemeManager', Manager);


export default module;
