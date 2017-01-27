goog.provide('ngeo.SyncDataSourcesMap');

goog.require('ngeo');
goog.require('ngeo.DataSource');
/** @suppress {extraRequire} */
goog.require('ngeo.DataSources');
goog.require('ol.Collection');
goog.require('ol.Observable');
goog.require('ol.View');


ngeo.SyncDataSourcesMap = class {

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
   * @param {ngeo.DataSources} ngeoDataSources Ngeo collection of data sources
   *     objects.
   *
   * @struct
   * @ngdoc service
   * @ngname ngeoSyncDataSourcesMap
   * @ngInject
   */
  constructor(ngeoDataSources) {

    /**
     * @type {ngeo.DataSources}
     * @private
     */
    this.ngeoDataSources_ = ngeoDataSources;

    /**
     * @type {ol.Map}
     * @private
     */
    this.map_ = null;

    /**
     * @type {Array.<ol.EventsKey>}
     * @private
     */
    this.listenerKeys_ = [];

    ol.events.listen(
      this.ngeoDataSources_,
      ol.Collection.EventType.ADD,
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
        ol.Object.getChangeEventType(ol.View.Property.RESOLUTION),
        this.handleViewResolutionChange_,
        this
      )
    );

    // (2) Sync resolution with existing data sources
    this.syncDataSourcesToResolution_(view.getResolution());
  }

  /**
   * Unbind a map to this service.
   * @param {ol.Map} map Map.
   * @private
   */
  unbindMap_(map) {
    ol.Observable.unByKey(this.listenerKeys_);
    this.listenerKeys_ = 0;
  }

  /**
   * Called when the resolution of the map view changes. Synchronize the
   * datasources to current resolution of the view.
   * @param {ol.ObjectEvent} evt Event.
   * @private
   */
  handleViewResolutionChange_(evt) {
    const view = goog.asserts.assertInstanceof(evt.target, ol.View);
    this.syncDataSourcesToResolution_(view.getResolution());
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
   * @param {ngeo.DataSource} dataSource Data source
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

    const inMinRange = minResolution === null || resolution >= minResolution;
    const inMaxRange = maxResolution === null || resolution <= maxResolution;
    const inRange = inMinRange && inMaxRange;

    dataSource.inRange = inRange;
  }

  /**
   * Called when a new data source is added to the ngeo collection. If there's
   * map bound, update its `inRange` right away.
   * @param {ol.Collection.Event} evt Event
   * @private
   */
  handleDataSourcesAdd_(evt) {
    const dataSource = goog.asserts.assertInstanceof(
      evt.element, ngeo.DataSource);
    if (this.map_) {
      this.syncDataSourceToResolution_(
        dataSource,
        this.map_.getView().getResolution()
      );
    }
  }

};


ngeo.module.service('ngeoSyncDataSourcesMap', ngeo.SyncDataSourcesMap);
