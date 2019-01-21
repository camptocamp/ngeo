import angular from 'angular';
import gmfEditingEnumerateAttribute from 'gmf/editing/EnumerateAttribute.js';
import ngeoDatasourceHelper from 'ngeo/datasource/Helper.js';
import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';

class Helper {

  /**
   * A service that provides utility methods to manipulate or get GMF data
   * sources.
   *
   * @param {angular.IQService} $q The Angular $q service.
   * @param {import("gmf/editing/EnumerateAttribute.js").default} gmfEnumerateAttribute The Gmf enumerate
   *     attribute service.
   * @param {import("ngeo/datasource/Helper.js").default} ngeoDataSourcesHelper Ngeo data
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
     * @type {import("gmf/editing/EnumerateAttribute.js").default}
     * @private
     */
    this.gmfEnumerateAttribute_ = gmfEnumerateAttribute;

    /**
     * @type {import("ngeo/datasource/Helper.js").default}
     * @private
     */
    this.ngeoDataSourcesHelper_ = ngeoDataSourcesHelper;


    // === Other properties ===

    /**
     * @type {DataSources}
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
   * @return {DataSources} Data sources collection.
   * @export
   */
  get collection() {
    return /** @type {DataSources} */ (
      this.ngeoDataSourcesHelper_.collection
    );
  }

  /**
   * Return a data source using its id.
   * @param {number} id Data source id.
   * @return {?import("gmf/datasource/OGC.js").default} Data source.
   * @export
   */
  getDataSource(id) {
    return /** @type {?import("gmf/datasource/OGC.js").default} */ (
      this.ngeoDataSourcesHelper_.getDataSource(id)
    );
  }

  /**
   * @param {import("gmf/datasource/OGC.js").default} dataSource Filtrable data source.
   * @return {angular.IPromise} Promise.
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
          if (enumAttributes.includes(attribute.name) &&
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

}


/**
 * @type {!angular.IModule}
 */
const module = angular.module('gmfDataSourcesHelper', [
  ngeoDatasourceHelper.name,
  gmfEditingEnumerateAttribute.name,
]);
module.service('gmfDataSourcesHelper', Helper);


export default module;
