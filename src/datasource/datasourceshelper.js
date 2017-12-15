goog.provide('ngeo.datasource.DataSourcesHelper');

goog.require('ngeo');
goog.require('ngeo.datasource.DataSource');
goog.require('ngeo.datasource.DataSources');
goog.require('ngeo.Querent');
goog.require('ngeo.format.WFSAttribute');
goog.require('ol.events');


ngeo.datasource.DataSourcesHelper = class {

  /**
   * A service that provides utility methods to manipulate or get data sources.
   *
   * @struct
   * @param {angular.$q} $q The Angular $q service.
   * @param {ngeo.datasource.DataSources} ngeoDataSources Ngeo data source
   *     collection.
   * @param {ngeo.Querent} ngeoQuerent Ngeo querent service.
   * @ngdoc service
   * @ngname ngeoDataSourcesHelper
   * @ngInject
   */
  constructor($q, ngeoDataSources, ngeoQuerent) {

    // === Injected properties ===

    /**
     * @type {angular.$q}
     * @private
     */
    this.q_ = $q;

    /**
     * @type {ngeo.datasource.DataSources}
     * @private
     */
    this.collection_ = ngeoDataSources;

    /**
     * @type {ngeo.Querent}
     * @private
     */
    this.ngeoQuerent_ = ngeoQuerent;


    // === Other properties ===

    /**
     * @type {Object.<number, ngeo.datasource.DataSource>}
     * @private
     */
    this.cache_ = {};

    // Events

    ol.events.listen(ngeoDataSources, 'add', this.handleDataSourcesAdd_, this);
    ol.events.listen(ngeoDataSources, 'remove', this.handleDataSourcesRemove_, this);
  }

  /**
   * @return {ngeo.datasource.DataSources} Data sources collection.
   * @export
   */
  get collection() {
    return this.collection_;
  }

  /**
   * Return a data source using its id.
   * @param {number} id Data source id.
   * @return {?ngeo.datasource.DataSource} Data source.
   * @export
   */
  getDataSource(id) {
    return this.cache_[id] || null;
  }

  /**
   * Get the attributes of a data source. If they are not set, they are obtained
   * from the querent service using a WFS DescribeFeatureType request, then set
   * in the data source.
   *
   * Please, note that in order to be dynamically set, the data source must
   * only have 1 ogcLayer set and be queryable.
   *
   * @param {ngeo.datasource.OGC} dataSource Filtrable data source.
   * @return {angular.$q.Promise} Promise.
   * @export
   */
  getDataSourceAttributes(dataSource) {

    const wfsDescribeFeatureTypeDefer = this.q_.defer();

    if (dataSource.attributes) {
      wfsDescribeFeatureTypeDefer.resolve(dataSource.attributes);
    } else {
      this.ngeoQuerent_.wfsDescribeFeatureType(
        dataSource
      ).then((featureType) => {
        // We know, at this point, that there's only one definition that
        // was returned.  Just to be sure, let's do a bunch of assertions.
        const ogcLayerName = dataSource.getOGCLayerNames()[0];
        goog.asserts.assertString(
          ogcLayerName, 'The data source should have only one ogcLayer.');
        const element = featureType.element[0];
        goog.asserts.assert(element.name === ogcLayerName);
        goog.asserts.assert(
          featureType.complexType[0].name === element.type);

        const complexContent = featureType['complexType'][0]['complexContent'];
        const attributes = new ngeo.format.WFSAttribute().read(complexContent);

        // Set the attributes in the data source
        dataSource.setAttributes(attributes);

        wfsDescribeFeatureTypeDefer.resolve(attributes);
      });
    }

    return wfsDescribeFeatureTypeDefer.promise;
  }

  /**
   * Called when a new data source is added to the ngeo collection. Add it
   * to the cache.
   * @param {ol.Collection.Event} evt Event
   * @private
   */
  handleDataSourcesAdd_(evt) {
    const dataSource = goog.asserts.assertInstanceof(
      evt.element, ngeo.datasource.DataSource);
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
      evt.element, ngeo.datasource.DataSource);
    delete this.cache_[dataSource.id];
  }

};


ngeo.module.service('ngeoDataSourcesHelper', ngeo.datasource.DataSourcesHelper);
