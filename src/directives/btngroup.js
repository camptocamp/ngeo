goog.provide('go_btngroup_directive');

goog.require('go');

goModule.directive('goBtnGroup', function() {
  return {
    restrict: 'A',
    controller: ['$scope',
      function($scope) {
        /** @type {Array.<function((!angular.Scope), *)>} */
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
})
  .directive('goBtn', ['$parse',
      function($parse) {
        return {
          require: ['?^goBtnGroup', 'ngModel'],
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
                if (goog.isDef(ngModelGet(scope))) {
                  ngModelSet(scope, false);
                }
                if (goog.isDef(buttonsCtrl)) {
                  indexInGroup = buttonsCtrl.addButton(ngModelSet);
                }

                //ui->model
                element.bind('click', function() {
                  scope.$apply(function() {
                    ngModelCtrl.$setViewValue(!ngModelCtrl.$viewValue);
                    ngModelCtrl.$render();
                  });
                });

                //model -> UI
                ngModelCtrl.$render = function() {
                  if (ngModelCtrl.$viewValue && goog.isDef(buttonsCtrl)) {
                    buttonsCtrl.activate(indexInGroup);
                  }
                  element.toggleClass('active', ngModelCtrl.$viewValue);
                };
              }
        };
      }]);
