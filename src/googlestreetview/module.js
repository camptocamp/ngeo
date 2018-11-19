/**
 * @module ngeo.googlestreetview.module
 */
import ngeoGooglestreetviewComponent from 'ngeo/googlestreetview/component.js';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('ngeoGooglestreetviewModule', [
  ngeoGooglestreetviewComponent.name
]);


export default exports;
