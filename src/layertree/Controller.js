// The MIT License (MIT)
//
// Copyright (c) 2014-2021 Camptocamp SA
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
import {layerLoading, layerDecoration} from 'ngeo/misc/decorate.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import {listen} from 'ol/events.js';
import olLayerGroup from 'ol/layer/Group.js';
import olLayerLayer from 'ol/layer/Layer.js';

/**
 * The controller for the "tree node" directive.
 * @param {angular.IScope} $scope Scope.
 * @param {angular.IScope} $rootScope Angular rootScope.
 * @param {angular.IAttributes} $attrs Attributes.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoLayertreeController
 * @hidden
 */
export function LayertreeController($scope, $rootScope, $attrs) {
  const isRoot = $attrs.ngeoLayertreeNotroot === undefined;

  /**
   * @type {boolean}
   */
  this.isRoot = isRoot;

  const nodeExpr = $attrs.ngeoLayertree;

  /**
   * @type {angular.IScope}
   */
  this.rootScope_ = $rootScope;

  /**
   * @type {Object<string, string|boolean>}
   */
  this.properties = {};

  /**
   * @type {string}
   */
  this.state_ = 'off';

  let node;
  if (isRoot) {
    $scope.$watch(nodeExpr, (newVal, oldVal) => {
      this.node = newVal;
    });
  } else {
    node = $scope.$eval(nodeExpr);
  }
  /**
   * @type {import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer}
   */
  this.node = node;

  const mapExpr = $attrs.ngeoLayertreeMap;
  /**
   * @type {import("ol/Map.js").default}
   */
  const map = $scope.$eval(mapExpr);
  console.assert(map !== undefined);

  /**
   * @type {import("ngeo/layertree/Controller.js").LayertreeController}
   */
  // @ts-ignore: scope ...
  this.parent = $scope.$parent.layertreeCtrl;

  /**
   * @type {import("ngeo/layertree/Controller.js").LayertreeController[]}
   */
  this.children = [];

  if (this.parent) {
    this.parent.children.push(this);
  }

  $scope.$on('$destroy', () => {
    if (this.parent) {
      const index = this.parent.children.indexOf(this);
      console.assert(index >= 0);
      this.parent.children.splice(index, 1);
    }
  });

  /**
   * @type {string}
   */
  this.uid = olUtilGetUid(this);

  /**
   * @type {number}
   */
  this.depth = isRoot ? 0 : this.parent.depth + 1;

  // We set 'uid' and 'depth' in the scope as well to access the parent values
  // in the inherited scopes. This is intended to be used in the javascript not
  // in the templates.
  // @ts-ignore: scope ...
  $scope.uid = this.uid;
  // @ts-ignore: scope ...
  $scope.depth = this.depth;

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = map;

  let nodelayerExpr = $attrs.ngeoLayertreeNodelayer;
  if (nodelayerExpr === undefined) {
    const nodelayerexprExpr = $attrs.ngeoLayertreeNodelayerexpr;
    const newNodelayerExpr = $scope.$eval(nodelayerexprExpr);
    console.assert(typeof newNodelayerExpr == 'string');
    nodelayerExpr = newNodelayerExpr;
  }
  console.assert(nodelayerExpr !== undefined);

  /**
   * @type {string}
   */
  this.nodelayerExpr = nodelayerExpr;

  /**
   * @type {?import("ol/layer/Layer.js").default<import('ol/source/Source.js').default>|
   *    import("ol/layer/Group.js").default}
   */
  this.layer = null;
  if (!isRoot) {
    const layer = $scope.$eval(nodelayerExpr, {'treeCtrl': this}) || null;
    if (layer) {
      console.assert(layer instanceof olLayerLayer || layer instanceof olLayerGroup);
      this.layer = layer;
    }
  }

  /**
   * @type {?import("ngeo/datasource/DataSource.js").default}
   */
  this.dataSource_ = null;

  if (this.layer) {
    layerLoading(this.layer, $scope);
    layerDecoration(this.layer);

    listen(
      this.layer,
      'change:opacity',
      /**
       * @param {Event|import("ol/events/Event.js").default} evt
       */
      (evt) => {
        this.rootScope_.$broadcast('ngeo-layertree-opacity', this);
      }
    );
  }

  let listenersExpr = $attrs.ngeoLayertreeListeners;
  if (listenersExpr === undefined) {
    const listenersexprExpr = $attrs.ngeoLayertreeListenersexpr;
    listenersExpr = $scope.$eval(listenersexprExpr);
  }

  if (listenersExpr !== undefined) {
    console.assert(typeof listenersExpr == 'string');
  }

  /**
   * @type {string|undefined}
   */
  this.listenersExpr = listenersExpr;

  // Eval function to bind functions to this tree's events.
  if (listenersExpr) {
    $scope.$eval(listenersExpr, {'treeScope': $scope, 'treeCtrl': this});
  }

  // @ts-ignore: scope ...
  $scope.layertreeCtrl = this;
}

/**
 * Return the current state.
 * @return {string} 'on', 'off', 'indeterminate'.
 */
LayertreeController.prototype.getState = function () {
  return this.state_;
};

/**
 * Set the state of this treeCtrl. Update its children with its value and then
 * ask its parent to refresh its state.
 * @param {string} state 'on' or 'off'.
 * @param {boolean=} opt_broadcast Broadcast.
 */
