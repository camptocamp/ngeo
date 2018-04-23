goog.provide('app.displaywindow');

// webpack: import './displaywindow.css';
// webpack: import 'jquery-ui/ui/widgets/draggable.js';
goog.require('ngeo.message.displaywindowComponent');


/** @type {!angular.Module} **/
app.displaywindow.module = angular.module('app', [
  ngeo.message.displaywindowComponent.name
]);


/**
 * @ngInject
 * @constructor
 */
app.displaywindow.MainController = function() {

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

};


app.displaywindow.module.controller('MainController', app.displaywindow.MainController);
