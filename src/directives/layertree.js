/**
 * @fileoverview Provides the "ngeoLayertree" directive, a layer tree
 * directive.
 *
 * The directive assumes that tree nodes that are not leaves have a "children"
 * property referencing an array of child nodes.
 *
 * Example usage:
 *
 * <div ngeo-layertree="ctrl.tree"
 *      ngeo-layertree-map="ctrl.map"
 *      ngeo-layertree-nodelayer="ctrl.getLayer(node)"
 * </div>
 *
 * The "ngeo-layertree", "ngeo-layertree-map" and
 * "ngeo-layertree-nodelayer" attributes are mandatory.
 *
 * - "ngeo-layertree" specifies an expression providing the tree. The
 *   directive watches that expression.
 *
 * - "ngeo-layertree-map" specifies an expression providing the OpenLayers
 *   map.
 *
 * - The "ngeo-layertree-nodelayer" specifies an expression providing the
 *   layer for a given node.
 *
 * By default the directive uses "layertree.html" as its templateUrl. This
 * can be changed by redefining the "ngeoLayertreeTemplateUrl" value.
 *
 * The directive has its own scope, but it is not an isolate scope. That scope
 * includes a reference to the directive's controller, through the
 * "layertreeCtrl" property.
 *
 */

goog.provide('ngeo.LayertreeController');
goog.provide('ngeo.layertreeDirective');

goog.require('ngeo');


/**
 * @const
 * @type {string}
 */
ngeo.layertreeTemplateUrl = 'layertree.html';


ngeoModule.value('ngeoLayertreeTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     */
    function(element, attrs) {
      var templateUrl = attrs['ngeoLayertreeTemplateurl'];
      return goog.isDef(templateUrl) ? templateUrl : ngeo.layertreeTemplateUrl;
    });


/**
 * @param {angular.$compile} $compile Angular compile service.
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     ngeoLayertreeTemplateUrl Template URL for the directive.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
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
   * @type {ol.Map}
   * @private
   */
  this.map_ = map;

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

  $scope['layertreeCtrl'] = this;

};


/**
 * @param {boolean|undefined} val Value.
 * @return {boolean|undefined} Value.
 * @export
 */
ngeo.LayertreeController.prototype.getSetActive = function(val) {
  var layer = this.layer;
  var map = this.map_;
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
