goog.provide('gmf.TreeManager');

goog.require('gmf');
goog.require('gmf.Themes');
goog.require('ngeo.Notification');
goog.require('ngeo.StateManager');
goog.require('ngeo.LayertreeController');


/**
 * Manage a tree with children. This service can be used in mode 'flush'
 * (default) or not (mode 'add'). In mode 'flush', each theme, group or group
 * by layer that you add will replace the previous children's array. In mode
 * 'add', children will be just pushed in this array. The default state can be
 * changed by setting the value `gmfTreeManagerModeFlush`, e.g.:
 *
 *     let module = angular.module('app');
 *     module.value('gmfTreeManagerModeFlush', false);
 *
 * This service's theme is a GmfTheme with only children and a name.
 * Thought to be the tree source of the gmf layertree directive.
 * @constructor
 * @struct
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {angular.$injector} $injector Angular injector service.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {ngeo.Notification} ngeoNotification Ngeo notification service.
 * @param {gmf.Themes} gmfThemes gmf Themes service.
 * @param {ngeo.StateManager} ngeoStateManager The ngeo StateManager service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfTreeManager
 */
gmf.TreeManager = function($timeout, $injector, gettextCatalog, ngeoLayerHelper,
  ngeoNotification, gmfThemes, ngeoStateManager) {

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.$timeout_ = $timeout;

  /**
   * @type {angular.$injector}
   * @private
   */
  this.$injector_ = $injector;

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
   * The root node and its children used to generate the layertree (with the
   * same ordre).
   * @type {gmfThemes.GmfRootNode}
   * @public
   */
  this.root = /** @type {gmfThemes.GmfRootNode} */ ({
    children: []
  });

  /**
   * The controller of the (unique) root layer tree.
   * The array of top level layer trees is avaible through `rootCtrl.children`.
   * The order doesn't match with the ordre of the displayed layertree.
   * @type {ngeo.LayertreeController}
   * @export
   */
  this.rootCtrl = null;

  /**
   * Number of groups to add to the layertree during one single Angular
   * digest loop.
   * @type {number}
   * @public
   */
  this.numberOfGroupsToAddInThisDigestLoop = 0;

  /**
   * @type {Array.<gmfThemes.GmfGroup>}
   * @private
   */
  this.groupsToAddInThisDigestLoop_ = [];

  /**
   * @type {angular.$q.Promise}
   * @private
   */
  this.promiseForGroupsToAddInThisDigestLoop_ = null;

  /**
   * @type {ngeo.StateManager}
   * @private
   */
  this.ngeoStateManager_ = ngeoStateManager;

  /**
   * A reference to the OGC servers loaded by the theme service.
   * @type {gmfThemes.GmfOgcServers|null}
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
 * The themes could have been changed so it also call a refresh of the
 * layertree.
 * @private
 */
gmf.TreeManager.prototype.handleThemesChange_ = function() {
  this.gmfThemes_.getOgcServersObject().then((ogcServers) => {
    this.ogcServers_ = ogcServers;
  });

  if (this.rootCtrl && this.rootCtrl.children) {
    this.gmfThemes_.getThemesObject().then((themes) => {
      this.refreshFirstLevelGroups_(themes);
    });
  }
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
 * @param {Array.<gmfThemes.GmfGroup>} firstLevelGroups An array of gmf theme
 *     group.
 * @param {boolean=} opt_add if true, force to use the 'add' mode this time.
 * @param {boolean=} opt_silent if true notifyCantAddGroups_ is not called.
 * @return{boolean} True if the group has been added. False otherwise.
 * @export
 */
gmf.TreeManager.prototype.addFirstLevelGroups = function(firstLevelGroups,
  opt_add, opt_silent) {
  const groupNotAdded = [];

  firstLevelGroups.slice().reverse().forEach((group) => {
    if (!this.addFirstLevelGroup_(group)) {
      groupNotAdded.push(group);
    }
  });
  if (groupNotAdded.length > 0 && !opt_silent) {
    this.notifyCantAddGroups_(groupNotAdded);
  }

  return groupNotAdded.length === 0;
};


/**
 * Update the application state with the list of first level groups in the tree
 * @param {Array.<gmfThemes.GmfGroup>} groups firstlevel groups of the tree
 * @private
 */
gmf.TreeManager.prototype.updateTreeGroupsState_ = function(groups) {
  const treeGroupsParam = {};
  treeGroupsParam[gmf.PermalinkParam.TREE_GROUPS] = groups.map(node => node.name).join(',');
  this.ngeoStateManager_.updateState(treeGroupsParam);
  if (this.$injector_.has('gmfPermalink')) {
    /** @type {gmf.Permalink} */(this.$injector_.get('gmfPermalink')).cleanParams(groups);
  }
};


/**
 * Add a group as tree's children without consideration of this service 'mode'.
 * Add it only if it's not already in the tree.
 * @param {gmfThemes.GmfGroup} group The group to add.
 * @return {boolean} true if the group has been added.
 * @private
 */
gmf.TreeManager.prototype.addFirstLevelGroup_ = function(group) {
  let alreadyAdded = false;
  const groupID = group.id;
  this.root.children.some((rootChild) => {
    if (groupID === rootChild.id) {
      return alreadyAdded = true;
    }
  }, this);
  this.groupsToAddInThisDigestLoop_.some((grp) => {
    if (groupID === grp.id) {
      return alreadyAdded = true;
    }
  }, this);
  if (alreadyAdded) {
    return false;
  }

  // Add groups in the list of groups to add and be sure that the counter of
  // groups to add is reset.
  this.groupsToAddInThisDigestLoop_.push(group);
  this.numberOfGroupsToAddInThisDigestLoop = 0;

  // Delete previous timeout promise if it exists to do this action only once.
  if (this.promiseForGroupsToAddInThisDigestLoop_ !== null) {
    this.$timeout_.cancel(this.promiseForGroupsToAddInThisDigestLoop_);
  }

  // Add the groups only when there is no more group to come during this digest
  // loop. The purpose of this is to preserve a consistent order between the
  // layertree (generated by a template) and the layers in the map.
  this.promiseForGroupsToAddInThisDigestLoop_ = this.$timeout_(() => {
    // Set the number of group to add.
    this.numberOfGroupsToAddInThisDigestLoop = this.groupsToAddInThisDigestLoop_.length;
    // Add each first-level-groups.
    this.groupsToAddInThisDigestLoop_.forEach(function(grp) {
      this.root.children.unshift(grp);
    }, this);
    //Update the permalink
    this.updateTreeGroupsState_(this.root.children);
    // Reset the groups and the promise state. Don't reset the
    // numberOfGroupsToAddInThisDigestLoop, it must persist because the layers
    // will be added into the map after that the layertree template is
    // generated (so in the next angular loop).
    this.groupsToAddInThisDigestLoop_.length = 0;
    this.promiseForGroupsToAddInThisDigestLoop_ = null;
  });

  return true;
};


/**
 * Retrieve a group (first found) by its name and add in the tree. Do nothing
 * if any corresponding group is found.
 * @param {string} groupName Name of the group to add.
 * @param {boolean=} opt_add if true, force to use the 'add' mode this time.
 * @export
 */
gmf.TreeManager.prototype.addGroupByName = function(groupName, opt_add) {
  this.gmfThemes_.getThemesObject().then((themes) => {
    const group = gmf.Themes.findGroupByName(themes, groupName);
    if (group) {
      this.addFirstLevelGroups([group], opt_add, false);
    }
  });
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
  this.gmfThemes_.getThemesObject().then((themes) => {
    const group = gmf.Themes.findGroupByLayerNodeName(themes, layerName);
    if (group) {
      const groupAdded = this.addFirstLevelGroups([group], opt_add, opt_silent);
      this.$timeout_(() => {
        const treeCtrl = this.getTreeCtrlByNodeId(group.id);
        if (!treeCtrl) {
          console.warn('Tree controller not found, unable to add the group');
          return;
        }
        let treeCtrlToActive;
        treeCtrl.traverseDepthFirst((treeCtrl) => {
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
      });
    }
  });
};


/**
 * Remove a group from this tree's children. The first group that is found (
 * based on its name) will be removed. If any is found, nothing will append.
 * @param {gmfThemes.GmfGroup} group The group to remove.
 * @export
 */
gmf.TreeManager.prototype.removeGroup = function(group) {
  const children = this.root.children;
  let index = 0, found = false;
  children.some((child) => {
    if (child.name === group.name) {
      return found = true;
    }
    index++;
  });
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
  const clone = /** @type {gmfThemes.GmfGroup} */ (ol.obj.assign({}, group));
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
  const names = [];
  const gettextCatalog = this.gettextCatalog_;
  groups.forEach((group) => {
    names.push(group.name);
  });
  const msg = (names.length < 2) ?
    gettextCatalog.getString('group is already loaded.') :
    gettextCatalog.getString('groups are already loaded.');
  this.ngeoNotification_.notify({
    msg: `${names.join(', ')} ${msg}`,
    type: ngeo.MessageType.INFORMATION
  });
};


/**
 * Get a treeCtrl based on it's node id.
 * @param {number} id the id of a GMFThemesGroup or a GMFThemesLeaf.
 * @return {ngeo.LayertreeController?} treeCtrl The associated controller or null.
 * @public
 */
gmf.TreeManager.prototype.getTreeCtrlByNodeId = function(id) {
  let correspondingTreeCtrl = null;
  if (this.rootCtrl && this.rootCtrl.traverseDepthFirst) {
    this.rootCtrl.traverseDepthFirst((treeCtrl) => {
      if (treeCtrl.node.id === id) {
        correspondingTreeCtrl = treeCtrl;
        return ngeo.LayertreeController.VisitorDecision.STOP;
      }
    });
  }
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
    const gmfLayerWMS = /** @type {gmfThemes.GmfLayerWMS} */ (treeCtrl.node);
    goog.asserts.assert(gmfLayerWMS.ogcServer);
    return this.ogcServers_[gmfLayerWMS.ogcServer];
  } else {
    let firstLevelGroupCtrl = treeCtrl;
    while (!firstLevelGroupCtrl.parent.isRoot) {
      firstLevelGroupCtrl = firstLevelGroupCtrl.parent;
    }
    const gmfGroup = /** @type {gmfThemes.GmfGroup} */ (firstLevelGroupCtrl.node);
    goog.asserts.assert(gmfGroup.ogcServer);
    return this.ogcServers_[gmfGroup.ogcServer];
  }
};


/**
 * Keep the state of each existing first-level-groups in the layertree then
 * remove it and recreate it with nodes that come from the new theme and
 * the corresponding saved state (when possible, otherwise, juste take the
 * corresponding new node).
 * FIXME: Currently doesn't save nor restore the opacity.
 * @param {Array.<gmfThemes.GmfTheme>} themes the array of themes to be based on.
 * @private
 */
gmf.TreeManager.prototype.refreshFirstLevelGroups_ = function(themes) {
  const firstLevelGroupsFullState = {};

  // Save state of each child
  this.rootCtrl.children.map((treeCtrl) => {
    const name = treeCtrl.node.name;
    firstLevelGroupsFullState[name] = this.getFirstLevelGroupFullState_(treeCtrl);
  });

  // Get nodes and set their state
  const nodesToRestore = [];
  // Iterate on the root to keep the same order in the tree as before.
  this.root.children.map((node) => {
    const name = node.name;

    // Find the right firstlevelgroup in the new theme.
    const nodeToRestore = gmf.Themes.findGroupByName(themes, name);
    if (nodeToRestore) {
      // Restore state.
      const fullState = firstLevelGroupsFullState[name];
      if (fullState) {
        this.setNodeMetadataFromFullState_(nodeToRestore, fullState);
      }
      nodesToRestore.push(nodeToRestore);
    }
  });

  // Readd the firstlevelgroups.
  this.setFirstLevelGroups(nodesToRestore);

  // Wait that Angular has created the layetree, then update the permalink.
  this.$timeout_(() => {
    this.updateTreeGroupsState_(this.root.children);
  });
};


/**
 * Return a gmf.TreeManager.fullState that keeps the state of the given
 * treeCtrl including the state of its children.
 * @param {ngeo.LayertreeController} treeCtrl the ngeo layertree controller to
 *     save.
 * @return {gmf.TreeManager.fullState!} the fullState object.
 * @private
 */
gmf.TreeManager.prototype.getFirstLevelGroupFullState_ = function(treeCtrl) {
  const children = {};
  // Get the state of the treeCtrl children recursively.
  treeCtrl.children.map((child) => {
    children[child.node.name] = this.getFirstLevelGroupFullState_(child);
  });

  let isChecked, isExpanded, isLegendExpanded;
  if (treeCtrl.children.length > 0) {
    const nodeElement = $(`#gmf-layertree-layer-group-${treeCtrl.uid}`);
    // Set isExpanded only in groups.
    if (nodeElement) {
      isExpanded = nodeElement.hasClass('in');
    }
  } else {
    // Set state and isLegendExpanded only in leaves.
    isChecked = treeCtrl.getState();
    if (isChecked === 'on') {
      isChecked = true;
    } else if (isChecked === 'off') {
      isChecked = false;
    } else {
      isChecked = undefined;
    }
    const legendElement = $(`#gmf-layertree-node-${treeCtrl.uid}-legend`);
    if (legendElement) {
      isLegendExpanded = legendElement.is(':visible');
    }
  }

  return {
    children,
    isChecked,
    isExpanded,
    isLegendExpanded
  };
};


/**
 * Set a node's metadata with the given fullState. Update also its children
 * recursively with the fullState children.
 * @param {gmfThemes.GmfGroup|gmfThemes.GmfLayer} node to update.
 * @param {gmf.TreeManager.fullState|undefined} fullState the fullState object
 *     to use.
 * @return {gmfThemes.GmfGroup|gmfThemes.GmfLayer} the node with modification.
 * @private
 */
gmf.TreeManager.prototype.setNodeMetadataFromFullState_ = function(node, fullState) {
  if (!fullState) {
    return node;
  }

  // Set the metadata of the node children recursively.
  if (node.children) {
    node.children.map((child) => {
      this.setNodeMetadataFromFullState_(child, fullState.children[child.name]);
    });
  }

  // Set the metadata with the fullState object informations.
  const metadata = node.metadata;
  metadata.isChecked = fullState.isChecked;
  metadata.isExpanded = fullState.isExpanded;
  metadata.isLegendExpanded = fullState.isLegendExpanded;

  return node;
};

/**
 * @typedef {{
 *     children: (Object.<string, gmf.TreeManager.fullState>|undefined),
 *     isChecked: (boolean|undefined),
 *     isExpanded: (boolean|undefined),
 *     isLegendExpanded: (boolean|undefined)
 * }}
 */
gmf.TreeManager.fullState;

gmf.module.service('gmfTreeManager', gmf.TreeManager);
