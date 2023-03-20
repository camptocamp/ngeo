import angular from 'angular';
import * as olEvents from 'ol/events.js';
import olMap from 'ol/Map.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoMap', []);

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
 * @htmlAttribute {import("ol/Map.js").default} ngeo-map The map.
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
      // Get the 'import("ol/Map.js").default' object from attributes and manage it accordingly
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

        olEvents.listen($window, 'resize', () => {
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
        });
      }
    },
  };
}

// Register the directive in the module
module.directive('ngeoMap', mapComponent);

export default module;
