/**
 */

import './colorpicker.css';
import angular from 'angular';
import ngeoMiscColorpickerComponent from 'ngeo/misc/colorpickerComponent.js';

/** @type {!angular.IModule} **/
const module = angular.module('app', [
  'gettext',
  ngeoMiscColorpickerComponent.name,
]);


/**
 * The application-specific color picker component, based on the
 * ngeo-colorpicker component.
 *
 * @type {!angular.IComponentOptions}
 */
exports.colorpickerComponent = {
  template: '<div ngeo-colorpicker="$ctrl.colors" ngeo-colorpicker-color="mainCtrl.color"></div>',
  controller: 'AppColorpickerController'
};


module.component('appColorpicker', exports.colorpickerComponent);


/**
 * @constructor
 * @ngInject
 */
function ColorPickerController() {


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

module.controller('AppColorpickerController',
  exports.ColorPickerController);


/**
 * @constructor
 * @param {angular.IScope} $scope Controller scope.
 * @ngInject
 */
function MainController($scope) {

  /**
   * Active color.
   * @type {string}
   * @export
   */
  this.color = 'red';

};


module.controller('MainController', exports.MainController);


export default module;
