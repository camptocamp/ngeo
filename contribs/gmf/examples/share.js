/**
 */

import angular from 'angular';
import appURL from './url.js';
import './share.css';
import gmfPermalinkShareComponent from 'gmf/permalink/shareComponent.js';

import ngeoMessageModalComponent from 'ngeo/message/modalComponent.js';


/** @type {!angular.IModule} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  ngeoMessageModalComponent.name,
  gmfPermalinkShareComponent.name,
]);

exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');
exports.module.constant('gmfShortenerCreateUrl', appURL.SHORT_CREATE);


/**
 * @constructor
 * @ngInject
 */
exports.MainController = function() {

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

};


exports.module.controller('MainController', exports.MainController);


export default exports;
