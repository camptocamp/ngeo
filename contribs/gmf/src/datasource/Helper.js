import angular from 'angular';
import gmfEditingEnumerateAttribute from 'gmf/editing/EnumerateAttribute.js';
import ngeoDatasourceHelper from 'ngeo/datasource/Helper.js';
import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';

/**
 * @hidden
 */
export class DatasourceHelper {
  /**
   * A service that provides utility methods to manipulate or get GMF data
   * sources.
   *
   * @param {angular.IQService} $q The Angular $q service.
   * @param {import("gmf/editing/EnumerateAttribute.js").EditingEnumerateAttributeService} gmfEnumerateAttribute
   *    The Gmf enumerate attribute service.
   * @param {import("ngeo/datasource/Helper.js").DatasourceHelper} ngeoDataSourcesHelper Ngeo data
   *     source helper service.
   * @ngdoc service
   * @ngname gmfDataSourcesHelper
   * @ngInject
   */
  constructor($q, gmfEnumerateAttribute, ngeoDataSourcesHelper) {
    // === Injected properties ===

    /**
     * @type {angular.IQService}
     * @private
     */
    this.q_ = $q;

    /**
     * @type {import("gmf/editing/EnumerateAttribute.js").EditingEnumerateAttributeService}
     * @private
     */
    this.gmfEnumerateAttribute_ = gmfEnumerateAttribute;

    /**
     * @type {import("ngeo/datasource/Helper.js").DatasourceHelper}
     * @private
     */
    this.ngeoDataSourcesHelper_ = ngeoDataSourcesHelper;

    // === Other properties ===

    /**
     * @type {import('ngeo/datasource/DataSource.js').DataSources}
     * @protected
     */
    this.collection_;

    /**
     * @type {Object.<number, import("gmf/datasource/OGC.js").default>}
     * @protected
     */
    this.cache_;
  }

  /**
   * @return {import('ngeo/datasource/DataSource.js').DataSources} Data sources collection.
   */
  get collection() {
    return /** @type {import('ngeo/datasource/DataSource.js').DataSources} */ (
      this.ngeoDataSourcesHelper_.collection
    );
  }

  /**
   * Return a data source using its id.
   * @param {number} id Data source id.
   * @return {?import("gmf/datasource/OGC.js").default} Data source.
   */
  getDataSource(id) {
    return /** @type {?import("gmf/datasource/OGC.js").default} */ (
      this.ngeoDataSourcesHelper_.getDataSource(id)
    );
  }

  /**
   * @param {import("gmf/datasource/OGC.js").default} dataSource Filtrable data source.
   * @return {angular.IPromise} Promise.
   */
  prepareFiltrableDataSource(dataSource) {
    const prepareFiltrableDataSourceDefer = this.q_.defer();

    // (1) Get the attributes. The first time, they will be asynchronously
    //     obtained using a WFS DescribeFeatureType request.
    this.ngeoDataSourcesHelper_.getDataSourceAttributes(dataSource).then((attributes) => {
      // (2) The attribute names that are in the `enumeratedAttributes`
      //     metadata are the ones that need to have their values fetched.
      //     Do that once then set the type to SELECT and the choices.
      const enumAttributes = dataSource.gmfLayer.metadata
        ? dataSource.gmfLayer.metadata.enumeratedAttributes
        : undefined;
      if (enumAttributes && enumAttributes.length) {
        const promises = [];
        for (const attribute of attributes) {
          if (
            enumAttributes.includes(attribute.name) &&
            attribute.type !== ngeoFormatAttributeType.SELECT &&
            (!attribute.choices || !attribute.choices.length)
          ) {
            promises.push(
              this.gmfEnumerateAttribute_.getAttributeValues(dataSource, attribute.name).then((values) => {
                const choices = values.map((choice) => choice.value);
                attribute.type = ngeoFormatAttributeType.SELECT;
                attribute.choices = choices;
              })
            );
          }
        }
        return this.q_.all(promises).then(() => {
          prepareFiltrableDataSourceDefer.resolve(dataSource);
        });
      } else {
        prepareFiltrableDataSourceDefer.resolve(dataSource);
      }
    });

    return prepareFiltrableDataSourceDefer.promise;
  }
}

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfDataSourcesHelper', [
  ngeoDatasourceHelper.name,
  gmfEditingEnumerateAttribute.name,
]);
module.service('gmfDataSourcesHelper', DatasourceHelper);

export default module;
