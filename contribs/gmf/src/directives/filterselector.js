goog.provide('gmf.filterselectorComponent');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.Authentication');
goog.require('ol.CollectionEventType');


gmf.FilterselectorController = class {

  /**
   * @param {!angular.Scope} $scope Angular scope.
   * @param {gmfx.User} gmfUser User.
   * @param {ngeo.DataSources} ngeoDataSources Ngeo collection of data sources
   *     objects.
   * @private
   * @ngInject
   * @ngdoc controller
   * @ngname GmfFilterselectorController
   */
  constructor($scope, gmfUser, ngeoDataSources) {

    // Binding properties

    /**
     * @type {boolean}
     * @export
     */
    this.active;

    $scope.$watch(
      () => this.active,
      this.toggleDataSourceRegistration_.bind(this)
    );

    /**
     * @type {gmfx.User}
     * @private
     */
    this.gmfUser_ = gmfUser;

    $scope.$watch(
      () => this.gmfUser_.username,
      this.handleUsernameChange_.bind(this)
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
     * @type {Array.<string>}
     * @private
     */
    this.filtrableLayerNodeNames_ = null;

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

    /**
     * @type {boolean}
     * @export
     */
    this.enableDataSourceRegistration_ = false;

    $scope.$watch(
      () => this.enableDataSourceRegistration_,
      this.handleEnableDataSourceRegistrationChange_.bind(this)
    );

    // Initialize the data sources registration
    this.toggleDataSourceRegistration_();
  }


  /**
   * @private
   */
  handleUsernameChange_() {
    if (this.gmfUser_.username &&
        this.gmfUser_.functionalities &&
        this.gmfUser_.functionalities.filterable_layers
    ) {
      this.filtrableLayerNodeNames_ =
        this.gmfUser_.functionalities.filterable_layers;
    } else {
      this.filtrableLayerNodeNames_ = null;
    }
    this.toggleDataSourceRegistration_();
  }


  /**
   * @private
   */
  toggleDataSourceRegistration_() {
    const newDataSourceRegistration = this.active &&
          !!this.filtrableLayerNodeNames_;
    if (this.enableDataSourceRegistration_ !== newDataSourceRegistration) {
      this.enableDataSourceRegistration_ = newDataSourceRegistration;
    }
  }


  /**
   * @param {boolean} register Whether register the data sources or not.
   * @private
   */
  handleEnableDataSourceRegistrationChange_(register) {
    const keys = this.listenerKeys_;

    if (register) {
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
          this.handleDataSourcesRemove_,
          this
        )
      );

      // Manage the data sources that are already in the collection
      this.ngeoDataSources_.forEach(this.registerDataSource_, this);

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
    this.registerDataSource_(dataSource);
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
    this.unregisterDataSource_(dataSource);
  }


  /**
   * @param {ngeo.DataSource} dataSource Data source
   * @private
   */
  registerDataSource_(dataSource) {
    // Do nothing if data source is not valid
    if (!this.isValidDataSource_(dataSource)) {
      return;
    }

    this.filtrableDataSources.push(dataSource);
  }


  /**
   * @param {ngeo.DataSource} dataSource Data source
   * @private
   */
  unregisterDataSource_(dataSource) {
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
    const names = goog.asserts.assert(this.filtrableLayerNodeNames_);
    return ol.array.includes(names, dataSource.name);
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
