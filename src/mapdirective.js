(function() {
  goog.provide('go_map_directive');

  var module = angular.module('go_map_directive', []);

  module.directive('goMap',  function() {
    return {
      restrict: 'E',
      scope: {
        map: '=gaMapMap'
      },
      link: function(scope, element, attrs) {
        scope.map.setTarget(element[0]);
      }
    };
  });
})();
