/**
 */

import './modal.css';
import angular from 'angular';
import ngeoMessageModalComponent from 'ngeo/message/modalComponent.js';


/** @type {!angular.IModule} **/
const module = angular.module('app', [
  'gettext',
  ngeoMessageModalComponent.name,
]);


/**
 * @constructor
 * @ngInject
 */
exports.MainController = function() {

  /**
   * @type {boolean}
   * @export
   */
  this.modalShown = false;
};


module.controller('MainController', exports.MainController);


export default module;
