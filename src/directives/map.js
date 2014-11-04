goog.provide('ngeo_map_directive');

goog.require('goog.asserts');
goog.require('ngeo');


/**
 * The "map" directive. Used to insert a user-defined OpenLayers map
 * in the DOM. The directive does not create an isolate scope and it
 * expects a map instance in the parent scope.
 *
 * Example:
 *
 * <div ngeo-map></div>
 *
 * In this case the map directive will assume that the name of the
 * scope property including the map instance is "map". To specify
 * that name use this:
 *
 * <div ngeo-map="map1"></div>
 *
 */
ngeoModule.directive('ngeoMap', ['ngeoDefaultMap',
  /**
   * @param {string} ngeoDefaultMap Default map constant.
   * @return {angular.Directive} The directive specs.
   */
  function(ngeoDefaultMap) {
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
            var prop = attrs[attr] || ngeoDefaultMap;

            var map = /** @type {ol.Map} */ (scope.$eval(prop));
            goog.asserts.assertInstanceof(map, ol.Map);

            map.setTarget(element[0]);
          }
    };
  }]);
