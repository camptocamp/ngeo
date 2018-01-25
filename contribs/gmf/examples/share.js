goog.provide('gmfapp.share');

// webpack: import './share.css';
// webpack: import './common_dependencies.js';
goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.permalink.shareComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.message.modalComponent');


/** @type {!angular.Module} **/
gmfapp.share.module = angular.module('gmfapp', [
  gmf.module.name,
  ngeo.message.modalComponent.name,
  gmf.permalink.shareComponent.name,
]);

gmfapp.share.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');
gmfapp.share.constant('gmfShortenerCreateUrl', 'https://geomapfish-demo.camptocamp.net/2.2/wsgi/short/create');


/**
 * @constructor
 * @ngInject
 */
gmfapp.share.MainController = function() {

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


gmfapp.share.module.controller('MainController', gmfapp.share.MainController);
