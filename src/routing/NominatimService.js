// The MIT License (MIT)
//
// Copyright (c) 2018-2020 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import ngeoMiscDebounce from 'ngeo/misc/debounce.js';

/**
 * @typedef {Object} NominatimSearchResult
 * @property {string} name
 * @property {string} [label]
 * @property {Array<string>} coordinate
 */

/**
 * @typedef {Object} NominatimSearchResponseResult
 * @property {string} display_name
 * @property {string} lon
 * @property {string} lat
 */

/**
 * Service to provide access to Nominatim, which allows to search for
 * OSM data by name and address.
 * @param {angular.IHttpService} $http Angular http service.
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @param {import("ngeo/misc/debounce.js").miscDebounce<function(string, function(Object[]): void, (function(NominatimSearchResult[]): void)|undefined): void>}  ngeoDebounce
 *    ngeo Debounce service.
 * @constructor
 * @ngdoc service
 * @ngInject
 * @ngname ngeoNominatimService
 * @see https://wiki.openstreetmap.org/wiki/Nominatim
 * @hidden
 */
export function NominatimService($http, $injector, ngeoDebounce) {
  /**
   * @type {angular.IHttpService}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {import("ngeo/misc/debounce.js").miscDebounce<function(string, function(Object[]): void, (function(NominatimSearchResult[]): void)|undefined): void>}
   * @private
   */
  this.ngeoDebounce_ = ngeoDebounce;

  /**
   * URL for Nominatim backend
   * Defaults openstreetmap instance.
   * @type {string}
   * @private
   */
  this.nominatimUrl_ = 'https://nominatim.openstreetmap.org/';

  if ($injector.has('ngeoNominatimUrl')) {
    this.nominatimUrl_ = $injector.get('ngeoNominatimUrl');

    // the url is expected to end with a slash
    if (this.nominatimUrl_.substr(-1) !== '/') {
      this.nominatimUrl_ += '/';
    }
  }

  /**
   * @type {import('ngeo/options.js').ngeoNominatimSearchDefaultParams}
   * @private
   */
  this.searchDefaultParams_ = {};

  if ($injector.has('ngeoNominatimSearchDefaultParams')) {
    this.searchDefaultParams_ = $injector.get('ngeoNominatimSearchDefaultParams');
  }

  /**
   * Delay (in milliseconds) to avoid calling the API too often.
   * Only if there were no calls for that many milliseconds,
   * the last call will be executed.
   * @type {number}
   * @private
   */
  this.typeaheadDebounceDelay_ = 500;

  /**
   * @type {(query: string, syncResults: (result: NominatimSearchResult[]) => void, asyncResults?: ((result: NominatimSearchResult[]) => void) | undefined) => void}
   */
  this.typeaheadSourceDebounced = this.ngeoDebounce_(
    this.typeaheadSource_.bind(this),
    this.typeaheadDebounceDelay_,
    true
  );
}

/**
 * Search by name
 * @param {string} query Search query
 * @param {?Object} params Optional parameters
 * @return {angular.IHttpPromise<Object>} promise of the Nominatim API request
 * @see https://wiki.openstreetmap.org/wiki/Nominatim#Search
 */
NominatimService.prototype.search = function (query, params) {
  let url = `${this.nominatimUrl_}search?q=${query}`;

  params = params || {};
  params = Object.assign({}, this.searchDefaultParams_, params);

  // require JSON response
  params.format = 'json';

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
 * @param {import("ol/coordinate.js").Coordinate} coordinate Search coordinate in LonLat projection
 * @param {(Object|undefined)} params Optional parameters
 * @return {angular.IHttpPromise<Object>} promise of the Nominatim API request
 * @see https://wiki.openstreetmap.org/wiki/Nominatim#Reverse_Geocoding
 */
NominatimService.prototype.reverse = function (coordinate, params) {
  let url = `${this.nominatimUrl_}reverse`;

  params = Object.assign({}, params);

  // coordinate
  params.lon = coordinate[0];
  params.lat = coordinate[1];

  // require JSON response
  params.format = 'json';

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
 * @param {(result: NominatimSearchResult[]) => void} syncResults Callback for synchronous execution, unused
 * @param {(result: NominatimSearchResult[]) => void} [asyncResults] Callback for asynchronous execution
 * @return {void}
 * @private
 */
NominatimService.prototype.typeaheadSource_ = function (query, syncResults, asyncResults) {
  /**
   * @param {angular.IHttpResponse<NominatimSearchResponseResult[]>} resp
   */
  const onSuccess_ = function (resp) {
    /**
     * Parses result response.
     * @param {NominatimSearchResponseResult} result Result
     * @return {NominatimSearchResult} Parsed result
     */
    const parse = function (result) {
      return {
        coordinate: [result.lon, result.lat],
        name: result.display_name,
      };
    };
    if (asyncResults) {
      asyncResults(resp.data.map(parse));
    } else {
      syncResults(resp.data.map(parse));
    }
  };

  /**
   * @param {angular.IHttpResponse<NominatimSearchResponseResult>} resp
   */
  const onError_ = function (resp) {
    if (asyncResults) {
      asyncResults([]);
    } else {
      syncResults([]);
    }
  };

  this.search(query, {}).then(onSuccess_, onError_);
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoNominatimService', [ngeoMiscDebounce.name]);

module.service('ngeoNominatimService', NominatimService);

export default module;
