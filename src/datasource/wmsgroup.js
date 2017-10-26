goog.provide('ngeo.datasource.WMSGroup');

goog.require('ngeo');
goog.require('ngeo.LayerHelper');
goog.require('ngeo.datasource.OGCGroup');
goog.require('ngeo.datasource.OGC');


ngeo.datasource.WMSGroup = class extends ngeo.datasource.OGCGroup {

  /**
   * A WMSGroup data source combines multiple `ngeo.datasource.OGC` objects
   * that have the 'WMS' type. Its main goal is to create a single
   * `ol.layer.Image` object in which the data source visible properties
   * determine the WMS LAYERS parameter.
   *
   * Note: the layer is not added to the map here.
   *
   * @struct
   * @param {ngeox.datasource.WMSGroupOptions} options Options.
   */
  constructor(options) {

    super(options);

    const injector = options.injector;


    // === PRIVATE properties ===

    /**
     * @type {ol.layer.Image}
     * @private
     */
    this.layer_;

    /**
     * @type {!ngeo.LayerHelper}
     * @private
     */
    this.ngeoLayerHelper_ = injector.get('ngeoLayerHelper');

    /**
     * @type {!angular.Scope}
     * @private
     */
    this.rootScope_ = injector.get('$rootScope');

    /**
     * The functions to call to unregister the `watch` event on data sources
     * that are registered. Key is the id of the data source.
     * @type {!Object.<number, Function>}
     * @private
     */
    this.wmsDataSourceUnregister_ = {};


    this.init_();
  }

  /**
   * @private
   */
  init_() {
    goog.asserts.assert(
      this.dataSources.length, 'At least one data source is required.');

    for (const dataSource of this.dataSources) {
      goog.asserts.assertInstanceof(dataSource, ngeo.datasource.OGC);
      this.registerDataSource_(dataSource);
    }
  }

  /**
   * @inheritDoc
   */
  destroy() {
    for (const dataSource of this.dataSources) {
      goog.asserts.assertInstanceof(dataSource, ngeo.datasource.OGC);
      this.unregisterDataSource_(dataSource);
    }
    super.destroy();
  }


  // =======================================
  // === Static property getters/setters ===
  // =======================================

  /**
   * @return {ol.layer.Image} layer
   * @export
   */
  get layer() {
    return this.layer_;
  }


  // =======================
  // === Utility Methods ===
  // =======================

  /**
   * @inheritDoc
   */
  addDataSource(dataSource) {
    super.addDataSource(dataSource);
    goog.asserts.assertInstanceof(dataSource, ngeo.datasource.OGC);
    this.registerDataSource_(dataSource);
  }

  /**
   * @param {!ngeo.datasource.OGC} dataSource OGC data source to register.
   * @private
   */
  registerDataSource_(dataSource) {

    const id = dataSource.id;

    this.wmsDataSourceUnregister_[id] = this.rootScope_.$watch(
      () => dataSource.visible,
      this.handleDataSourceVisibleChange_.bind(this)
    );

    if (!this.layer_) {
      this.layer_ = this.ngeoLayerHelper_.createBasicWMSLayerFromDataSource(
        dataSource
      );
    } else {
      this.layer_.get('querySourceIds').push(id);
      this.updateLayer_();
    }
  }

  /**
   * @param {boolean|undefined} value Current visible property of the DS
   * @param {boolean|undefined} oldValue Old visible property of the DS
   * @private
   */
  handleDataSourceVisibleChange_(value, oldValue) {
    if (value !== undefined && value !== oldValue) {
      this.updateLayer_();
    }
  }

  /**
   * @private
   */
  updateLayer_() {
    const layer = this.layer;
    let layerNames = [];

    // (1) Collect layer names from data sources in the group
    for (const dataSource of this.dataSources) {
      goog.asserts.assertInstanceof(dataSource, ngeo.datasource.OGC);
      if (dataSource.visible) {
        layerNames = layerNames.concat(dataSource.getOGCLayerNames());
      }
    }

    // (2) Update layer object
    this.ngeoLayerHelper_.updateWMSLayerState(layer, layerNames.join(','));
  }

  /**
   * @inheritDoc
   */
  removeDataSource(dataSource) {
    super.removeDataSource(dataSource);
    goog.asserts.assertInstanceof(dataSource, ngeo.datasource.OGC);
    this.unregisterDataSource_(dataSource);
  }

  /**
   * @param {!ngeo.datasource.OGC} dataSource OGC data source to unregister.
   * @private
   */
  unregisterDataSource_(dataSource) {

    const id = dataSource.id;
    const layer = this.layer;

    // Unregister watcher
    const unregister = this.wmsDataSourceUnregister_[id];
    unregister();
    delete this.wmsDataSourceUnregister_[id];

    // Remove DS from the group
    ol.array.remove(this.dataSources, dataSource);

    // Remove query source id
    const ids = this.ngeoLayerHelper_.getQuerySourceIds(layer);
    if (ids) {
      ol.array.remove(ids, id);
    }

    if (this.dataSources.length) {
      this.updateLayer_();
    }
  }
};
