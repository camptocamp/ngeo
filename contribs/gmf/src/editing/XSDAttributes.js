// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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
import ngeoFormatXSDAttribute from 'ngeo/format/XSDAttribute';

/**
 * An service used to fetch the XSD attribute definition of layers using their
 * id from a GeoMapFish server.
 *
 * @class
 * @param {angular.IHttpService} $http Angular http service.
 * @param {string} gmfLayersUrl URL to the GeoMapFish layers service.
 * @ngInject
 * @hidden
 */
export function EditingXSDAttributeService($http, gmfLayersUrl) {
  /**
   * @type {angular.IHttpService}
   */
  this.http_ = $http;

  /**
   * @type {string}
   */
  this.baseUrl_ = gmfLayersUrl;

  /**
   * @type {Object<number, angular.IPromise<import('ngeo/format/Attribute').Attribute[]>>}
   */
  this.promises_ = {};
}

/**
 * @param {number} id Layer id.
 * @returns {angular.IPromise<import('ngeo/format/Attribute').Attribute[]>} Promise.
 */
EditingXSDAttributeService.prototype.getAttributes = function (id) {
  if (!this.promises_[id]) {
    const url = `${this.baseUrl_}/${id}/md.xsd`;
    this.promises_[id] = this.http_.get(url).then((resp) => new ngeoFormatXSDAttribute().read(resp.data));
  }
  return this.promises_[id];
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfXSDAttributes', []);
myModule.service('gmfXSDAttributes', EditingXSDAttributeService);

export default myModule;
