/**
 */
import angular from 'angular';
import googAsserts from 'goog/asserts.js';
import ngeoMiscDecorate from 'ngeo/misc/decorate.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import * as olEvents from 'ol/events.js';
import olLayerGroup from 'ol/layer/Group.js';
import olLayerLayer from 'ol/layer/Layer.js';

/**
 * The controller for the "tree node" directive.
 * @param {angular.IScope} $scope Scope.
 * @param {angular.IScope} $rootScope Angular rootScope.
 * @param {angular.Attributes} $attrs Attributes.
 * @constructor
 * @ngInject
 * @export
 * @ngdoc controller
 * @ngname NgeoLayertreeController
 */
const exports = function($scope, $rootScope, $attrs) {

  const isRoot = $attrs['ngeoLayertreeNotroot'] === undefined;

  /**
   * @type {boolean}
   * @export
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
   * @export
   */
  this.properties = {};

  /**
   * @type {!string}
   * @private
   */
  this.state_ = 'off';

  /**
   * @type {!Object}
   * @export
   */
  this.node;

  if (isRoot) {
    $scope.$watch(nodeExpr, (newVal, oldVal) => {
      this.node = newVal;
    });
  } else {
    this.node = /** @type {!Object} */ ($scope.$eval(nodeExpr));
    googAsserts.assert(this.node !== undefined);
  }

  const mapExpr = $attrs['ngeoLayertreeMap'];
  const map = /** @type {import("ol/Map.js").default} */ ($scope.$eval(mapExpr));
  googAsserts.assert(map !== undefined);

  /**
   * @type {import("ngeo/layertree/Controller.js").default}
   * @export
   */
  this.parent = $scope.$parent['layertreeCtrl'];

  /**
   * @type {Array.<import("ngeo/layertree/Controller.js").default>}
   * @export
   */
  this.children = [];

  if (this.parent) {
    this.parent.children.push(this);
  }

  $scope.$on('$destroy', () => {
    if (this.parent) {
      const index = this.parent.children.indexOf(this);
      googAsserts.assert(index >= 0);
      this.parent.children.splice(index, 1);
    }
  });

  /**
   * @type {number}
   * @export
   */
  this.uid = olUtilGetUid(this);

  /**
   * @type {number}
   * @export
   */
  this.depth = isRoot ? 0 : this.parent.depth + 1;

  // We set 'uid' and 'depth' in the scope as well to access the parent values
  // in the inherited scopes. This is intended to be used in the javascript not
  // in the templates.
  $scope['uid'] = this.uid;
  $scope['depth'] = this.depth;

  /**
   * @type {import("ol/Map.js").default}
   * @export
   */
  this.map = map;

  let nodelayerExpr = $attrs['ngeoLayertreeNodelayer'];
  if (nodelayerExpr === undefined) {
    const nodelayerexprExpr = $attrs['ngeoLayertreeNodelayerexpr'];
    const newNodelayerExpr = $scope.$eval(nodelayerexprExpr);
    googAsserts.assertString(newNodelayerExpr);
    nodelayerExpr = newNodelayerExpr;
  }
  googAsserts.assert(nodelayerExpr !== undefined);

  /**
   * @type {string}
   * @export
   */
  this.nodelayerExpr = nodelayerExpr;

  /**
   * @type {?import("ol/layer/Layer.js").default|import("ol/layer/Group.js").default}
   * @export
   */
  this.layer = null;
  if (!isRoot) {
    const layer = $scope.$eval(nodelayerExpr, {'treeCtrl': this}) || null;
    if (layer) {
      googAsserts.assert(
        layer instanceof olLayerLayer || layer instanceof olLayerGroup
      );
      this.layer = layer;
    }
  }

  /**
   * @type {?import("ngeo/datasource/DataSource.js").default}
   * @private
   */
  this.dataSource_ = null;

  if (this.layer) {
    ngeoMiscDecorate.layerLoading(this.layer, $scope);
    ngeoMiscDecorate.layer(this.layer);

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
    googAsserts.assertString(listenersExpr);
  }

  /**
   * @type {string|undefined}
   * @export
   */
  this.listenersExpr = listenersExpr;

  // Eval function to bind functions to this tree's events.
  if (listenersExpr) {
    $scope.$eval(listenersExpr, {'treeScope': $scope, 'treeCtrl': this});
  }

  $scope['layertreeCtrl'] = this;
};


/**
 * Return the current state.
 * @return {string} 'on', 'off', 'indeterminate'.
 * @export
 */
exports.prototype.getState = function() {
  return this.state_;
};


