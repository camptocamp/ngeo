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

import angular from 'angular';
import {hasCoarsePointingDevice} from 'ngeo/utils';
import ngeoQueryAction from 'ngeo/query/Action';
import ngeoQueryQuerent from 'ngeo/query/Querent';
import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources';
import ngeoDatasourceHelper from 'ngeo/datasource/Helper';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper';

/**
 * Results of the query source.
 *
 * @typedef {Object} QueryResult
 * @property {import('ngeo/statemanager/WfsPermalink').QueryResultSource[]} sources Results for
 *    each query source.
 * @property {number} total The number of results for all sources.
 * @property {boolean} pending If at least one source is pending.
 */

/**
 * @hidden
 */
export class MapQuerent {
  /**
   * The ngeo Map Querent is the service bound to a map that issues
   * queries using the Querent service. The result is stored inside this
   * service.
   *
   * @param {import('ngeo/datasource/DataSources').DataSource} ngeoDataSources Ngeo data sources service.
   * @param {import('ngeo/datasource/Helper').DatasourceHelper} ngeoDataSourcesHelper Ngeo data
   *     sources helper service.
   * @param {import('ngeo/misc/FeatureHelper').FeatureHelper} ngeoFeatureHelper Ngeo feature
   *     helper service.
   * @param {import('ngeo/query/Querent').Querent} ngeoQuerent The ngeo querent service.
   * @param {QueryResult} ngeoQueryResult The ngeo query result service.
   * @param {import('ngeo/options').ngeoQueryOptions} ngeoQueryOptions The options.
   * @ngdoc service
   * @ngname ngeoQuerent
   * @ngInject
   */
  constructor(
    ngeoDataSources,
    ngeoDataSourcesHelper,
    ngeoFeatureHelper,
    ngeoQuerent,
    ngeoQueryResult,
    ngeoQueryOptions
  ) {
    const options = ngeoQueryOptions;

    /**
     * @type {import('ngeo/datasource/DataSource').DataSources}
     * @private
     */
    this.dataSources_ = ngeoDataSources.collection;

    /**
     * @type {import('ngeo/misc/FeatureHelper').FeatureHelper}
     * @private
     */
    this.featureHelper_ = ngeoFeatureHelper;

    /**
     * @type {import('ngeo/datasource/Helper').DatasourceHelper}
     * @private
     */
    this.ngeoDataSourcesHelper_ = ngeoDataSourcesHelper;

    /**
     * @type {import('ngeo/query/Querent').Querent}
     * @private
     */
    this.ngeoQuerent_ = ngeoQuerent;

    /**
     * @type {QueryResult}
     * @private
     */
    this.result_ = ngeoQueryResult;

    /**
     * @type {number}
     * @private
     */
    this.limit_ = options.limit !== undefined ? options.limit : 50;

    /**
     * @type {number}
     * @private
     */
    this.tolerance_;

    if (hasCoarsePointingDevice()) {
      this.tolerance_ = options.toleranceTouch !== undefined ? options.toleranceTouch : 10;
    } else {
      this.tolerance_ = options.tolerance !== undefined ? options.tolerance : 3;
    }

    /**
     * @type {boolean}
     * @private
     */
    this.bboxAsGETParam_ = options.bboxAsGETParam || false;

    /**
     * A hash of data source names classified by ids.
     *
     * @type {Object<number, string>}
     * @private
     */
    this.dataSourceNames_ = {};

    /**
     * Flag turned on after clearing to make sure that we clear only once.
     *
     * @type {boolean}
     * @private
     */
    this.cleared_ = false;
  }

  /**
   * @param {import('ngeo/query/Querent').IssueGetFeaturesOptions} options Options.
   * @returns {angular.IPromise<void|import('ngeo/query/Querent').QuerentResult>} Promise.
   */
  issue(options) {
    const action = options.action ? options.action : ngeoQueryAction.REPLACE;

    // (1) Clear previous result
    this.clear(action !== ngeoQueryAction.REPLACE);

    // (2) Get queryable data sources, unless they are already set
    let queryableDataSources;
    if (options.dataSources === undefined && options.queryableDataSources === undefined) {
      queryableDataSources = this.ngeoQuerent_.getQueryableDataSources(
        this.dataSources_.getArray(),
        options.map
      );
    }

    // (3) Update query options, update the pending property and issue the
    //     request.
    const limit = options.limit !== undefined ? options.limit : this.limit_;
    Object.assign(options, {
      queryableDataSources: queryableDataSources,
      limit: limit,
      tolerance: this.tolerance_,
      bboxAsGETParam: this.bboxAsGETParam_,
    });
    this.result_.pending = true;
    return this.ngeoQuerent_.issue(options).then(this.handleResult_.bind(this, action));
  }

