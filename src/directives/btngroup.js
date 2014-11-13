goog.provide('ngeo_btngroup_directive');

goog.require('ngeo');


/**
 * This directive allows creating "toggle" groups. It works with the `ngeo-btn`
 * directive.
 *
 * Example:
 *
 * <div ngeo-btn-group>
 *   <button ngeo-btn class="btn" ng-model="ctrl.drawPoint.active"></button>
 *   <button ngeo-btn class="btn" ng-model="ctrl.drawLine.active"></button>
 * </div>
 *
 * In that example the `ngeo-btn` are combined together in a "toggle group",
 * where activating a button will deactivate the others.
 *
 * See the `ngeo-btn` directive for more information.
 */
ngeoModule.directive('ngeoBtnGroup', function() {
  return {
    restrict: 'A',
    controller: ['$scope',
      function($scope) {
        /** @type {Array.<function(!angular.Scope, boolean)>} */
        var buttons = [];

        /**
         * @param {number} index Index of the button in buttons array.
         */
        this.activate = function(index) {
          goog.array.forEach(buttons,
              function(s, i) {
                if (i != index) {
                  s($scope, false);
                }
              });
        };

        /**
         * @param {function((!angular.Scope), *)} ngModelSet Setter.
         * @return {number} Index of the pushed setter.
         */
        this.addButton = function(ngModelSet) {
          buttons.push(ngModelSet);
          return buttons.length - 1;
        };
      }
    ]
  };
});


/**
 * This directive allows creating toggle buttons working with `ng-model`.
 * To be typically used with Bootstrap buttons (`btn`).
 *
 * Example:
 *
 * <button ngeo-btn class="btn" ng-model="ctrl.interaction.active"></button>
 *
 * This example is about creating a Bootstrap button that can pressed/depressed
 * to activate/deactivate an OpenLayers 3 interaction.
 *
 * The `ngeo-btn` directive can be used alone, as in the above example, or
 * together with the `ngeo-btn-group` directive.
 *
 * Example:
 *
 * <div ngeo-btn-group>
 *   <button ngeo-btn class="btn" ng-model="ctrl.drawPoint.active"></button>
 *   <button ngeo-btn class="btn" ng-model="ctrl.drawLine.active"></button>
 * </div>
 *
 * In that example the `ngeo-btn` are combined together in a "toggle group",
 * where activating a button will deactivate the others.
 */
ngeoModule.directive('ngeoBtn', ['$parse', function($parse) {
  return {
    require: ['?^ngeoBtnGroup', 'ngModel'],
    restrict: 'A',
    link:
        /**
         * @param {angular.Scope} scope Scope.
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Attributes.
         * @param {!Array.<!Object>} ctrls Controllers.
         */
        function(scope, element, attrs, ctrls) {
          var buttonsCtrl = ctrls[0];
          var ngModelCtrl = ctrls[1];
          var indexInGroup = -1;

          var ngModelGet = $parse(attrs['ngModel']);
          var ngModelSet = ngModelGet.assign;

          // Set ng-model value to false if undefined
          if (!goog.isDef(ngModelGet(scope))) {
            ngModelSet(scope, false);
          }
          if (goog.isDef(buttonsCtrl)) {
            indexInGroup = buttonsCtrl.addButton(ngModelSet);
          }

          // UI -> model
          element.bind('click', function() {
            scope.$apply(function() {
              ngModelCtrl.$setViewValue(!ngModelCtrl.$viewValue);
              ngModelCtrl.$render();
            });
          });

          // model -> UI
          ngModelCtrl.$render = function() {
            if (ngModelCtrl.$viewValue && goog.isDef(buttonsCtrl)) {
              buttonsCtrl.activate(indexInGroup);
            }
            element.toggleClass('active', ngModelCtrl.$viewValue);
          };
        }
  };
}]);
