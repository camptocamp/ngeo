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
import gmfDatasourceHelper from 'gmf/datasource/Helper';
import {ServerType} from 'ngeo/datasource/OGC';

/**
 * @hidden
 */
export class DatasourceWFSAlias {
  /**
   * Service that provides methods to get additional information and actions
   * when performing WFS requests.
   *
   * @param {import('gmf/datasource/Helper').DatasourceHelper} gmfDataSourcesHelper GMF data
   *     source helper service.
   * @ngdoc service
   * @ngname gmfWFSAliases
   * @ngInject
   */
  constructor(gmfDataSourcesHelper) {
    // === Injected properties ===

    /**
     * @type {import('gmf/datasource/Helper').DatasourceHelper}
     * @private
     */
    this.gmfDataSourcesHelper_ = gmfDataSourcesHelper;
  }

  /**
   * @param {import('gmf/datasource/OGC').default} dataSource Data source.
   */
  describe(dataSource) {
    // Only QGIS Server supports WFS aliases
    if (
      dataSource.ogcServerType === ServerType.QGISSERVER &&
      dataSource.wfsUrl_ &&
      dataSource.getWFSLayerNames().length == 1 &&
      !dataSource.attributes
    ) {
      // Trigger an additional WFS DescribeFeatureType request to get
      // datasource attributes, including aliases.
      this.gmfDataSourcesHelper_.getDataSourceAttributes(dataSource);
    }
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfDatasourceWFSAliases', [gmfDatasourceHelper.name]);
myModule.service('gmfWFSAliases', DatasourceWFSAlias);

export default myModule;
