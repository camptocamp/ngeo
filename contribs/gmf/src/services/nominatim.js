goog.provide('gmf.NominatimService');

goog.require('gmf');

/**
 * Service to provide access to Nominatim, which allows to search for
 * OSM data by name and address.
 * @param {angular.$http} $http Angular http service.
 * @param {angular.$injector} $injector Main injector.
 * @constructor
 * @struct
 * @ngInject
 * @export
 * @ngname gmfNominatimService
 * @see https://wiki.openstreetmap.org/wiki/Nominatim
 */
gmf.NominatimService = function($http, $injector) {

  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;

  /**
   * URL for Nominatim backend
   * Defaults openstreetmap instance.
   * @type {string}
   * @private
   */
  this.nominatimUrl_ = 'http://nominatim.openstreetmap.org/';

  if ($injector.has('gmfNominatimUrl')) {
    this.nominatimUrl_ = $injector.get('gmfNominatimUrl');

    // the url is expected to end with a slash
    if (this.nominatimUrl_.substr(-1) !== '/') {
      this.nominatimUrl_ += '/';
    }
  }

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

  // require JSON response
  params['format'] = 'json';

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

gmf.module.service('gmfNominatimService', gmf.NominatimService);
