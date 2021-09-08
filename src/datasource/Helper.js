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
import ngeoDatasourceDataSource from 'ngeo/datasource/DataSource';
import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources';
import {setGeometryType as ngeoAttributeSetGeometryType} from 'ngeo/format/Attribute';
import ngeoFormatWFSAttribute from 'ngeo/format/WFSAttribute';
import ngeoQueryQuerent from 'ngeo/query/Querent';
import {listen} from 'ol/events';
import {CollectionEvent} from 'ol/Collection';

/**
 * @hidden
 */
export class DatasourceHelper {
  /**
   * A service that provides utility methods to manipulate or get data sources.
   *
   * @param {angular.IQService} $q The Angular $q service.
   * @param {import('ngeo/datasource/DataSources').DataSource} ngeoDataSources Ngeo data source
   *     service.
   * @param {import('ngeo/query/Querent').Querent} ngeoQuerent Ngeo querent service.
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
     * @type {import('ngeo/datasource/DataSource').DataSources}
     * @private
     */
    this.collection_ = ngeoDataSources.collection;

    /**
     * @type {import('ngeo/query/Querent').Querent}
     * @private
     */
    this.ngeoQuerent_ = ngeoQuerent;

    // === Other properties ===

    /**
     * @type {Object<number, import('ngeo/datasource/DataSource').default>}
     * @private
     */
    this.cache_ = {};

    // Events
    listen(this.collection_, 'add', this.handleDataSourcesAdd_, this);
    listen(this.collection_, 'remove', this.handleDataSourcesRemove_, this);

    // Register data sources that are already in the collection
    this.collection_.forEach(this.registerDataSource_.bind(this));
  }

  /**
   * @return {import('ngeo/datasource/DataSource').DataSources} Data sources collection.
   */
  get collection() {
    return this.collection_;
  }

  /**
   * Return a data source using its id.
   * @param {number} id Data source id.
   * @return {?import('ngeo/datasource/DataSource').default} Data source.
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
   * @param {import('ngeo/datasource/OGC').default} dataSource Filtrable data source.
   * @return {angular.IPromise<import('ngeo/format/Attribute').Attribute[]>} Promise.
   */
  getDataSourceAttributes(dataSource) {
    const getDataSourceAttributesDefer = this.q_.defer();

    if (dataSource.attributes) {
      getDataSourceAttributesDefer.resolve(dataSource.attributes);
    } else {
      // The data source doesn't have its attributes set yet,
      // therefore we need to get them. There are 2 possible ways to
      // get them:
      //
      // 1) by using the ones defined in the ogcAttributes
      const createdAttributes = this.createDataSourceAttributesFromOGCAttributes_(dataSource);
      if (createdAttributes) {
        dataSource.setAttributes(createdAttributes);
        getDataSourceAttributesDefer.resolve(createdAttributes);
      } else {
        // 2) by launching a WFS DescribeFeatureType request, which is
        // only supported if there is one ogcLayer within the data
        // source.
        this.ngeoQuerent_.wfsDescribeFeatureType(dataSource).then((featureType_) => {
          // We know, at this point, that there's only one definition that
          // was returned.  Just to be sure, let's do a bunch of assertions.
          const ogcLayerName = dataSource.getWFSLayerNames()[0];
          console.assert(typeof ogcLayerName == 'string', 'The data source should have only one ogcLayer.');
          const featureType = /** @type {Object<string, *>} */ (/** @type {unknown} */ (featureType_));
          for (const element of featureType.element) {
            if (element.name === ogcLayerName) {
              for (const type of featureType.complexType) {
                if (type.name == element.type) {
                  const complexContent = type.complexContent;
                  const attributes = new ngeoFormatWFSAttribute().read(complexContent);

                  // Set the attributes in the data source
                  dataSource.setAttributes(attributes);

                  getDataSourceAttributesDefer.resolve(attributes);
                  break;
                }
              }
            }
          }
        });
      }
    }

    return getDataSourceAttributesDefer.promise;
  }

  /**
   * Register a data source, adding it to the cache.
   * @param {ngeoDatasourceDataSource} dataSource An ngeo data source
   * @private
   */
  registerDataSource_(dataSource) {
    this.cache_[dataSource.id] = dataSource;
  }

  /**
   * Unregister a data source, removing it to from cache.
   * @param {ngeoDatasourceDataSource} dataSource An ngeo data source
   * @private
   */
  unregisterDataSource_(dataSource) {
    delete this.cache_[dataSource.id];
  }

  /**
   * Called when a new data source is added to the ngeo collection. Add it
   * to the cache.
   * @param {Event|import('ol/events/Event').default} evt Event
   * @private
   */
  handleDataSourcesAdd_(evt) {
    if (evt instanceof CollectionEvent) {
      const dataSource = evt.element;
      console.assert(dataSource instanceof ngeoDatasourceDataSource);
      this.registerDataSource_(dataSource);
    }
  }

  /**
   * Called when a data source is removed from the ngeo collection. Remove it
   * from the cache.
   * @param {Event|import('ol/events/Event').default} evt Event
   * @private
   */
  handleDataSourcesRemove_(evt) {
    if (evt instanceof CollectionEvent) {
      const dataSource = evt.element;
      this.unregisterDataSource_(dataSource);
    }
  }

  /**
   * Create and return a list of attributes for a data source using
   * the ones that are defined in the `ogcAttributes` property of that
   * data source. The list is build using the ogcAttributes that are
   * supported by the data source, i.e. by those having a WFS layer
   * defined in it.
   *
   * If there are no WFS layer in the data source that are in the
   * ogcAttributes list, then `null` is returned.
   *
   * @param {import('ngeo/datasource/OGC').default} dataSource Filtrable data source.
   * @return {import('ngeo/format/Attribute').Attribute[]} attributes Attributes
   */
  createDataSourceAttributesFromOGCAttributes_(dataSource) {
    let attributes = null;

    const formatWFSAttribute = new ngeoFormatWFSAttribute();
    const ogcAttributes = dataSource.ogcAttributesWFS;
    if (ogcAttributes) {
      attributes = [];
      for (const name in ogcAttributes) {
        const ogcAttribute = ogcAttributes[name];

        const alias = ogcAttribute.alias;
        const required = ogcAttribute.minOccurs != '0';
        const type = ogcAttribute.type;

        /** @type {import('ngeo/format/Attribute').Attribute} */
        const attribute = {
          alias,
          name,
          required,
        };

        // Set the type of attribute. If the type is any geometry one,
        // then the attribute type is set to geometry and geomType is
        // set depending on the geometry type. This is handled by the
        // method below. If the type is not any geometry one, then set
        // it to a ngeoFormatAttributeType.
        if (!ngeoAttributeSetGeometryType(attribute, `gml:${type}`)) {
          formatWFSAttribute.setAttributeType(attribute, type.toLowerCase());
        }

        attributes.push(attribute);
      }
    }

    return attributes;
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoDataSourcesHelper', [
  ngeoDatasourceDataSources.name,
  ngeoQueryQuerent.name,
]);
myModule.service('ngeoDataSourcesHelper', DatasourceHelper);

export default myModule;
