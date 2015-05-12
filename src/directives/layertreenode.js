/**
 * @fileoverview Provides the "ngeoLayertreenode" directive, a layer tree node
 * directive. This directive is used by the "ngeoLayertree" directive.
 *
 * The directive assumes that tree nodes that are not leaves have a "children"
 * property referencing an array of child nodes.
 *
 * Example usage:
 *
 * <div ngeo-layertreenode="ctrl.node" ngeo-layertreenode-map="ctrl.map"
 *      ngeo-layertreenode-layerexpr="ctrl.layerExpr">
 * </div>
 *
 * The "ngeo-layertreenode", "ngeo-layertreenode-map" and
 * "ngeo-layertreenode-layerexpr" attributes are mandatory.
 *
 * - The "ngeo-layertreenode" specifies the scope property whose value is
 *   a reference to the tree node object.
 *
 * - The "ngeo-layertreenode-map" specifies the scope property whose value is
 *   a reference to the map.
 *
 * - The "ngeo-layertreenode-layerexpr" specifies the scope property whose
 *   value is the layer expression (a string) to evaluate to get the layer
 *   object for this tree node.
 *
 * By default the directive uses "layertreenode.html" as its templateUrl. This
 * can be changed by redefining the "ngeoLayertreenodeTemplateUrl" value.
 *
 * The directive has its own scope, but it is not isolate scope. That scope
 * includes a reference to the directive's controller: the "layertreenodeCtrl"
 * property.
 *
 * This directive doesn't itself create watchers, but its partial uses Angular
 * directives like ngRepeat and ngModel which do create watchers.
 */

goog.provide('ngeo.layertreenodeDirective');

goog.require('ngeo');


/**
 * @const
 * @type {string}
 */
ngeo.layertreenodeTemplateUrl = 'layertreenode.html';


ngeoModule.value('ngeoLayertreenodeTemplateUrl',
    ngeo.layertreenodeTemplateUrl);


/**
 * @param {angular.$compile} $compile Angular compile service.
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     ngeoLayertreenodeTemplateUrl Template URL for the directive.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 */
ngeo.layertreenodeDirective = function(
    $compile, ngeoLayertreenodeTemplateUrl) {
  return {
    restrict: 'A',
    require: '^ngeoLayertree',
    scope: true,
    templateUrl: ngeoLayertreenodeTemplateUrl,
    controller: 'NgeoLayertreenodeController',
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
               * @param {angular.Scope} scope Scope.
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


ngeoModule.directive('ngeoLayertreenode', ngeo.layertreenodeDirective);



/**
 * The controller for the "tree node" directive.
 * @param {angular.Scope} $scope Scope.
 * @param {angular.JQLite} $element Element.
 * @param {angular.Attributes} $attrs Attributes.
 * @constructor
 * @ngInject
 * @export
 */
ngeo.LayertreenodeController = function($scope, $element, $attrs) {

  var nodeExpr = $attrs['ngeoLayertreenode'];
  var node = /** @type {Object} */ ($scope.$eval(nodeExpr));
  goog.asserts.assert(goog.isDef(node));

  /**
   * @type {Object}
   * @export
   */
  this.node = node;

  var mapExpr = $attrs['ngeoLayertreenodeMap'];
  var map = /** @type {ol.Map} */ ($scope.$eval(mapExpr));
  goog.asserts.assert(goog.isDef(map));

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = map;

  var layerexprExpr = $attrs['ngeoLayertreenodeLayerexpr'];
  var layerExpr = /** @type {string} */ ($scope.$eval(layerexprExpr));
  goog.asserts.assert(goog.isDef(layerExpr));

  /**
   * @type {string}
   * @export
   */
  this.layerExpr = layerExpr;

  // The node is passed in the "locals" object (2nd arg to $eval). This
  // is to allow expressions like "ctrl.getLayer(node)".
  var layer = /** @type {ol.layer.Layer} */
      ($scope.$eval(layerExpr, {'node': node}));
  goog.asserts.assert(goog.isDef(layer));

  /**
   * @type {ol.layer.Layer}
   * @export
   */
  this.layer = layer;

  /**
   * @type {ol.Map}
   * @private
   */
  this.map_ = map;

  /**
   * This node's layer. `null` if there's no layer for that node (for
   * example if the node is not a leaf).
   * @type {ol.layer.Layer}
   * @private
   */
  this.layer_ = layer;

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
  this.depth = $scope.$parent['depth'] + 1;

  // We set 'uid' and 'depth' in the scope as well to access the parent values
  // in the inherited scopes. This is intended to be used in the javascript not
  // in the templates.
  $scope['uid'] = this.uid;
  $scope['depth'] = this.depth;

  $scope['layertreenodeCtrl'] = this;
};


/**
 * @param {boolean|undefined} val Value.
 * @return {boolean|undefined} Value.
 * @export
 */
ngeo.LayertreenodeController.prototype.getSetActive = function(val) {
  var layer = this.layer_;
  var map = this.map_;
  goog.asserts.assert(!goog.isNull(layer));
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


ngeoModule.controller('NgeoLayertreenodeController',
    ngeo.LayertreenodeController);
