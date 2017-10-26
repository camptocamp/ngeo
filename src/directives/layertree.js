goog.provide('ngeo.LayertreeController');
goog.provide('ngeo.layertreeDirective');

goog.require('ngeo');
goog.require('ngeo.DecorateLayer');
goog.require('ngeo.DecorateLayerLoading');

ngeo.module.value('ngeoLayertreeTemplateUrl',
  /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
  (element, attrs) => {
    const templateUrl = attrs['ngeoLayertreeTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      `${ngeo.baseTemplateUrl}/layertree.html`;
  });


/**
 * Provides the "ngeoLayertree" directive, a directive for
 * creating layer trees in application.
 *
 * The directive assumes that tree nodes that are not leaves have a "children"
 * property referencing an array of child nodes.
 *
 * Example:
 *
 *      <div ngeo-layertree="ctrl.tree"
 *        ngeo-layertree-map="ctrl.map"
 *        ngeo-layertree-nodelayer="ctrl.getLayer(node)"
 *        ngeo-layertree-listeners="ctrl.listeners(treeScope, treeCtrl)">
 *      </div>
 *
 * The "ngeo-layertree", "ngeo-layertree-map" and
 * "ngeo-layertree-nodelayer" attributes are mandatory attributes.
 *
 * - "ngeo-layertree" specifies an expression providing the tree. The
 *   directive watches that expression, making it possible to retrieve
 *   the tree data through Ajax.
 *
 * - "ngeo-layertree-map" specifies an expression providing the OpenLayers
 *   map. The directive doesn't watch that expression.
 *
 * - The "ngeo-layertree-nodelayer" specifies an expression providing the
 *   layer for a given node. In most cases that expression will be function
 *   call with "node" as the argument to the function call. E.g.
 *   "ngeo-layertree-nodelayer="ctrl.getLayer(node)".
 *
 * - The "ngeo-layertree-listeners" specifies an expression providing a function
 *   to bind scope events to customs functions. You'll must set the listener on
 *   the "treeScope" and probably use "treeCtrl" as context. E.g.
 *   "ngeo-layertree-listeners="ctrl.listeners(treeScope, treeCtrl)".
 *
 * The directive comes with a default template. That template assumes that
 * tree nodes that are not leaves have a "children" property referencing an
 * array of child nodes. It also assumes that nodes have a "name" property.
 *
 * By default the directive uses "layertree.html" as its templateUrl. This
 * can be changed by redefining the "ngeoLayertreeTemplateUrl" value (using
 * app.module.value('ngeoLayertreeTemplateUrl', 'path/layertree.html'), or
 * by adding an "ngeo-layertree-templateurl" attribute to the element.
 *
 * Example:
 *
 *      <div ngeo-layertree="ctrl.tree"
 *        ngeo-layertree-templateurl="path/to/layertree.html"
 *        ngeo-layertree-map="ctrl.map"
 *        ngeo-layertree-nodelayer="ctrl.getLayer(node)"
 *        ngeo-layertree-listeners="ctrl.listeners(treeScope, treeCtrl)"
 *      </div>
 *
 * The directive has its own scope, but it is not an isolate scope. That scope
 * has a "layertreeCtrl" property which is a reference to the directive's
 * controller: "layertreeCtrl". You can refer to that property in a custom
 * template for example.
 *
 * See our live example: [../examples/layertree.html](../examples/layertree.html)
 *
 * @htmlAttribute {Object} ngeo-layertree One theme (JSON).
 * @htmlAttribute {string} ngeo-layertree-templateurl The template URL.
 * @htmlAttribute {ol.Map} ngeo-layertree-map The map.
 * @htmlAttribute {string} ngeo-layertree-nodelayer Expression that will be parsed
 *      to be a {@link Function} that return a {@link ol.layer.Layer}
 *      with the argument:
 *      {
 *          'node': {@link Object}|undefined,
 *          'depth': {@link number}
 *      }
 * @htmlAttribute {string} ngeo-layertree-nodelayerexpr Expression that will be parsed
 *      to be a {@link ngeo-layertree-nodelayer}.
 * @htmlAttribute {string} ngeo-layertree-listeners Expression that will be parsed
 *      to be a {@link Function} with the argument:
 *      {
 *          'treeScope': !{@link angular.Scope},
 *          'treeCtrl': {@link ngeo.LayertreeController}
 *      }
 * @htmlAttribute {string} ngeo-layertree-listenersexpr Expression that will be parsed
 *      to be a {@link ngeo-layertree-listeners}.
 * @param {angular.$compile} $compile Angular compile service.
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     ngeoLayertreeTemplateUrl Template URL for the directive.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoLayertree
 */
ngeo.layertreeDirective = function($compile, ngeoLayertreeTemplateUrl) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: ngeoLayertreeTemplateUrl,
    controller: 'NgeoLayertreeController'
  };
};


