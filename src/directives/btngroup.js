goog.provide('ngeo.btnDirective');

goog.require('ngeo');


/**
 * Provides two directives: ngeo-btn-group and ngeo-btn.
 *
 * The ngeo-btn-group directive allows creating "toggle" groups. It works with
 * the ngeo-btn directive.
 *
 * Example:
 *
 *     <div ngeo-btn-group>
 *       <button ngeo-btn class="btn" ng-model="ctrl.drawPoint.active"></button>
 *       <button ngeo-btn class="btn" ng-model="ctrl.drawLine.active"></button>
 *     </div>
 *
 * In that example the ngeo-btn are combined together in a "toggle group",
 * where activating a button will deactivate the others.
 *
 * One can use `ng-model` directive at the group level in order to know if
 * a button is active.
 *
 * Example:
 *
 *     <div ngeo-btn-group ngeo-btn-group-active="ctrl.drawToolActive">
 *
 * See our live example: [../examples/interactionbtngroup.html](../examples/interactionbtngroup.html)
 *
 * @htmlAttribute {*} ngeo-btn-group-active Any property of the scope.
 * Tells whether at least one button of the group is active.
 * @param {angular.$parse} $parse Angular parse service.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoBtnGroup
 */
ngeo.btngroupDirective = function($parse) {
  return {
    restrict: 'A',
    controller: 'ngeoBtnGroupController',
    /**
     * @param {!angular.Scope} scope Scope.
     * @param {!angular.JQLite=} element Element.
     * @param {!angular.Attributes=} attrs Atttributes.
     * @param {!ngeo.BtnGroupController=} controller Controller.
     */
    link: (scope, element, attrs, controller) => {
      const setActive = $parse(attrs['ngeoBtnGroupActive']).assign;

      if (setActive) {
        scope.$watch(
          // return true if at least one button is active otherwise false
          () => controller.buttons_.some(buttonModel => buttonModel(scope) === true),
          (newValue) => {
            setActive(scope, newValue);
          }
        );
      }
    }
  };
};


ngeo.module.directive('ngeoBtnGroup', ngeo.btngroupDirective);


/**
 * @param {!angular.Scope} $scope Scope.
 * @constructor
 * @private
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoBtnGroupController
 */
ngeo.BtnGroupController = function($scope) {
  /**
   * @type {!Array.<!angular.parse.Expression>}
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
  this.buttons_.forEach(function(expressionFn, i) {
    if (i != index) {
      expressionFn.assign(this.scope_, false);
    }
  }, this);
};


/**
 * @param {angular.parse.Expression} expressionFn Expression function.
 * @return {number} Index of the pushed setter.
 */
ngeo.BtnGroupController.prototype.addButton = function(expressionFn) {
  this.buttons_.push(expressionFn);
  return this.buttons_.length - 1;
};


ngeo.module.controller('ngeoBtnGroupController', ngeo.BtnGroupController);


/**
 * The ngeo-btn allows creating toggle buttons working with ng-model. It is
 * typically used with Bootstrap buttons (`btn`).
 *
 * Example:
 *
 *     <button ngeo-btn class="btn" ng-model="ctrl.interaction.active"></button>
 *
 * This example is about creating a Bootstrap button that can pressed/depressed
 * to activate/deactivate an OpenLayers interaction.
 *
 * @htmlAttribute {*} ng-model Any property on the scope. Ideally a boolean.
 * @param {angular.$parse} $parse Angular parse service.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoBtn
 */
ngeo.btnDirective = function($parse) {
  return {
    require: ['?^ngeoBtnGroup', 'ngModel'],
    restrict: 'A',
    /**
     * @param {!angular.Scope} scope Scope.
     * @param {!angular.JQLite=} element Element.
     * @param {!angular.Attributes=} attrs Atttributes.
     * @param {!Array.<!Object>=} ctrls Controller.
     */
    link: (scope, element, attrs, ctrls) => {
      const buttonsCtrl = ctrls[0];
      const ngModelCtrl = ctrls[1];
      let indexInGroup = -1;

      const ngModelGet = $parse(attrs['ngModel']);
      const ngModelSet = ngModelGet.assign;

      // Set ng-model value to false if undefined
      if (ngModelGet(scope) === undefined) {
        ngModelSet(scope, false);
      }
      if (buttonsCtrl !== null) {
        indexInGroup = buttonsCtrl.addButton(ngModelGet);
      }

      // UI -> model
      element.on('click', () => {
        scope.$apply(() => {
          ngModelCtrl.$setViewValue(!ngModelCtrl.$viewValue);
          ngModelCtrl.$render();
        });
      });

      // model -> UI
      ngModelCtrl.$render = function() {
        if (ngModelCtrl.$viewValue && buttonsCtrl !== null) {
          buttonsCtrl.activate(indexInGroup);
        }
        element.toggleClass('active', ngModelCtrl.$viewValue);
      };
    }
  };
};


ngeo.module.directive('ngeoBtn', ngeo.btnDirective);
