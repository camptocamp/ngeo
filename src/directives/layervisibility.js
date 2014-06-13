goog.provide('go_layervisibility_directive');

goog.require('go');
goog.require('goog.asserts');


/**
 * Directive to control the visibility of a layer. To be used with
 * a checkbox like element. Requires ngModel.
 *
 * Usage:
 * <input type="checkbox" ng-model="layervisible" go-layer-visibility="layer">
 */
goModule.directive('goLayerVisibility', ['goDefaultMap', '$timeout', '$parse',

  /**
   * @param {string} goDefaultMap Default map constant.
   * @param {angular.$timeout} $timeout Timeout service.
   * @param {angular.$parse} $parse Parse service.
   * @return {angular.Directive} The directive specs.
   */
  function(goDefaultMap, $timeout, $parse) {

    return {
      restrict: 'A',
      require: '?ngModel',
      link:
          /**
           * @param {angular.Scope} scope Scope.
           * @param {angular.JQLite} element Element.
           * @param {angular.Attributes} attr Attributes.
           * @param {(!Object|!Array.<!Object>)} ctrl Controller.
           */
          function(scope, element, attr, ctrl) {
            var name;

            name = 'goLayerVisibility';
            var layer = /** @type {ol.layer.Layer} */ (scope.$eval(attr[name]));
            goog.asserts.assertInstanceof(layer, ol.layer.Layer);

            name = 'ngModel';
            var ngModelGet = $parse(attr[name]);
            var ngModelSet = ngModelGet.assign;

            ctrl.$viewChangeListeners.push(function() {
              $timeout(function() {
                layer.setVisible(ctrl.$modelValue);
              }, 0, false);
            });

            layer.on('change:visible', function() {
              scope.$apply(function() {
                ngModelSet(scope, layer.getVisible());
              });
            });

            if (!goog.isDef(ngModelGet(scope))) {
              ngModelSet(scope, layer.getVisible());
            } else {
              $timeout(function() {
                layer.setVisible(ctrl.$modelValue);
              }, 0, false);
            }
          }
    };
  }]);
