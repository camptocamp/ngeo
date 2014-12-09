/**
 * @fileoverview Provides a layer catalog node directive. This directive is
 * used by the "ngeoLayercatalog" directive.
 *
 * The directive assumes that tree nodes that are not leaves have a "children"
 * property referencing an array of child nodes.
 *
 * It also assumes that a service named "ngeoLayercatalogLayerFactory" is
 * defined. This service must be defined by the application. This service
 * is a function that takes a node object and returns an OpenLayers layer.
 * The function should return `null` when the node should not have
 * a corresponding layer, because it's not a leaf for example.
 *
 * By default the directive uses "layercatalognode.html" as its templateUrl.
 * This can be changed by redefining the "ngeoLayercatalognodeTemplateUrl"
 * value.
 *
 * The directive has its own scope, but it is not isolate scope. The name of
 * this directive's scope, as used in the template, is "layercatalognodeCtrl".
 */

goog.provide('ngeo.layercatalognodeDirective');

goog.require('ngeo');


/**
 * @const
 * @type {string}
 */
ngeo.layercatalognodeTemplateUrl = 'layercatalognode.html';


ngeoModule.value('ngeoLayercatalognodeTemplateUrl',
    ngeo.layercatalognodeTemplateUrl);


/**
 * @param {angular.$compile} $compile Angular compile service.
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     ngeoLayercatalognodeTemplateUrl Template URL for the directive.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 */
ngeo.layercatalognodeDirective = function(
    $compile, ngeoLayercatalognodeTemplateUrl) {
  return {
    restrict: 'A',
    require: '^ngeoLayercatalog',
    scope: true,
    templateUrl: ngeoLayercatalognodeTemplateUrl,
    controller: 'NgeoLayercatalognodeController',
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


ngeoModule.directive('ngeoLayercatalognode', ngeo.layercatalognodeDirective);



/**
 * The controller for the "catalog node" directive.
 * @param {angular.Scope} $scope Scope.
 * @param {angular.JQLite} $element Element.
 * @param {angular.Attributes} $attrs Attributes.
 * @param {function(Object):ol.layer.Layer} ngeoLayercatalogLayerFactory Layer
 *     factory. This is a function provided by the application. The function
 *     receives a tree node and returns an `ol.layer.Layer` or `null` if no
 *     layer is to be created for that node.
 * @constructor
 * @ngInject
 * @export
 */
ngeo.LayercatalognodeController = function(
    $scope, $element, $attrs, ngeoLayercatalogLayerFactory) {

  var nodeProp = $attrs['ngeoLayercatalognode'];
  var node = /** @type {Object} */ ($scope.$eval(nodeProp));

  var mapProp = $attrs['ngeoLayercatalognodeMap'];
  var map = /** @type {ol.Map} */ ($scope.$eval(mapProp));

  /**
   * This node's layer. `null` if there's no layer for that node.
   * @type {ol.layer.Layer}
   * @private
   */
  this.layer_ = ngeoLayercatalogLayerFactory(node);

  /**
   * @type {ol.Map}
   * @private
   */
  this.map_ = map;

  $scope['layercatalognodeCtrl'] = this;
  this['layer'] = this.layer_;
  this['map'] = map;
  this['node'] = node;
};


/**
 * @param {boolean|undefined} val Value.
 * @return {boolean|undefined} Value.
 * @export
 */
ngeo.LayercatalognodeController.prototype.getSetActive = function(val) {
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


ngeoModule.controller('NgeoLayercatalognodeController',
    ngeo.LayercatalognodeController);
