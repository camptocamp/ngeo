// The MIT License (MIT)
//
// Copyright (c) 2014-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoBtnComponent', []);

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
function buttonGroupComponent($parse) {
  return {
    restrict: 'A',
    controller: 'ngeoBtnGroupController',
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {angular.IController=} controller Controller.
     */
    link: (scope, element, attrs, controller) => {
      if (!controller) {
        throw new Error('Missing controller');
      }
      const setActive = $parse(attrs.ngeoBtnGroupActive).assign;

      if (setActive) {
        scope.$watch(
          // return true if at least one button is active otherwise false
          () =>
            controller.buttons_.some(
              /**
               * @param {function(angular.IScope): boolean} buttonModel
               */
              (buttonModel) => buttonModel(scope) === true
            ),
          (newValue) => {
            setActive(scope, newValue);
          }
        );
      }
    },
  };
}

myModule.directive('ngeoBtnGroup', buttonGroupComponent);

/**
 * @hidden
 * @type {angular.IController}
 */
export class BtnGroupController {
  /**
   * @param {angular.IScope} $scope Scope.
   * @ngInject
   * @hidden
   */
  constructor($scope) {
    /**
     * @type {angular.ICompiledExpression[]}
     * @private
     */
    this.buttons_ = [];

    /**
     * @type {angular.IScope}
     * @private
     */
    this.scope_ = $scope;
  }

  /**
   * @param {number} index Index of the button in buttons array.
   */
  activate(index) {
    this.buttons_.forEach((expressionFn, i) => {
      if (i != index) {
        expressionFn.assign(this.scope_, false);
      }
    });
  }

  /**
   * @param {angular.ICompiledExpression} expressionFn Expression function.
   * @return {number} Index of the pushed setter.
   */
  addButton(expressionFn) {
    this.buttons_.push(expressionFn);
    return this.buttons_.length - 1;
  }
}

myModule.controller('ngeoBtnGroupController', BtnGroupController);

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
function buttonComponent($parse) {
  return {
    require: ['?^ngeoBtnGroup', 'ngModel'],
    restrict: 'A',
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {angular.IController|undefined} ctrls Controller.
     */
    link: (scope, element, attrs, ctrls) => {
      if (!ctrls) {
        throw new Error('Missing ctrls');
      }
      const buttonsCtrl = ctrls[0];
      const ngModelCtrl = ctrls[1];
      let indexInGroup = -1;

      const ngModelGet = $parse(attrs.ngModel);
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
      ngModelCtrl.$render = function () {
        if (ngModelCtrl.$viewValue && buttonsCtrl !== null) {
          buttonsCtrl.activate(indexInGroup);
        }
        element.toggleClass('active', ngModelCtrl.$viewValue);
      };
    },
  };
}

myModule.directive('ngeoBtn', buttonComponent);

export default myModule;
