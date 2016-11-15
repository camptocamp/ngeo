goog.provide('gmfapp.share');

/** @suppress {extraRequire} */
goog.require('gmf.shareDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.modalDirective');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', ['gmf']);


/**
 * @constructor
 * @ngInject
 */
gmfapp.MainController = function() {

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


gmfapp.module.controller('MainController', gmfapp.MainController);
