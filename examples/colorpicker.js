/**
 */
const exports = {};

import './colorpicker.css';
import angular from 'angular';
import ngeoMiscColorpickerComponent from 'ngeo/misc/colorpickerComponent.js';

/** @type {!angular.IModule} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMiscColorpickerComponent.name,
]);


/**
 * The application-specific color picker component, based on the
 * ngeo-colorpicker component.
 *
 * @type {!angular.Component}
 */
exports.colorpickerComponent = {
  template: '<div ngeo-colorpicker="$ctrl.colors" ngeo-colorpicker-color="mainCtrl.color"></div>',
  controller: 'AppColorpickerController'
};


exports.module.component('appColorpicker', exports.colorpickerComponent);


/**
 * @constructor
 * @ngInject
 */
exports.ColorPickerController = function() {


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

exports.module.controller('AppColorpickerController',
  exports.ColorPickerController);


/**
 * @constructor
 * @param {angular.IScope} $scope Controller scope.
 * @ngInject
 */
exports.MainController = function($scope) {

  /**
   * Active color.
   * @type {string}
   * @export
   */
  this.color = 'red';

};


exports.module.controller('MainController', exports.MainController);


export default exports;
