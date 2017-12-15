goog.provide('app.colorpicker');

/** @suppress {extraRequire} */
goog.require('ngeo.colorpickerDirective');

/** @type {!angular.Module} **/
app.module = angular.module('app', [
  ngeo.module.name
]);


/**
 * The application-specific color picker component, based on the
 * ngeo-colorpicker component.
 *
 * @type {!angular.Component}
 */
app.colorpickerComponent = {
  template: '<div ngeo-colorpicker="ctrl.colors" ngeo-colorpicker-color="mainCtrl.color"></div>',
  controller: 'AppColorpickerController',
  controllerAs: 'ctrl'
};


app.module.component('appColorpicker', app.colorpickerComponent);


/**
 * @constructor
 * @ngInject
 */
app.ColorPickerController = function() {


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

app.module.controller('AppColorpickerController',
  app.ColorPickerController);


/**
 * @constructor
 * @param {angular.Scope} $scope Controller scope.
 * @ngInject
 */
app.MainController = function($scope) {

  /**
   * Active color.
   * @type {string}
   * @export
   */
  this.color = 'red';

};


app.module.controller('MainController', app.MainController);
