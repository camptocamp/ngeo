/**
 */

import angular from 'angular';
import appURL from './url.js';
import './share.css';
import gmfPermalinkShareComponent from 'gmf/permalink/shareComponent.js';

import ngeoMessageModalComponent from 'ngeo/message/modalComponent.js';


/** @type {!angular.IModule} **/
const module = angular.module('gmfapp', [
  'gettext',
  ngeoMessageModalComponent.name,
  gmfPermalinkShareComponent.name,
]);

module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');
module.constant('gmfShortenerCreateUrl', appURL.SHORT_CREATE);


/**
 * @constructor
 * @ngInject
 */
function MainController() {

  /**
   * Model attached to the modal to toggle it
   * @type {boolean}
   * @export
   */
  this.modalShareWithEmailShown = false;

  /**
   * Model attached to the modal to toggle it
   * @type {boolean}
   * @export
   */
  this.modalShareShown = false;

}


module.controller('MainController', MainController);


export default module;
