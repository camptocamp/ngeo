goog.provide('ngeo.datasource.SyncDataSourcesMap');

goog.require('ngeo');
goog.require('ngeo.datasource.DataSource');
/** @suppress {extraRequire} */
goog.require('ngeo.datasource.DataSources');
goog.require('ol.events');
goog.require('ol.CollectionEventType');
goog.require('ol.Object');
goog.require('ol.Observable');
goog.require('ol.View');
goog.require('ol.ViewProperty');
goog.require('goog.asserts');


ngeo.datasource.SyncDataSourcesMap = class {

  /**
   * This service is responsible of the synchronization between the ngeo
   * collection of data sources and a specific map. It listens to events
   * that come directly or indirectly from the map and update the inner
   * properties of the data sources.
   *
   * The following data sources properties are synchronized here:
   *
   * - inRange: The map view 'change:resolution' event is listened and the
   *   property is updated depending on the current resolution.
   *
   * @param {ngeo.datasource.DataSources} ngeoDataSources Ngeo collection of
   *     data sources objects.
   *
   * @struct
   * @ngdoc service
   * @ngname ngeoSyncDataSourcesMap
   * @ngInject
   */
  constructor(ngeoDataSources) {

    /**
     * @type {ngeo.datasource.DataSources}
     * @private
     */
    this.ngeoDataSources_ = ngeoDataSources;

    /**
     * @type {ol.Map}
     * @private
     */
    this.map_ = null;

    /**
     * @type {!Array.<!ol.EventsKey>}
     * @private
     */
    this.listenerKeys_ = [];

    ol.events.listen(
      this.ngeoDataSources_,
      ol.CollectionEventType.ADD,
      this.handleDataSourcesAdd_,
      this
    );
  }

  /**
   * Set a map to this service. Null can be given to unset the map.
   * @param {?ol.Map} map Map.
   */
  set map(map) {
    if (this.map_) {
      this.unbindMap_(this.map_);
    }

    this.map_ = map;

    if (map) {
      this.bindMap_(map);
    }
  }

  /**
   * Bind a map to this service.
   * @param {ol.Map} map Map.
   * @private
   */
  bindMap_(map) {

    // (1) Event listeners
    const view = map.getView();
    this.listenerKeys_.push(
      ol.events.listen(
        view,
        ol.Object.getChangeEventType(ol.ViewProperty.RESOLUTION),
        this.handleViewResolutionChange_,
        this
      )
    );

    // (2) Sync resolution with existing data sources
    const resolution = view.getResolution();
    goog.asserts.assertNumber(resolution);
    this.syncDataSourcesToResolution_(resolution);
  }

  /**
   * Unbind a map to this service.
   * @param {ol.Map} map Map.
   * @private
   */
  unbindMap_(map) {
    ol.Observable.unByKey(this.listenerKeys_);
    this.listenerKeys_ = [];
  }

  /**
   * Called when the resolution of the map view changes. Synchronize the
   * datasources to current resolution of the view.
   * @param {Event} evt Event.
   * @private
   */
  handleViewResolutionChange_(evt) {
    const view = evt.target;
    goog.asserts.assertInstanceof(view, ol.View);
    const resolution = view.getResolution();
    goog.asserts.assertNumber(resolution);
    this.syncDataSourcesToResolution_(resolution);
  }

  /**
   * Synchronize all datasources in the ngeo collection with a given resolution.
   * @param {number} resolution Resolution
   * @private
   */
  syncDataSourcesToResolution_(resolution) {
    this.ngeoDataSources_.forEach((dataSource) => {
      this.syncDataSourceToResolution_(dataSource, resolution);
    });
  }

  /**
   * Synchronize a data source `inRange` property with a given resolution.
   * @param {ngeo.datasource.DataSource} dataSource Data source
   * @param {number} resolution Resolution
   * @private
   */
  syncDataSourceToResolution_(dataSource, resolution) {
    // No need to do anything if the data source doesn't support dynamic
    // setting of inRange
    if (!dataSource.supportsDynamicInRange) {
      return;
    }

    const maxResolution = dataSource.maxResolution;
    const minResolution = dataSource.minResolution;

    const inMinRange = minResolution === null ||
        minResolution === undefined ||
        resolution >= minResolution;
    const inMaxRange = maxResolution === null ||
        maxResolution === undefined ||
        resolution <= maxResolution;
    const inRange = inMinRange && inMaxRange;

    dataSource.inRange = inRange;
  }

  /**
   * Called when a new data source is added to the ngeo collection. If there's
   * map bound, update its `inRange` right away.
   * @param {!ol.Collection.Event} event Event
   * @private
   */
  handleDataSourcesAdd_(event) {
    const dataSource = goog.asserts.assertInstanceof(
      event.element, ngeo.datasource.DataSource);
    if (this.map_) {
      const resolution = this.map_.getView().getResolution();
      goog.asserts.assertNumber(resolution);
      this.syncDataSourceToResolution_(dataSource, resolution);
    }
  }

};


ngeo.module.service(
  'ngeoSyncDataSourcesMap', ngeo.datasource.SyncDataSourcesMap);
