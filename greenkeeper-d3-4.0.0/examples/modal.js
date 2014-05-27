


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @constructor
 */
app.MainController = function() {

  /**
   * @type {boolean}
   * @export
   */
  this.modalShown = false;
};


app.module.controller('MainController', app.MainController);
