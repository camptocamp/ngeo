import angular from 'angular';
import ngeoQueryAction from 'ngeo/query/Action.js';
import ngeoQueryQuerent from 'ngeo/query/Querent.js';
import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources.js';
import ngeoDatasourceHelper from 'ngeo/datasource/Helper.js';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';

/**
 * Results of the query source.
 *
 * @typedef {Object} QueryResult
 * @property {!Array.<import('ngeo/statemanager/WfsPermalink.js').QueryResultSource>} sources Results for
 *    each query source.
 * @property {number} total The number of results for all sources.
 * @property {boolean} pending If at least one source is pending.
 */

/**
 * The options for the query service.
 *
 * @typedef {Object} QueryOptions
 * @property {number} [limit=50] The maximum number of records per request the query service should ask.
 *    Note that sources sharing the same URL are combined together in a single request. This limit will still
 *    apply to those.
 * @property {boolean} [queryCountFirst=false] For WFS sources, should the number of features first be
 *    requested with `resultType=hits` before requesting the actual features in an seconds request?
 * @property {string} [sourceIdsProperty='querySourceIds'] Defines the name of the layer property that holds
 *    the ids of the sources.
 *    Use this if you have more than one source bound to a layer.
 * @property {number} [tolerance=3] When issuing an identify feature request at a click position, either a
 *    WMS GetFeatureInfo or a WFS GetFeature request will be used. For GetFeature requests a bbox is built
 *    around the position. This `tolerance` in pixel determines the size of the bbox.
 * @property {string} [featureNS='http://mapserver.gis.umn.edu/mapserver'] The feature namespace for WFS
 *    GetFeature requests.
 * @property {string} [featurePrefix='feature'] The feature prefix for WFS GetFeature requests.
 * @property {string} [geometryName='geom'] The name of the geometry property for WFS GetFeature requests.
 * @property {boolean} [cursorHover]
 * @property {boolean} [bboxAsGETParam=false] Pass the queried bbox as a parameter of the GET query on WFS
 *    requests.
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
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @param {import("ngeo/datasource/DataSources.js").DataSource} ngeoDataSources Ngeo data sources service.
   * @param {import("ngeo/datasource/Helper.js").DatasourceHelper} ngeoDataSourcesHelper Ngeo data
   *     sources helper service.
   * @param {import("ngeo/misc/FeatureHelper.js").FeatureHelper} ngeoFeatureHelper Ngeo feature
   *     helper service.
   * @param {import("ngeo/query/Querent.js").Querent} ngeoQuerent The ngeo querent service.
   * @param {QueryResult} ngeoQueryResult The ngeo query result service.
   * @ngdoc service
   * @ngname ngeoQuerent
   * @ngInject
   */
  constructor(
    $injector,
    ngeoDataSources,
    ngeoDataSourcesHelper,
    ngeoFeatureHelper,
    ngeoQuerent,
    ngeoQueryResult
  ) {
    const options = /** @type {QueryOptions} */ (
      $injector.has('ngeoQueryOptions') ? $injector.get('ngeoQueryOptions') : {}
    );

    /**
     * @type {import("ngeo/datasource/DataSource.js").DataSources}
     * @private
     */
    this.dataSources_ = ngeoDataSources.collection;

    /**
     * @type {import("ngeo/misc/FeatureHelper.js").FeatureHelper}
     * @private
     */
    this.featureHelper_ = ngeoFeatureHelper;

    /**
     * @type {import("ngeo/datasource/Helper.js").DatasourceHelper}
     * @private
     */
    this.ngeoDataSourcesHelper_ = ngeoDataSourcesHelper;

    /**
     * @type {import("ngeo/query/Querent.js").Querent}
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
     * When set, before making WFS GetFeature requests to fetch features,
     * WFS GetFeature requests with `resultType = 'hits'` are made first. If
     * the number of records for the request would exceed the limit, then
     * no features are returned.
     *
     * @type {boolean}
     * @private
     */
    this.queryCountFirst_ = options.queryCountFirst !== undefined ? options.queryCountFirst : false;

    /**
     * @type {number}
     * @private
     */
    this.tolerancePx_ = options.tolerance !== undefined ? options.tolerance : 3;

    /**
     * @type {boolean}
     * @private
     */
    this.bboxAsGETParam_ = options.bboxAsGETParam || false;

    /**
     * A hash of data source names classified by ids.
     * @type {Object.<number, string>}
     * @private
     */
    this.dataSourceNames_ = {};

    /**
     * Flag turned on after clearing to make sure that we clear only once.
     * @type {boolean}
     * @private
     */
    this.cleared_ = false;
  }

  /**
   * @param {import('ngeo/query/Querent.js').IssueGetFeaturesOptions} options Options.
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
      tolerancePx: this.tolerancePx_,
      wfsCount: this.queryCountFirst_,
      bboxAsGETParam: this.bboxAsGETParam_,
    });
    this.result_.pending = true;
    this.ngeoQuerent_.issue(options).then(this.handleResult_.bind(this, action));
  }

  /**
   * Clear result, i.e. clear all 'result source' from their features and other
   * information.
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
        source.totalFeatureCount = undefined;
      } else {
        this.result_.total += source.features.length;
      }
      source.pending = false;
      source.queried = false;
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
   * @param {import('ngeo/query/Querent.js').QuerentResult} response Response
   * @private
   */
  handleResult_(action, response) {
    let total = action === ngeoQueryAction.REPLACE ? 0 : this.result_.total;

    // (1) Update result sources, i.e. add them
    for (const idStr in response) {
      const id = Number(idStr);
      const dataSource = this.ngeoDataSourcesHelper_.getDataSource(id);
      let label = dataSource.name;
      console.assert(dataSource);

      const querentResultItem = response[id];
      const features = querentResultItem.features;
      const limit = querentResultItem.limit;
      const tooManyResults = querentResultItem.tooManyFeatures === true;
      const totalFeatureCount = querentResultItem.totalFeatureCount;

      const typeSeparatedFeatures = {};
      features.forEach((feature) => {
        const type = feature.get('ngeo_feature_type_');
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
                newFeature.getId()
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
            queried: true,
            tooManyResults: tooManyResults,
            totalFeatureCount: totalFeatureCount,
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
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoMapQuerent', [
  ngeoDatasourceDataSources.name,
  ngeoDatasourceHelper.name,
  ngeoQueryQuerent.name,
  ngeoMiscFeatureHelper.name,
]);
module.service('ngeoMapQuerent', MapQuerent);

/**
 * The `ngeoQueryResult` is the value service where the features of the query
 * result are added.
 */
module.value(
  'ngeoQueryResult',
  /** @type {QueryResult} */ ({
    sources: [],
    total: 0,
    pending: false,
  })
);

export default module;
