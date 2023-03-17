import angular from 'angular';
import ngeoDatasourceHelper from 'ngeo/datasource/Helper.js';
import {ServerType} from 'ngeo/datasource/OGC.js';

/**
 * @hidden
 */
export class DatasourceWFSAlias {
  /**
   * Service that provides methods to get additional information and actions
   * when performing WFS requests.
   *
   * @param {import("ngeo/datasource/Helper.js").DatasourceHelper} ngeoDataSourcesHelper Ngeo data
   *     source helper service.
   * @ngdoc service
   * @ngname gmfWFSAliases
   * @ngInject
   */
  constructor(ngeoDataSourcesHelper) {
    // === Injected properties ===

    /**
     * @type {import("ngeo/datasource/Helper.js").DatasourceHelper}
     * @private
     */
    this.ngeoDataSourcesHelper_ = ngeoDataSourcesHelper;
  }

  /**
   * @param {import("ngeo/datasource/OGC.js").default} dataSource Data source.
   */
  describe(dataSource) {
    // Only QGIS Server supports WFS aliases
    if (
      dataSource.ogcServerType === ServerType.QGISSERVER &&
      dataSource.wfsUrl_ &&
      dataSource.getWFSLayerNames().length == 1 &&
      !dataSource.attributes
    ) {
      // Trigger an additional WFS DescribeFeatureType request to get
      // datasource attributes, including aliases.
      this.ngeoDataSourcesHelper_.getDataSourceAttributes(dataSource);
    }
  }
}

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfDatasourceWFSAliases', [ngeoDatasourceHelper.name]);
module.service('gmfWFSAliases', DatasourceWFSAlias);

export default module;
