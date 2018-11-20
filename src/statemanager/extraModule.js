/**
 * @module ngeo.statemanager.extraModule
 */
import ngeoStatemanagerWfsPermalink from 'ngeo/statemanager/WfsPermalink.js';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('ngeoStatemanagerExtraModule', [
  ngeoStatemanagerWfsPermalink.module.name,
]);


export default exports;
