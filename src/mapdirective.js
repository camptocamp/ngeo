goog.provide('go_map_directive');

(function() {

  var module = angular.module('go_map_directive', []);

  module.directive('goMap',  function() {
    return {
      restrict: 'A',
      scope: {
        map: '=goMapMap'
      },
      link: function(scope, element, attrs) {
        scope.map.setTarget(element[0]);
      }
    };
  });
})();
