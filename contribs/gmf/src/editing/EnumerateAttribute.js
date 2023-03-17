import angular from 'angular';

/**
 * @hidden
 */
export class EditingEnumerateAttributeService {
  /**
   * The EnumerateAttribute is responsible of fetching all possible of a given
   * attribute of a given data source (gmf layer).
   *
   * @param {angular.IHttpService} $http Angular $http service.
   * @param {string} gmfLayersUrl Url to the GeoMapFish layers service.
   * @ngInject
   * @ngdoc service
   * @ngname gmfEnumerateAttribute
   */
  constructor($http, gmfLayersUrl) {
    // === Injected services ===

    /**
     * @type {angular.IHttpService}
     * @private
     */
    this.http_ = $http;

    /**
     * @type {string}
     * @private
     */
    this.baseUrl_ = gmfLayersUrl;

    /**
     * @type {Object.<string, !angular.IPromise>}
     * @private
     */
    this.promises_ = {};
  }

  /**
   * @param {import("gmf/datasource/OGC.js").default} dataSource Data source.
   * @param {string} attribute Attribute name.
   * @return {angular.IPromise} Promise.
   */
  getAttributeValues(dataSource, attribute) {
    const promiseId = `${dataSource.id}_${attribute}`;
    const name = dataSource.name;
    if (!this.promises_[promiseId]) {
      const url = `${this.baseUrl_}/${name}/values/${attribute}`;
      this.promises_[promiseId] = this.http_.get(url).then(this.handleGetAttributeValues_.bind(this));
    }
    return this.promises_[promiseId];
  }

  /**
   * @param {angular.IHttpResponse} resp Ajax response.
   * @return {Array.<import('gmf/themes.js').GmfLayerAttributeValue>} List of the attribute
   *     values.
   */
  handleGetAttributeValues_(resp) {
    const data = /** @type {import('gmf/themes.js').GmfLayerAttributeValuesResponse} */ (resp.data);
    return data.items;
  }
}

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfEnumerateAttribute', []);
module.service('gmfEnumerateAttribute', EditingEnumerateAttributeService);

export default module;
