goog.provide('gmf.EnumerateAttribute');

goog.require('gmf');


gmf.EnumerateAttribute = class {

  /**
   * The EnumerateAttribute is responsible of fetching all possible of a given
   * attribute of a given data source (gmf layer).
   *
   * @struct
   * @param {angular.$http} $http Angular $http service.
   * @param {string} gmfLayersUrl Url to the GeoMapFish layers service.
   * @ngInject
   * @ngdoc service
   * @ngname gmfEnumerateAttribute
   */
  constructor($http, gmfLayersUrl) {

    // === Injected services ===

    /**
     * @type {angular.$http}
     * @private
     */
    this.http_ = $http;

    /**
     * @type {string}
     * @private
     */
    this.baseUrl_ = gmfLayersUrl;

    /**
     * @type {Object.<number, Object<string, !angular.$q.Promise>>}
     * @private
     */
    this.promises_ = {};
  }

  /**
   * @param {gmf.DataSource} dataSource Data source.
   * @param {string} attribute Attribute name.
   * @return {angular.$q.Promise} Promise.
   */
  getAttributeValues(dataSource, attribute) {
    const id = dataSource.id;
    const name = dataSource.name;
    if (!this.promises_[id]) {
      this.promises_[id] = {};
    }
    if (!this.promises_[id][attribute]) {
      const url = `${this.baseUrl_}/${name}/values/${attribute}`;
      this.promises_[id][attribute] = this.http_.get(url).then(
        this.handleGetAttributeValues_.bind(this));
    }
    return this.promises_[id][attribute];
  }

  /**
   * @param {angular.$http.Response} resp Ajax response.
   * @return {Array.<gmfThemes.GmfLayerAttributeValue>} List of the attribute
   *     values.
   * @export
   */
  handleGetAttributeValues_(resp) {
    const data = /** @type {gmfThemes.GmfLayerAttributeValuesResponse} */ (
      resp.data);
    return data.items;
  }

};


gmf.module.service('gmfEnumerateAttribute', gmf.EnumerateAttribute);
