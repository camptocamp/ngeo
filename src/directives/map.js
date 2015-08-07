/**
 * @fileoverview Provides a directive used to insert a user-defined OpenLayers
 * map in the DOM. The directive does not create an isolate scope.
 *
 * Example:
 *
 * <div ngeo-map="ctrl.map"></div>
 */
goog.provide('ngeo.mapDirective');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ol.Map');


/**
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 */
ngeo.mapDirective = function() {
  return {
    restrict: 'A',
    link:
        /**
         * @param {angular.Scope} scope Scope.
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Attributes.
         */
        function(scope, element, attrs) {
          var attr = 'ngeoMap';
          var prop = attrs[attr];

          var map = /** @type {ol.Map} */ (scope.$eval(prop));
          goog.asserts.assertInstanceof(map, ol.Map);

          map.setTarget(element[0]);
        }
  };
};

ngeoModule.directive('ngeoMap', ngeo.mapDirective);
