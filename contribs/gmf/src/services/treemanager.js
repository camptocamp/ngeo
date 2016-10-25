goog.provide('gmf.TreeManager');

goog.require('gmf');
goog.require('gmf.Themes');
goog.require('ngeo.Notification');
goog.require('ngeo.StateManager');


/**
 * Manage a tree with children. This service can be used in mode 'flush'
 * (default) or not (mode 'add'). In mode 'flush', each theme, group or group
 * by layer that you add will replace the previous children's array. In mode
 * 'add', children will be just pushed in this array. The default state can be
 * changed by setting the value `gmfTreeManagerModeFlush`, e.g.:
 *
 *     var module = angular.module('app');
 *     module.value('gmfTreeManagerModeFlush', false);
 *
 * This service's theme is a GmfTheme with only children and a name.
 * Thought to be the tree source of the gmf layertree directive.
 * @constructor
 * @struct
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {ngeo.Notification} ngeoNotification Ngeo notification service.
 * @param {gmf.Themes} gmfThemes gmf Themes service.
 * @param {ngeo.StateManager} ngeoStateManager The ngeo StateManager service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfTreeManager
 */
gmf.TreeManager = function($timeout, gettextCatalog, ngeoLayerHelper,
    ngeoNotification, gmfThemes, ngeoStateManager) {

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

  this.root = /** @type {gmfThemes.GmfRootNode} */ ({
    children: []
  });

  /**
   * The controller of the (unique) root layer tree.
   * The array of top level layer trees is avaible through `rootCtrl.children`.
   * @type {ngeo.LayertreeController}
   * @export
   */
  this.rootCtrl = null;

  /**
   * @type {number}
   * @public
   */
  this.layersToAddAtOnce = 0;

  /**
   * @type {ngeo.StateManager}
   * @private
   */
  this.ngeoStateManager_ = ngeoStateManager;

  /**
   * A reference to the OGC servers loaded by the theme service.
   * @type {gmfThemes.GmfOgcServers}
   * @private
   */
  this.ogcServers_ = null;

  ol.events.listen(
    this.gmfThemes_,
    gmf.ThemesEventType.CHANGE,
    this.handleThemesChange_,
    this
  );
};

/**
 * Called when the themes change. Get the OGC servers, then listen to the
 * tree manager Layertree controllers array changes.
 * @private
 */
gmf.TreeManager.prototype.handleThemesChange_ = function() {
  this.gmfThemes_.getOgcServersObject().then(function(ogcServers) {
    this.ogcServers_ = ogcServers;
  }.bind(this));
};

/**
 * Set some groups as tree's children. If the service use mode 'flush', the
 * previous tree's children will be removed. Add only groups that are not
 * already in the tree.
 * @param{Array.<gmfThemes.GmfGroup>} firstLevelGroups An array of gmf theme group.
 * @return{boolean} True if the group has been added. False otherwise.
 * @export
 */
gmf.TreeManager.prototype.setFirstLevelGroups = function(firstLevelGroups) {
  this.root.children.length = 0;
  this.ngeoStateManager_.deleteParam(gmf.PermalinkParam.TREE_GROUPS);
  return this.addFirstLevelGroups(firstLevelGroups);
};

/**
 * Add some groups as tree's children. If the service use mode 'flush', the
 * previous tree's children will be removed. Add only groups that are not
 * already in the tree.
 * @param {Array.<gmfThemes.GmfGroup>} firstLevelGroups An array of gmf theme group.
 * @param {boolean=} opt_add if true, force to use the 'add' mode this time.
 * @param {boolean=} opt_silent if true notifyCantAddGroups_ is not called.
 * @param {number=} opt_totalGroupsLength length of all group to add for this
    action.
 * @return{boolean} True if the group has been added. False otherwise.
 * @export
 */
gmf.TreeManager.prototype.addFirstLevelGroups = function(firstLevelGroups, opt_add, opt_silent,
    opt_totalGroupsLength) {
  var groupNotAdded = [];
  this.layersToAddAtOnce = opt_totalGroupsLength || firstLevelGroups.length;

  firstLevelGroups.slice().reverse().forEach(function(group) {
    if (!this.addFirstLevelGroup(group)) {
      groupNotAdded.push(group);
    }
  }.bind(this));
  if (groupNotAdded.length > 0 && !opt_silent) {
    this.notifyCantAddGroups_(groupNotAdded);
  }

  //Update app state
  this.updateTreeGroupsState_(this.root.children);
  return groupNotAdded.length === 0;
};


/**
 * Update the application state with the list of first level groups in the tree
 * @param {Array.<gmfThemes.GmfGroup>} groups firstlevel groups of the tree
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
 * @param {gmfThemes.GmfGroup} group The group to add.
 * @return {boolean} true if the group has been added.
 * @export
 */
gmf.TreeManager.prototype.addFirstLevelGroup = function(group) {
  var alreadyAdded = false;
  this.root.children.some(function(child) {
    if (group.id === child.id) {
      this.layersToAddAtOnce -= 1;
      return alreadyAdded = true;
    }
  }, this);
  if (alreadyAdded) {
    return false;
  }
  this.root.children.unshift(group);
  return true;
};


/**
 * Retrieve a group (first found) by its name and add in the tree. Do nothing
 * if any corresponding group is found.
 * @param {string} groupName Name of the group to add.
 * @param {boolean=} opt_add if true, force to use the 'add' mode this time.
 * @param {number=} opt_totalGroupsLength length of all group to add for this
 *     user action.
 * @export
 */
