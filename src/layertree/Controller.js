import angular from 'angular';
import {layerLoading, layerDecoration} from 'ngeo/misc/decorate.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import * as olEvents from 'ol/events.js';
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
  const isRoot = $attrs['ngeoLayertreeNotroot'] === undefined;

  /**
   * @type {boolean}
   */
  this.isRoot = isRoot;

  const nodeExpr = $attrs['ngeoLayertree'];

  /**
   * @type {angular.IScope}
   * @private
   */
  this.rootScope_ = $rootScope;

  /**
   * @type {!Object}
   */
  this.properties = {};

  /**
   * @type {!string}
   * @private
   */
  this.state_ = 'off';

  /**
   * @type {!Object}
   */
  this.node;

  if (isRoot) {
    $scope.$watch(nodeExpr, (newVal, oldVal) => {
      this.node = newVal;
    });
  } else {
    this.node = /** @type {!Object} */ ($scope.$eval(nodeExpr));
    console.assert(this.node !== undefined);
  }

  const mapExpr = $attrs['ngeoLayertreeMap'];
  const map = /** @type {import("ol/Map.js").default} */ ($scope.$eval(mapExpr));
  console.assert(map !== undefined);

  /**
   * @type {import("ngeo/layertree/Controller.js").LayertreeController}
   */
  this.parent = $scope.$parent['layertreeCtrl'];

  /**
   * @type {Array.<import("ngeo/layertree/Controller.js").LayertreeController>}
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
  $scope['uid'] = this.uid;
  $scope['depth'] = this.depth;

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = map;

  let nodelayerExpr = $attrs['ngeoLayertreeNodelayer'];
  if (nodelayerExpr === undefined) {
    const nodelayerexprExpr = $attrs['ngeoLayertreeNodelayerexpr'];
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
   * @type {?import("ol/layer/Layer.js").default|import("ol/layer/Group.js").default}
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
   * @private
   */
  this.dataSource_ = null;

  if (this.layer) {
    layerLoading(this.layer, $scope);
    layerDecoration(this.layer);

    olEvents.listen(this.layer, 'change:opacity', () => {
      this.rootScope_.$broadcast('ngeo-layertree-opacity', this);
    });
  }

  let listenersExpr = $attrs['ngeoLayertreeListeners'];
  if (listenersExpr === undefined) {
    const listenersexprExpr = $attrs['ngeoLayertreeListenersexpr'];
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

  $scope['layertreeCtrl'] = this;
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
  if (
    this.node.children &&
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
  if (this.node.children === undefined) {
    return this.state_;
  }
  /** @type {string} */
  let childState;
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
    return map.getLayers().getArray().indexOf(layer) >= 0;
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
 * @typedef {function(LayertreeController): (!LayertreeVisitorDecision|void)} Visitor
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
      for (let i = 0; i < this.children.length; ++i) {
        const child = this.children[i];
        const stop = child.traverseDepthFirst(visitor);
        if (stop) {
          return true; // stop traversing
        }
      }
      return false; // continue traversing
    default:
      console.assert(false, 'Unhandled case');
  }
};

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoLayertreeController', []);
module.controller('ngeoLayertreeController', LayertreeController);

export default module;
