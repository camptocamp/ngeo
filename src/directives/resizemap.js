goog.provide('ngeo.resizemapDirective');

goog.require('goog.asserts');
goog.require('goog.async.AnimationDelay');
goog.require('ngeo');
goog.require('ol.Map');


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
 * See our live example: {@link ../examples/animation.html}
 *
 * @param {angular.$window} $window Angular window service.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoResizemap
 */
ngeo.resizemapDirective = function($window) {
  var /** @type {number} */ duration = 1000;

  return {
    restrict: 'A',
    link:
        /**
         * @param {!angular.Scope} scope Scope.
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Attributes.
         */
        function(scope, element, attrs) {
          var attr = 'ngeoResizemap';
          var prop = attrs[attr];
          var map = scope.$eval(prop);
          goog.asserts.assertInstanceof(map, ol.Map);

          var stateExpr = attrs['ngeoResizemapState'];
          goog.asserts.assert(stateExpr !== undefined);

          var start;

          var animationDelay = new goog.async.AnimationDelay(
              function() {
                map.updateSize();
                map.renderSync();

                if (goog.now() - start < duration) {
                  animationDelay.start();
                }
              }, $window);

          // Make sure the map is resized when the animation ends.
          // It may help in case the animation didn't start correctly.
          element.bind('transitionend',function() {
            map.updateSize();
            map.renderSync();
          });

          scope.$watch(stateExpr, function(newVal, oldVal) {
            if (newVal != oldVal) {
              start = goog.now();
              animationDelay.stop();
              animationDelay.start();
            }
          });
        }
  };
};


ngeo.module.directive('ngeoResizemap', ngeo.resizemapDirective);
