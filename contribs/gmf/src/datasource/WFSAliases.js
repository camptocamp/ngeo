/**
 * @module gmf.datasource.WFSAliases
 */
import ngeoDatasourceHelper from 'ngeo/datasource/Helper.js';

const exports = class {

  /**
   * Service that provides methods to get additional information and actions
   * when performing WFS requests.
   *
   * @param {ngeo.datasource.Helper} ngeoDataSourcesHelper Ngeo data
   *     source helper service.
   * @ngdoc service
   * @ngname gmfWFSAliases
   * @ngInject
   */
  constructor(ngeoDataSourcesHelper) {

    // === Injected properties ===

    /**
     * @type {ngeo.datasource.Helper}
     * @private
     */
    this.ngeoDataSourcesHelper_ = ngeoDataSourcesHelper;
  }


  /**
   * @param {ngeo.datasource.OGC} dataSource Data source.
   * @export
   */
  describe(dataSource) {
    // Only QGIS Server supports WFS aliases
    if (dataSource.ogcServerType === 'qgisserver' &&
      dataSource.wfsUrl_ &&
      dataSource.getOGCLayerNames().length == 1 &&
      !dataSource.attributes) {
      // Trigger an additional WFS DescribeFeatureType request to get
      // datasource attributes, including aliases.
      this.ngeoDataSourcesHelper_.getDataSourceAttributes(dataSource);
    }
  }
};


exports.module = angular.module('gmfDatasourceWFSAliases', [
  ngeoDatasourceHelper.module.name,
]);
exports.module.service('gmfWFSAliases', exports);


export default exports;
