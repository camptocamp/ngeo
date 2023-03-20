/**
 */

import './modal.css';
import angular from 'angular';
import ngeoMessageModalComponent from 'ngeo/message/modalComponent.js';

/** @type {!angular.IModule} **/
const module = angular.module('app', ['gettext', ngeoMessageModalComponent.name]);

/**
 * @constructor
 * @ngInject
 */
function MainController() {
  /**
   * @type {boolean}
   */
  this.modalShown = false;
}

module.controller('MainController', MainController);

export default module;
