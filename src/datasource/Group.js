goog.provide('ngeo.datasource.Group');

goog.require('ngeo');
goog.require('ol.Collection');


ngeo.datasource.Group = class {

  /**
   * A Group data source combines multiple `ngeo.datasource.DataSource` objects.
   * Its main purpose is to provide a calculated `visibilityState` property
   * that can be used to determine if all its data source are all visible, all
   * hidden or some are hidden and other visible.
   *
   * @struct
   * @param {ngeox.datasource.GroupOptions} options Options.
   */
  constructor(options) {

    // === DYNAMIC properties (i.e. that can change / be watched ===

    /**
     * @type {!ol.Collection.<!ngeo.datasource.DataSource>}
     * @protected
     */
    this.dataSourcesCollection_ = new ol.Collection(options.dataSources);


    // === STATIC properties (i.e. that never change) ===

    /**
     * @type {string}
     * @private
     */
    this.title_ = options.title;
  }

  /**
   * @export
   */
  destroy() {
    this.dataSourcesCollection_.clear();
  }

  // ========================================
  // === Dynamic property getters/setters ===
  // ========================================

  /**
   * @return {!Array.<!ngeo.datasource.DataSource>} Data sources
   * @export
   */
  get dataSources() {
    return this.dataSourcesCollection_.getArray();
  }


  /**
   * @return {!ol.Collection.<!ngeo.datasource.DataSource>} Data sources
   * @export
   */
  get dataSourcesCollection() {
    return this.dataSourcesCollection_;
  }


  // =======================================
  // === Static property getters/setters ===
  // =======================================

  /**
   * @return {string} Title
   * @export
   */
  get title() {
    return this.title_;
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
          state = ngeo.datasource.Group.VisibilityState.INDETERMINATE;
        }
      }
      if (state === ngeo.datasource.Group.VisibilityState.INDETERMINATE) {
        break;
      }
    }

    goog.asserts.assertString(state);

    return state;
  }


  // =======================
  // === Utility Methods ===
  // =======================

  /**
   * @param {!ngeo.datasource.DataSource} dataSource Data source.
   * @return {string} Visible state of a data source
   * @export
   */
  getDataSourceState(dataSource) {
    return dataSource.visible ?
      ngeo.datasource.Group.VisibilityState.ON :
      ngeo.datasource.Group.VisibilityState.OFF;
  }

  /**
   * @param {!ngeo.datasource.DataSource} dataSource Data source to add.
   * @export
   */
  addDataSource(dataSource) {
    this.dataSourcesCollection_.push(dataSource);
  }

  /**
   * @param {!ngeo.datasource.DataSource} dataSource Data source to remove.
   * @export
   */
  removeDataSource(dataSource) {
    this.dataSourcesCollection_.remove(dataSource);
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
        this.visibilityState !== ngeo.datasource.Group.VisibilityState.ON;
    for (const dataSource of this.dataSources) {
      if (dataSource.visible !== visibleToSet) {
        dataSource.visible = visibleToSet;
      }
    }
  }
};


/**
 * @enum {string}
 */
ngeo.datasource.Group.VisibilityState = {
  INDETERMINATE: 'indeterminate',
  OFF: 'off',
  ON: 'on'
};
