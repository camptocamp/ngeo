/**
 * @fileoverview Provides a layer tree node directive. This directive is
 * used by the "ngeoLayertree" directive.
 *
 * The directive assumes that tree nodes that are not leaves have a "children"
 * property referencing an array of child nodes.
 *
 * It also assumes that a service named "ngeoLayertreeLayerFactory" is
 * defined. This service must be defined by the application. This service
 * is a function that takes a node object and returns an OpenLayers layer.
 * The function should return `null` when the node should not have
 * a corresponding layer, because it's not a leaf for example.
 *
 * By default the directive uses "layertreenode.html" as its templateUrl.
 * This can be changed by redefining the "ngeoLayertreenodeTemplateUrl"
 * value.
 *
 * The directive has its own scope, but it is not isolate scope. The name of
 * this directive's scope, as used in the template, is "layertreenodeCtrl".
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
 * @param {function(Object):ol.layer.Layer} ngeoLayertreeLayerFactory Layer
 *     factory. This is a function provided by the application. The function
 *     receives a tree node and returns an `ol.layer.Layer` or `null` if no
 *     layer is to be created for that node.
 * @constructor
 * @ngInject
 * @export
 */
ngeo.LayertreenodeController = function(
    $scope, $element, $attrs, ngeoLayertreeLayerFactory) {

  var nodeProp = $attrs['ngeoLayertreenode'];
  var node = /** @type {Object} */ ($scope.$eval(nodeProp));

  var mapProp = $attrs['ngeoLayertreenodeMap'];
  var map = /** @type {ol.Map} */ ($scope.$eval(mapProp));

  /**
   * This node's layer. `null` if there's no layer for that node.
   * @type {ol.layer.Layer}
   * @private
   */
  this.layer_ = ngeoLayertreeLayerFactory(node);

  /**
   * @type {ol.Map}
   * @private
   */
  this.map_ = map;

  $scope['layertreenodeCtrl'] = this;
  this['layer'] = this.layer_;
  this['map'] = map;
  this['node'] = node;
  this['parentUid'] = $scope.$parent['uid'];

  this['uid'] = goog.getUid(this);
  this['depth'] = $scope.$parent['depth'] + 1;

  // we set 'uid' and 'depth' in the scope as well to access the parent values
  // in the inherited scopes. This is intended to be used in the javascript not
  // in the templates.
  $scope['uid'] = this['uid'];
  $scope['depth'] = this['depth'];
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
