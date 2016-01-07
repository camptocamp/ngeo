goog.provide('ngeo.LayertreeController');
goog.provide('ngeo.layertreeDirective');

goog.require('ngeo');


ngeoModule.value('ngeoLayertreeTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     */
    function(element, attrs) {
      var templateUrl = attrs['ngeoLayertreeTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          ngeo.baseTemplateUrl + '/layertree.html';
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
 *     <div ngeo-layertree="ctrl.tree"
 *          ngeo-layertree-map="ctrl.map"
 *          ngeo-layertree-nodelayer="ctrl.getLayer(node)"
 *          ngeo-layertree-listeners="ctrl.listeners(treeScope, treeCtrl)"
 *     </div>
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
 *     <div ngeo-layertree="ctrl.tree"
 *          ngeo-layertree-templateurl="path/to/layertree.html"
 *          ngeo-layertree-map="ctrl.map"
 *          ngeo-layertree-nodelayer="ctrl.getLayer(node)"
 *          ngeo-layertree-listeners="ctrl.listeners(treeScope, treeCtrl)"
 *     </div>
 *
 * The directive has its own scope, but it is not an isolate scope. That scope
 * has a "layertreeCtrl" property which is a reference to the directive's
 * controller: "layertreeCtrl". You can refer to that property in a custom
 * template for example.
 *
 * @param {angular.$compile} $compile Angular compile service.
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     ngeoLayertreeTemplateUrl Template URL for the directive.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoLayertree
 */
ngeo.layertreeDirective = function(
    $compile, ngeoLayertreeTemplateUrl) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: ngeoLayertreeTemplateUrl,
    controller: 'NgeoLayertreeController',
    compile:
        /**
         * @param {angular.JQLite} tElement Template element.
         * @param {angular.Attributes} tAttrs Template attributes.
         * @return {Function} Post-link function.
         */
        function(tElement, tAttrs) {
          var contents = tElement.contents().remove();
          var compiledContents;
          return (
              /**
               * Post-link function.
               * @param {!angular.Scope} scope Scope.
               * @param {angular.JQLite} iElement Instance element.
               * @param {angular.Attributes} iAttrs Instance attributes.
               */
              function(scope, iElement, iAttrs) {
                if (!compiledContents) {
                  compiledContents = $compile(contents);
                }
                compiledContents(scope,
                    /**
                     * @param {Object} clone Clone element.
                     */
                    function(clone) {
                      var cloneElement = /** @type {angular.JQLite} */ (clone);
                      iElement.append(cloneElement);
                    });
              });
        }
  };
};


ngeoModule.directive('ngeoLayertree', ngeo.layertreeDirective);



/**
 * The controller for the "tree node" directive.
 * @param {angular.Scope} $scope Scope.
 * @param {angular.JQLite} $element Element.
 * @param {angular.Attributes} $attrs Attributes.
 * @constructor
 * @ngInject
 * @export
 * @ngdoc controller
 * @ngname NgeoLayertreeController
 */
ngeo.LayertreeController = function($scope, $element, $attrs) {

  var isRoot = !goog.isDef($attrs['ngeoLayertreeNotroot']);

  /**
   * @type {boolean}
   * @export
   */
  this.isRoot = isRoot;

  var nodeExpr = $attrs['ngeoLayertree'];

  /**
   * @type {Object|undefined}
   * @export
   */
  this.node = undefined;

  if (isRoot) {
    $scope.$watch(nodeExpr, goog.bind(function(newVal, oldVal) {
      this.node = newVal;
    }, this));
  } else {
    this.node = /** @type {Object} */ ($scope.$eval(nodeExpr));
    goog.asserts.assert(goog.isDef(this.node));
  }

  var mapExpr = $attrs['ngeoLayertreeMap'];
  var map = /** @type {ol.Map} */ ($scope.$eval(mapExpr));
  goog.asserts.assert(goog.isDef(map));

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = map;

  var nodelayerExpr = $attrs['ngeoLayertreeNodelayer'];
  if (!goog.isDef(nodelayerExpr)) {
    var nodelayerexprExpr = $attrs['ngeoLayertreeNodelayerexpr'];
    nodelayerExpr = /** @type {string} */ ($scope.$eval(nodelayerexprExpr));
  }
  goog.asserts.assert(goog.isDef(nodelayerExpr));

  /**
   * @type {string}
   * @export
   */
  this.nodelayerExpr = nodelayerExpr;

  /**
   * @type {ol.layer.Layer}
   * @export
   */
  this.layer = isRoot ? null : /** @type {ol.layer.Layer} */
      ($scope.$eval(nodelayerExpr, {'node': this.node}));

  /**
   * @type {number}
   * @export
   */
  this.parentUid = $scope.$parent['uid'];

  /**
   * @type {number}
   * @export
   */
  this.uid = goog.getUid(this);

  /**
   * @type {number}
   * @export
   */
  this.depth = isRoot ? 0 : $scope.$parent['depth'] + 1;

  // We set 'uid' and 'depth' in the scope as well to access the parent values
  // in the inherited scopes. This is intended to be used in the javascript not
  // in the templates.
  $scope['uid'] = this.uid;
  $scope['depth'] = this.depth;

  var listenersExpr = $attrs['ngeoLayertreeListeners'];
  if (!goog.isDef(listenersExpr)) {
    var listenersexprExpr = $attrs['ngeoLayertreeListenersexpr'];
    listenersExpr = /** @type {string} */ ($scope.$eval(listenersexprExpr));
  }

  /**
   * @type {string}
   * @export
   */
  this.listenersExpr = listenersExpr;

  // Eval function to bind functions to this tree's events.
  if (goog.isDefAndNotNull(listenersExpr)) {
    $scope.$eval(listenersExpr, {'treeScope': $scope, 'treeCtrl': this});
  }

  $scope['layertreeCtrl'] = this;
};


/**
 * @param {boolean|undefined} val Value.
 * @return {boolean|undefined} Value.
 * @export
 */
ngeo.LayertreeController.prototype.getSetActive = function(val) {
  var layer = this.layer;
  var map = this.map;
  goog.asserts.assert(!goog.isNull(this.layer));
  if (goog.isDef(val)) {
    if (!val) {
      map.removeLayer(layer);
    } else {
      map.addLayer(layer);
    }
  } else {
    return map.getLayers().getArray().indexOf(layer) >= 0;
  }
};


ngeoModule.controller('NgeoLayertreeController',
    ngeo.LayertreeController);
