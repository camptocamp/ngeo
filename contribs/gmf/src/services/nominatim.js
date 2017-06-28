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

  /**
   * Delay to avoid calling the API too often.
   * Only if there were no calls for that many milliseconds,
   * the last call will be executed.
   * @type {number} delay in ms
   * @private
   */
  this.typeaheadDebounceDelay_ = 500;

  /**
   * Creates and returns a new debounced version of the passed function
   * which will postpone its execution until after wait milliseconds
   * have elapsed since the last time it was invoked
   * @see: http://underscorejs.org/#debounce
   * @param {Function} func Function to execute
   * @param {number} wait Wait that many milliseconds to execute
   * @param {?boolean} immediate True to execute immediately
   * @returns {Function} Debounced version of passed function
   */
  const debounce = function(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  };

  /**
   * @export
   * @type {Function}
   */
  this.typeaheadSourceDebounced = debounce(this.typeaheadSource_.bind(this), this.typeaheadDebounceDelay_);
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

  params = params || {};

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
 * @param {string} query Search query
 * @param {function} syncResults Callback for synchronous execution, unused
 * @param {function} asyncResults Callback for asynchronous execution
 * @private
 */
gmf.NominatimService.prototype.typeaheadSource_ = function(query, syncResults, asyncResults) {
  const onSuccess_ = function(resp) {
    const features = resp.data.map((result) => {
      return {
        coords: [result.lon, result.lat],
        name: result.display_name
      };
    });
    asyncResults(features);
  };

  const onError_ = function(resp) {
    asyncResults([]);
  };

  this.search(query).then(onSuccess_, onError_);
};


gmf.module.service('gmfNominatimService', gmf.NominatimService);