gmf.TreeManager.prototype.addGroupByName = function(groupName, opt_add,
    opt_totalGroupsLength) {
  this.gmfThemes_.getThemesObject().then(function(themes) {
    var group = gmf.Themes.findGroupByName(themes, groupName);
    if (group) {
      this.addFirstLevelGroups([group], opt_add, false, opt_totalGroupsLength);
    }
  }.bind(this));
};


/**
 * Retrieve a group by the name of a layer that is contained in this group
 * (first found). This group will be added in the tree. Do nothing if any
 * corresponding group is found.
 * @param {string} layerName Name of the layer inside the group to add.
 * @param {boolean=} opt_add if true, force to use the 'add' mode this time.
 * @param {boolean=} opt_silent if true notifyCantAddGroups_ is not called
 * @export
 */
gmf.TreeManager.prototype.addGroupByLayerName = function(layerName, opt_add, opt_silent) {
  this.gmfThemes_.getThemesObject().then(function(themes) {
    var group = gmf.Themes.findGroupByLayerNodeName(themes, layerName);
    if (group) {
      var groupAdded = this.addFirstLevelGroups([group], opt_add, opt_silent);
      this.$timeout_(function() {
        var treeCtrl = this.getTreeCtrlByNodeId(group.id);
        var treeCtrlToActive;
        treeCtrl.traverseDepthFirst(function(treeCtrl) {
          if (treeCtrl.node.name === layerName) {
            treeCtrlToActive = treeCtrl;
            return ngeo.LayertreeController.VisitorDecision.STOP;
          }
        });

        // Deactive all layers in the group if it's not in the tree.
        if (groupAdded)  {
          treeCtrl.setState('off');
        }

        // Active it.
        if (treeCtrlToActive) {
          treeCtrlToActive.setState('on');
        }
      }.bind(this));
    }
  }.bind(this));
};


/**
 * Remove a group from this tree's children. The first group that is found (
 * based on its name) will be removed. If any is found, nothing will append.
 * @param {gmfThemes.GmfGroup} group The group to remove.
 * @export
 */
gmf.TreeManager.prototype.removeGroup = function(group) {
  var children = this.root.children;
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
 * Remove all groups.
 * @export
 */
gmf.TreeManager.prototype.removeAll = function() {
  while (this.root.children.length) {
    this.removeGroup(this.root.children[0]);
  }
};


/**
 * Clone a group node and recursively set all child node `isChecked` using
 * the given list of layer names.
 * @param {gmfThemes.GmfGroup} group The original group node.
 * @param {Array.<string>} names Array of node names to check (i.e. that
 *     should have their checkbox checked)
 * @return {gmfThemes.GmfGroup} Cloned node.
 * @private
 */
gmf.TreeManager.prototype.cloneGroupNode_ = function(group, names) {
  var clone = /** @type {gmfThemes.GmfGroup} */ (goog.object.unsafeClone(group));
  this.toggleNodeCheck_(clone, names);
  return clone;
};


/**
 * Set the child nodes metadata `isChecked` if its name is among the list of
 * given names. If a child node also has children, check those instead.
 * @param {gmfThemes.GmfGroup|gmfThemes.GmfLayer} node The original node.
 * @param {Array.<string>} names Array of node names to check (i.e. that
 *     should have their checkbox checked)
 * @private
 */
gmf.TreeManager.prototype.toggleNodeCheck_ = function(node, names) {
  if (!node.children) {
    return;
  }
  node.children.forEach(function(childNode) {
    if (childNode.children) {
      this.toggleNodeCheck_(childNode, names);
    } else if (childNode.metadata) {
      childNode.metadata.isChecked = ol.array.includes(names, childNode.name);
    }
  }, this);
};


/**
 * Display a notification that informs that the given groups are already in the
 * tree.
 * @param {Array.<gmfThemes.GmfGroup>} groups An array of groups that already in
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


/**
 * Get a treeCtrl based on it's node id.
 * @param {number} id the id of a GMFThemesGroup or a GMFThemesLeaf.
 * @return {ngeo.LayertreeController} treeCtrl The associated controller.
 * @public
 */
gmf.TreeManager.prototype.getTreeCtrlByNodeId = function(id) {
  var correspondingTreeCtrl = null;
  this.rootCtrl.traverseDepthFirst(function(treeCtrl) {
    if (treeCtrl.node.id === id) {
      correspondingTreeCtrl = treeCtrl;
      return ngeo.LayertreeController.VisitorDecision.STOP;
    }
  });
  return correspondingTreeCtrl;
};


/**
 * Get the OGC server.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {gmfThemes.GmfOgcServer} The OGC server.
 */
gmf.TreeManager.prototype.getOgcServer = function(treeCtrl) {
  if (treeCtrl.parent.node.mixed) {
    var gmfLayerWMS = /** @type {gmfThemes.GmfLayerWMS} */ (treeCtrl.node);
    goog.asserts.assert(gmfLayerWMS.ogcServer);
    return this.ogcServers_[gmfLayerWMS.ogcServer];
  } else {
    var firstLevelGroupCtrl = treeCtrl;
    while (!firstLevelGroupCtrl.parent.isRoot) {
      firstLevelGroupCtrl = firstLevelGroupCtrl.parent;
    }
    var gmfGroup = /** @type {gmfThemes.GmfGroup} */ (firstLevelGroupCtrl.node);
    goog.asserts.assert(gmfGroup.ogcServer);
    return this.ogcServers_[gmfGroup.ogcServer];
  }
};

gmf.module.service('gmfTreeManager', gmf.TreeManager);
