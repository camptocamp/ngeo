


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * The application-specific color picker directive, based on the
 * ngeo-colorpicker directive.
 *
 * @return {angular.Directive} Directive Definition Object.
 */
app.colorpickerDirective = function() {
  return {
    restrict: 'E',
    scope: true,
    template: '<div ngeo-colorpicker="ctrl.colors" ngeo-colorpicker-color="mainCtrl.color"></div>',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: 'AppColorpickerController'
  };
};


app.module.directive('appColorpicker', app.colorpickerDirective);


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
    ['red', 'yellow','green', 'lightgreen', 'lightblue', 'orange', 'purple'],
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
