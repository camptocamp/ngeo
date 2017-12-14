goog.provide('gmf.WFSAliases');

goog.require('gmf');
goog.require('ngeo.datasource.DataSourcesHelper');


gmf.WFSAliases = class {

  /**
   * Service that provides methods to get additional information and actions
   * when perfoming WFS requests.
   *
   * @struct
   * @param {ngeo.datasource.DataSourcesHelper} ngeoDataSourcesHelper Ngeo data
   *     source helper service.
   * @ngdoc service
   * @ngname gmfWFSAliases
   * @ngInject
   */
  constructor(ngeoDataSourcesHelper) {

    // === Injected properties ===

    /**
     * @type {ngeo.datasource.DataSourcesHelper}
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
    if (dataSource.ogcServerType === 'qgisserver' && !dataSource.attributes) {
      // Trigger an additional WFS DescribeFeatureType request to get
      // datasource attributes, including aliases.
      this.ngeoDataSourcesHelper_.getDataSourceAttributes(dataSource);
    }
  }
};


gmf.module.service('gmfWFSAliases', gmf.WFSAliases);
