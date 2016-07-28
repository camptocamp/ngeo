goog.provide('gmf.TreeManager');

goog.require('gmf');
goog.require('gmf.Themes');
goog.require('ngeo.Notification');


/**
 * The default value for `modeFlush` that `gmf.TreeManager` is initialized with.
 */
gmf.module.value('gmfTreeManagerModeFlush', true);


/**
 * Manage a tree with children. This service can be used in mode 'flush' (default) or
 * not (mode 'add'). In mode 'flush', each theme, group or group by layer that
 * you add will replace the previous children's array. In mode 'add', children
 * will be just pushed in this array. The default state can be changed by setting
 * the value `gmfTreeManagerModeFlush`, e.g.:
 *
 *    var module = angular.module('app');
 *    module.value('gmfTreeManagerModeFlush', false);
 *
 * This service's theme is a GmfThemesNode with only children and a name.
 * Thought to be the tree source of the gmf layertree directive.
 * @constructor
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {ngeo.Notification} ngeoNotification Ngeo notification service.
 * @param {gmf.Themes} gmfThemes gmf Themes service.
 * @param {boolean} gmfTreeManagerModeFlush Flush mode active?
 * @param {ngeo.StateManager} ngeoStateManager The ngeo StateManager service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfTreeManager
 */
gmf.TreeManager = function($timeout, gettextCatalog, ngeoLayerHelper, ngeoNotification, gmfThemes,
    gmfTreeManagerModeFlush, ngeoStateManager) {

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.$timeout_ = $timeout;

  /**
   * @type {angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {ngeo.LayerHelper}
   * @private
   */
  this.layerHelper_ = ngeoLayerHelper;

  /**
   * @type {ngeo.Notification}
   * @private
   */
  this.ngeoNotification_ = ngeoNotification;

  /**
   * @type {gmf.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {boolean}
   * @private
   */
  this.modeFlush_ = gmfTreeManagerModeFlush;

  /**
   * @type {GmfThemesNode}
   * @export
   */
  this.tree = /** @type {GmfThemesNode} */ ({
    children: [],
    name: ''
  });

  /**
   * @type {ngeo.StateManager}
   * @private
   */
  this.ngeoStateManager_ = ngeoStateManager;
};


/**
 * Return the current 'mode' of this service.
 * @return {boolean} True if the service is in 'flush' mode. False otherwise.
 * @export
 */
