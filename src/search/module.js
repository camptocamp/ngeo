/**
 * @module ngeo.search.module
 */
import ngeoSearchSearchDirective from 'ngeo/search/searchDirective.js';
import ngeoSearchCreateGeoJSONBloodhound from 'ngeo/search/createGeoJSONBloodhound.js';
import ngeoSearchCreateLocationSearchBloodhound from 'ngeo/search/createLocationSearchBloodhound.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoSearchModule', [
  ngeoSearchSearchDirective.module.name,
  ngeoSearchCreateGeoJSONBloodhound.module.name,
  ngeoSearchCreateLocationSearchBloodhound.module.name
]);


export default exports;
