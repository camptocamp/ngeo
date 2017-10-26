goog.provide('gmf.FulltextSearchService');

goog.require('gmf');
goog.require('ngeo.utils');

/**
 * Provides the c2c-geoportal full-text search.
 * @param {angular.$injector} $injector Main injector.
 * @param {angular.$http} $http Angular http service.
 * @constructor
 * @struct
 * @ngInject
 * @export
 * @ngname gmfFulltextSearchService
 */
gmf.FulltextSearchService = function($injector, $http) {

  /**
   * @type {angular.$http}
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

  const queryString = (url.length == 2) ? `?${url[1]}` : '';
  /**
   * @type {Object.<string, string>}
   * @private
   */
  this.defaultParams_ = ngeo.utils.decodeQueryString(queryString);
};

/**
 * Perform a search query on the c2c-geoportal full-text search.
 * @param {string} query Search query.
 * @param {Object.<string, string>} params Additional parameters.
 * @returns {Promise} Request promise with data array.
 */
gmf.FulltextSearchService.prototype.search = function(query, params) {
  const queryParams = Object.assign({}, this.defaultParams_, params);

  queryParams['query'] = query;

  const url = `${this.baseUrl_}?${ngeo.utils.encodeQueryString(queryParams)}`;

  return new Promise((resolve, reject) => {
    this.$http_.get(url)
      .then(resp => resolve(resp['data']))
      .catch(reject);
  });
};

gmf.module.service('gmfFulltextSearchService', gmf.FulltextSearchService);
