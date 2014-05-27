goog.provide('go_map_directive');

goog.require('go');

goModule.directive('goMap',
    /**
     * @return {angular.Directive} The directive specs.
     */
    function() {
      return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
          'm': '=goMapMap'
        },
        link:
            /**
             * @param {angular.Scope} scope Scope.
             * @param {angular.JQLite} element Element.
             * @param {angular.Attributes} attrs Attributes.
             */
            function(scope, element, attrs) {
              /** @type {ol.Map} */
              var map = scope['m'];
              goog.asserts.assertInstanceof(map, ol.Map);

              map.setTarget(element.children()[0]);
            }
      };
    });
