goog.provide('app.modal');

/** @suppress {extraRequire} */
goog.require('ngeo.message.modalComponent');


/** @type {!angular.Module} **/
app.module = angular.module('app', [
  'ngeo',
  ngeo.message.modalComponent.name,
]);


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
