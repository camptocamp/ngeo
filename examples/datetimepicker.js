/**
 * @module app.datetimepicker
 */
const exports = {};

import './datetimepicker.css';
import ngeoMiscDatetimepickerComponent from 'ngeo/misc/datetimepickerComponent.js';


/** @type {!angular.Module} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMiscDatetimepickerComponent.name,
]);


/**
 * @constructor
 * @ngInject
 */
exports.MainController = function() {

  /**
   * @type {string}
   * @private
   */
  this.date = '2018-01-01';

  /**
   * @type {string}
   * @private
   */
  this.time = '12:00:00';

  /**
   * @type {string}
   * @private
   */
  this.datetime = '2018-01-01 12:00:00';

};


exports.module.controller('MainController', exports.MainController);


export default exports;
