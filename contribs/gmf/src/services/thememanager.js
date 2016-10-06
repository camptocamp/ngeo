goog.provide('gmf.ThemeManager');

goog.require('gmf');
goog.require('gmf.Themes');
goog.require('gmf.TreeManager');
goog.require('ngeo.StateManager');


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
 *    var module = angular.module('app');
 *    module.value('gmfTreeManagerModeFlush', false);
 *
 * This service's theme is a GmfTheme with only children and a name.
 * Thought to be the tree source of the gmf layertree directive.
 * @constructor
 * @param {gmf.Themes} gmfThemes gmf Themes service.
 * @param {boolean} gmfTreeManagerModeFlush Flush mode active?
 * @param {gmf.TreeManager} gmfTreeManager the tree manager.
 * @param {ngeo.StateManager} ngeoStateManager The ngeo StateManager service.
 * @ngInject
 * @struct
 * @ngdoc service
 * @ngname gmfTreeManager
 */
gmf.ThemeManager = function(gmfThemes, gmfTreeManagerModeFlush, gmfTreeManager, ngeoStateManager) {

  /**
   * @type {gmf.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {boolean}
   */
  this.modeFlush = gmfTreeManagerModeFlush;

  /**
   * @type {gmf.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;

  /**
   * @type {ngeo.StateManager}
   * @private
   */
  this.ngeoStateManager_ = ngeoStateManager;

  /**
   * @type {string}
   * @export
   */
  this.themeName = '';
};


/**
 * Set the current theme name (mode 'flush' only) and add its children. Add
 * only groups that are not already in the tree.
 * @param {GmfTheme} theme A theme object.
 * @export
 */
gmf.ThemeManager.prototype.addTheme = function(theme) {
  if (this.modeFlush) {
    this.ngeoStateManager_.updateState({
      'theme' : theme.name
    });
    this.themeName = theme.name;
    this.gmfTreeManager_.setFirstLevelGroups(theme.children);
  } else {
    this.gmfTreeManager_.addFirstLevelGroups(theme.children);
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
