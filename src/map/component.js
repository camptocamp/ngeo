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
import {listen} from 'ol/events';
import olMap from 'ol/Map';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoMap', []);

/**
 * Provides a directive used to insert a user-defined OpenLayers
 * map in the DOM. The directive does not create an isolate scope.
 *
 * Examples:
 *
 *   Simple:
 *
 *      <div ngeo-map="ctrl.map"></div>
 *
 *   Manage window resizing:
 *
 *      <div
 *        ngeo-map="ctrl.map"
 *        ngeo-map-manage-resize="ctrl.manageResize"
 *        ngeo-map-resize-transition="ctrl.resizeTransition">
 *      </div>
 *
 * See our live examples:
 * [../examples/permalink.html](../examples/permalink.html)
 * [../examples/simple.html](../examples/simple.html)
 *
 * @htmlAttribute {import('ol/Map').default} ngeo-map The map.
 * @param {angular.IWindowService} $window The Angular $window service.
 * @return {angular.IDirective} Directive Definition Object.
 * @ngdoc directive
 * @ngname ngeoMap
 * @ngInject
 */
function mapComponent($window) {
  return {
    restrict: 'A',
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     */
    link: (scope, element, attrs) => {
      // Get the 'import('ol/Map').default' object from attributes and manage it accordingly
      const attr = 'ngeoMap';
      const prop = attrs[attr];

      const map = scope.$eval(prop);
      console.assert(map instanceof olMap);

      map.setTarget(element[0]);

      // Get the 'window resize' attributes, which are optional. If defined,
      // the browser window 'resize' event is listened to update the size of
      // the map when fired. A transition option is also available to let any
      // animation that may occur on the div of the map to smootly resize the
      // map while in progress.
      const manageResizeAttr = 'ngeoMapManageResize';
      const manageResizeProp = attrs[manageResizeAttr];
      const manageResize = scope.$eval(manageResizeProp);

      if (manageResize) {
        const resizeTransitionAttr = 'ngeoMapResizeTransition';
        const resizeTransitionProp = attrs[resizeTransitionAttr];

        const resizeTransition = /** @type {number|undefined} */ (scope.$eval(resizeTransitionProp));

        listen(
          $window,
          'resize',
          /** @type {import('ol/events').ListenerFunction} */
          (evt) => {
            if (resizeTransition) {
              // Resize with transition
              const start = Date.now();
              let loop = true;
              const adjustSize = function () {
                map.updateSize();
                map.renderSync();
                if (loop) {
                  $window.requestAnimationFrame(adjustSize);
                }
                if (Date.now() - start > resizeTransition) {
                  loop = false;
                }
              };
              adjustSize();
            } else {
              // A single plain resize
              map.updateSize();
            }
          }
        );
      }
    },
  };
}

// Register the directive in the module
myModule.directive('ngeoMap', mapComponent);

export default myModule;
