/**
 * @module app.displaywindow
 */
const exports = {};

import './displaywindow.css';
import ngeoMessageDisplaywindowComponent from 'ngeo/message/displaywindowComponent.js';


/** @type {!angular.IModule} **/
exports.module = angular.module('app', [
  ngeoMessageDisplaywindowComponent.name
]);


/**
 * @param {angular.Scope} $scope Scope.
 * @ngInject
 * @constructor
 */
exports.MainController = function($scope) {

  /**
   * @type {string}
   * @export
   */
  this.window1Content = 'https://www.camptocamp.com';

  /**
   * @type {string}
   * @export
   */
  this.window2Content = `<p>A window: <ul>
      <li>That have custom dimensions.</li>
      <li>That is draggable</li>
      <li>That is rezisable</li>
      <li>That can be open and close</li>
      </ul></p>`;

  /**
   * @type {boolean}
   * @export
   */
  this.window2IsOpen = false;

  /**
   * @type {boolean}
   * @export
   */
  this.window3IsOpen = false;

  /**
   * @type {string}
   * @export
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
   * @export
   */
  this.window3FalseValue = false;


  /**
   * @type {boolean}
   * @export
   */
  this.window4IsOpen = false;

  /**
   * @type {string}
   * @export
   */
  this.window4Template = angular.element(document.getElementById('window4Template')).html();

  /**
   * @type {string}
   * @export
   */
  this.window4TextBinding = 'This is an AngularJS binding.';

  /**
   * @type {angular.Scope}
   * @export
   */
  this.windowScope = $scope;
};


exports.module.controller('MainController', exports.MainController);


export default exports;
