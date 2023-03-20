import angular from 'angular';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoRecenter', []);

/**
 * Provides the "ngeoRecenter" directive, a widget for recentering a map
 * to a specific extent (by using `ngeo-extent`) or a specific zoom level
 * (by using `ngeo-zoom`).
 *
 * Example:
 *
 *      <div ngeo-recenter ngeo-recenter-map="::ctrl.map">
 *        <a href="#" ngeo-extent="[-1898084, 4676723, 3972279, 8590299]">A</a>
 *        <a href="#" ngeo-extent="[727681, 5784754, 1094579, 6029353]">B</a>
 *        <a href="#" ngeo-zoom="1">Zoom to level 1</a>
 *      </div>
 *
 * Or with a select:
 *
 *      <select ngeo-recenter ngeo-recenter-map="::ctrl.map">
 *        <option ngeo-extent="[-1898084, 4676723, 3972279, 8590299]">A</option>
 *        <option ngeo-extent="[727681, 5784754, 1094579, 6029353]">B</option>
 *      </select>
 *
 * See our live example: [../examples/recenter.html](../examples/recenter.html)
 *
 * @htmlAttribute {import("ol/Map.js").default} ngeo-recenter-map The map.
 * @return {angular.IDirective} Directive Definition Object.
 * @ngdoc directive
 * @ngname ngeoRecenter
 */
function mapResenterComponent() {
  return {
    restrict: 'A',
    link: ($scope, $element, $attrs) => {
      const mapExpr = $attrs['ngeoRecenterMap'];
      const map = /** @type {import("ol/Map.js").default} */ ($scope.$eval(mapExpr));

      function recenter(element) {
        const extent = element.attr('ngeo-extent');
        if (extent !== undefined) {
          const size = /** @type {import("ol/size.js").Size} */ (map.getSize());
          map.getView().fit($scope.$eval(extent), {size});
        }
        const zoom = element.attr('ngeo-zoom');
        if (zoom !== undefined) {
          map.getView().setZoom($scope.$eval(zoom));
        }
      }

      // if the children is a link or button
      $element.on('click', '*', function (event) {
        recenter(angular.element($(this)));
      });

      // if the children is an option inside a select
      /**
       * @param {JQuery.ChangeEvent<any, any, any, HTMLSelectElement>} event The event
       */
      const ce = (event) => {
        const selected = event.target.options[event.target.selectedIndex];
        recenter(angular.element(selected));
      };
      $element.on({change: ce});
    },
  };
}

// Register the directive in the module
module.directive('ngeoRecenter', mapResenterComponent);

export default module;
