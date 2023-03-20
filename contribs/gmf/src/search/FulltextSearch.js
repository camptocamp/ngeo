import angular from 'angular';
import {encodeQueryString, decodeQueryString} from 'ngeo/utils.js';

/**
 * Provides the c2c-geoportal full-text search.
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @param {angular.IHttpService} $http Angular http service.
 * @constructor
 * @ngInject
 * @ngname gmfFulltextSearch
 * @hidden
 */
export function FulltextSearchService($injector, $http) {
  /**
   * @type {angular.IHttpService}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {string}
   * @private
   */
  this.url_ = /** @type {string} **/ ($injector.get('fulltextsearchUrl'));

  const url = this.url_.split('?');
  /**
   * @type {string}
   * @private
   */
  this.baseUrl_ = url[0];

  const queryString = url.length == 2 ? `?${url[1]}` : '';
  /**
   * @type {Object.<string, string>}
   * @private
   */
  this.defaultParams_ = decodeQueryString(queryString);
}

/**
 * Perform a search query on the c2c-geoportal full-text search.
 * @param {string} query Search query.
 * @param {Object.<string, string>} params Additional parameters.
 * @returns {Promise} Request promise with data array.
 */
FulltextSearchService.prototype.search = function (query, params) {
  const queryParams = Object.assign({}, this.defaultParams_, params);

  queryParams['query'] = query;

  const url = `${this.baseUrl_}?${encodeQueryString(queryParams)}`;

  return new Promise((resolve, reject) => {
    this.$http_
      .get(url)
      .then((resp) => resolve(resp['data']))
      .catch(reject);
  });
};

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfSearchFulltextSearch', []);
module.service('gmfSearchFulltextSearch', FulltextSearchService);

export default module;
