// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import olCollection from 'ol/Collection';

/**
 * The options required to create a `Group`.
 *
 * @typedef {Object} GroupOptions
 * @property {import('ngeo/datasource/DataSource').default[]} dataSources List of data source
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
     * @type {import('ol/Collection').default<import('ngeo/datasource/DataSource').default>}
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
   * @returns {import('ngeo/datasource/DataSource').default[]} Data sources
   */
  get dataSources() {
    return this.dataSourcesCollection_.getArray();
  }

  /**
   * @returns {import('ol/Collection').default<import('ngeo/datasource/DataSource').default>}
   *    Data sources
   */
  get dataSourcesCollection() {
    return this.dataSourcesCollection_;
  }

  // =======================================
  // === Static property getters/setters ===
  // =======================================

  /**
   * @returns {string} Title
   */
  get title() {
    return this.title_;
  }

  // ===================================
  // === Calculated property getters ===
  // ===================================

  /**
   * @returns {string} Visibility state
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

    if (typeof state != 'string') {
      throw new Error('missing state');
    }
    return state;
  }

  // =======================
  // === Utility Methods ===
  // =======================

  /**
   * @param {import('ngeo/datasource/DataSource').default} dataSource Data source.
   * @returns {string} Visible state of a data source
   */
  getDataSourceState(dataSource) {
    return dataSource.visible ? VisibilityState.ON : VisibilityState.OFF;
  }

  /**
   * @param {import('ngeo/datasource/DataSource').default} dataSource Data source to add.
   */
  addDataSource(dataSource) {
    this.dataSourcesCollection_.push(dataSource);
  }

  /**
   * @param {import('ngeo/datasource/DataSource').default} dataSource Data source to remove.
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
