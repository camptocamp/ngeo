// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';

/**
 * @type {angular.IModule}
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
      const mapExpr = $attrs.ngeoRecenterMap;
      /**
       * @type {import("ol/Map.js").default}
       */
      const map = $scope.$eval(mapExpr);

      /**
       * @param {JQuery} element
       */
      function recenter(element) {
        const extent = element.attr('ngeo-extent');
        if (extent !== undefined) {
          const size = map.getSize();
          if (size === undefined) {
            throw new Error('Missing size');
          }
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
       * @param {JQuery.ChangeEvent<unknown, unknown, unknown, HTMLSelectElement>} event The event
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
