/**
 */
import angular from 'angular';
import ngeoGeolocationMobile from 'ngeo/geolocation/mobile.js';

/**
 * @type {angular.IModule}
 */
export default angular.module('ngeoGeolocationExtraModule', [
  ngeoGeolocationMobile.name
]);
