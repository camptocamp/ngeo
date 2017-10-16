goog.provide('ngeo.datasource.WMSGroup');

goog.require('ngeo');
goog.require('ngeo.LayerHelper');


/**
 * @implements {ngeox.datasource.WMSGroup}
 */
ngeo.datasource.WMSGroup = class {

  /**
   * A WMSGroup data source combines multiple `ngeo.datasource.OGC` objects.
   * It's main utility is to create a single `ol.layer.Image` object in which
   * the data source visible properties determine the WMS LAYERS parameter.
   *
   * Also, this WMSGroup object has a calculated `visibilityState` property
   * that can be used to determine if all its data source are all visible, all
   * hidden or some are hidden and other visible.
   *
   * Note: the layer is not added to the map here.
   *
   * @struct
   * @param {ngeox.datasource.WMSGroupOptions} options Options.
   */
  constructor(options) {

    const injector = options.injector;

    // === DYNAMIC properties (i.e. that can change / be watched ===

    /**
     * @type {!Array.<!ngeo.datasource.OGC>}
     * @private
     */
    this.dataSources_ = options.dataSources;


    // === STATIC properties (i.e. that never change) ===

    /**
     * @type {string}
     * @private
     */
    this.title_ = options.title;


    // === PRIVATE properties ===

    /**
     * @type {!ol.layer.Image}
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
     * @type {string}
     * @private
     */
    this.url_ = options.url;

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
      this.registerDataSource_(dataSource);
    }
  }

  /**
   * @export
   */
  destroy() {
    for (const dataSource of this.dataSources) {
      this.unregisterDataSource_(dataSource);
    }
    this.dataSources_.length = 0;
  }

  // ========================================
  // === Dynamic property getters/setters ===
  // ========================================

  /**
   * @return {!Array.<!ngeo.datasource.OGC>} Data sources
   * @export
   */
  get dataSources() {
    return this.dataSources_;
  }


  // =======================================
  // === Static property getters/setters ===
  // =======================================

  /**
   * @return {!ol.layer.Image} layer 
   * @export
   */
  get layer() {
    return this.layer_;
  }

  /**
   * @return {string} Title 
   * @export
   */
  get title() {
    return this.title_;
  }

  /**
   * @return {string} Url
   * @export
   */
  get url() {
    return this.url_;
  }


  // ===================================
  // === Calculated property getters ===
  // ===================================

  /**
   * @return {string} Visibility state
   * @export
   */
  get visibilityState() {
    let state;

    for (const dataSource of this.dataSources) {
      if (state === undefined) {
        state = this.getDataSourceState(dataSource);
      } else {
        const otherState = this.getDataSourceState(dataSource);
        if (otherState !== state) {
          state = ngeo.datasource.WMSGroup.VisibilityState.INDETERMINATE;
        }
      }
      if (state === ngeo.datasource.WMSGroup.VisibilityState.INDETERMINATE) {
        break;
      }
    }

    return state;
  }


  // =======================
  // === Utility Methods ===
  // =======================

  /**
   * @param {!ngeo.datasource.OGC} dataSource OGC data source.
   * @return {number} Visible state of a data source
   * @export
   */
  getDataSourceState(dataSource) {
    return dataSource.visible ?
      ngeo.datasource.WMSGroup.VisibilityState.ON :
      ngeo.datasource.WMSGroup.VisibilityState.OFF;
  }

  /**
   * @param {!ngeo.datasource.OGC} dataSource OGC data source to add.
   * @export
   */
  addDataSource(dataSource) {
    this.dataSources_.push(dataSource);
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
      if (dataSource.visible) {
        layerNames = layerNames.concat(dataSource.getOGCLayerNames());
      }
    }

    // (2) Update layer object
    this.ngeoLayerHelper_.updateWMSLayerState(layer, layerNames);
  }

  /**
   * @param {!ngeo.datasource.OGC} dataSource OGC data source to remove.
   * @export
   */
  removeDataSource(dataSource) {
    ol.array.remove(this.dataSources_, dataSource);
    this.unregisterDataSource_(dataSource);
  }

  /**
   * @param {!ngeo.datasource.OGC} dataSource OGC data source to unregister.
   * @private
   */
  unregisterDataSource_(dataSource) {

    const id = dataSource.id;
    const layer = this.layer;

    // Remove id reference from layer
    ol.array.remove(layer.get('querySourceIds'), id);

    // Unregister watcher
    const unregister = this.wmsDataSourceUnregister_[id];
    unregister();
    delete this.wmsDataSourceUnregister_[id];

    // Remove DS from the group
    ol.array.remove(this.dataSources, dataSource);

    // Remove query source id
    ol.array.remove(layer.get('querySourceIds'), id);

    if (this.dataSources.length) {
      this.updateLayer_(this);
    }
  }

  /**
   * Update visible property of all data sources depending on the current
   * visibility state:
   *
   * - state ON --> visible false
   * - state OFF --> visible true
   * - state IND. --> visible true
   *
   * @export
   */
  toggleVisibilityState() {
    const visibleToSet =
        this.visibilityState !== ngeo.datasource.WMSGroup.VisibilityState.ON;
    for (const dataSource of this.dataSources) {
      if (dataSource.visible !== visibleToSet) {
        dataSource.visible = visibleToSet;
      }
    }
  }
};


/**
 * @enum {number}
 */
ngeo.datasource.WMSGroup.VisibilityState = {
  INDETERMINATE: 'indeterminate',
  OFF: 'off',
  ON: 'on'
};
