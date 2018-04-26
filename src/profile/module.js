/**
 * @module ngeo.profile.module
 */
import ngeoProfileElevationComponent from 'ngeo/profile/elevationComponent.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoProfileModule', [
  ngeoProfileElevationComponent.name,
]);


export default exports;
