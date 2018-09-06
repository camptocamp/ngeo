/**
 * @module gmfapp.share
 */
const exports = {};

import './share.css';
/** @suppress {extraRequire} */
import gmfPermalinkShareComponent from 'gmf/permalink/shareComponent.js';

/** @suppress {extraRequire} */
import ngeoMessageModalComponent from 'ngeo/message/modalComponent.js';


/** @type {!angular.Module} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  ngeoMessageModalComponent.name,
  gmfPermalinkShareComponent.name,
]);

exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');
exports.module.constant('gmfShortenerCreateUrl', 'https://geomapfish-demo-dc.camptocamp.com/2.4/wsgi/short/create');


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
