// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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

import './displaywindow.css';
import angular from 'angular';
import ngeoMessageDisplaywindowComponent from 'ngeo/message/displaywindowComponent.js';

/** @type {angular.IModule} **/
const myModule = angular.module('app', [ngeoMessageDisplaywindowComponent.name]);

/**
 * @param {angular.IScope} $scope Scope.
 * @ngInject
 * @class
 */
function MainController($scope) {
  /**
   * @type {string}
   */
  this.window1Content = 'https://www.camptocamp.com';

  /**
   * @type {string}
   */
  this.window2Content = `<p>A window: <ul>
      <li>That have custom dimensions</li>
      <li>That is draggable</li>
      <li>That is rezisable</li>
      <li>That can be open and close</li>
      </ul></p>`;

  /**
   * @type {boolean}
   */
  this.window2IsOpen = false;

  /**
   * @type {boolean}
   */
  this.window3IsOpen = false;

  /**
   * @type {string}
   */
  this.window3Template = `
    <div class="details">
      <p>
          <h3>Using AngularJS directives:</h3>
          <span ng-if="!ctrl.window3FalseValue">This should appear</span>
          <span ng-show="ctrl.window3FalseValue">This should not be visible</span>
      </p>
    </div>
  `;

  /**
   * @type {boolean}
   */
  this.window3FalseValue = false;

  /**
   * @type {boolean}
   */
  this.window4IsOpen = false;

  const element = document.getElementById('window4Template');
  if (!element) {
    throw new Error('Missing element');
  }
  /**
   * @type {string}
   */
  this.window4Template = angular.element(element).html();

  /**
   * @type {string}
   */
  this.window4TextBinding = 'This is an AngularJS binding.';

  /**
   * @type {angular.IScope}
   */
  this.windowScope = $scope;
}

myModule.controller('MainController', MainController);

export default myModule;
