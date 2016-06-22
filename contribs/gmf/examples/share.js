goog.provide('gmf-share');

goog.require('gmf.shareDirective');
goog.require('ngeo.modalDirective');
goog.require('ngeo.Location');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


/**
 * @constructor
 */
app.MainController = function() {


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


app.module.controller('MainController', app.MainController);
