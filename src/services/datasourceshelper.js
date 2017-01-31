goog.provide('ngeo.DataSourcesHelper');

goog.require('ngeo');
goog.require('ngeo.DataSource');
goog.require('ngeo.DataSources');

goog.require('ol.events');
goog.require('ol.CollectionEventType');


ngeo.DataSourcesHelper = class {

  /**
   * A service that provides utility methods to manipulate or get data sources.
   *
   * @struct
   * @param {ngeo.DataSources} ngeoDataSources Ngeo collection of data source
   *     objects.
   * @ngdoc service
   * @ngname ngeoDataSourcesHelper
   * @ngInject
   */
  constructor(ngeoDataSources) {

    /**
     * @type {ngeo.DataSources}
     * @private
     */
    this.collection_ = ngeoDataSources;

    /**
     * @type {Object.<number, ngeo.DataSource>}
     * @private
     */
    this.cache_ = {};

    // Events

    ol.events.listen(
      ngeoDataSources,
      ol.CollectionEventType.ADD,
      this.handleDataSourcesAdd_,
      this
    );
    ol.events.listen(
      ngeoDataSources,
      ol.CollectionEventType.REMOVE,
      this.handleDataSourcesRemove_,
      this
    );
  }

  /**
   * @return {ngeo.DataSources} Data sources collection.
   * @export
   */
  get collection() {
    return this.collection_;
  }

  /**
   * Return a data source using its id.
   * @param {number} id Data source id.
   * @return {?ngeo.DataSource} Data source.
   * @export
   */
  getDataSource(id) {
    return this.cache_[id] || null;
  }

  /**
   * Called when a new data source is added to the ngeo collection. Add it
   * to the cache.
   * @param {ol.Collection.Event} evt Event
   * @private
   */
  handleDataSourcesAdd_(evt) {
    const dataSource = goog.asserts.assertInstanceof(
      evt.element, ngeo.DataSource);
    this.cache_[dataSource.id] = dataSource;
  }

  /**
   * Called when a data source is removed from the ngeo collection. Remove it
   * from the cache.
   * @param {ol.Collection.Event} evt Event
   * @private
   */
  handleDataSourcesRemove_(evt) {
    const dataSource = goog.asserts.assertInstanceof(
      evt.element, ngeo.DataSource);
    delete this.cache_[dataSource.id];
  }

};


ngeo.module.service('ngeoDataSourcesHelper', ngeo.DataSourcesHelper);
