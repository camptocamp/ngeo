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

import ngeoDatasourceFile from 'ngeo/datasource/File.js';
import ngeoDatasourceGroup from 'ngeo/datasource/Group.js';

/**
 * The options required to create a `FileGroup`.
 *
 * extends GroupOptions
 * @typedef {Object} FileGroupOptions
 * @property {angular.auto.IInjectorService} injector Angular main injector.
 * @property {import('ngeo/datasource/DataSource.js').default[]} dataSources (GroupOptions)
 * @property {string} title (GroupOptions)
 */

/**
 * @hidden
 */
export default class extends ngeoDatasourceGroup {
  /**
   * A FileGroup data source combines multiple `ngeo.datasource.File` objects.
   * Its main goal is to synchronize the added data source 'visible' properties
   * with the visibility of their layer 'visible' property.
   *
   * @param {FileGroupOptions} options Options.
   */
  constructor(options) {
    super(options);

    const injector = options.injector;

    // === PRIVATE properties ===

    /**
     * @type {angular.IScope}
     * @private
     */
    this.rootScope_ = injector.get('$rootScope');

    /**
     * The functions to call to unregister the `watch` event on data sources
     * that are registered. Key is the id of the data source.
     * @type {Object<number, Function>}
     * @private
     */
    this.unregister_ = {};
  }

  /**
   * @param {import("ngeo/datasource/DataSource.js").default} dataSource Data source to add.
   */
  addDataSource(dataSource) {
    super.addDataSource(dataSource);
    if (!(dataSource instanceof ngeoDatasourceFile)) {
      throw new Error('Wrong datasource type');
    }
    this.registerDataSource_(dataSource);
  }

  /**
   * @param {import("ngeo/datasource/File.js").default} dataSource File data source to register.
   * @private
   */
  registerDataSource_(dataSource) {
    this.unregister_[dataSource.id] = this.rootScope_.$watch(
      () => dataSource.visible,
      this.handleDataSourceVisibleChange_.bind(this, dataSource)
    );
  }

  /**
   * @param {import("ngeo/datasource/File.js").default} dataSource File data source.
   * @param {boolean|undefined} value Current visible property of the DS
   * @param {boolean|undefined} oldValue Old visible property of the DS
   * @private
   */
  handleDataSourceVisibleChange_(dataSource, value, oldValue) {
    if (value !== undefined) {
      dataSource.layer.setVisible(value);
    }
  }

  /**
   * @param {import("ngeo/datasource/DataSource.js").default} dataSource Data source to remove.
   */
  removeDataSource(dataSource) {
    super.removeDataSource(dataSource);
    if (!this.unregister_.hasOwnProperty(dataSource.id)) {
      return;
    }
    if (!(dataSource instanceof ngeoDatasourceFile)) {
      throw new Error('Wrong datasource type');
    }
    this.unregisterDataSource_(dataSource);
  }

  /**
   * @param {import("ngeo/datasource/File.js").default} dataSource File data source to unregister.
   * @private
   */
  unregisterDataSource_(dataSource) {
    this.unregister_[dataSource.id]();
    delete this.unregister_[dataSource.id];
  }
}
