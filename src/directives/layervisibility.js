goog.provide('go_layervisibility_directive');

goog.require('go');
goog.require('goog.asserts');

goModule.directive('goLayerVisibility', [

  /**
   * @return {angular.Directive} The directive specs.
   */
  function() {
    return {
      restrict: 'E',
      template: '<input type="checkbox" ng-model="l.visible"/>',
      scope: {
        'l': '=goLayer'
      },
      link:
          /**
           * @param {angular.Scope} scope Scope.
           * @param {angular.JQLite} element Element.
           * @param {angular.Attributes} attrs Attributes.
           */
          function(scope, element, attrs) {
            /** @type {ol.layer.Layer} */
            var layer = scope['l'];
            goog.asserts.assertInstanceof(layer, ol.layer.Layer);

            Object.defineProperty(layer, 'visible', {
              get: function() {
                return this.getVisible();
              },
              set: function(val) {
                this.setVisible(val);
              }
            });
          }
    };
  }]);
