import angular from 'angular';
import ngeoDatasourceDataSource from 'ngeo/datasource/DataSource.js';
import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources.js';
import ngeoFormatWFSAttribute from 'ngeo/format/WFSAttribute.js';
import ngeoQueryQuerent from 'ngeo/query/Querent.js';
import * as olEvents from 'ol/events.js';

/**
 * @hidden
 */
export class DatasourceHelper {
  /**
   * A service that provides utility methods to manipulate or get data sources.
   *
   * @param {angular.IQService} $q The Angular $q service.
   * @param {import("ngeo/datasource/DataSources.js").DataSource} ngeoDataSources Ngeo data source
   *     service.
   * @param {import("ngeo/query/Querent.js").Querent} ngeoQuerent Ngeo querent service.
   * @ngdoc service
   * @ngname ngeoDataSourcesHelper
   * @ngInject
   */
  constructor($q, ngeoDataSources, ngeoQuerent) {
    // === Injected properties ===

    /**
     * @type {angular.IQService}
     * @private
     */
    this.q_ = $q;

    /**
     * @type {import('ngeo/datasource/DataSource.js').DataSources}
     * @private
     */
    this.collection_ = ngeoDataSources.collection;

    /**
     * @type {import("ngeo/query/Querent.js").Querent}
     * @private
     */
    this.ngeoQuerent_ = ngeoQuerent;

    // === Other properties ===

    /**
     * @type {Object.<number, import("ngeo/datasource/DataSource.js").default>}
     * @private
     */
    this.cache_ = {};

    // Events

    olEvents.listen(this.collection_, 'add', this.handleDataSourcesAdd_, this);
    olEvents.listen(this.collection_, 'remove', this.handleDataSourcesRemove_, this);
  }

  /**
   * @return {import('ngeo/datasource/DataSource.js').DataSources} Data sources collection.
   */
  get collection() {
    return this.collection_;
  }

  /**
   * Return a data source using its id.
   * @param {number} id Data source id.
   * @return {?import("ngeo/datasource/DataSource.js").default} Data source.
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
   * @param {import("ngeo/datasource/OGC.js").default} dataSource Filtrable data source.
   * @return {angular.IPromise} Promise.
   */
  getDataSourceAttributes(dataSource) {
    const wfsDescribeFeatureTypeDefer = this.q_.defer();

    if (dataSource.attributes) {
      wfsDescribeFeatureTypeDefer.resolve(dataSource.attributes);
    } else {
      this.ngeoQuerent_.wfsDescribeFeatureType(dataSource).then((featureType) => {
        // We know, at this point, that there's only one definition that
        // was returned.  Just to be sure, let's do a bunch of assertions.
        const ogcLayerName = dataSource.getWFSLayerNames()[0];
        console.assert(typeof ogcLayerName == 'string', 'The data source should have only one ogcLayer.');
        for (const element of featureType.element) {
          if (element.name === ogcLayerName) {
            for (const type of featureType.complexType) {
              if (type.name == element.type) {
                const complexContent = type.complexContent;
                const attributes = new ngeoFormatWFSAttribute().read(complexContent);

                // Set the attributes in the data source
                dataSource.setAttributes(attributes);

                wfsDescribeFeatureTypeDefer.resolve(attributes);
                break;
              }
            }
          }
        }
      });
    }

    return wfsDescribeFeatureTypeDefer.promise;
  }

  /**
   * Called when a new data source is added to the ngeo collection. Add it
   * to the cache.
   * @param {import("ol/Collection.js").CollectionEvent} evt Event
   * @private
   */
  handleDataSourcesAdd_(evt) {
    const dataSource = evt.element;
    console.assert(dataSource instanceof ngeoDatasourceDataSource);
    this.cache_[dataSource.id] = dataSource;
  }

  /**
   * Called when a data source is removed from the ngeo collection. Remove it
   * from the cache.
   * @param {import("ol/Collection.js").CollectionEvent} evt Event
   * @private
   */
  handleDataSourcesRemove_(evt) {
    const dataSource = evt.element;
    delete this.cache_[dataSource.id];
  }
}

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoDataSourcesHelper', [
  ngeoDatasourceDataSources.name,
  ngeoQueryQuerent.name,
]);
module.service('ngeoDataSourcesHelper', DatasourceHelper);

export default module;
