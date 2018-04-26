/**
 * @module gmf.datasource.Helper
 */
import gmfEditingEnumerateAttribute from 'gmf/editing/EnumerateAttribute.js';
import ngeoDatasourceHelper from 'ngeo/datasource/Helper.js';
import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import * as olArray from 'ol/array.js';

const exports = class {

  /**
   * A service that provides utility methods to manipulate or get GMF data
   * sources.
   *
   * @struct
   * @param {angular.$q} $q The Angular $q service.
   * @param {gmf.editing.EnumerateAttribute} gmfEnumerateAttribute The Gmf enumerate
   *     attribute service.
   * @param {ngeo.datasource.Helper} ngeoDataSourcesHelper Ngeo data
   *     source helper service.
   * @ngdoc service
   * @ngname gmfDataSourcesHelper
   * @ngInject
   */
  constructor($q, gmfEnumerateAttribute, ngeoDataSourcesHelper) {

    // === Injected properties ===

    /**
     * @type {angular.$q}
     * @private
     */
    this.q_ = $q;

    /**
     * @type {gmf.editing.EnumerateAttribute}
     * @private
     */
    this.gmfEnumerateAttribute_ = gmfEnumerateAttribute;

    /**
     * @type {ngeo.datasource.Helper}
     * @private
     */
    this.ngeoDataSourcesHelper_ = ngeoDataSourcesHelper;


    // === Other properties ===

    /**
     * @type {gmfx.datasource.DataSources}
     * @protected
     */
    this.collection_;

    /**
     * @type {Object.<number, gmf.datasource.OGC>}
     * @protected
     */
    this.cache_;
  }

  /**
   * @return {gmfx.datasource.DataSources} Data sources collection.
   * @export
   */
  get collection() {
    return /** @type {gmfx.datasource.DataSources} */ (
      this.ngeoDataSourcesHelper_.collection
    );
  }

  /**
   * Return a data source using its id.
   * @param {number} id Data source id.
   * @return {?gmf.datasource.OGC} Data source.
   * @export
   */
  getDataSource(id) {
    return /** @type {?gmf.datasource.OGC} */ (
      this.ngeoDataSourcesHelper_.getDataSource(id)
    );
  }

  /**
   * @param {gmf.datasource.OGC} dataSource Filtrable data source.
   * @return {angular.$q.Promise} Promise.
   * @export
   */
  prepareFiltrableDataSource(dataSource) {

    const prepareFiltrableDataSourceDefer = this.q_.defer();

    // (1) Get the attributes. The first time, they will be asynchronously
    //     obtained using a WFS DescribeFeatureType request.
    this.ngeoDataSourcesHelper_.getDataSourceAttributes(
      dataSource
    ).then((attributes) => {
      // (2) The attribute names that are in the `enumeratedAttributes`
      //     metadata are the ones that need to have their values fetched.
      //     Do that once then set the type to SELECT and the choices.
      const meta = dataSource.gmfLayer.metadata || {};
      const enumAttributes = meta.enumeratedAttributes;
      if (enumAttributes && enumAttributes.length) {
        const promises = [];
        for (const attribute of attributes) {
          if (olArray.includes(enumAttributes, attribute.name) &&
             attribute.type !== ngeoFormatAttributeType.SELECT &&
             (!attribute.choices || !attribute.choices.length)) {
            promises.push(
              this.gmfEnumerateAttribute_.getAttributeValues(
                dataSource, attribute.name
              ).then((values) => {
                const choices = values.map(choice => choice.value);
                attribute.type = ngeoFormatAttributeType.SELECT;
                attribute.choices = choices;
              })
            );
          }
        }
        return this.q_.all(promises).then(
          prepareFiltrableDataSourceDefer.resolve(dataSource)
        );
      } else {
        prepareFiltrableDataSourceDefer.resolve(dataSource);
      }
    });

    return prepareFiltrableDataSourceDefer.promise;
  }

};


/**
 * @type {!angular.Module}
 */
exports.module = angular.module('gmfDataSourcesHelper', [
  ngeoDatasourceHelper.module.name,
  gmfEditingEnumerateAttribute.module.name,
]);
exports.module.service('gmfDataSourcesHelper', exports);


export default exports;
