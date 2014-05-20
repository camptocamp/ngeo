goog.provide('go_map_directive');

goog.require('goog.object');

(function() {
  var module = angular.module('go_map_directive', []);

  module.directive('goMap',
      /**
       * @return {angular.Directive} The directive specs.
       */
      function() {
        return {
          restrict: 'A',
          scope: {
            'm': '=goMapMap'
          },
          link:
              /**
               * @param {angular.Scope} scope Scope.
               * @param {angular.JQLite} element Element.
               * @param {angular.Attributes} attrs Attributes.
               */
              function(scope, element, attrs) {
                /** @type {ol.Map} */
                var map = goog.object.get(scope, 'm');
                map.setTarget(element[0]);
              }
        };
      });
})();
