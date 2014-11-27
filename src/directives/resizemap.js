/**
 * @fileoverview Provides a directive to use on resizable elements that change
 * the map size when they are resized. The directive calls `map.updateSize`
 * during the animation.
 *
 * Example:
 *
 *   <div ng-class="ctrl.open ? 'open' : 'close' ngeo-resizemap="ctrl.map"><div>
 *   <input type="checkbox" ng-model="ctrl.open" />
 */

goog.provide('ngeo.resizemapDirective');

goog.require('goog.async.AnimationDelay');
goog.require('ngeo');
goog.require('ol.Map');


/**
 * @param {angular.$window} $window Angular window service.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 */
ngeo.resizemapDirective = function($window) {
  return {
    restrict: 'A',
    link:
        /**
         * @param {angular.Scope} scope Scope.
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
              /**
               * @param {number} time Time.
               */
              function(time) {
                updateMapSize();
                animationDelay.start();
              }, $window);

          element.on('$animate:before', function() {
            updateMapSize();
            animationDelay.start();
          });

          element.on('$animate:close', function() {
            updateMapSize();
            animationDelay.stop();
          });
        }
  };
};


ngeoModule.directive('ngeoResizemap', ngeo.resizemapDirective);
