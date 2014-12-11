/**
 * @fileoverview Provides a layer tree widget directive. This directive uses
 * the "ngeoLayertreenode" directive.
 *
 * Example usage:
 *
 * <div ngeo-layertree="ctrl.tree" ngeo-layertree-map="ctrl.map">
 * </div>
 *
 * The directive assumes that the root of the tree includes a "children"
 * property containing tree nodes.
 *
 * This directive relies on the "ngeoLayertreenode" directive which assumes
 * that a service named "ngeoLayertreeLayerFactory" is defined by the
 * application. See the "ngeoLayertreenode" docs for more information.
 *
 * By default the directive uses "layertree.html" as its templateUrl. This
 * can be changed by redefining the "ngeoLayertreeTemplateUrl" value.
 *
 * The directive has its own scope, but it is not isolate scope. The name of
 * this directive's scope, as used in the template, is "layertreeCtrl".
 */

goog.provide('ngeo.layertreeDirective');

goog.require('ngeo');
goog.require('ngeo.layertreenodeDirective');


/**
 * @const
 * @type {string}
 */
ngeo.layertreeTemplateUrl = 'layertree.html';


ngeoModule.value('ngeoLayertreeTemplateUrl',
    ngeo.layertreeTemplateUrl);


/**
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     ngeoLayertreeTemplateUrl Template URL for the directive.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 */
ngeo.layertreeDirective = function(ngeoLayertreeTemplateUrl) {
  return {
    restrict: 'A',
    scope: true,
    controller: 'NgeoLayertreeController',
    templateUrl: ngeoLayertreeTemplateUrl
  };
};


ngeoModule.directive('ngeoLayertree', ngeo.layertreeDirective);



/**
 * @constructor
 * @param {angular.Scope} $scope Scope.
 * @param {angular.JQLite} $element Element.
 * @param {angular.Attributes} $attrs Attributes.
 * @ngInject
 */
ngeo.NgeoLayertreeController = function($scope, $element, $attrs) {
  var treeProp = $attrs['ngeoLayertree'];
  var tree = /** @type {Object} */ ($scope.$eval(treeProp));

  var mapProp = $attrs['ngeoLayertreeMap'];
  var map = /** @type {ol.Map} */ ($scope.$eval(mapProp));

  $scope['layertreeCtrl'] = this;
  this['tree'] = tree;
  this['map'] = map;

  var dereg = $scope.$watch(treeProp, goog.bind(function(newVal, oldVal) {
    if (goog.isDef(newVal)) {
      this['tree'] = newVal;
      dereg();
    }
  }, this));
};


ngeoModule.controller('NgeoLayertreeController',
    ngeo.NgeoLayertreeController);
