goog.provide('go_map_directive');

goog.require('go');
goog.require('goog.asserts');

goModule.directive('goMap', ['goDefaultMap',
  /**
   * @param {string} goDefaultMap Default map constant.
   * @return {angular.Directive} The directive specs.
   */
  function(goDefaultMap) {
    return {
      restrict: 'A',
      link:
          /**
           * @param {angular.Scope} scope Scope.
           * @param {angular.JQLite} element Element.
           * @param {angular.Attributes} attrs Attributes.
           */
          function(scope, element, attrs) {
            var attr = 'goMap';
            var prop = attrs[attr] || goDefaultMap;

            var map = /** @type {ol.Map} */ (scope.$eval(prop));
            goog.asserts.assertInstanceof(map, ol.Map);

            map.setTarget(element[0]);
          }
    };
  }]);
