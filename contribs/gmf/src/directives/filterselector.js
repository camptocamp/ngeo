goog.provide('gmf.FilterselectorController');
goog.provide('gmf.filterselectorComponent');

goog.require('gmf');
goog.require('ol.CollectionEventType');


gmf.FilterselectorController = class {

  /**
   * @param {!angular.Scope} $scope Angular scope.
   * @param {ngeo.DataSources} ngeoDataSources Ngeo collection of data sources
   *     objects.
   * @ngInject
   * @ngdoc controller
   * @ngname GmfFilterselectorController
   */
  constructor($scope, ngeoDataSources) {

    // Binding properties

    /**
     * @type {boolean}
     * @export
     */
    this.active;

    $scope.$watch(
      () => this.active,
      this.handleActiveChange_.bind(this)
    );

    /**
     * @type {ngeo.DataSources}
     * @private
     */
    this.ngeoDataSources_ = ngeoDataSources;

    // Inner properties

    /**
     * @type {Array.<ngeo.DataSource>}
     * @export
     */
    this.filtrableDataSources = [];

    /**
     * @type {Array.<ol.EventsKey>}
     * @private
     */
    this.listenerKeys_ = [];

    /**
     * @type {?ngeo.DataSource}
     * @export
     */
    this.selectedDataSource = null;
  }

  /**
   * Called when the active property of the this directive changes. Manage
   * the activation/deactivation accordingly.
   * @param {boolean} active Whether the directive is active or not.
   * @private
   */
  handleActiveChange_(active) {

    const keys = this.listenerKeys_;

    if (active) {

      // Listen to data sources being added/removed
      keys.push(
        ol.events.listen(
          this.ngeoDataSources_,
          ol.CollectionEventType.ADD,
          this.handleDataSourcesAdd_,
          this
        )
      );
      keys.push(
        ol.events.listen(
          this.ngeoDataSources_,
          ol.CollectionEventType.REMOVE,
          this.handleDataSourceRemove_,
          this
        )
      );

      // Manage the data sources that are already in the collection
      this.ngeoDataSources_.forEach(this.handleDataSourcesAdd_, this);

    } else {
      ol.Observable.unByKey(keys);
      keys.length = 0;

      // Remove data sources that are in the collection
      this.filtrableDataSources.length = 0;
    }

  }


  /**
   * Called when a data source is added to the collection of ngeo data sources.
   * If the data source is 'valid', add it to the list of filtrable data
   * sources.
   *
   * @param {ol.Collection.Event} evt Collection event.
   * @private
   */
  handleDataSourcesAdd_(evt) {
    const dataSource = evt.element;
    goog.asserts.assertInstanceof(dataSource, ngeo.DataSource);

    // Do nothing if data source is not valid
    if (!this.isValidDataSource_(dataSource)) {
      return;
    }

    this.filtrableDataSources.push(dataSource);
  }


  /**
   * Called when a data source is added to the collection of ngeo data sources.
   * If the data source is 'valid', add it to the list of filtrable data
   * sources.
   *
   * @param {ol.Collection.Event} evt Collection event.
   * @private
   */
  handleDataSourcesRemove_(evt) {
    const dataSource = evt.element;
    goog.asserts.assertInstanceof(dataSource, ngeo.DataSource);

    // Do nothing if data source is not valid
    if (!this.isValidDataSource_(dataSource)) {
      return;
    }

    ol.array.remove(this.filtrableDataSources, dataSource);
  }


  /**
   * Determines whether the data source is valid for addition (or removal) to
   * the list of filtrable data sources or not.
   *
   * @param {ngeo.DataSource} dataSource Ngeo data source object
   * @return {boolean} Whether the data source is valid to add to the list or
   *     not.
   * @private
   */
  isValidDataSource_(dataSource) {
    // FIXME - use 'filtrable' instead.
    return dataSource.queryable;
  }


};


gmf.module.component('gmfFilterselector', {
  bindings: {
    active: '<'
  },
  controller: gmf.FilterselectorController,
  controllerAs: 'fsCtrl',
  templateUrl: () => `${gmf.baseTemplateUrl}/filterselector.html`
});
