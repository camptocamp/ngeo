goog.provide('ngeo.MapQuerent');

goog.require('ngeo');
goog.require('ngeo.Querent');
goog.require('ngeo.DataSourcesHelper');


/**
 * The `ngeoQueryResult` is the value service where the features of the query
 * result are added.
 */
ngeo.module.value('ngeoQueryResult', /** @type {ngeox.QueryResult} */ ({
  sources: [],
  total: 0,
  pending: false
}));


ngeo.MapQuerent = class {

  /**
   * The ngeo Map Querent is the service bound to a map that issues
   * queries using the Querent service. The result is stored inside this
   * service.
   *
   * NOTE: This will replace the ngeo.Query service.
   *
   * @struct
   * @param {angular.$injector} $injector Main injector.
   * @param {ngeo.DataSources} ngeoDataSources Ngeo collection of data source
   *     objects.
   * @param {ngeo.DataSourcesHelper} ngeoDataSourcesHelper Ngeo data sources
   *     helper service.
   * @param {ngeo.Querent} ngeoQuerent The ngeo querent service.
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
     * @type {ngeo.DataSources}
     * @private
     */
    this.ngeoDataSources_ = ngeoDataSources;

    /**
     * @type {ngeo.DataSourcesHelper}
     * @private
     */
    this.ngeoDataSourcesHelper_ = ngeoDataSourcesHelper;

    /**
     * @type {ngeo.Querent}
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
     * FIXME
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

    // (2) Get queryable data sources
    const queryableDataSources = this.ngeoQuerent_.getQueryableDataSources(
      this.ngeoDataSources_.getArray(),
      options.map
    );

    // (3) Update query options, update the pending property and issue the
    //     request.
    ol.obj.assign(options, {
      queryableDataSources,
      limit: this.limit_,
      tolerancePx: this.tolerancePx_
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
   * @param {!Object.<number, !Array.<!ol.Feature>>} response Response
   * @private
   */
  handleResult_(response) {
    let total = 0;

    // (1) Update result sources, i.e. add them
    for (const idStr in response) {
      const id = Number(idStr);
      const dataSource = this.ngeoDataSourcesHelper_.getDataSource(id);
      const label = dataSource.name;
      goog.asserts.assert(dataSource);

      const features = response[id];
      goog.asserts.assert(features);
      this.result_.sources.push({
        features,
        id,
        label,
        pending: false,
        queried: true,
        tooManyResults: false
      });
      total += features.length;
    }

    // (2) Update total & pending
    this.result_.total = total;
    this.result_.pending = false;
  }

};


ngeo.module.service('ngeoMapQuerent', ngeo.MapQuerent);
