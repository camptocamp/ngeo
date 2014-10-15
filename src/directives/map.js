goog.provide('ngeo_map_directive');

goog.require('goog.asserts');
goog.require('ngeo');

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
