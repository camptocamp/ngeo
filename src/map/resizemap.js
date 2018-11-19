/**
 * @module ngeo.map.resizemap
 */
import googAsserts from 'goog/asserts.js';
import olMap from 'ol/Map.js';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('ngeoResizemap', []);

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
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoResizemap
 */
exports.directive_ = function($window) {
  const /** @type {number} */ duration = 1000;

  return {
    restrict: 'A',
    /**
     * @param {angular.Scope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     */
    link: (scope, element, attrs) => {
      const attr = 'ngeoResizemap';
      const prop = attrs[attr];
      const map = scope.$eval(prop);
      googAsserts.assertInstanceof(map, olMap);

      const stateExpr = attrs['ngeoResizemapState'];
      googAsserts.assert(stateExpr !== undefined);

      let start;
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
    }
  };
};


exports.directive('ngeoResizemap', exports.directive_);


export default exports;
