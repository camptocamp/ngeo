goog.provide('gmf.layertree.datasourceGroupTreeComponent');

goog.require('gmf'); // nowebpack
goog.require('ngeo.datasource.DataSources');
goog.require('ol');


/**
 * @type {!angular.Module}
 */
gmf.layertree.datasourceGroupTreeComponent = angular.module('gmfLayertreeDatasourceGroupTreeComponent', [
  ngeo.datasource.DataSources.module.name,
]);


// webpack: exports.run(/* @ngInject */ ($templateCache) => {
// webpack:   $templateCache.put('gmf/layertree/datasourceGroupTreeComponent', require('./datasourceGroupTreeComponent.html'));
// webpack: });


gmf.layertree.datasourceGroupTreeComponent.value('gmfLayertreeDatasourceGroupTreeTemplateUrl',
  /**
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['gmfLayertreeDatasourceGroupTreeTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      `${gmf.baseModuleTemplateUrl}/layertree/datasourceGroupTreeComponent.html`; // nowebpack
    // webpack: 'gmf/layertree/datasourceGroupTreeComponent';
  });


/**
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.Attributes): string} gmfLayertreeDatasourceGroupTreeTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfLayertreeDatasourceGroupTreeTemplateUrl($attrs, gmfLayertreeDatasourceGroupTreeTemplateUrl) {
  return gmfLayertreeDatasourceGroupTreeTemplateUrl($attrs);
}

/**
 * @private
 */
gmf.layertree.datasourceGroupTreeComponent.Controller_ = class {

  /**
   * @param {!angular.Scope} $scope Angular scope.
   * @param {!ngeo.datasource.DataSources} ngeoDataSources Ngeo data sources
   *     service.
   * @private
   * @struct
   * @ngInject
   * @ngdoc controller
   * @ngname GmfDatasourcegrouptreeController
   */
  constructor($scope, ngeoDataSources) {

    // Binding properties

    /**
     * @type {!ngeo.datasource.Group}
     * @export
     */
    this.group;


    // Injected properties

    /**
     * @type {!angular.Scope}
     * @private
     */
    this.scope_ = $scope;

    /**
     * @type {!ngeox.datasource.DataSources}
     * @private
     */
    this.dataSources_ = ngeoDataSources.collection;
  }

  /**
   * @return {string} Group uid.
   * @export
   */
  getGroupUid() {
    return `datasourcegrouptree-${ol.getUid(this.group)}`;
  }

  /**
   * Toggle visibility of the group itself, i.e. its visibility state.
   * @export
   */
  toggle() {
    this.group.toggleVisibilityState();
  }

  /**
   * Toggle visible property of a data source.
   * @param {ngeo.datasource.DataSource} dataSource Data source to toggle the
   * visibility
   * @export
   */
  toggleDataSource(dataSource) {
    dataSource.visible = !dataSource.visible;
  }

  /**
   * Remove all data sources from the `ngeo.datasource.DataSources` collection, which
   * will automatically remove them from the Group. The group itself
   * is going to be removed as well, destroying this component in the process.
   * @export
   */
  remove() {
    for (let i = this.group.dataSources.length - 1, ii = 0; i >= ii; i--) {
      this.dataSources_.remove(this.group.dataSources[i]);
    }
  }

  /**
   * @param {!ngeo.datasource.DataSource} dataSource Data source to remove from
   *     the `ngeo.DataSources` collection.
   * @export
   */
  removeDataSource(dataSource) {
    this.dataSources_.remove(dataSource);
  }
};


gmf.layertree.datasourceGroupTreeComponent.component('gmfDatasourcegrouptree', {
  bindings: {
    'group': '<'
  },
  controller: gmf.layertree.datasourceGroupTreeComponent.Controller_,
  templateUrl: gmfLayertreeDatasourceGroupTreeTemplateUrl
});
