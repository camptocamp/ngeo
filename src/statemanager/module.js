/**
 * @module ngeo.statemanager.module
 */
import angular from 'angular';
import ngeoStatemanagerLocation from 'ngeo/statemanager/Location.js';
import ngeoStatemanagerService from 'ngeo/statemanager/Service.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('ngeoStatemanagerModule', [
  ngeoStatemanagerLocation.module.name,
  ngeoStatemanagerService.module.name
]);
