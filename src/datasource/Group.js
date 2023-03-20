import olCollection from 'ol/Collection.js';

/**
 * The options required to create a `Group`.
 *
 * @typedef {Object} GroupOptions
 * @property {!Array.<!import('ngeo/datasource/DataSource.js').default>} dataSources List of data source
 *    combined in the group.
 *    At least one must be defined upon the cration of the group.
 * @property {string} title A human-readable title for the group. Usually, the WMS Server title is
 * used for this property.
 */

/**
 * @enum {string}
 * @private
 * @hidden
 */
const VisibilityState = {
  INDETERMINATE: 'indeterminate',
  OFF: 'off',
  ON: 'on',
};

/**
 * @private
 * @hidden
 */
class Group {
  /**
   * A Group data source combines multiple `ngeo.datasource.DataSource` objects.
   * Its main purpose is to provide a calculated `visibilityState` property
   * that can be used to determine if all its data source are all visible, all
   * hidden or some are hidden and other visible.
   *
   * @param {GroupOptions} options Options.
   */
  constructor(options) {
    // === DYNAMIC properties (i.e. that can change / be watched ===

    /**
     * @type {!import("ol/Collection.js").default.<!import("ngeo/datasource/DataSource.js").default>}
     * @protected
     */
    this.dataSourcesCollection_ = new olCollection(options.dataSources);

    // === STATIC properties (i.e. that never change) ===

    /**
     * @type {string}
     * @private
     */
    this.title_ = options.title;
  }

  destroy() {
    this.dataSourcesCollection_.clear();
  }

  // ========================================
  // === Dynamic property getters/setters ===
  // ========================================

  /**
   * @return {!Array.<!import("ngeo/datasource/DataSource.js").default>} Data sources
   */
  get dataSources() {
    return this.dataSourcesCollection_.getArray();
  }

  /**
   * @return {!import("ol/Collection.js").default.<!import("ngeo/datasource/DataSource.js").default>}
   *    Data sources
   */
  get dataSourcesCollection() {
    return this.dataSourcesCollection_;
  }

  // =======================================
  // === Static property getters/setters ===
  // =======================================

  /**
   * @return {string} Title
   */
  get title() {
    return this.title_;
  }

  // ===================================
  // === Calculated property getters ===
  // ===================================

  /**
   * @return {string} Visibility state
   */
  get visibilityState() {
    let state;

    for (const dataSource of this.dataSources) {
      if (state === undefined) {
        state = this.getDataSourceState(dataSource);
      } else {
        const otherState = this.getDataSourceState(dataSource);
        if (otherState !== state) {
          state = VisibilityState.INDETERMINATE;
        }
      }
      if (state === VisibilityState.INDETERMINATE) {
        break;
      }
    }

    console.assert(typeof state == 'string');

    return state;
  }

  // =======================
  // === Utility Methods ===
  // =======================

  /**
   * @param {!import("ngeo/datasource/DataSource.js").default} dataSource Data source.
   * @return {string} Visible state of a data source
   */
  getDataSourceState(dataSource) {
    return dataSource.visible ? VisibilityState.ON : VisibilityState.OFF;
  }

  /**
   * @param {!import("ngeo/datasource/DataSource.js").default} dataSource Data source to add.
   */
  addDataSource(dataSource) {
    this.dataSourcesCollection_.push(dataSource);
  }

  /**
   * @param {!import("ngeo/datasource/DataSource.js").default} dataSource Data source to remove.
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
   */
  toggleVisibilityState() {
    const visibleToSet = this.visibilityState !== VisibilityState.ON;
    for (const dataSource of this.dataSources) {
      if (dataSource.visible !== visibleToSet) {
        dataSource.visible = visibleToSet;
      }
    }
  }
}

export default Group;
