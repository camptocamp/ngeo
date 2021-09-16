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

/**
 * @hidden
 */
export class EditingEnumerateAttributeService {
  /**
   * The EnumerateAttribute is responsible of fetching all possible of a given
   * attribute of a given data source (gmf layer).
   *
   * @param {angular.IHttpService} $http Angular $http service.
   * @param {string} gmfLayersUrl URL to the GeoMapFish layers service.
   * @ngInject
   * @ngdoc service
   * @ngname gmfEnumerateAttribute
   */
  constructor($http, gmfLayersUrl) {
    // === Injected services ===

    /**
     * @type {angular.IHttpService}
     * @private
     */
    this.http_ = $http;

    /**
     * @type {string}
     * @private
     */
    this.baseUrl_ = gmfLayersUrl;

    /**
     * @type {Object<string, angular.IPromise<import('gmf/themes').GmfLayerAttributeValue[]>>}
     * @private
     */
    this.promises_ = {};
  }

  /**
   * @param {import('gmf/datasource/OGC').default} dataSource Data source.
   * @param {string} attribute Attribute name.
   * @returns {angular.IPromise<import('gmf/themes').GmfLayerAttributeValue[]>} Promise.
   */
  getAttributeValues(dataSource, attribute) {
    const promiseId = `${dataSource.id}_${attribute}`;
    const name = dataSource.name;
    if (!this.promises_[promiseId]) {
      const url = `${this.baseUrl_}/${name}/values/${attribute}`;
      this.promises_[promiseId] = this.http_.get(url).then((resp) => resp.data.items);
    }
    return this.promises_[promiseId];
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfEnumerateAttribute', []);
myModule.service('gmfEnumerateAttribute', EditingEnumerateAttributeService);

export default myModule;