  /**
   * Clear result, i.e. clear all 'result source' from their features and other
   * information.
   *
   * @param {boolean} keep Whether to keep the existing features and sources
   */
  clear(keep = false) {
    if (this.cleared_) {
      return;
    }

    this.result_.total = 0;
    for (const source of this.result_.sources) {
      if (!keep) {
        source.features.length = 0;
        delete source.totalFeatureCount;
      } else {
        this.result_.total += source.features.length;
      }
      source.pending = false;
      source.tooManyResults = false;
    }
    if (!keep) {
      this.result_.sources.length = 0; // Clear previous result sources
    }
    this.result_.pending = false;
    this.cleared_ = true;
  }

  /**
   * Called after a request to the querent service. Update the result.
   *
   * @param {string} action Query action
   * @param {import('ngeo/query/Querent').QuerentResult} response Response
   * @private
   */
  handleResult_(action, response) {
    let total = action === ngeoQueryAction.REPLACE ? 0 : this.result_.total;

    // (1) Update result sources, i.e. add them
    for (const idStr in response) {
      const id = Number(idStr);
      const dataSource = this.ngeoDataSourcesHelper_.getDataSource(id);
      if (!dataSource) {
        throw new Error('Missing dataSource');
      }
      let label = dataSource.name;
      console.assert(dataSource);

      const querentResultItem = response[id];
      const features = querentResultItem.features;
      const limit = querentResultItem.limit;
      const tooManyResults = querentResultItem.tooManyFeatures === true;
      const totalFeatureCount = querentResultItem.totalFeatureCount;
      const requestPartners = querentResultItem.requestPartners;

      /** @type {Object<string, import('ol/Feature').default<import('ol/geom/Geometry').default>[]>} */
      const typeSeparatedFeatures = {};
      features.forEach((feature) => {
        /** @type {string} */
        const type = feature.get('ngeo_feature_type_');
        if (!typeSeparatedFeatures[type]) {
          typeSeparatedFeatures[type] = [];
        }
        // Use properties aliases if any
        if (dataSource.attributes && dataSource.attributes.length) {
          const properties = feature.getProperties();
          /** @type {Object<string, unknown>} */
          const filteredProperties = {};
          dataSource.attributes.forEach((attribute) => {
            if (attribute.alias) {
              filteredProperties[attribute.alias] = properties[attribute.name];
              feature.unset(attribute.name, /* silent */ true);
            } else {
              // No alias is available => use the attribute as is.
              filteredProperties[attribute.name] = properties[attribute.name];
            }
          });
          feature.setProperties(filteredProperties, /* silent */ true);
        }
        typeSeparatedFeatures[type].push(feature);
      });

      for (const type in typeSeparatedFeatures) {
        label = type ? type : label;
        const featuresByType = typeSeparatedFeatures[type];
        let shouldPush = false;

        if (action === ngeoQueryAction.REPLACE) {
          shouldPush = true;
        } else {
          let existingSource;
          for (const source of this.result_.sources) {
            if (source.id === id && source.label === label) {
              existingSource = source;
              break;
            }
          }

          if (existingSource) {
            for (const newFeature of featuresByType) {
              const existingFeatureIndex = this.featureHelper_.findFeatureIndexByFid(
                existingSource.features,
                `${newFeature.getId()}`
              );
              if (existingFeatureIndex === -1) {
                if (action === ngeoQueryAction.ADD) {
                  existingSource.features.push(newFeature);
                  total += 1;
                }
              } else {
                if (action === ngeoQueryAction.REMOVE) {
                  existingSource.features.splice(existingFeatureIndex, 1);
                  total -= 1;
                }
              }
            }
          } else {
            if (action === ngeoQueryAction.ADD) {
              shouldPush = true;
            }
          }
        }

        if (shouldPush) {
          this.result_.sources.push({
            features: featuresByType,
            id: id,
            label: label,
            limit: limit,
            pending: false,
            tooManyResults: tooManyResults,
            totalFeatureCount: totalFeatureCount,
            identifierAttributeField: dataSource.identifierAttribute,
            requestPartners: requestPartners,
          });
          total += features.length;
        }
      }
    }

    // (2) Update total & pending
    this.result_.total = total;
    this.result_.pending = false;
    this.cleared_ = false;
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoMapQuerent', [
  ngeoDatasourceDataSources.name,
  ngeoDatasourceHelper.name,
  ngeoQueryQuerent.name,
  ngeoMiscFeatureHelper.name,
]);
myModule.service('ngeoMapQuerent', MapQuerent);

/**
 * The `ngeoQueryResult` is the value service where the features of the query
 * result are added.
 */
myModule.value(
  'ngeoQueryResult',
  /** @type {QueryResult} */ ({
    sources: [],
    total: 0,
    pending: false,
  })
);

export default myModule;
