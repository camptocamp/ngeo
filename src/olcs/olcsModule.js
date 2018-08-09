/**
 * @module ngeo.olcs.olcsModule
 */
import Service from 'ngeo/olcs/Service.js';
import control from 'ngeo/olcs/controls3d.js';


/**
 * @type {!angular.Module}
 */
const m = angular.module('ngeoOlcsModule', [
  control.name,
  Service.module.name
]);

const exports = m;


export default exports;
