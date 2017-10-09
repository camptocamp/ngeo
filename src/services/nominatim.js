goog.provide('ngeo.NominatimService');

goog.require('ngeo');
goog.require('ngeo.Debounce');

/**
 * Service to provide access to Nominatim, which allows to search for
 * OSM data by name and address.
 * @param {angular.$http} $http Angular http service.
 * @param {angular.$injector} $injector Main injector.
 * @param {ngeo.Debounce} ngeoDebounce ngeo Debounce service.
 * @constructor
 * @struct
 * @ngInject
 * @export
 * @ngname ngeoNominatimService
 * @see https://wiki.openstreetmap.org/wiki/Nominatim
 */
ngeo.NominatimService = function($http, $injector, ngeoDebounce) {

  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {ngeo.Debounce}
   * @private
   */
  this.ngeoDebounce_ = ngeoDebounce;

  /**
   * URL for Nominatim backend
   * Defaults openstreetmap instance.
   * @type {string}
   * @private
   */
  this.nominatimUrl_ = 'http://nominatim.openstreetmap.org/';

  if ($injector.has('ngeoNominatimUrl')) {
    this.nominatimUrl_ = $injector.get('ngeoNominatimUrl');

    // the url is expected to end with a slash
    if (this.nominatimUrl_.substr(-1) !== '/') {
      this.nominatimUrl_ += '/';
    }
  }

  /**
   * @type {Object<string, string>}
   * @export
   */
  this.searchDefaultParams = {}; // FIXME should not be shared if different instances use the search; remove?

  /**
   * @type {Object<string, string>}
   * @export
   */
  this.reverseDefaultParams = {}; // FIXME should not be shared if different instances use the search; remove?

  /**
   * Delay to avoid calling the API too often.
   * Only if there were no calls for that many milliseconds,
   * the last call will be executed.
   * @type {number} delay in ms
   * @private
   */
  this.typeaheadDebounceDelay_ = 500;

  /**
   * @export
   * @type {function(string,function(Array.<BloodhoundDatum>),(function(Array.<ol.Feature>)|undefined))}
   */
  this.typeaheadSourceDebounced =
    /** @type{function(string,function(Array.<BloodhoundDatum>),(function(Array.<ol.Feature>)|undefined))} */
    (this.ngeoDebounce_(/** @type {function(?)} */ (this.typeaheadSource_.bind(this)), this.typeaheadDebounceDelay_, true));
};

/**
 * Search by name
 * @param {string} query Search query
 * @param {?Object} params Optional parameters
 * @return {!angular.$http.HttpPromise} promise of the Nominatim API request
 * @see https://wiki.openstreetmap.org/wiki/Nominatim#Search
 * @export
 */
ngeo.NominatimService.prototype.search = function(query, params) {
  let url = `${this.nominatimUrl_}search?q=${query}`;

  params = params || {};
  params = Object.assign({}, this.searchDefaultParams, params);

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

/**
 * Reverse Geocoding
 * @param {ol.Coordinate} coordinate Search coordinate in LonLat projection
 * @param {(Object|undefined)} params Optional parameters
 * @return {!angular.$http.HttpPromise} promise of the Nominatim API request
 * @see https://wiki.openstreetmap.org/wiki/Nominatim#Reverse_Geocoding
 * @export
 */
ngeo.NominatimService.prototype.reverse = function(coordinate, params) {
  let url = `${this.nominatimUrl_}reverse`;

  params = Object.assign({}, this.reverseDefaultParams, params);

  // coordinate
  params['lon'] = coordinate[0];
  params['lat'] = coordinate[1];

  // require JSON response
  params['format'] = 'json';

  if (params) {
    url += '?';
    const options = [];
    for (const option of Object.keys(params)) {
      options.push(`${option}=${params[option]}`);
    }
    url += options.join('&');
  }

  return this.$http_.get(url);
};

/**
 * @param {string} query Search query
 * @param {function(Array.<BloodhoundDatum>)} syncResults Callback for synchronous execution, unused
 * @param {function(Array.<ngeox.NominatimSearchResult>)} asyncResults Callback for asynchronous execution
 * @private
 */
ngeo.NominatimService.prototype.typeaheadSource_ = function(query, syncResults, asyncResults) {
  const onSuccess_ = function(resp) {
    /**
     * Parses result response.
     * @param {ngeox.NominatimSearchResponseResult} result Result
     * @return {ngeox.NominatimSearchResult} Parsed result
     */
    const parse = function(result) {
      return /** @type{ngeox.NominatimSearchResult} */({
        coordinate: [result.lon, result.lat],
        name: result.display_name
      });
    };
    asyncResults(resp.data.map(parse));
  };

  const onError_ = function(resp) {
    asyncResults([]);
  };

  this.search(query, {}).then(onSuccess_, onError_);
};


ngeo.module.service('ngeoNominatimService', ngeo.NominatimService);
