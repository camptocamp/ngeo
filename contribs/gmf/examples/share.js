goog.provide('gmfapp.share');

/** @suppress {extraRequire} */
goog.require('gmf.permalink.shareComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.message.modalComponent');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', [
  gmf.module.name,
  ngeo.message.modalComponent.name,
  gmf.permalink.shareComponent.name,
]);


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
