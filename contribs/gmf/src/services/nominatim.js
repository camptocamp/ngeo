goog.provide('gmf.NominatimService');

goog.require('gmf');

/**
 * Service to provide access to Nominatim, which allows to search for
 * OSM data by name and address.
 * @param {angular.$http} $http Angular http service.
 * @constructor
 * @struct
 * @ngInject
 * @export
 * @ngname gmfNominatimService
 * @see https://wiki.openstreetmap.org/wiki/Nominatim
 */
gmf.NominatimService = function($http) {

  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {string}
   * @private
   */
  this.nominatimUrl_ = 'http://nominatim.openstreetmap.org/';

};

/**
 * Search by name
 * @param {string} query Search query
 * @param {?Object} params Optional parameters
 * @return {!angular.$http.HttpPromise} promise of the Nominatim API request
 * @see https://wiki.openstreetmap.org/wiki/Nominatim#Search
 * @export
 */
gmf.NominatimService.prototype.search = function(query, params) {
  let url = `${this.nominatimUrl_}/search?q=${query}`;

  if (params) {
    url += '&';
    const options = [];
    for (const option of Object.keys(params)) {
      options.push(`${option}=${params[option]}`);
    }
    url += options.join('&');
  }

  return this.$http_.get(url);
};
