goog.provide('ngeo.mapDirective');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ol.Map');


/**
 * Provides a directive used to insert a user-defined OpenLayers
 * map in the DOM. The directive does not create an isolate scope.
 *
 *     <div ngeo-map="ctrl.map"></div>
 *
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoMap
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

ngeo.module.directive('ngeoMap', ngeo.mapDirective);
