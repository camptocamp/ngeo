goog.provide('app.colorpicker');

// webpack: import './colorpicker.css';
// webpack: import './common_dependencies.js';
/** @suppress {extraRequire} */
goog.require('ngeo.misc.colorpickerComponent');

/** @type {!angular.Module} **/
app.colorpicker.module = angular.module('app', [
  ngeo.misc.colorpickerComponent.name,
]);


/**
 * The application-specific color picker component, based on the
 * ngeo-colorpicker component.
 *
 * @type {!angular.Component}
 */
app.colorpicker.colorpickerComponent = {
  template: '<div ngeo-colorpicker="ctrl.colors" ngeo-colorpicker-color="mainCtrl.color"></div>',
  controller: 'AppColorpickerController',
  controllerAs: 'ctrl'
};


app.colorpicker.module.component('appColorpicker', app.colorpicker.colorpickerComponent);


/**
 * @constructor
 * @ngInject
 */
app.colorpicker.ColorPickerController = function() {


  /**
   * The colors set.
   * @type {Array.<string>}
   * @const
   * @export
   */
  this.colors = [
    ['red', 'yellow', 'green', 'lightgreen', 'lightblue', 'orange', 'purple'],
    ['#ffffff', '#f7f7f7', '#c3c3c3', '#000000']];

};

app.colorpicker.module.controller('AppColorpickerController',
  app.colorpicker.ColorPickerController);


/**
 * @constructor
 * @param {angular.Scope} $scope Controller scope.
 * @ngInject
 */
app.colorpicker.MainController = function($scope) {

  /**
   * Active color.
   * @type {string}
   * @export
   */
  this.color = 'red';

};


app.colorpicker.module.controller('MainController', app.colorpicker.MainController);
