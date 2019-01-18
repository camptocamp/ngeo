/**
 */
import angular from 'angular';
import Service from 'ngeo/olcs/Service.js';
import control from 'ngeo/olcs/controls3d.js';


/**
 * @type {!angular.IModule}
 */
const m = angular.module('ngeoOlcsModule', [
  control.name,
  Service.name
]);

const exports = m;


export default module;
