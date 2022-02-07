// The MIT License (MIT)
//
// Copyright (c) 2017-2022 Camptocamp SA
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
import gmfEditingEnumerateAttribute from 'gmf/editing/EnumerateAttribute';
import ngeoDatasourceHelper from 'ngeo/datasource/Helper';
import ngeoFormatAttributeType from 'ngeo/format/AttributeType';

/**
 * @hidden
 */
export class DatasourceHelper {
  /**
   * A service that provides utility methods to manipulate or get GMF data
   * sources.
   *
   * @param {angular.IQService} $q The Angular $q service.
   * @param {import('gmf/editing/EnumerateAttribute').EditingEnumerateAttributeService} gmfEnumerateAttribute
   *    The Gmf enumerate attribute service.
   * @param {import('ngeo/datasource/Helper').DatasourceHelper} ngeoDataSourcesHelper Ngeo data
   *     source helper service.
   * @ngdoc service
   * @ngname gmfDataSourcesHelper
   * @ngInject
   */
  constructor($q, gmfEnumerateAttribute, ngeoDataSourcesHelper) {
    // === Injected properties ===

    /**
     * @type {angular.IQService}
     * @private
     */
    this.q_ = $q;

    /**
     * @type {import('gmf/editing/EnumerateAttribute').EditingEnumerateAttributeService}
     * @private
     */
    this.gmfEnumerateAttribute_ = gmfEnumerateAttribute;

    /**
     * @type {import('ngeo/datasource/Helper').DatasourceHelper}
     * @private
     */
    this.ngeoDataSourcesHelper_ = ngeoDataSourcesHelper;

    // === Other properties ===

    /**
     * @type {?import('ngeo/datasource/DataSource').DataSources}
     * @protected
     */
    this.collection_ = null;

    /**
     * @type {Object<number, import('gmf/datasource/OGC').default>}
     * @protected
     */
    this.cache_ = {};
  }

  /**
   * @returns {import('ngeo/datasource/DataSource').DataSources} Data sources collection.
   */
  get collection() {
    return this.ngeoDataSourcesHelper_.collection;
  }

  /**
   * Return a data source using its id.
   *
   * @param {number} id Data source id.
   * @returns {?import('gmf/datasource/OGC').default} Data source.
   */
  getDataSource(id) {
    return /** @type {?import('gmf/datasource/OGC').default} */ this.ngeoDataSourcesHelper_.getDataSource(id);
  }

  /**
   * @param {import('gmf/datasource/OGC').default} dataSource Filtrable data source.
   * @returns {angular.IPromise<import('gmf/datasource/OGC').default>} Promise.
   */
  prepareFiltrableDataSource(dataSource) {
    const prepareFiltrableDataSourceDefer = this.q_.defer();

    // (1) Get the attributes. The first time, they will be asynchronously
    //     obtained using a WFS DescribeFeatureType request.
    this.ngeoDataSourcesHelper_.getDataSourceAttributes(dataSource).then((attributes) => {
      // (2) The attribute names that are in the `enumeratedAttributes`
      //     metadata are the ones that need to have their values fetched.
      //     Do that once then set the type to SELECT and the choices.
      const enumAttributes = dataSource.gmfLayer.metadata
        ? dataSource.gmfLayer.metadata.enumeratedAttributes
        : undefined;
      if (enumAttributes && enumAttributes.length) {
        const promises = [];
        for (const attribute of attributes) {
          if (
            enumAttributes.includes(attribute.name) &&
            attribute.type !== ngeoFormatAttributeType.SELECT &&
            (!attribute.choices || !attribute.choices.length)
          ) {
            promises.push(
              this.gmfEnumerateAttribute_.getAttributeValues(dataSource, attribute.name).then((values) => {
                const choices = values.map((choice) => choice.value);
                attribute.type = ngeoFormatAttributeType.SELECT;
                attribute.choices = choices;
              })
            );
          }
        }
        return this.q_.all(promises).then(() => {
          prepareFiltrableDataSourceDefer.resolve(dataSource);
        });
      } else {
        prepareFiltrableDataSourceDefer.resolve(dataSource);
      }
    });

    return prepareFiltrableDataSourceDefer.promise;
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfDataSourcesHelper', [
  ngeoDatasourceHelper.name,
  gmfEditingEnumerateAttribute.name,
]);
myModule.service('gmfDataSourcesHelper', DatasourceHelper);

export default myModule;