LayertreeController.prototype.setState = function (state, opt_broadcast) {
  if (state === this.state_) {
    return;
  }
  this.setStateInternal_(state);

  // Ask to its parent to update it's state.
  if (this.parent) {
    this.parent.refreshState(this, opt_broadcast);
  }

  const firstParents = this.isRoot ? this.children : [getFirstParentTree(this)];

  if (opt_broadcast === undefined || opt_broadcast) {
    firstParents.forEach((firstParent) => {
      this.rootScope_.$broadcast('ngeo-layertree-state', this, firstParent);
    });
  }
};

/**
 * @param {string} state 'on' or 'off'.
 */
LayertreeController.prototype.setStateInternal_ = function (state) {
  // Set the state
  this.state_ = state === 'on' ? 'on' : 'off';

  if (this.state_ === 'on' && this.node.metadata && this.node.metadata.exclusiveGroup) {
    let firstChild;
    for (const child of this.children) {
      if (!firstChild) {
        firstChild = child;
        child.setStateInternal_('on');
      } else {
        child.setStateInternal_('off');
      }
    }
  } else {
    // Asks to each child to set its state;
    this.children.forEach((child) => {
      child.setStateInternal_(this.state_);
    });
  }
};

/**
 * Refresh the state of this treeCtrl based on it's children value. The call its
 * parent to do the same.
 *
 * @param {import("ngeo/layertree/Controller.js").LayertreeController=} opt_onChild Child tree
 *     controller that had its state changed to 'on'.
 * @param {boolean=} opt_broadcast Broadcast.
 * @public
 */
LayertreeController.prototype.refreshState = function (opt_onChild, opt_broadcast) {
  const group = /** @type {import('gmf/themes.js').GmfGroup} */ (this.node);
  if (
    group.children &&
    opt_onChild &&
    opt_onChild.getState() !== 'off' &&
    this.node.metadata &&
    this.node.metadata.exclusiveGroup
  ) {
    const onChild = opt_onChild;
    this.children.forEach((child) => {
      if (child !== onChild) {
        child.setState('off', opt_broadcast);
      }
    });
  }

  const newState = this.getCalculateState();
  if (this.state_ === newState) {
    return;
  }
  this.state_ = newState;
  if (this.parent) {
    this.parent.refreshState(this, opt_broadcast);
  }
};

/**
 * Return the current state, calculate on all its children recursively.
 * @return {string} 'on', 'off' or 'indeterminate'.
 */
LayertreeController.prototype.getCalculateState = function () {
  const group = /** @type {import('gmf/themes.js').GmfGroup} */ (this.node);
  if (group.children === undefined) {
    return this.state_;
  }
  /** @type {string} */
  let childState = '';
  /** @type {string} */
  let previousChildState;
  this.children.some((child) => {
    childState = child.getCalculateState();
    if (previousChildState) {
      if (previousChildState !== childState) {
        childState = 'indeterminate';
        return true;
      }
    }
    previousChildState = childState;
    return false;
  });
  return childState;
};

/**
 * @param {boolean|undefined} val Value.
 * @return {boolean|undefined} Value.
 */
LayertreeController.prototype.getSetActive = function (val) {
  const layer = this.layer;
  const map = this.map;
  if (!layer) {
    return;
  }
  if (val !== undefined) {
    if (!val) {
      map.removeLayer(layer);
    } else {
      map.addLayer(layer);
    }
  } else {
    return map.getLayers().getArray().includes(layer);
  }
};

/**
 * @return {?import("ngeo/datasource/DataSource.js").default} dataSource The data source bound to
 *     this layer tree controller.
 */
LayertreeController.prototype.getDataSource = function () {
  return this.dataSource_;
};

/**
 * @param {?import("ngeo/datasource/DataSource.js").default} dataSource Data source or null.
 */
LayertreeController.prototype.setDataSource = function (dataSource) {
  this.dataSource_ = dataSource;
};

/**
 * Get the "top level" layertree (one of the first level child under the root
 * layertree). Can return itself.
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl ngeo layertree controller.
 * @return {import("ngeo/layertree/Controller.js").LayertreeController} the top level layertree.
 * @public
 * @hidden
 */
export function getFirstParentTree(treeCtrl) {
  let tree = treeCtrl;
  while (!tree.parent.isRoot) {
    tree = tree.parent;
  }
  return tree;
}

/**
 * @enum {string}
 * @hidden
 */
export const LayertreeVisitorDecision = {
  STOP: 'STOP',
  SKIP: 'SKIP',
  DESCEND: 'DESCEND',
};

/**
 * @typedef {function(LayertreeController): (LayertreeVisitorDecision|undefined|void)} Visitor
 */

/**
 * Recursive method to traverse the layertree controller graph.
 * @param {Visitor} visitor A visitor called for each node.
 * @return {boolean} whether to stop traversing.
 */
LayertreeController.prototype.traverseDepthFirst = function (visitor) {
  // First visit the current controller
  const decision = visitor(this) || LayertreeVisitorDecision.DESCEND;

  switch (decision) {
    case LayertreeVisitorDecision.STOP:
      return true; // stop traversing
    case LayertreeVisitorDecision.SKIP:
      return false; // continue traversing but skip current branch
    case LayertreeVisitorDecision.DESCEND:
      for (const child of this.children) {
        const stop = child.traverseDepthFirst(visitor);
        if (stop) {
          return true; // stop traversing
        }
      }
      return false; // continue traversing
    default:
      throw 'Unhandled case';
  }
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoLayertreeController', []);
module.controller('ngeoLayertreeController', LayertreeController);

export default module;
