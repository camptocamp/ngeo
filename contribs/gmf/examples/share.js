goog.provide('gmfapp.share');

// webpack: import './share.css';
/** @suppress {extraRequire} */
goog.require('gmf.permalink.shareComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.message.modalComponent');


/** @type {!angular.Module} **/
gmfapp.share.module = angular.module('gmfapp', [
  'gettext',
  ngeo.message.modalComponent.name,
  gmf.permalink.shareComponent.name,
]);

gmfapp.share.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');
gmfapp.share.module.constant('gmfShortenerCreateUrl', 'https://geomapfish-demo.camptocamp.net/2.2/wsgi/short/create');


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
