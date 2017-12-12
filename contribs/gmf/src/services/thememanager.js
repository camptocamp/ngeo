goog.provide('gmf.ThemeManager');

goog.require('gmf');
goog.require('gmf.Themes');
goog.require('gmf.TreeManager');
goog.require('ngeo.statemanager.Service');

// FIXME add ngeo.statemanager.Service.module.name in the module dependencies

/**
 * The default value for `modeFlush` that `gmf.TreeManager` is initialized with.
 */
gmf.module.value('gmfTreeManagerModeFlush', true);


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
 * @param {angular.Scope} $rootScope Angular rootScope.
 * @param {gmf.Themes} gmfThemes gmf Themes service.
 * @param {boolean} gmfTreeManagerModeFlush Flush mode active?
 * @param {gmf.TreeManager} gmfTreeManager the tree manager.
 * @param {ngeo.statemanager.Service} ngeoStateManager The ngeo statemanager service.
 * @ngInject
 * @struct
 * @ngdoc service
 * @ngname gmfTreeManager
 */
gmf.ThemeManager = function($rootScope, gmfThemes, gmfTreeManagerModeFlush,
  gmfTreeManager, ngeoStateManager) {

  /**
   * @type {angular.Scope}
   * @private
   */
  this.$rootScope_ = $rootScope;

  /**
   * @type {gmf.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {boolean}
   * @export
   */
  this.modeFlush = gmfTreeManagerModeFlush;

  /**
   * @type {gmf.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;

  /**
   * @type {ngeo.statemanager.Service}
   * @private
   */
  this.ngeoStateManager_ = ngeoStateManager;

  /**
   * @type {string}
   * @private
   */
  this.themeName_ = '';
};


/**
 * Set the current theme name (mode 'flush' only) and add its children. Add
 * only groups that are not already in the tree.
 * @param {!gmfThemes.GmfTheme} theme A theme object.
 * @param {boolean=} opt_silent if true it will be no user message if
 *     the theme should be added but it's already added.
 * @export
 */
gmf.ThemeManager.prototype.addTheme = function(theme, opt_silent) {
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
gmf.ThemeManager.prototype.getThemeName = function() {
  return this.themeName_;
};


/**
 * @param {string} name The new theme name.
 * @param {boolean=} opt_stealth Don't emit an event is true
 * @export
 */
gmf.ThemeManager.prototype.setThemeName = function(name, opt_stealth) {
  this.themeName_ = name;
  if (!opt_stealth) {
    this.$rootScope_.$emit(gmf.ThemeManager.EventType.THEME_NAME_SET, name);
  }
};


/**
 * Remove all groups.
 * @export
 */
gmf.ThemeManager.prototype.removeAll = function() {
  this.gmfTreeManager_.removeAll();
};

gmf.module.service('gmfThemeManager', gmf.ThemeManager);


/**
 * @enum {string}
 */
gmf.ThemeManager.EventType = {
  /**
   * Triggered when the theme name change.
   */
  THEME_NAME_SET: 'gmf-thememanager-theme_name_set'
};
