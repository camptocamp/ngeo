/**
 * @module ngeo.statemanager.module
 */
import ngeoStatemanagerLocation from 'ngeo/statemanager/Location.js';
import ngeoStatemanagerService from 'ngeo/statemanager/Service.js';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('ngeoStatemanagerModule', [
  ngeoStatemanagerLocation.module.name,
  ngeoStatemanagerService.module.name
]);


export default exports;
