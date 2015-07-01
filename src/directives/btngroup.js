/**
 * @fileoverview Provides two directives: ngeo-btn-group and ngeo-btn.
 *
 * The ngeo-btn-group directive allows creating "toggle" groups. It works with
 * the ngeo-btn directive.
 *
 * Example:
 *
 * <div ngeo-btn-group>
 *   <button ngeo-btn class="btn" ng-model="ctrl.drawPoint.active"></button>
 *   <button ngeo-btn class="btn" ng-model="ctrl.drawLine.active"></button>
 * </div>
 *
 * In that example the ngeo-btn are combined together in a "toggle group",
 * where activating a button will deactivate the others.
 *
 * The ngeo-btn allows creating toggle buttons working with ng-model. It is
 * typically used with Bootstrap buttons (`btn`).
 *
 * Example:
 *
 * <button ngeo-btn class="btn" ng-model="ctrl.interaction.active"></button>
 *
 * This example is about creating a Bootstrap button that can pressed/depressed
 * to activate/deactivate an OpenLayers 3 interaction.
 */

goog.provide('ngeo.btnDirective');
goog.provide('ngeo.btngroupDirective');

goog.require('ngeo');


/**
 * @return {angular.Directive} The directive specs.
 * @ngInject
 */
ngeo.btngroupDirective = function() {
  return {
    restrict: 'A',
    controller: 'ngeoBtnGroupController'
  };
};


ngeoModule.directive('ngeoBtnGroup', ngeo.btngroupDirective);



/**
 * @param {!angular.Scope} $scope Scope.
 * @constructor
 * @ngInject
 */
ngeo.BtnGroupController = function($scope) {
  /**
   * @type {Array.<function(!angular.Scope, boolean)>}
   * @private
   */
  this.buttons_ = [];

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;
};


/**
 * @param {number} index Index of the button in buttons array.
 */
ngeo.BtnGroupController.prototype.activate = function(index) {
  goog.array.forEach(this.buttons_,
      function(s, i) {
        if (i != index) {
          s(this.scope_, false);
        }
      }, this);
};


/**
 * @param {function((!angular.Scope), *)} ngModelSet Setter.
 * @return {number} Index of the pushed setter.
 */
ngeo.BtnGroupController.prototype.addButton = function(ngModelSet) {
  this.buttons_.push(ngModelSet);
  return this.buttons_.length - 1;
};


ngeoModule.controller('ngeoBtnGroupController', ngeo.BtnGroupController);


/**
 * @param {angular.$parse} $parse Angular parse service.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 */
ngeo.btnDirective = function($parse) {
  return {
    require: ['?^ngeoBtnGroup', 'ngModel'],
    restrict: 'A',
    link:
        /**
         * @param {!angular.Scope} scope Scope.
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
          if (!goog.isNull(buttonsCtrl)) {
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
            if (ngModelCtrl.$viewValue && !goog.isNull(buttonsCtrl)) {
              buttonsCtrl.activate(indexInGroup);
            }
            element.toggleClass('active', ngModelCtrl.$viewValue);
          };
        }
  };
};


ngeoModule.directive('ngeoBtn', ngeo.btnDirective);
