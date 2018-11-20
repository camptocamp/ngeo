/**
 * @module ngeo.geolocation.extraModule
 */
import ngeoGeolocationDesktop from 'ngeo/geolocation/desktop.js';
import ngeoGeolocationMobile from 'ngeo/geolocation/mobile.js';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('ngeoGeolocationExtraModule', [
  ngeoGeolocationDesktop.name,
  ngeoGeolocationMobile.name
]);


export default exports;
