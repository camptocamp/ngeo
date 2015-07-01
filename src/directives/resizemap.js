/**
 * @fileoverview Provides a directive to use on resizable elements that change
 * the map size when they are resized. The directive calls `map.updateSize`
 * during the animation.
 * For now, this directive only works in combination with the `ng-class`
 * directive.
 * Also, this directive can only work with angular >= 1.4.
 *
 * Beware that the 'addClass' event may not be fired at first. You can use a 0
 * timeout to simulate a ng-class change.
 *
 * Example:
 *
 *   <div ng-class="ctrl.open ? 'open' : 'close' ngeo-resizemap="ctrl.map"><div>
 *   <input type="checkbox" ng-model="ctrl.open" />
 *
 */

goog.provide('ngeo.resizemapDirective');

goog.require('goog.async.AnimationDelay');
goog.require('ngeo');
goog.require('ol.Map');


/**
 * @param {angular.$window} $window Angular window service.
 * @param {angular.$animate} $animate Angular animate service.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 */
ngeo.resizemapDirective = function($window, $animate) {
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

          var updateMapSize = function() {
            map.updateSize();
            map.renderSync();
          };

          var animationDelay = new goog.async.AnimationDelay(
              function() {
                updateMapSize();
                animationDelay.start();
              }, $window);

          var animationCallback = function(element, phase) {
            animationDelay.start();
            if (phase == 'close') {
              animationDelay.stop();
            }
          };
          $animate.on('addClass', element, animationCallback);
          $animate.on('removeClass', element, animationCallback);
        }
  };
};


ngeoModule.directive('ngeoResizemap', ngeo.resizemapDirective);
