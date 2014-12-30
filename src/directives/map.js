/**
 * @fileoverview Provides a directive used to insert a user-defined OpenLayers
 * map in the DOM. The directive does not create an isolate scope.
 *
 * Example:
 *
 * <div ngeo-map="ctrl.map"></div>
 *
 * This directive creates a watcher on the "map" expression ("ctrl.map" in
 * the above example). Use a one-time binding expression if you know the map
 * won't changed:
 *
 * <div ngeo-map="::ctrl.map"></div>
 */
goog.provide('ngeo.mapDirective');

goog.require('goog.asserts');
goog.require('ngeo');


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
          var expr = attrs[attr];

          /**
           * The current map attached to this directive/element.
           * @type {ol.Map}
           */
          var map = null;

          scope.$watch(expr, function(newVal, oldVal) {
            if (!goog.isNull(map)) {
              map.setTarget(null);
            }
            map = goog.isDef(newVal) ? /** @type {ol.Map} */ (newVal) : null;
            if (!goog.isNull(map)) {
              goog.asserts.assertInstanceof(map, ol.Map);
              map.setTarget(element[0]);
            }
          });
        }
  };
};

ngeoModule.directive('ngeoMap', ngeo.mapDirective);
