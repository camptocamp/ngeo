/**
 */
import angular from 'angular';
import ngeoDatasourceHelper from 'ngeo/datasource/Helper.js';
import {ServerType} from 'ngeo/datasource/OGC.js';

const exports = class {

  /**
   * Service that provides methods to get additional information and actions
   * when performing WFS requests.
   *
   * @param {import("ngeo/datasource/Helper.js").default} ngeoDataSourcesHelper Ngeo data
   *     source helper service.
   * @ngdoc service
   * @ngname gmfWFSAliases
   * @ngInject
   */
  constructor(ngeoDataSourcesHelper) {

    // === Injected properties ===

    /**
     * @type {import("ngeo/datasource/Helper.js").default}
     * @private
     */
    this.ngeoDataSourcesHelper_ = ngeoDataSourcesHelper;
  }


  /**
   * @param {import("ngeo/datasource/OGC.js").default} dataSource Data source.
   * @export
   */
  describe(dataSource) {
    // Only QGIS Server supports WFS aliases
    if (dataSource.ogcServerType === ServerType.QGISSERVER &&
      dataSource.wfsUrl_ &&
      dataSource.getOGCLayerNames().length == 1 &&
      !dataSource.attributes) {
      // Trigger an additional WFS DescribeFeatureType request to get
      // datasource attributes, including aliases.
      this.ngeoDataSourcesHelper_.getDataSourceAttributes(dataSource);
    }
  }
};


const module = angular.module('gmfDatasourceWFSAliases', [
  ngeoDatasourceHelper.name,
]);
module.service('gmfWFSAliases', exports);


export default exports;
