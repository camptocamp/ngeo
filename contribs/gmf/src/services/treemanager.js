goog.provide('gmf.TreeManager');

goog.require('gmf');
goog.require('gmf.Themes');

/**
 * Manage a tree with children. This service can be used in mode 'flush' or
 * not (mode 'add'). In mode 'flush', each theme, group or group by layer that
 * you add will replace the previous children's array. In mode 'add', children
 * will be just pushed in this array.
 * This service's theme is a GmfThemesNode with only children and a name.
 * Thought to be the tree source of the gmf layertree directive.
 * @constructor
 * @param {gmf.Themes} gmfThemes gmf Themes service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfTreeManager
 */
gmf.TreeManager = function(gmfThemes) {

  /**
   * @type {gmf.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {boolean}
   * @private
   */
  this.modeFlush_ = true;

  /**
   * @type {GmfThemesNode}
   * @export
   */
  this.tree = /** @type {GmfThemesNode} */ ({
    children: [],
    name: ''
  });
};


/**
 * Return the current 'mode' of this service.
 * @return {boolean} True if the service is in 'flush' mode. False otherwise.
 * @export
 */
gmf.TreeManager.prototype.isModeFlush = function() {
  return this.modeFlush_
};


/**
 * Set the 'mode' of this service. In mode 'flush', you'll replace previous
 * tree's children with groups that you add. In mode 'add', you'll add them to
 * the array.
 * @param{boolean} value True to use the 'flush' mode. false to use the 'add'
 *     one.
 * @export
 */
gmf.TreeManager.prototype.setModeFlush = function(value) {
  this.modeFlush_ = value;
  this.tree.name = '';
};


/**
 * Set the current theme name (mode 'flush' only) and add its children. Add
 * only groups that are not already in the tree.
 * @param{GmfThemesNode} theme A theme object.
 * @export
 */
gmf.TreeManager.prototype.addTheme = function(theme) {
  if (this.isModeFlush()) {
    this.tree.name = theme.name;
  }
  this.addGroups(theme.children);
};


/**
 * Add some groups as tree's children. If the service use mode 'flush', the
 * previous tree's children will be removed. Add only groups that are not
 * already in the tree.
 * @param{Array.<GmfThemesNode>} groups An array of gmf theme nodes.
 * @param{boolean=} opt_add if true, force to use the 'add' mode this time.
 * @export
 */
gmf.TreeManager.prototype.addGroups = function(groups, opt_add) {
  if (this.isModeFlush() && opt_add !== true) {
    this.tree.children.length = 0;
  }
  groups.forEach(function(group) {
    this.addGroup_(group);
  }.bind(this));
};


/**
 * Add a group as tree's children without consideration of this service 'mode'.
 * Add it only if it's not already in the tree.
 * @param{GmfThemesNode} group The group to add.
 * @private
 */
gmf.TreeManager.prototype.addGroup_ = function(group) {
  var children = this.tree.children;
  var alreadyAdded = false;
  children.some(function(child) {
    if (group.id === child.id) {
      // FIXME: display "this group is already loaded"
      return alreadyAdded = true;
    }
  });
  if (!alreadyAdded) {
    children.push(group);
  }
};


/**
 * Retrieve a theme (first found) by its name and add in the tree. Do nothing
 * if any corresponding theme is found.
 * @param{string} themeName Name of the theme to add.
 * @export
 */
gmf.TreeManager.prototype.addThemeByName = function(themeName) {
  this.gmfThemes_.getThemesObject().then(function(themes) {
    var theme = gmf.Themes.findThemeByName(themes, themeName);
    if (theme) {
      this.addTheme(theme);
    }
  }.bind(this));
};


/**
 * Retrieve a group (first found) by its name and add in the tree. Do nothing
 * if any corresponding group is found.
 * @param{string} groupName Name of the group to add.
 * @param{boolean=} opt_add if true, force to use the 'add' mode this time.
 * @export
 */
gmf.TreeManager.prototype.addGroupByName = function(groupName, opt_add) {
  this.gmfThemes_.getThemesObject().then(function(themes) {
    var group = gmf.Themes.findGroupByName(themes, groupName);
    if (group) {
      this.addGroups([group], opt_add);
    }
  }.bind(this));
};


/**
 * Retrieve a group by the name of a layer that is contained in this group
 * (first found). This group will be added in the tree. Do nothing if any
 * corresponding group is found.
 * @param{string} layerName Name of the layer inside the group to add.
 * @param{boolean=} opt_add if true, force to use the 'add' mode this time.
 * @export
 */
gmf.TreeManager.prototype.addGroupByLayerName = function(layerName, opt_add) {
  this.gmfThemes_.getThemesObject().then(function(themes) {
    var group = gmf.Themes.findGroupByLayerName(themes, layerName);
    if (group) {
      this.addGroups([group], opt_add);
      // FIXME: set the layer visible
    }
  }.bind(this));
};


/**
 * Remove a group from this tree's children. The first group that is found (
 * based on its name) will be removed. If any is found, nothing will append.
 * @param{GmfThemesNode} group The group to remove.
 * @export
 */
gmf.TreeManager.prototype.removeGroup = function(group) {
  var children = this.tree.children;
  var index = 0, found = false;
  children.some(function(child) {
    if (child.name === group.name) {
      return found = true;
    }
    index++;
  }.bind(this));
  if (found) {
    children.splice(index, 1);
  }
};

gmf.module.service('gmfTreeManager', gmf.TreeManager);
