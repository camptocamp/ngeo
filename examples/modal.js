goog.provide('app.modal');

/** @suppress {extraRequire} */
goog.require('ngeo.modalDirective');


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @constructor
 * @ngInject
 */
app.MainController = function() {

  /**
   * @type {boolean}
   * @export
   */
  this.modalShown = false;
};


app.module.controller('MainController', app.MainController);