/**
 * Set the state of this treeCtrl. Update its children with its value and then
 * ask its parent to refresh its state.
 * @param {string} state 'on' or 'off'.
 * @param {boolean=} opt_broadcast Broadcast.
 * @export
 */
exports.prototype.setState = function(state, opt_broadcast) {
  if (state === this.state_) {
    return;
  }
  this.setStateInternal_(state);

  // Ask to its parent to update it's state.
  if (this.parent) {
    this.parent.refreshState(this, opt_broadcast);
  }

  const firstParents = this.isRoot ? this.children : [exports.getFirstParentTree(this)];

  if (opt_broadcast === undefined || opt_broadcast) {
    firstParents.forEach((firstParent) => {
      this.rootScope_.$broadcast('ngeo-layertree-state', this, firstParent);
    });
  }
};


/**
 * @param {string} state 'on' or 'off'.
 */
exports.prototype.setStateInternal_ = function(state) {
  // Set the state
  this.state_ = state === 'on' ? 'on' : 'off';

  if (this.state_ === 'on' &&
      this.node.metadata &&
      this.node.metadata.exclusiveGroup
  ) {
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
 * @param {import("ngeo/layertree/Controller.js").default=} opt_onChild Child tree
 *     controller that had its state changed to 'on'.
 * @param {boolean=} opt_broadcast Broadcast.
 * @public
 */
exports.prototype.refreshState = function(opt_onChild, opt_broadcast) {

  if (this.node.children &&
      opt_onChild &&
      opt_onChild.getState() !== 'off' &&
      this.node.metadata &&
      this.node.metadata.exclusiveGroup
  ) {
    const onChild = googAsserts.assert(opt_onChild);
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
 * @export
 */
exports.prototype.getCalculateState = function() {
  if (this.node.children === undefined) {
    return this.state_;
  }
  let childState;
  let previousChildState;
  this.children.some((child) => {
    childState = child.getCalculateState();
    if (previousChildState) {
      if (previousChildState !== childState) {
        return childState = 'indeterminate';
      }
    }
    previousChildState = childState;
  });
  return childState;
};


/**
 * @param {boolean|undefined} val Value.
 * @return {boolean|undefined} Value.
 * @export
 */
exports.prototype.getSetActive = function(val) {
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
 * @export
 */
exports.prototype.getDataSource = function() {
  return this.dataSource_;
};


/**
 * @param {?import("ngeo/datasource/DataSource.js").default} dataSource Data source or null.
 * @export
 */
exports.prototype.setDataSource = function(dataSource) {
  this.dataSource_ = dataSource;
};


/**
 * Get the "top level" layertree (one of the first level child under the root
 * layertree). Can return itself.
 * @param {import("ngeo/layertree/Controller.js").default} treeCtrl ngeo layertree controller.
 * @return {import("ngeo/layertree/Controller.js").default} the top level layertree.
 * @public
 */
exports.getFirstParentTree = function(treeCtrl) {
  let tree = treeCtrl;
  while (!tree.parent.isRoot) {
    tree = tree.parent;
  }
  return tree;
};


/**
 * @enum {string}
 */
exports.VisitorDecision = {
  STOP: 'STOP',
  SKIP: 'SKIP',
  DESCEND: 'DESCEND'
};


/**
 * @typedef {function(import("ngeo/layertree/Controller.js").default): (!import("ngeo/layertree/Controller.js").default.VisitorDecision|undefined)} Visitor
 */


/**
 * Recursive method to traverse the layertree controller graph.
 * @param {Visitor} visitor A visitor called for each node.
 * @return {boolean} whether to stop traversing.
 * @export
 */
exports.prototype.traverseDepthFirst = function(visitor) {
  // First visit the current controller
  const decision = visitor(this) || exports.VisitorDecision.DESCEND;

  switch (decision) {
    case exports.VisitorDecision.STOP:
      return true; // stop traversing
    case exports.VisitorDecision.SKIP:
      return false; // continue traversing but skip current branch
    case exports.VisitorDecision.DESCEND:
      for (let i = 0; i < this.children.length; ++i) {
        const child = this.children[i];
        const stop = child.traverseDepthFirst(visitor);
        if (stop) {
          return true; // stop traversing
        }
      }
      return false; // continue traversing
    default:
      googAsserts.fail('Unhandled case');
  }
};


/**
 * @type {!angular.IModule}
 */
exports.module = angular.module('ngeoLayertreeController', []);
exports.module.controller('ngeoLayertreeController', exports);


export default exports;