ngeo.module.directive('ngeoLayertree', ngeo.layertreeDirective);


/**
 * The controller for the "tree node" directive.
 * @param {angular.Scope} $scope Scope.
 * @param {angular.Scope} $rootScope Angular rootScope.
 * @param {angular.Attributes} $attrs Attributes.
 * @param {ngeo.DecorateLayer} ngeoDecorateLayer layer decorator service.
 * @param {ngeo.DecorateLayerLoading} ngeoDecorateLayerLoading Decorate Layer service.
 * @constructor
 * @ngInject
 * @export
 * @struct
 * @ngdoc controller
 * @ngname NgeoLayertreeController
 */
ngeo.LayertreeController = function($scope, $rootScope, $attrs, ngeoDecorateLayer, ngeoDecorateLayerLoading) {

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
   * @type {ngeo.LayertreeController}
   * @export
   */
  this.parent = $scope.$parent['layertreeCtrl'];

  /**
   * @type {Array.<ngeo.LayertreeController>}
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

    ol.events.listen(
      this.layer,
      ol.Object.getChangeEventType(ol.layer.Property.OPACITY),
      function(evt) {
        this.rootScope_.$broadcast('ngeo-layertree-opacity', this);
      }, this
    );
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
ngeo.LayertreeController.prototype.getState = function() {
  return this.state_;
};


/**
 * Set the state of this treeCtrl. Update its children with its value and then
 * ask its parent to refresh its state.
 * @param {string} state 'on' or 'off'.
 * @param {boolean=} opt_broadcast Broadcast.
 * @export
 */
ngeo.LayertreeController.prototype.setState = function(state, opt_broadcast) {
  if (state === this.state_) {
    return;
  }
  this.setStateInternal_(state);

  // Ask to its parent to update it's state.
  if (this.parent) {
    this.parent.refreshState();
  }

  const firstParents = this.isRoot ? this.children : [ngeo.LayertreeController.getFirstParentTree(this)];

  if (opt_broadcast === undefined || opt_broadcast) {
    firstParents.forEach((firstParent) => {
      this.rootScope_.$broadcast('ngeo-layertree-state', this, firstParent);
    });
  }
};


/**
 * @param {string} state 'on' or 'off'.
 */
ngeo.LayertreeController.prototype.setStateInternal_ = function(state) {
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
ngeo.LayertreeController.prototype.refreshState = function() {
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
ngeo.LayertreeController.prototype.getCalculateState = function() {
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
ngeo.LayertreeController.prototype.getSetActive = function(val) {
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
ngeo.LayertreeController.prototype.getDataSource = function() {
  return this.dataSource_;
};


/**
 * @param {?ngeo.datasource.DataSource} dataSource Data source or null.
 * @export
 */
ngeo.LayertreeController.prototype.setDataSource = function(dataSource) {
  this.dataSource_ = dataSource;
};


/**
 * Get the "top level" layertree (one of the first level child under the root
 * layertree). Can return itself.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @return {ngeo.LayertreeController} the top level layertree.
 * @public
 */
ngeo.LayertreeController.getFirstParentTree = function(treeCtrl) {
  let tree = treeCtrl;
  while (!tree.parent.isRoot) {
    tree = tree.parent;
  }
  return tree;
};


/**
 * @enum {string}
 */
ngeo.LayertreeController.VisitorDecision = {
  STOP: 'STOP',
  SKIP: 'SKIP',
  DESCEND: 'DESCEND'
};


/**
 * @typedef {
 *   function(ngeo.LayertreeController): (!ngeo.LayertreeController.VisitorDecision|undefined)
 * }
 */
ngeo.LayertreeController.Visitor;


/**
 * Recursive method to traverse the layertree controller graph.
 * @param {ngeo.LayertreeController.Visitor} visitor A visitor called for each node.
 * @return {boolean} whether to stop traversing.
 * @export
 */
ngeo.LayertreeController.prototype.traverseDepthFirst = function(visitor) {
  // First visit the current controller
  const decision = visitor(this) || ngeo.LayertreeController.VisitorDecision.DESCEND;

  switch (decision) {
    case ngeo.LayertreeController.VisitorDecision.STOP:
      return true; // stop traversing
    case ngeo.LayertreeController.VisitorDecision.SKIP:
      return false; // continue traversing but skip current branch
    case ngeo.LayertreeController.VisitorDecision.DESCEND:
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


ngeo.module.controller('NgeoLayertreeController', ngeo.LayertreeController);
