import angular from 'angular';
import ngeoSearchSearchDirective from 'ngeo/search/searchDirective.js';
import ngeoSearchCreateGeoJSONBloodhound from 'ngeo/search/createGeoJSONBloodhound.js';
import ngeoSearchCreateLocationSearchBloodhound from 'ngeo/search/createLocationSearchBloodhound.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('ngeoSearchModule', [
  ngeoSearchSearchDirective.name,
  ngeoSearchCreateGeoJSONBloodhound.name,
  ngeoSearchCreateLocationSearchBloodhound.name,
]);
