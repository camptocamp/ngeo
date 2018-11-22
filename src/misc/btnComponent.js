/**
 * @module ngeo.misc.btnComponent
 */
/**
 * @type {!angular.IModule}
 */
const exports = angular.module('ngeoBtnComponent', []);


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
 * @param {angular.IParseService} $parse Angular parse service.
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoBtnGroup
 */
exports.btnGroupComponent_ = function($parse) {
  return {
    restrict: 'A',
    controller: 'ngeoBtnGroupController',
    /**
     * @param {!angular.Scope} scope Scope.
     * @param {!angular.JQLite=} element Element.
     * @param {!angular.Attributes=} attrs Attributes.
     * @param {!ngeo.misc.btnComponent.BtnGroupController=} controller Controller.
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


exports.directive('ngeoBtnGroup', exports.btnGroupComponent_);


/**
 * @param {!angular.Scope} $scope Scope.
 * @constructor
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoBtnGroupController
 */
exports.BtnGroupController = function($scope) {
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
exports.BtnGroupController.prototype.activate = function(index) {
  this.buttons_.forEach((expressionFn, i) => {
    if (i != index) {
      expressionFn.assign(this.scope_, false);
    }
  });
};


/**
 * @param {angular.parse.Expression} expressionFn Expression function.
 * @return {number} Index of the pushed setter.
 */
exports.BtnGroupController.prototype.addButton = function(expressionFn) {
  this.buttons_.push(expressionFn);
  return this.buttons_.length - 1;
};


exports.controller('ngeoBtnGroupController',
  exports.BtnGroupController);


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
 * @param {angular.IParseService} $parse Angular parse service.
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoBtn
 */
exports.btnComponent_ = function($parse) {
  return {
    require: ['?^ngeoBtnGroup', 'ngModel'],
    restrict: 'A',
    /**
     * @param {!angular.Scope} scope Scope.
     * @param {!angular.JQLite=} element Element.
     * @param {!angular.Attributes=} attrs Attributes.
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


exports.directive('ngeoBtn', exports.btnComponent_);


export default exports;
