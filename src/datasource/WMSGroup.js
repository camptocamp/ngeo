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

import ngeoDatasourceOGCGroup from 'ngeo/datasource/OGCGroup';
import ngeoDatasourceOGC from 'ngeo/datasource/OGC';
import {remove as removeFromArray} from 'ol/array';

/**
 * The options required to create a `WMSGroup`.
 *
 * extends OGCGroupOptions
 * @typedef {Object} WMSGroupOptions
 * @property {angular.auto.IInjectorService} injector Angular main injector.
 * @property {string} url (WMSGroupOptions)
 * @property {import('ngeo/datasource/DataSource').default[]} dataSources (GroupOptions)
 * @property {string} title (GroupOptions)
 */

/**
 * @hidden
 */
export default class extends ngeoDatasourceOGCGroup {
  /**
   * A WMSGroup data source combines multiple `ngeo.datasource.OGC` objects
   * that have the 'WMS' type. Its main goal is to create a single
   * `ol.layer.Image` object in which the data source visible properties
   * determine the WMS LAYERS parameter.
   *
   * Note: the layer is not added to the map here.
   *
   * @param {WMSGroupOptions} options Options.
   * @param {import('ngeo/map/LayerHelper').LayerHelper} ngeoLayerHelper the ngeo map LayerHelper service.
   */
  constructor(options, ngeoLayerHelper) {
    super(options);

    const injector = options.injector;

    // === PRIVATE properties ===

    /**
     * @type {?import('ol/layer/Image').default<import('ol/source/Image').default>}
     * @private
     */
    this.layer_ = null;

    /**
     * @type {import('ngeo/map/LayerHelper').LayerHelper}
     * @private
     */
    this.ngeoLayerHelper_ = ngeoLayerHelper;

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
    this.wmsDataSourceUnregister_ = {};

    this.init_();
  }

  /**
   * @private
   */
  init_() {
    if (!this.dataSources.length) {
      throw new Error('Missing dataSources');
    }

    for (const dataSource of this.dataSources) {
      if (dataSource instanceof ngeoDatasourceOGC) {
        this.registerDataSource_(dataSource);
      }
    }
  }

  /**
   * @inheritDoc
   */
  destroy() {
    for (const dataSource of this.dataSources) {
      if (dataSource instanceof ngeoDatasourceOGC) {
        this.unregisterDataSource_(dataSource);
      }
    }
    super.destroy();
  }

  // =======================================
  // === Static property getters/setters ===
  // =======================================

  /**
   * @return {import('ol/layer/Image').default<import('ol/source/Image').default>} layer
   */
  get layer() {
    if (!this.layer_) {
      throw new Error('Missing layer');
    }
    return this.layer_;
  }

  // =======================
  // === Utility Methods ===
  // =======================

  /**
   * @param {import('ngeo/datasource/DataSource').default} dataSource Data source to add.
   */
  addDataSource(dataSource) {
    super.addDataSource(dataSource);
    if (!(dataSource instanceof ngeoDatasourceOGC)) {
      throw new Error('Wrong datasource type');
    }
    this.registerDataSource_(dataSource);
  }

  /**
   * @param {ngeoDatasourceOGC} dataSource OGC data source to register.
   * @private
   */
  registerDataSource_(dataSource) {
    const id = dataSource.id;

    this.wmsDataSourceUnregister_[id] = this.rootScope_.$watch(
      () => dataSource.visible,
      this.handleDataSourceVisibleChange_.bind(this)
    );

    if (!this.layer_) {
      this.layer_ = this.ngeoLayerHelper_.createBasicWMSLayerFromDataSource(dataSource);
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
    /** @type {string[]} */
    let layerNames = [];

    // (1) Collect layer names from data sources in the group
    for (const dataSource of this.dataSources) {
      if (dataSource instanceof ngeoDatasourceOGC && dataSource.visible) {
        layerNames = layerNames.concat(dataSource.getWMSLayerNames());
      }
    }

    // (2) Update layer object
    this.ngeoLayerHelper_.updateWMSLayerState(layer, layerNames.join(','));
  }

  /**
   * @param {import('ngeo/datasource/DataSource').default} dataSource Data source to remove.
   */
  removeDataSource(dataSource) {
    super.removeDataSource(dataSource);
    if (dataSource instanceof ngeoDatasourceOGC) {
      this.unregisterDataSource_(dataSource);
    }
  }

  /**
   * @param {import('ngeo/datasource/OGC').default} dataSource OGC data source to unregister.
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
    removeFromArray(this.dataSources, dataSource);

    // Remove query source id
    const ids = this.ngeoLayerHelper_.getQuerySourceIds(layer);
    if (ids) {
      removeFromArray(ids, id);
    }

    if (this.dataSources.length) {
      this.updateLayer_();
    }
  }
}
