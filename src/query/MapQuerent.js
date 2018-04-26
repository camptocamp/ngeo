/**
 * @module ngeo.query.MapQuerent
 */
import googAsserts from 'goog/asserts.js';
import ngeoQueryQuerent from 'ngeo/query/Querent.js';
import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources.js';
import ngeoDatasourceHelper from 'ngeo/datasource/Helper.js';
import * as olObj from 'ol/obj.js';

const exports = class {

  /**
   * The ngeo Map Querent is the service bound to a map that issues
   * queries using the Querent service. The result is stored inside this
   * service.
   *
   * @struct
   * @param {angular.$injector} $injector Main injector.
   * @param {ngeo.datasource.DataSources} ngeoDataSources Ngeo data sources service.
   * @param {ngeo.datasource.Helper} ngeoDataSourcesHelper Ngeo data
   *     sources helper service.
   * @param {ngeo.query.Querent} ngeoQuerent The ngeo querent service.
   * @param {ngeox.QueryResult} ngeoQueryResult The ngeo query result service.
   * @ngdoc service
   * @ngname ngeoQuerent
   * @ngInject
   */
  constructor($injector, ngeoDataSources, ngeoDataSourcesHelper, ngeoQuerent,
    ngeoQueryResult) {

    const options = /** @type {ngeox.QueryOptions} */ (
      $injector.has('ngeoQueryOptions') ?
        $injector.get('ngeoQueryOptions') : {});

    /**
     * @type {ngeox.datasource.DataSources}
     * @private
     */
    this.dataSources_ = ngeoDataSources.collection;

    /**
     * @type {ngeo.datasource.Helper}
     * @private
     */
    this.ngeoDataSourcesHelper_ = ngeoDataSourcesHelper;

    /**
     * @type {ngeo.query.Querent}
     * @private
     */
    this.ngeoQuerent_ = ngeoQuerent;

    /**
     * @type {ngeox.QueryResult}
     * @private
     */
    this.result_ = ngeoQueryResult;

    /**
     * @type {number}
     * @private
     */
    this.limit_ = options.limit !== undefined ? options.limit : 50;

    /**
     * When set, before making WFS GetFeature requests to fetch features,
     * WFS GetFeature requests with `resultType = 'hits'` are made first. If
     * the number of records for the request would exceed the limit, then
     * no features are returned.
     *
     * @type {boolean}
     * @private
     */
    this.queryCountFirst_ = options.queryCountFirst !== undefined ?
      options.queryCountFirst : false;

    /**
     * @type {number}
     * @private
     */
    this.tolerancePx_ = options.tolerance !== undefined ?
      options.tolerance : 3;

    /**
     * A hash of data source names classified by ids.
     * @type {Object.<number, string>}
     * @private
     */
    this.dataSourceNames_ = {};
  }

  /**
   * @param {ngeox.IssueGetFeaturesOptions} options Options.
   * @export
   */
  issue(options) {
    // (1) Clear previous result
    this.clear();

    // (2) Get queryable data sources, unless they are already set
    let queryableDataSources;
    if (options.dataSources === undefined &&
        options.queryableDataSources === undefined
    ) {
      queryableDataSources = this.ngeoQuerent_.getQueryableDataSources(
        this.dataSources_.getArray(),
        options.map
      );
    }

    // (3) Update query options, update the pending property and issue the
    //     request.
    const limit = options.limit !== undefined ? options.limit : this.limit_;
    olObj.assign(options, {
      queryableDataSources: queryableDataSources,
      limit: limit,
      tolerancePx: this.tolerancePx_,
      wfsCount: this.queryCountFirst_
    });
    this.result_.pending = true;
    this.ngeoQuerent_.issue(options).then(this.handleResult_.bind(this));
  }

  /**
   * Clear result, i.e. clear all 'result source' from their features and other
   * information.
   * @export
   */
  clear() {
    this.result_.total = 0;
    for (const source of this.result_.sources) {
      source.features.length = 0;
      source.pending = false;
      source.queried = false;
      source.tooManyResults = false;
      source.totalFeatureCount = undefined;
    }
    this.result_.sources.length = 0; // Clear previous result sources
    this.result_.pending = false;
  }

  /**
   * Called after a request to the querent service. Update the result.
   *
   * @param {ngeox.QuerentResult} response Response
   * @private
   */
  handleResult_(response) {
    let total = 0;

    // (1) Update result sources, i.e. add them
    for (const idStr in response) {
      const id = Number(idStr);
      const dataSource = this.ngeoDataSourcesHelper_.getDataSource(id);
      let label = dataSource.name;
      googAsserts.assert(dataSource);

      const querentResultItem = response[id];
      const features = querentResultItem.features;
      const limit = querentResultItem.limit;
      const tooManyResults = querentResultItem.tooManyFeatures === true;
      const totalFeatureCount = querentResultItem.totalFeatureCount;

      const typeSeparatedFeatures = {};
      features.forEach((feature) => {
        const type = googAsserts.assertString(feature.get('ngeo_feature_type_'));
        if (!typeSeparatedFeatures[type]) {
          typeSeparatedFeatures[type] = [];
        }
        // Use properties aliases if any
        if (dataSource.attributes && dataSource.attributes.length) {
          const properties = feature.getProperties();
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
        this.result_.sources.push({
          features: featuresByType,
          id: id,
          label: label,
          limit: limit,
          pending: false,
          queried: true,
          tooManyResults: tooManyResults,
          totalFeatureCount: totalFeatureCount
        });
        total += features.length;
      }
    }

    // (2) Update total & pending
    this.result_.total = total;
    this.result_.pending = false;
  }

};


/**
 * @type {!angular.Module}
 */
exports.module = angular.module('ngeoMapQuerent', [
  ngeoDatasourceDataSources.module.name,
  ngeoDatasourceHelper.module.name,
  ngeoQueryQuerent.module.name,
]);
exports.module.service('ngeoMapQuerent', exports);


/**
 * The `ngeoQueryResult` is the value service where the features of the query
 * result are added.
 */
exports.module.value('ngeoQueryResult', /** @type {ngeox.QueryResult} */ ({
  sources: [],
  total: 0,
  pending: false
}));


export default exports;
