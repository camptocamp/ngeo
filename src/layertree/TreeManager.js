// The MIT License (MIT)
//
// Copyright (c) 2016-2022 Camptocamp SA
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
import {PermalinkParam} from 'gmf/index';
import gmfThemeThemes, {findGroupByName, findGroupByLayerNodeName} from 'gmf/theme/Themes';
import ngeoLayertreeController, {
  LayertreeVisitorDecision,
  LayertreeController,
} from 'ngeo/layertree/Controller';
import {MessageType} from 'ngeo/message/Message';
import ngeoMessageNotification from 'ngeo/message/Notification';
import ngeoStatemanagerService from 'ngeo/statemanager/Service';
import {listen} from 'ol/events';

/**
 * @typedef {Object} TreeManagerFullState
 * @property {Object<string, TreeManagerFullState>} [children]
 * @property {boolean|undefined} [isChecked]
 * @property {boolean|undefined} [isExpanded]
 * @property {boolean|undefined} [isLegendExpanded]
 */

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
 *
 * @class
 * @param {angular.IScope} $rootScope Angular rootScope.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {angular.auto.IInjectorService} $injector Angular injector service.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {import('ngeo/map/LayerHelper').LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {import('gmf/theme/Themes').ThemesService} gmfThemes gmf Themes service.
 * @param {import('ngeo/statemanager/Service').StatemanagerService} ngeoStateManager The ngeo
 *    statemanager service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfTreeManager
 * @hidden
 */
export function LayertreeTreeManager(
  $rootScope,
  $timeout,
  $injector,
  gettextCatalog,
  ngeoLayerHelper,
  gmfThemes,
  ngeoStateManager
) {
  /**
   * @type {angular.IScope}
   */
  this.rootScope_ = $rootScope;

  /**
   * @type {angular.ITimeoutService}
   */
  this.$timeout_ = $timeout;

  /**
   * @type {angular.auto.IInjectorService}
   */
  this.$injector_ = $injector;

  /**
   * @type {angular.gettext.gettextCatalog}
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {import('ngeo/map/LayerHelper').LayerHelper}
   */
  this.layerHelper_ = ngeoLayerHelper;

  /**
   * @type {import('gmf/theme/Themes').ThemesService}
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * The root node and its children used to generate the layertree (with the
   * same ordre).
   *
   * @type {import('gmf/themes').GmfRootNode}
   * @public
   */
  this.root = /** @type {import('gmf/themes').GmfRootNode} */ ({
    children: [],
  });

  /**
   * The controller of the (unique) root layer tree.
   * The array of top level layer trees is available through `rootCtrl.children`.
   * The order doesn't match with the ordre of the displayed layertree.
   *
   * @type {?import('ngeo/layertree/Controller').LayertreeController}
   */
  this.rootCtrl = null;

  /**
   * Number of groups to add to the layertree during one single Angular
   * digest loop.
   *
   * @type {number}
   * @public
   */
  this.numberOfGroupsToAddInThisDigestLoop = 0;

  /**
   * @type {import('gmf/themes').GmfGroup[]}
   */
  this.groupsToAddInThisDigestLoop_ = [];

  /**
   * @type {?angular.IPromise<void>}
   */
  this.promiseForGroupsToAddInThisDigestLoop_ = null;

  /**
   * @type {import('ngeo/statemanager/Service').StatemanagerService}
   */
  this.ngeoStateManager_ = ngeoStateManager;

  /**
   * @type {import('gmf/themes').GmfGroup[] | undefined}
   */
  this.initialLevelFirstGroups_ = undefined;

  /**
   * A reference to the OGC servers loaded by the theme service.
   *
   * @type {?import('gmf/themes').GmfOgcServers}
   */
  this.ogcServers_ = null;

  listen(this.gmfThemes_, 'change', this.handleThemesChange_, this);
}

/**
 * Called when the themes change. Get the OGC servers, then listen to the tree manager Layertree
 * controllers array changes.
 * The themes could have been changed so it also call a refresh of the layertree.
 */
LayertreeTreeManager.prototype.handleThemesChange_ = function () {
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
 *
 * @param {import('gmf/themes').GmfGroup[]} firstLevelGroups An array of gmf theme group.
 * @returns {boolean} True if the group has been added. False otherwise.
 */
LayertreeTreeManager.prototype.setFirstLevelGroups = function (firstLevelGroups) {
  //Remove existing submenu if opened at theme refresh
  this.parseTreeNodes(this.root);

  this.root.children.length = 0;
  this.ngeoStateManager_.deleteParam(PermalinkParam.TREE_GROUPS);
  return this.addFirstLevelGroups(firstLevelGroups);
};

/**
 * Add some groups as tree's children. If the service use mode 'flush', the
 * previous tree's children will be removed. Add only groups that are not
 * already in the tree.
 *
 * @param {import('gmf/themes').GmfGroup[]} firstLevelGroups An array of gmf theme
 *     group.
 * @param {boolean} [opt_add] if true, force to use the 'add' mode this time.
 * @param {boolean} [opt_silent] if true notifyCantAddGroups_ is not called.
 * @returns {boolean} True if the group has been added. False otherwise.
 */
LayertreeTreeManager.prototype.addFirstLevelGroups = function (firstLevelGroups, opt_add, opt_silent) {
  /** @type {import('gmf/themes').GmfGroup[]} */
  const groupNotAdded = [];

  firstLevelGroups
    .slice()
    .reverse()
    .forEach((group) => {
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
 * Add some groups as tree's children. If the service use mode 'flush', the
 * previous tree's children will be removed. Add only groups that are not
 * already in the tree.
 *
 * NB: The first level group is added, second-level tree is set active when
 * it corresponds to the searched group.
 *
 * @param {import('gmf/themes').GmfGroup[]} firstLevelGroups An array of gmf theme group.
 * @param {string} groupName The group's name to add.
 * @param {boolean} [opt_add] if true, force to use the 'add' mode this time.
 * @param {boolean} [opt_silent] if true notifyCantAddGroups_ is not called.
 * @returns {boolean} True if the group has been added. False otherwise.
 */
LayertreeTreeManager.prototype.addSecondLevelGroups = function (
  firstLevelGroups,
  groupName,
  opt_add,
  opt_silent
) {
  /** @type {import('gmf/themes').GmfGroup[]} */
  const groupNotAdded = [];

  firstLevelGroups
    .slice()
    .reverse()
    .forEach((group) => {
      if (!this.addFirstLevelGroup_(group)) {
        groupNotAdded.push(group);
      }

      group.children.forEach((child) => {
        // Find if the tree child is the one we searched
        let enabled = child.name === groupName;

        // Set the tree child accordingly
        this.setSearchedChild(child, enabled);
      });

      setTimeout(() => {
        // Update the permalink
        const treeCtrl = this.getTreeCtrlByNodeId(group.id);
        this.rootScope_.$broadcast('ngeo-layertree-state', treeCtrl, treeCtrl);
      }, 0);
    });
  if (groupNotAdded.length > 0 && !opt_silent) {
    this.notifyCantAddGroups_(groupNotAdded);
  }

  return groupNotAdded.length === 0;
};

/**
 * Enable/disable the tree child (node) and apply it to children if present.
 *
 * @param {import('gmf/themes').GmfGroup} node The child object in the tree.
 * @param {boolean} enabled If the child is active or not in the layer-tree.
 */
LayertreeTreeManager.prototype.setSearchedChild = function (node, enabled) {
  // Second/third-level group
  if (node.children) {
    node.children.forEach((child) => {
      this.setSearchedChild(child, enabled);
    });
  } else {
    node.metadata.isChecked = enabled;
  }
};

/**
 * @param {import('gmf/themes').GmfGroup[]} firstGroups The groups we add to the layertree
 */
LayertreeTreeManager.prototype.setInitialFirstLevelGroups = function (firstGroups) {
  this.initialLevelFirstGroups_ = firstGroups;
};

/**
 * @param {import('gmf/themes').GmfGroup | import('gmf/themes').GmfLayer | import('gmf/themes').GmfRootNode} node Layer tree node to remove.
 */
LayertreeTreeManager.prototype.parseTreeNodes = function (node) {
  const group = /** @type {import('gmf/themes').GmfGroup} */ (node);
  if (group.children) {
    /**
     * @param {unknown} child
     */
    group.children.forEach((child) => {
      this.parseTreeNodes(child);
    });
  }
  if (group.popupId) {
    this.removePopup_(group);
  }
};

/**
 * @param {import('gmf/themes').GmfGroup} node Layer tree node to remove.
 */
LayertreeTreeManager.prototype.removePopup_ = function (node) {
  const popupId = node.popupId;
  $(`#${popupId}`).remove();
  delete node.popupId;
};

/**
 * @param {import('gmf/themes').GmfGroup[]} array An array of groups.
 * @param {number} old_index The old index before reorder (the current one).
 * @param {number} new_index The new index after reorder.
 */
LayertreeTreeManager.prototype.reorderChild_ = function (array, old_index, new_index) {
  array.splice(new_index, 0, array.splice(old_index, 1)[0]);
};

/**
 * Update the application state with the list of first level groups in the tree.
 *
 * @param {import('gmf/themes').GmfGroup[]} groups current firstlevel groups of the tree.
 * @param {import('gmf/themes').GmfGroup[]} removedGroups groups removed within this operation.
 */
LayertreeTreeManager.prototype.updateTreeGroupsState_ = function (groups, removedGroups) {
  /**
   * @type {Object<string, string>}
   */
  const treeGroupsParam = {};
  treeGroupsParam[PermalinkParam.TREE_GROUPS] = groups.map((node) => node.name).join(',');
  this.ngeoStateManager_.updateState(treeGroupsParam);
  if (this.$injector_.has('gmfPermalink')) {
    /** @type {import('gmf/permalink/Permalink').PermalinkService} */ (
      this.$injector_.get('gmfPermalink')
    ).cleanParams(removedGroups);
  }
};

/**
 * Add a group as tree's children without consideration of this service 'mode'.
 * Add it only if it's not already in the tree.
 *
 * @param {import('gmf/themes').GmfGroup} group The group to add.
 * @returns {boolean} true if the group has been added.
 */
LayertreeTreeManager.prototype.addFirstLevelGroup_ = function (group) {
  let alreadyAdded = false;
  const groupID = group.id;
  this.root.children.some((rootChild) => {
    if (groupID === rootChild.id) {
      alreadyAdded = true;
      return true;
    }
    return false;
  }, this);
  this.groupsToAddInThisDigestLoop_.some((grp) => {
    if (groupID === grp.id) {
      alreadyAdded = true;
      return true;
    }
    return false;
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
    this.groupsToAddInThisDigestLoop_.forEach((grp) => {
      this.root.children.unshift(grp);

      // We reorder the groups now as it has to be done before the permalink to be updated
      // initialFirstGroups_ is only defined for user change theme loading
      this.root.children.forEach((group, old_index) => {
        if (this.initialLevelFirstGroups_ !== undefined) {
          const new_index = this.initialLevelFirstGroups_.findIndex(
            (firstLevelGroup) => firstLevelGroup.id === group.id
          );
          if (new_index !== -1 && new_index !== old_index) {
            this.reorderChild_(this.root.children, old_index, new_index);
          }
        }
      });
    });
    this.initialLevelFirstGroups_ = undefined;
    //Update the permalink
    this.updateTreeGroupsState_(this.root.children, []);
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
 *
 * @param {string} groupName Name of the group to add.
 * @param {boolean} [opt_add] if true, force to use the 'add' mode this time.
 */
LayertreeTreeManager.prototype.addGroupByName = function (groupName, opt_add) {
  this.gmfThemes_.getThemesObject().then((themes) => {
    const group = findGroupByName(themes, groupName);
    if (group) {
      // If the group we add is the name of the parent node, it's a first level group,
      // otherwise it is a second group that we need to activate
      if (group.name === groupName) {
        this.addFirstLevelGroups([group], opt_add, false);
      } else {
        this.addSecondLevelGroups([group], groupName, opt_add, false);
      }
    }
  });
};

/**
 * Retrieve a group by the name of a layer that is contained in this group
 * (first found). This group will be added in the tree. Do nothing if any
 * corresponding group is found.
 *
 * @param {string} layerName Name of the layer inside the group to add.
 * @param {boolean} [opt_add] if true, force to use the 'add' mode this time.
 * @param {boolean} [opt_silent] if true notifyCantAddGroups_ is not called
 */
LayertreeTreeManager.prototype.addGroupByLayerName = function (layerName, opt_add, opt_silent) {
  this.gmfThemes_.getThemesObject().then((themes) => {
    const group = findGroupByLayerNodeName(themes, layerName);
    if (group) {
      const groupAdded = this.addFirstLevelGroups([group], opt_add, opt_silent);
      this.$timeout_(() => {
        const treeCtrl = this.getTreeCtrlByNodeId(group.id);
        if (!treeCtrl) {
          console.warn('Tree controller not found, unable to add the group');
          return;
        }
        /** @type {unknown} */
        let treeCtrlToActive = null;
        treeCtrl.traverseDepthFirst((treeCtrl) => {
          if (treeCtrl.node.name === layerName) {
            treeCtrlToActive = treeCtrl;
            return LayertreeVisitorDecision.STOP;
          }
        });

        // Deactivate all layers in the group if it's not in the tree.
        if (groupAdded) {
          treeCtrl.setState('off');
        }

        // Active it.
        if (treeCtrlToActive instanceof LayertreeController) {
          treeCtrlToActive.setState('on');
        }
      });
    }
  });
};

/**
 * Remove a group from this tree's children. The first group that is found (
 * based on its name) will be removed. If any is found, nothing will append.
 *
 * @param {import('gmf/themes').GmfGroup} group The group to remove.
 */
LayertreeTreeManager.prototype.removeGroup = function (group) {
  const children = this.root.children;
  let index = 0,
    found = false;
  children.some((child) => {
    if (child.name === group.name) {
      return (found = true);
    }
    index++;
    return false;
  });
  if (found) {
    const removedChildren = children.splice(index, 1);
    this.updateTreeGroupsState_(children, removedChildren);
  }
};

/**
 * Remove all groups.
 */
LayertreeTreeManager.prototype.removeAll = function () {
  while (this.root.children.length) {
    this.removeGroup(this.root.children[0]);
  }
};

/**
 * Clone a group node and recursively set all child node `isChecked` using
 * the given list of layer names.
 *
 * @param {import('gmf/themes').GmfGroup} group The original group node.
 * @param {string[]} names Array of node names to check (i.e. that
 *     should have their checkbox checked)
 * @returns {import('gmf/themes').GmfGroup} Cloned node.
 * @private
 */
LayertreeTreeManager.prototype.cloneGroupNode_ = function (group, names) {
  /**
   * @type {import('gmf/themes').GmfGroup}
   */
  const clone = Object.assign({}, group);
  this.toggleNodeCheck_(clone, names);
  return clone;
};

/**
 * Set the child nodes metadata `isChecked` if its name is among the list of
 * given names. If a child node also has children, check those instead.
 *
 * @param {import('gmf/themes').GmfGroup|import('gmf/themes').GmfLayer} node The original node.
 * @param {string[]} names Array of node names to check (i.e. that
 *     should have their checkbox checked)
 */
LayertreeTreeManager.prototype.toggleNodeCheck_ = function (node, names) {
  const groupNode = /** @type {import('gmf/themes').GmfGroup} */ (node);
  if (!groupNode.children) {
    return;
  }
  groupNode.children.forEach((childNode) => {
    const childGroupNode = /** @type {import('gmf/themes').GmfGroup} */ (childNode);
    if (childGroupNode.children) {
      this.toggleNodeCheck_(childGroupNode, names);
    } else if (childNode.metadata) {
      childNode.metadata.isChecked = names.includes(childNode.name);
    }
  });
};

/**
 * Display a notification that informs that the given groups are already in the
 * tree.
 *
 * @param {import('gmf/themes').GmfGroup[]} groups An array of groups that already in
 *   the tree.
 */
LayertreeTreeManager.prototype.notifyCantAddGroups_ = function (groups) {
  /** @type {string[]} */
  const names = [];
  const gettextCatalog = this.gettextCatalog_;
  groups.forEach((group) => {
    names.push(gettextCatalog.getString(group.name));
  });
  const msg =
    names.length < 2
      ? gettextCatalog.getString('group is already loaded.')
      : gettextCatalog.getString('groups are already loaded.');
  ngeoMessageNotification.notify({
    msg: `${names.join(', ')} ${msg}`,
    type: MessageType.INFORMATION,
  });
};

/**
 * Get a treeCtrl based on it's node id.
 *
 * @param {number} id the id of a GMFThemesGroup or a GMFThemesLeaf.
 * @returns {import('ngeo/layertree/Controller').LayertreeController?} treeCtrl The associated controller
 *    or null.
 * @public
 */
LayertreeTreeManager.prototype.getTreeCtrlByNodeId = function (id) {
  let correspondingTreeCtrl = null;
  if (this.rootCtrl && this.rootCtrl.traverseDepthFirst) {
    this.rootCtrl.traverseDepthFirst((treeCtrl) => {
      if (treeCtrl.node.id === id) {
        correspondingTreeCtrl = treeCtrl;
        return LayertreeVisitorDecision.STOP;
      }
      return LayertreeVisitorDecision.DESCEND;
    });
  }
  return correspondingTreeCtrl;
};

/**
 * Get the OGC server.
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl ngeo layertree controller,
 *    from the current node.
 * @returns {import('gmf/themes').GmfOgcServer} The OGC server.
 */
LayertreeTreeManager.prototype.getOgcServer = function (treeCtrl) {
  if (!this.ogcServers_) {
    throw new Error('Missing ogcServers');
  }
  const gmfParentGroup = /** @type {import('gmf/themes').GmfGroup} */ (treeCtrl.parent.node);
  if (gmfParentGroup.mixed) {
    const gmfLayerWMS = /** @type {import('gmf/themes').GmfLayerWMS} */ (/** @type {any} */ (treeCtrl.node));
    if (!gmfLayerWMS.ogcServer) {
      throw new Error('Missing gmfLayerWMS.ogcServer');
    }
    return this.ogcServers_[gmfLayerWMS.ogcServer];
  } else {
    let firstLevelGroupCtrl = treeCtrl;
    while (!firstLevelGroupCtrl.parent.isRoot) {
      firstLevelGroupCtrl = firstLevelGroupCtrl.parent;
    }
    const gmfGroup = /** @type {import('gmf/themes').GmfGroup} */ (firstLevelGroupCtrl.node);
    if (!gmfGroup.ogcServer) {
      throw new Error('Missing gmfGroup.ogcServer');
    }
    return this.ogcServers_[gmfGroup.ogcServer];
  }
};

/**
 * Keep the state of each existing first-level-groups in the layertree then
 * remove it and recreate it with nodes that come from the new theme and
 * the corresponding saved state (when possible, otherwise, juste take the
 * corresponding new node).
 * FIXME: Currently doesn't save nor restore the opacity.
 *
 * @param {import('gmf/themes').GmfTheme[]} themes the array of themes to be based on.
 */
LayertreeTreeManager.prototype.refreshFirstLevelGroups_ = function (themes) {
  if (!this.rootCtrl) {
    throw new Error('Missing rootCtrl');
  }
  /** @type {Object<string, TreeManagerFullState>} */
  const firstLevelGroupsFullState = {};

  // Save state of each child
  this.rootCtrl.children.map((treeCtrl) => {
    const name = treeCtrl.node.name;
    firstLevelGroupsFullState[name] = this.getFirstLevelGroupFullState_(treeCtrl);
  });

  // Get nodes and set their state
  /** @type {import('gmf/themes').GmfGroup[]} */
  const nodesToRestore = [];
  // Iterate on the root to keep the same order in the tree as before.
  this.root.children.map((node) => {
    const name = node.name;

    // Find the right firstlevelgroup in the new theme.
    const nodeToRestore = findGroupByName(themes, name);
    if (nodeToRestore) {
      nodesToRestore.push(nodeToRestore);
    }
  });

  // Re add the firstlevelgroups.
  this.setFirstLevelGroups(nodesToRestore);

  // Wait that Angular has created the layetree, then restore state and update permalink.
  this.$timeout_(() => {
    // Restore state of each child
    this.rootCtrl.children.map((treeCtrl) => {
      const name = treeCtrl.node.name;
      this.setFirstLevelGroupFullState_(treeCtrl, firstLevelGroupsFullState[name]);
    });

    // Update permalink
    this.updateTreeGroupsState_(this.root.children, []);
  });
};

/**
 * Return a TreeManagerFullState that keeps the state of the given
 * treeCtrl including the state of its children.
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl the ngeo layertree
 *    controller to save.
 * @returns {TreeManagerFullState} the fullState object.
 */
LayertreeTreeManager.prototype.getFirstLevelGroupFullState_ = function (treeCtrl) {
  /**
   * @type {Object<string, TreeManagerFullState>}
   */
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
      isExpanded = nodeElement.hasClass('show');
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
      isLegendExpanded = legendElement.hasClass('show');
    }
  }

  return {
    children,
    isChecked,
    isExpanded,
    isLegendExpanded,
  };
};

/**
 * Restore state of the given treeCtrl including the state of its children from passed TreeManagerFullState.
 *
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl the ngeo layertree controller.
 * @param {TreeManagerFullState|undefined} fullState the fullState object.
 */
LayertreeTreeManager.prototype.setFirstLevelGroupFullState_ = function (treeCtrl, fullState) {
  if (fullState === undefined) {
    return;
  }

  if (treeCtrl.children.length > 0) {
    const nodeElement = $(`#gmf-layertree-layer-group-${treeCtrl.uid}`);
    // Set isExpanded only in groups.
    if (nodeElement) {
      if (fullState.isExpanded) {
        nodeElement.addClass('show');
      } else {
        nodeElement.removeClass('show');
      }
    }
  } else {
    // Set state and isLegendExpanded only in leaves.
    if (fullState.isChecked === true) {
      treeCtrl.setState('on');
    } else if (fullState.isChecked === false) {
      treeCtrl.setState('off');
    }
    const legendElement = $(`#gmf-layertree-node-${treeCtrl.uid}-legend`);
    if (fullState.isLegendExpanded) {
      legendElement.addClass('show');
    } else {
      legendElement.removeClass('show');
    }
  }

  // Set the state of the treeCtrl children recursively.
  treeCtrl.children.map((child) => {
    this.setFirstLevelGroupFullState_(child, fullState.children[child.node.name]);
  });
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfTreeManager', [
  gmfThemeThemes.name,
  ngeoLayertreeController.name,
  ngeoStatemanagerService.name,
]);
myModule.service('gmfTreeManager', LayertreeTreeManager);

export default myModule;
