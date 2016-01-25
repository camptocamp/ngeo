goog.provide('ngeo.recenterDirective');

goog.require('ngeo');


/**
 * Provides the "ngeoRecenter" directive, a widget for recentering a map
 * to a specific extent (by using `ngeo-extent`) or a specific zoom level
 * (by using `ngeo-zoom`).
 *
 * Example:
 *
 *     <div ngeo-recenter ngeo-recenter-map="::ctrl.map">
 *       <a href="#" ngeo-extent="[-1898084, 4676723, 3972279, 8590299]">A</a>
 *       <a href="#" ngeo-extent="[727681, 5784754, 1094579, 6029353]">B</a>
 *       <a href="#" ngeo-zoom="1">Zoom to level 1</a>
 *     </div>
 *
 * Or with a select:
 *
 *     <select ngeo-recenter ngeo-recenter-map="::ctrl.map">
 *       <option ngeo-extent="[-1898084, 4676723, 3972279, 8590299]">A</option>
 *       <option ngeo-extent="[727681, 5784754, 1094579, 6029353]">B</option>
 *     </select>
 *
 *
 * @return {angular.Directive} Directive Definition Object.
 * @ngdoc directive
 * @ngname ngeoRecenter
 */
ngeo.recenterDirective = function() {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {
      var mapExpr = $attrs['ngeoRecenterMap'];
      var map = /** @type {ol.Map} */ ($scope.$eval(mapExpr));

      function recenter(element) {
        var extent = element.attr('ngeo-extent');
        if (extent !== undefined) {
          var mapSize = /** @type {ol.Size} */ (map.getSize());
          map.getView().fit($scope.$eval(extent), mapSize);
        }
        var zoom = element.attr('ngeo-zoom');
        if (zoom !== undefined) {
          map.getView().setZoom($scope.$eval(zoom));
        }
      }

      // if the children is a link or button
      $element.on('click', function(event) {
        recenter(angular.element(event.target));
      });

      // if the children is an option inside a select
      $element.on('change', function(event) {
        var selected = event.target.options[event.target.selectedIndex];
        recenter(angular.element(selected));
      });

    }
  };
};
ngeo.module.directive('ngeoRecenter', ngeo.recenterDirective);
