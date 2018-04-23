goog.provide('app.displaywindow');

// webpack: import './displaywindow.css';
// webpack: import 'jquery-ui/ui/widgets/draggable.js';
goog.require('ngeo.message.displaywindowComponent');


/** @type {!angular.Module} **/
app.displaywindow.module = angular.module('app', [
  ngeo.message.displaywindowComponent.name
]);


/**
 * @param {angular.Scope} $scope Scope.
 * @ngInject
 * @constructor
 */
app.displaywindow.MainController = function($scope) {

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
          <h3>Using angular-bindings:</h3>
          <label for="textBinding">Data: </label>
          <input type="text" id="textBinding" size="35" ng-model="ctrl.window3TextBinding" />
          <p>Output:
            <p id="textBindingOutput">{{ctrl.window3TextBinding}}</p>
          </p>
      </p>
      <p>
          <h3>Using angular-directives:</h3>
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
   * @type {string}
   * @export
   */
  this.window3TextBinding = 'This is an angular binding.';

  /**
   * @type {angular.Scope}
   * @export
   */
  this.window3Scope = $scope;
};


app.displaywindow.module.controller('MainController', app.displaywindow.MainController);
