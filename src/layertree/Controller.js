goog.provide('ngeo.layertree.Controller');

goog.require('ngeo');
goog.require('ol');
goog.require('ol.events');
goog.require('ol.layer.Group');
goog.require('ol.layer.Layer');
goog.require('ngeo.layertree.DecorateLayer');
goog.require('ngeo.layertree.DecorateLayerLoading');


/**
 * The controller for the "tree node" directive.
 * @param {angular.Scope} $scope Scope.
 * @param {angular.Scope} $rootScope Angular rootScope.
 * @param {angular.Attributes} $attrs Attributes.
 * @param {ngeo.layertree.DecorateLayer} ngeoDecorateLayer layer decorator service.
 * @param {ngeo.layertree.DecorateLayerLoading} ngeoDecorateLayerLoading Decorate Layer service.
 * @constructor
 * @ngInject
 * @export
 * @struct
 * @ngdoc controller
 * @ngname NgeoLayertreeController
 */
ngeo.layertree.Controller = function($scope, $rootScope, $attrs,
  ngeoDecorateLayer, ngeoDecorateLayerLoading) {

  const isRoot = $attrs['ngeoLayertreeNotroot'] === undefined;

  /**
   * @type {boolean}
   * @export
   */
  this.isRoot = isRoot;

  const nodeExpr = $attrs['ngeoLayertree'];

  /**
   * @type {angular.Scope}
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
    goog.asserts.assert(this.node !== undefined);
  }

  const mapExpr = $attrs['ngeoLayertreeMap'];
  const map = /** @type {ol.Map} */ ($scope.$eval(mapExpr));
  goog.asserts.assert(map !== undefined);

  /**
   * @type {ngeo.layertree.Controller}
   * @export
   */
  this.parent = $scope.$parent['layertreeCtrl'];

  /**
   * @type {Array.<ngeo.layertree.controller>}
   * @export
   */
  this.children = [];

  if (this.parent) {
    this.parent.children.push(this);
  }

  $scope.$on('$destroy', () => {
    if (this.parent) {
      const index = this.parent.children.indexOf(this);
      goog.asserts.assert(index >= 0);
      this.parent.children.splice(index, 1);
    }
  });

  /**
   * @type {number}
   * @export
   */
  this.uid = ol.getUid(this);

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
   * @type {ol.Map}
   * @export
   */
  this.map = map;

  let nodelayerExpr = $attrs['ngeoLayertreeNodelayer'];
  if (nodelayerExpr === undefined) {
    const nodelayerexprExpr = $attrs['ngeoLayertreeNodelayerexpr'];
    const newNodelayerExpr = $scope.$eval(nodelayerexprExpr);
    goog.asserts.assertString(newNodelayerExpr);
    nodelayerExpr = newNodelayerExpr;
  }
  goog.asserts.assert(nodelayerExpr !== undefined);

  /**
   * @type {string}
   * @export
   */
  this.nodelayerExpr = nodelayerExpr;

  /**
   * @type {?ol.layer.Layer|ol.layer.Group}
   * @export
   */
  this.layer = null;
  if (!isRoot) {
    const layer = $scope.$eval(nodelayerExpr, {'treeCtrl': this}) || null;
    if (layer) {
      goog.asserts.assert(
        layer instanceof ol.layer.Layer || layer instanceof ol.layer.Group
      );
      this.layer = layer;
    }
  }

  /**
   * @type {?ngeo.datasource.DataSource}
   * @private
   */
  this.dataSource_ = null;

  if (this.layer) {
    ngeoDecorateLayerLoading(this.layer, $scope);
    ngeoDecorateLayer(this.layer);

    ol.events.listen(this.layer, 'change:opacity', () => {
      this.rootScope_.$broadcast('ngeo-layertree-opacity', this);
    });
  }

  let listenersExpr = $attrs['ngeoLayertreeListeners'];
  if (listenersExpr === undefined) {
    const listenersexprExpr = $attrs['ngeoLayertreeListenersexpr'];
    listenersExpr = $scope.$eval(listenersexprExpr);
  }

  if (listenersExpr !== undefined) {
    goog.asserts.assertString(listenersExpr);
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
ngeo.layertree.Controller.prototype.getState = function() {
  return this.state_;
};


/**
 * Set the state of this treeCtrl. Update its children with its value and then
 * ask its parent to refresh its state.
 * @param {string} state 'on' or 'off'.
 * @param {boolean=} opt_broadcast Broadcast.
 * @export
 */
ngeo.layertree.Controller.prototype.setState = function(state, opt_broadcast) {
  if (state === this.state_) {
    return;
  }
  this.setStateInternal_(state);

  // Ask to its parent to update it's state.
  if (this.parent) {
    this.parent.refreshState();
  }

  const firstParents = this.isRoot ? this.children : [ngeo.layertree.Controller.getFirstParentTree(this)];

  if (opt_broadcast === undefined || opt_broadcast) {
    firstParents.forEach((firstParent) => {
      this.rootScope_.$broadcast('ngeo-layertree-state', this, firstParent);
    });
  }
};


/**
 * @param {string} state 'on' or 'off'.
 */
ngeo.layertree.Controller.prototype.setStateInternal_ = function(state) {
  // Set the state
  this.state_ = state === 'on' ? 'on' : 'off';
  // Asks to each child to set its state;
  this.children.forEach(function(child) {
    child.setStateInternal_(this.state_);
  }, this);
};


/**
 * Refresh the state of this treeCtrl based on it's children value. The call its
 * parent to do the same.
 * @public
 */
ngeo.layertree.Controller.prototype.refreshState = function() {
  const newState = this.getCalculateState();
  if (this.state_ === newState) {
    return;
  }
  this.state_ = newState;
  if (this.parent) {
    this.parent.refreshState();
  }
};


/**
 * Return the current state, calculate on all its children recursively.
 * @return {string} 'on', 'off' or 'indeterminate'.
 * @export
 */
ngeo.layertree.Controller.prototype.getCalculateState = function() {
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
ngeo.layertree.Controller.prototype.getSetActive = function(val) {
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
 * @return {?ngeo.datasource.DataSource} dataSource The data source bound to
 *     this layer tree controller.
 * @export
 */
ngeo.layertree.Controller.prototype.getDataSource = function() {
  return this.dataSource_;
};


/**
 * @param {?ngeo.datasource.DataSource} dataSource Data source or null.
 * @export
 */
ngeo.layertree.Controller.prototype.setDataSource = function(dataSource) {
  this.dataSource_ = dataSource;
};


/**
 * Get the "top level" layertree (one of the first level child under the root
 * layertree). Can return itself.
 * @param {ngeo.layertree.Controller} treeCtrl ngeo layertree controller.
 * @return {ngeo.layertree.Controller} the top level layertree.
 * @public
 */
ngeo.layertree.Controller.getFirstParentTree = function(treeCtrl) {
  let tree = treeCtrl;
  while (!tree.parent.isRoot) {
    tree = tree.parent;
  }
  return tree;
};


/**
 * @enum {string}
 */
ngeo.layertree.Controller.VisitorDecision = {
  STOP: 'STOP',
  SKIP: 'SKIP',
  DESCEND: 'DESCEND'
};


/**
 * @typedef {
 *   function(ngeo.layertree.Controller): (!ngeo.layertree.Controller.VisitorDecision|undefined)
 * }
 */
ngeo.layertree.Controller.Visitor;


/**
 * Recursive method to traverse the layertree controller graph.
 * @param {ngeo.layertree.Controller.Visitor} visitor A visitor called for each node.
 * @return {boolean} whether to stop traversing.
 * @export
 */
ngeo.layertree.Controller.prototype.traverseDepthFirst = function(visitor) {
  // First visit the current controller
  const decision = visitor(this) || ngeo.layertree.Controller.VisitorDecision.DESCEND;

  switch (decision) {
    case ngeo.layertree.Controller.VisitorDecision.STOP:
      return true; // stop traversing
    case ngeo.layertree.Controller.VisitorDecision.SKIP:
      return false; // continue traversing but skip current branch
    case ngeo.layertree.Controller.VisitorDecision.DESCEND:
      for (let i = 0; i < this.children.length; ++i) {
        const child = this.children[i];
        const stop = child.traverseDepthFirst(visitor);
        if (stop) {
          return true; // stop traversing
        }
      }
      return false; // continue traversing
    default:
      goog.asserts.fail('Unhandled case');
  }
};


/**
 * @type {!angular.Module}
 */
ngeo.layertree.Controller.module = angular.module('ngeoLayertreeController', [
  ngeo.layertree.DecorateLayer.module.name,
  ngeo.layertree.DecorateLayerLoading.module.name
]);
ngeo.layertree.Controller.module.controller('ngeoLayertreeController', ngeo.layertree.Controller);
ngeo.module.requires.push(ngeo.layertree.Controller.module.name);
