// The MIT License (MIT)
//
// Copyright (c) 2014-2021 Camptocamp SA
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
import olMap from 'ol/Map.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoResizemap', []);

/**
 * Provides a directive that resizes the map in an animation loop
 * during 1 second when the value of "state" changes. This is especially useful
 * when changing the size of other elements with a transition leads to a change
 * of the map size.
 *
 * Example:
 *
 *      <div ng-class="ctrl.open ? 'open' : 'close' ngeo-resizemap="ctrl.map"
 *        ngeo-resizemap-state="open">
 *      <div>
 *      <input type="checkbox" ng-model="ctrl.open" />
 *
 * See our live example: [../examples/animation.html](../examples/animation.html)
 *
 * @param {angular.IWindowService} $window Angular window service.
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoResizemap
 */
function mapResizeComponent($window) {
  const /** @type {number} */ duration = 1000;

  return {
    restrict: 'A',
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     */
    link: (scope, element, attrs) => {
      const attr = 'ngeoResizemap';
      const prop = attrs[attr];
      const map = scope.$eval(prop);
      console.assert(map instanceof olMap);

      const stateExpr = attrs.ngeoResizemapState;
      console.assert(stateExpr !== undefined);

      /** @type {number} */
      let start;
      /** @type {number} */
      let animationDelayKey;

      const animationDelay = () => {
        map.updateSize();
        map.renderSync();

        if (Date.now() - start < duration) {
          animationDelayKey = $window.requestAnimationFrame(animationDelay);
        }
      };

      // Make sure the map is resized when the animation ends.
      // It may help in case the animation didn't start correctly.
      element.on('transitionend', () => {
        map.updateSize();
        map.renderSync();
      });

      scope.$watch(stateExpr, (newVal, oldVal) => {
        if (newVal != oldVal) {
          start = Date.now();
          $window.cancelAnimationFrame(animationDelayKey);
          animationDelayKey = $window.requestAnimationFrame(animationDelay);
        }
      });
    },
  };
}

myModule.directive('ngeoResizemap', mapResizeComponent);

export default myModule;
