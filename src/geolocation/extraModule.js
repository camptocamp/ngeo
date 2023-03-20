/**
 */
import angular from 'angular';
import ngeoGeolocationDesktop from 'ngeo/geolocation/desktop.js';
import ngeoGeolocationMobile from 'ngeo/geolocation/mobile.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('ngeoGeolocationExtraModule', [
  ngeoGeolocationDesktop.name,
  ngeoGeolocationMobile.name,
]);
