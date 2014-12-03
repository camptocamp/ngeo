/**
 * @fileoverview Provides a layer catalog widget directive. This directive uses
 * the "ngeoLayercatalognode" directive.
 *
 * Example usage:
 *
 * <div ngeo-layercatalog="ctrl.tree" ngeo-layercatalog-map="ctrl.map">
 * </div>
 *
 * The directive assumes that the root of the tree includes a "children"
 * property containing tree nodes.
 *
 * This directive relies on the "ngeoLayercatalognode" directive which assumes
 * that a service named "ngeoLayercatalogLayerFactory" is defined by the
 * application. See the "ngeoLayercatalognode" docs for more information.
 *
 * By default the directive uses "layercatalog.html" as its templateUrl. This
 * can be changed by redefining the "ngeoLayercatalogTemplateUrl" value.
 *
 * The directive has its own scope, but it is not isolate scope. The name of
 * this directive's scope, as used in the template, is "layercatalogCtrl".
 */

goog.provide('ngeo.layercatalogDirective');

goog.require('ngeo');
goog.require('ngeo.layercatalognodeDirective');


/**
 * @const
 * @type {string}
 */
ngeo.layercatalogTemplateUrl = 'layercatalog.html';


ngeoModule.value('ngeoLayercatalogTemplateUrl',
    ngeo.layercatalogTemplateUrl);


/**
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     ngeoLayercatalogTemplateUrl Template URL for the directive.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 */
ngeo.layercatalogDirective = function(ngeoLayercatalogTemplateUrl) {
  return {
    restrict: 'A',
    scope: true,
    controller: 'NgeoLayercatalogController',
    templateUrl: ngeoLayercatalogTemplateUrl
  };
};


ngeoModule.directive('ngeoLayercatalog', ngeo.layercatalogDirective);



/**
 * @constructor
 * @param {angular.Scope} $scope Scope.
 * @param {angular.JQLite} $element Element.
 * @param {angular.Attributes} $attrs Attributes.
 * @ngInject
 */
ngeo.NgeoLayercatalogController = function($scope, $element, $attrs) {
  var treeProp = $attrs['ngeoLayercatalog'];
  var tree = /** @type {Object} */ ($scope.$eval(treeProp));

  var mapProp = $attrs['ngeoLayercatalogMap'];
  var map = /** @type {ol.Map} */ ($scope.$eval(mapProp));

  $scope['layercatalogCtrl'] = this;
  this['tree'] = tree;
  this['map'] = map;

  var dereg = $scope.$watch(treeProp, goog.bind(function(newVal, oldVal) {
    if (goog.isDef(newVal)) {
      this['tree'] = newVal;
      dereg();
    }
  }, this));
};


ngeoModule.controller('NgeoLayercatalogController',
    ngeo.NgeoLayercatalogController);
