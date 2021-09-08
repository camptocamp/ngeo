// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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

import './colorpicker.css';
import angular from 'angular';
import ngeoMiscColorpickerComponent from 'ngeo/misc/colorpickerComponent';

/** @type {angular.IModule} **/
const myModule = angular.module('app', ['gettext', ngeoMiscColorpickerComponent.name]);

/**
 * The application-specific color picker component, based on the
 * ngeo-colorpicker component.
 *
 * @type {angular.IComponentOptions}
 */
const colorpickerComponent = {
  template: '<div ngeo-colorpicker="$ctrl.colors" ngeo-colorpicker-color="mainCtrl.color"></div>',
  controller: 'AppColorpickerController',
};

myModule.component('appColorpicker', colorpickerComponent);

/**
 * @class
 * @ngInject
 */
function ColorPickerController() {
  /**
   * The colors set.
   * @type {string[][]}
   * @const
   */
  this.colors = [
    ['red', 'yellow', 'green', 'lightgreen', 'lightblue', 'orange', 'purple'],
    ['#ffffff', '#f7f7f7', '#c3c3c3', '#000000'],
  ];
}

myModule.controller('AppColorpickerController', ColorPickerController);

/**
 * @class
 * @param {angular.IScope} $scope Controller scope.
 * @ngInject
 */
function MainController($scope) {
  /**
   * Active color.
   * @type {string}
   */
  this.color = 'red';
}

myModule.controller('MainController', MainController);

export default myModule;
