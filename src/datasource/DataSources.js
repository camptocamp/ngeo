// The MIT License (MIT)
//
// Copyright (c) 2018-2025 Camptocamp SA
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

import angular from 'angular';
import olCollection from 'ol/Collection';
import {listen, unlistenByKey} from 'ol/events';
import olView from 'ol/View';
import {CollectionEvent} from 'ol/Collection';

/**
 * @hidden
 */
export class DataSource {
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
   * @ngdoc service
   * @ngname ngeoDataSources
   * @ngInject
   */
  constructor() {
    /**
     * @type {import('ngeo/datasource/DataSource').DataSources}
     * @private
     */
    this.collection_ = new olCollection();

    /**
     * @type {?import('ol/Map').default}
     * @private
     */
    this.map_ = null;

    /**
     * @type {import('ol/events').EventsKey[]}
     * @private
     */
    this.listenerKeys_ = [];

    listen(this.collection_, 'add', this.handleDataSourcesAdd_, this);
  }

  /**
   * Set a map to this service. Null can be given to unset the map.
   *
   * @param {?import('ol/Map').default} map Map.
   */
  set map(map) {
    if (this.map_ === map) {
      return;
    }

    if (this.map_) {
      this.unbindMap_(this.map_);
    }

    this.map_ = map;

    if (map) {
      this.bindMap_(map);
    }
  }

  get collection() {
    return this.collection_;
  }

  /**
   * Bind a map to this service.
   *
   * @param {import('ol/Map').default} map Map.
   * @private
   */
  bindMap_(map) {
    // (1) Event listeners
    const view = map.getView();
    this.listenerKeys_.push(listen(view, 'change:resolution', this.handleViewResolutionChange_, this));

    // (2) Sync resolution with existing data sources
    const resolution = view.getResolution();
    if (resolution === undefined) {
      throw new Error('Missing resolution');
    }
    this.syncDataSourcesToResolution_(resolution);
  }

  /**
   * Unbind a map to this service.
   *
   * @param {import('ol/Map').default} map Map.
   * @private
   */
  unbindMap_(map) {
    this.listenerKeys_.forEach(unlistenByKey);
    this.listenerKeys_ = [];
  }

  /**
   * Called when the resolution of the map view changes. Synchronize the
   * datasources to current resolution of the view.
   *
   * @param {Event|import('ol/events/Event').default} evt Event.
   * @private
   */
  handleViewResolutionChange_(evt) {
    const view = evt.target;
    if (view instanceof olView) {
      const resolution = view.getResolution();
      if (resolution === undefined) {
        throw new Error('Missing resolution');
      }
      this.syncDataSourcesToResolution_(resolution);
    }
  }

  /**
   * Synchronize all datasources in the ngeo collection with a given resolution.
   *
   * @param {number} resolution Resolution
   * @private
   */
  syncDataSourcesToResolution_(resolution) {
    this.collection_.forEach((dataSource) => {
      this.syncDataSourceToResolution_(dataSource, resolution);
    });
  }

  /**
   * Synchronize a data source `inRange` property with a given resolution.
   *
   * @param {import('ngeo/datasource/DataSource').default} dataSource Data source
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

    const inMinRange = minResolution === null || minResolution === undefined || resolution >= minResolution;
    const inMaxRange = maxResolution === null || maxResolution === undefined || resolution <= maxResolution;
    const inRange = inMinRange && inMaxRange;

    dataSource.inRange = inRange;
  }

  /**
   * Called when a new data source is added to the ngeo collection. If there's
   * map bound, update its `inRange` right away.
   *
   * @param {Event|import('ol/events/Event').default} event Event
   * @private
   */
  handleDataSourcesAdd_(event) {
    if (event instanceof CollectionEvent) {
      const dataSource = event.element;
      if (this.map_) {
        const resolution = this.map_.getView().getResolution();
        if (resolution === undefined) {
          throw new Error('Missing resolution');
        }
        this.syncDataSourceToResolution_(dataSource, resolution);
      }
    }
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoDataSources', []);
// DataSources with the DataSources type.
myModule.service('ngeoDataSources', DataSource);

export default myModule;
