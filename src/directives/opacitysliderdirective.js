goog.provide('go_opacityslider_directive');

goog.require('go');
goog.require('goog.asserts');

goModule.directive('goOpacitySlider', [

  /**
   * @return {angular.Directive} The directive specs.
   */
  function() {
    return {
      restrict: 'E',
      template: '<input type="range" min="0" max="1" step="0.05" ' +
          'value="1" ng-model="l.invertedOpacity" />',
      scope: {
        'l': '=goOpacitySliderLayer'
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

            Object.defineProperty(layer, 'invertedOpacity', {
              get: function() {
                return (Math.round((1 - this.getOpacity()) * 100) / 100) + '';
              },
              set: function(val) {
                this.setOpacity(1 - val);
              }
            });
          }
    };
  }]);
