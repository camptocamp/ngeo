goog.provide('go_layeropacity_directive');

goog.require('go');
goog.require('goog.asserts');


/**
 * Directive to control the opacity of a layer. To be used with
 * a input range element. Requires ngModel.
 *
 * <input type="range" min="0" max="1" step="0.05" ng-model="layeropacity"
 *        go-layer-opacity="layer">
 */
goModule.directive('goLayerOpacity', ['goDefaultMap', '$timeout', '$parse',

  /**
   * @param {string} goDefaultMap Default map constant.
   * @param {angular.$timeout} $timeout Timeout service.
   * @param {angular.$parse} $parse Parse service.
   * @return {angular.Directive} The directive specs.
   */
  function(goDefaultMap, $timeout, $parse) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link:
          /**
           * @param {angular.Scope} scope Scope.
           * @param {angular.JQLite} element Element.
           * @param {angular.Attributes} attr Attributes.
           * @param {(!Object|!Array.<!Object>)} ctrl Controller.
           */
          function(scope, element, attr, ctrl) {
            var name;

            name = 'goLayerOpacity';
            var layer = /** @type {ol.layer.Layer} */ (scope.$eval(attr[name]));
            goog.asserts.assertInstanceof(layer, ol.layer.Layer);

            name = 'ngModel';
            var ngModelGet = $parse(attr[name]);
            var ngModelSet = ngModelGet.assign;

            var getOpacity = function() {
              return (Math.round((1 - layer.getOpacity()) * 100) / 100) + '';
            };

            var setOpacity = function(val) {
              layer.setOpacity(1 - val);
            };

            ctrl.$viewChangeListeners.push(function() {
              $timeout(function() {
                setOpacity(ctrl.$modelValue);
              }, 0, false);
            });

            layer.on('change:opacity', function() {
              scope.$apply(function() {
                ngModelSet(scope, getOpacity());
              });
            });

            if (!goog.isDef(ngModelGet(scope))) {
              ngModelSet(scope, getOpacity());
            } else {
              $timeout(function() {
                setOpacity(ctrl.$modelValue);
              }, 0, false);
            }
          }
    };
  }]);
