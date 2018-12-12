/**
 * @module app.modal
 */
const exports = {};

import './modal.css';
import ngeoMessageModalComponent from 'ngeo/message/modalComponent.js';


/** @type {!angular.IModule} **/
exports.module = angular.module('app', [
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


exports.module.controller('MainController', exports.MainController);


export default exports;