gmf.TreeManager.prototype.isModeFlush = function() {
  return this.modeFlush_;
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
 * @param{boolean=} opt_init true for the initialization phase (and get previous
*  configuration from the state manager)
 * @export
 */
gmf.TreeManager.prototype.addTheme = function(theme, opt_init) {
  var firstLevelNodes = theme.children;
  var groupsNames, firstLevelNodesNames, isSubset;
  var treeGroups = /** @type {string} */ (this.ngeoStateManager_.getInitialValue(
    gmf.PermalinkParam.TREE_GROUPS));
  if (this.isModeFlush()) {
    this.ngeoStateManager_.updateState({
      'theme' : theme.name
    });
    this.tree.name = theme.name;
  }
  if (opt_init && treeGroups !== undefined) {
    groupsNames = treeGroups.length > 0 ? treeGroups.split(',') : [];
    if (!groupsNames) {
      //User removed all groups from the tree
      return;
    }
    if (!this.isModeFlush()) {
      //Initialization phase and state exists -> first-level groups must be read
      //from the stateManager
      groupsNames.forEach(function(name) {
        this.addGroupByName(name, true);
      }, this);
    } else {
      //Mode flush, check if treeGroups is a subset of firstLevelNodes.
      //NB:If the theme in the URL was different from the theme stored in
      //localStorage, the treeGroups values must not be used.
      firstLevelNodesNames = firstLevelNodes.map(function(group) {
        return group.name;
      });
      isSubset = groupsNames.every(function(name) {
        return firstLevelNodesNames.indexOf(name) >= 0;
      });
      if (isSubset) {
        groupsNames.forEach(function(name) {
          this.addGroupByName(name, true);
        }, this);
      } else {
        this.addGroups(firstLevelNodes);
      }
    }

  } else {
    this.addGroups(firstLevelNodes);
  }
};


/**
 * Add some groups as tree's children. If the service use mode 'flush', the
 * previous tree's children will be removed. Add only groups that are not
 * already in the tree.
 * @param{Array.<GmfThemesNode>} groups An array of gmf theme nodes.
 * @param{boolean=} opt_add if true, force to use the 'add' mode this time.
 * @param{boolean=} opt_silent if true notifyCantAddGroups_ is not called.
 * @return{boolean} True if the group has been added. False otherwise.
 * @export
 */
gmf.TreeManager.prototype.addGroups = function(groups, opt_add, opt_silent) {
  var groupNotAdded = [];

  if (this.isModeFlush() && opt_add !== true) {
    this.tree.children.length = 0;
    this.ngeoStateManager_.deleteParam(gmf.PermalinkParam.TREE_GROUPS);
  }
  groups.forEach(function(group) {
    if (!this.addGroup_(group)) {
      groupNotAdded.push(group);
    }
  }.bind(this));
  if (groupNotAdded.length > 0 && !opt_silent) {
    this.notifyCantAddGroups_(groupNotAdded);
  }

  //Update app state
  this.updateTreeGroupsState_(this.tree.children);
  return (groupNotAdded.length === 0);
};


/**
 * Update the application state with the list of first level groups in the tree
 * @param {Array.<GmfThemesNode>} groups firstlevel groups of the tree
 * @private
 */
gmf.TreeManager.prototype.updateTreeGroupsState_ = function(groups) {
  var treeGroupsParam = {};
  treeGroupsParam[gmf.PermalinkParam.TREE_GROUPS] = groups.map(function(node) {
    return node.name;
  }).join(',');
  this.ngeoStateManager_.updateState(treeGroupsParam);
};


/**
 * Add a group as tree's children without consideration of this service 'mode'.
 * Add it only if it's not already in the tree.
 * @param{GmfThemesNode} group The group to add.
 * @return {boolean} true if the group has been added.
 * @private
 */
gmf.TreeManager.prototype.addGroup_ = function(group) {
  var children = this.tree.children;
  var alreadyAdded = false;
  children.some(function(child) {
    if (group.id === child.id) {
      return alreadyAdded = true;
    }
  });
  if (alreadyAdded) {
    return false;
  }
  children.push(group);
  return true;
};


/**
 * The same as `addGroups`, with the exception that the given group will be
 * deep cloned. Only the clone will be added to the tree.
 * @param{Array.<GmfThemesNodeCustom>} groups An array of object defining
 *     a theme node and an array of layer names to override.
 * @param{boolean=} opt_add if true, force to use the 'add' mode this time.
 * @export
 */
gmf.TreeManager.prototype.addCustomGroups = function(groups, opt_add) {
  var groupNotAdded = [];

  if (this.isModeFlush() && opt_add !== true) {
    this.tree.children.length = 0;
  }
  groups.forEach(function(group) {
    var clone = this.cloneGroupNode_(group.node, group.layers);
    if (!this.addGroup_(clone)) {
      groupNotAdded.push(clone);
    }
  }.bind(this));
  if (groupNotAdded.length > 0) {
    this.notifyCantAddGroups_(groupNotAdded);
  }

  //Update app state
  this.updateTreeGroupsState_(this.tree.children);
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
 * @param{boolean=} opt_silent if true notifyCantAddGroups_ is not called
 * @param{ol.Map=} opt_map Map object.
 * @export
 */
gmf.TreeManager.prototype.addGroupByLayerName = function(layerName, opt_add, opt_silent, opt_map) {
  this.gmfThemes_.getThemesObject().then(function(themes) {
    var group = gmf.Themes.findGroupByLayerName(themes, layerName);
    if (group) {
      var groupAdded = this.addGroups([group], opt_add, opt_silent);
      if (opt_map) {
        this.$timeout_(function() {
          this.setLayerVisible_(layerName, group, groupAdded, /** @type {ol.Map}*/ (opt_map));
        }.bind(this));
      }
    }
  }.bind(this));
};


/**
 * Make the layer of a group visible if the group is already in the layertree.
 * If the group has just been added set only the layer layerName visible.
 * @param{string} layerName Name of the layer to set visible.
 * @param{Object} group Group containing the layer to activate.
 * @param{boolean} groupAdded True if the group has been newly added. False otherwise
 * @param{ol.Map} map Map obkect.
 * @private
 */
gmf.TreeManager.prototype.setLayerVisible_ = function(layerName, group, groupAdded, map) {
  var layersArray;
  var activeLayers;

  if (!group.mixed) {
    /** @type {ol.layer.Image} */
    var layerGroup;
    layersArray = map.getLayerGroup().getLayersArray();
    layerGroup = /** @type {ol.layer.Image} */ (this.layerHelper_.getLayerByName(group.name, layersArray));

    if (groupAdded) {
      activeLayers = layerName;
    } else {
      var source = /** @type {ol.source.ImageWMS} */ (layerGroup.getSource());
      activeLayers = source.getParams()['LAYERS'];
      activeLayers += activeLayers.includes(layerName) ? '' : ',' + layerName;
    }

    this.layerHelper_.updateWMSLayerState(layerGroup, activeLayers);

  } else {
    var layer;

    layersArray = this.layerHelper_.getGroupFromMap(map, gmf.DATALAYERGROUP_NAME).getLayersArray();
    if (groupAdded) {
      var children = group.children;

      children.forEach(function(element) {
        layer = this.layerHelper_.getLayerByName(element.name, layersArray);
        if (!(element.name == layerName)) {
          layer.setVisible(false);
        } else {
          layer.setVisible(true);
        }
      }.bind(this));
    } else {
      layer = this.layerHelper_.getLayerByName(layerName, layersArray);
      layer.setVisible(true);
    }
  }
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
    this.updateTreeGroupsState_(children);
  }
};


/**
 * Clone a group node and recursively set all child node `isChecked` using
 * the given list of layer names.
 * @param {GmfThemesNode} group The original group node.
 * @param {Array.<string>} names Array of node names to check (i.e. that
 *     should have their checkbox checked)
 * @return {GmfThemesNode} Cloned node.
 * @export
 */
gmf.TreeManager.prototype.cloneGroupNode_ = function(group, names) {
  var clone = /** @type {GmfThemesNode} */ (goog.object.unsafeClone(group));
  this.toggleNodeCheck_(clone, names);
  return clone;
};


/**
 * Set the child nodes metadata `isChecked` if its name is among the list of
 * given names. If a child node also has children, check those instead.
 * @param {GmfThemesNode} node The original node.
 * @param {Array.<string>} names Array of node names to check (i.e. that
 *     should have their checkbox checked)
 * @export
 */
gmf.TreeManager.prototype.toggleNodeCheck_ = function(node, names) {
  if (!node.children) {
    return;
  }
  node.children.forEach(function(childNode) {
    if (childNode.children) {
      this.toggleNodeCheck_(childNode, names);
    } else if (childNode.metadata) {
      childNode.metadata['isChecked'] = ol.array.includes(names, childNode.name);
    }
  }, this);
};


/**
 * Display a notification that informs that the given groups are already in the
 * tree.
 * @param{Array.<GmfThemesNodeCustom>} groups An array of groups that already in
 *   the tree.
 * @private
 */
gmf.TreeManager.prototype.notifyCantAddGroups_ = function(groups) {
  var names = [];
  var gettextCatalog = this.gettextCatalog_;
  groups.forEach(function(group) {
    names.push(group.name);
  });
  var msg = (names.length < 2) ?
      gettextCatalog.getString('group is already loaded.') :
      gettextCatalog.getString('groups are already loaded.');
  this.ngeoNotification_.notify({
    msg: names.join(', ') + ' ' + msg,
    type: ngeo.MessageType.INFORMATION
  });
};

gmf.module.service('gmfTreeManager', gmf.TreeManager);
