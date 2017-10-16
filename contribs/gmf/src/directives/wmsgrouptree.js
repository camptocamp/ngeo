goog.provide('gmf.wmsgrouptreeComponent');

goog.require('gmf');
goog.require('ngeo.datasource.DataSources');


/**
 * @private
 */
gmf.WmsgrouptreeController = class {

  /**
   * @param {!angular.Scope} $scope Angular scope.
   * @param {!ngeo.datasource.DataSources} ngeoDataSources Ngeo collection of
   *     data sources objects.
   * @private
   * @struct
   * @ngInject
   * @ngdoc controller
   * @ngname GmfWmsgrouptreeController
   */
  constructor($scope, ngeoDataSources) {

    // Binding properties

    /**
     * @type {!ngeo.datasource.WMSGroup}
     * @export
     */
    this.wmsGroup;


    // Injected properties

    /**
     * @type {!angular.Scope}
     * @private
     */
    this.scope_ = $scope;

    /**
     * @type {!ngeo.datasource.DataSources}
     * @private
     */
    this.ngeoDataSources_ = ngeoDataSources;
  }

  /**
   * @return {string} Group uid.
   * @export
   */
  getGroupUid() {
    return `wmsgrouptree-${ol.getUid(this.wmsGroup)}`;
  }

  /**
   * Toggle visibility of the whole WMS Group
   * @export
   */
  toggle() {
    this.wmsGroup.toggleVisibilityState();
  }

  /**
   * Toggle visible property of a data source.
   * @param {ngeo.datasource.OGC} dataSource Data source to toggle the
   * visibility
   * @export
   */
  toggleDataSource(dataSource) {
    dataSource.visible = !dataSource.visible;
  }

  /**
   * Remove all data sources from the `ngeo.DataSources` collection, which
   * will automatically remove them from the WMS Group. The group itself
   * is going to be removed as well, destroying this component in the process.
   * @export
   */
  remove() {
    for (let i = this.wmsGroup.dataSources.length - 1, ii = 0; i >= ii; i--) {
      this.ngeoDataSources_.remove(this.wmsGroup.dataSources[i]);
    }
  }

  /**
   * @param {ngeo.datasource.OGC} dataSource Data source to remove from the
   *     `ngeo.DataSources` collection.
   * @export
   */
  removeDataSource(dataSource) {
    this.ngeoDataSources_.remove(dataSource);
  }
};


gmf.module.component('gmfWmsgrouptree', {
  bindings: {
    'wmsGroup': '<'
  },
  controller: gmf.WmsgrouptreeController,
  templateUrl: () => `${gmf.baseTemplateUrl}/wmsgrouptree.html`
});
