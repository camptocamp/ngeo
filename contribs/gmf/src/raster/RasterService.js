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

/**
 * The Raster service.
 * Uses the c2cgeoportal's raster to obtain different kinds of
 * information at a specific coordinate.
 * @constructor
 * @param {angular.IHttpService} $http Angular http service.
 * @param {string} gmfRasterUrl URL to a the c2cgeoportal raster service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfRaster
 * @hidden
 */
export function RasterService($http, gmfRasterUrl) {
  /**
   * @type {angular.IHttpService}
   */
  this.$http_ = $http;

  /**
   * @type {string}
   */
  this.url_ = gmfRasterUrl;
}

/**
 * @enum {string}
 * @hidden
 */
const Param = {
  X: 'lon',
  Y: 'lat',
};

/**
 * @param {import("ol/coordinate.js").Coordinate} coordinate Coordinate.
 * @param {Object<string, string|number>=} opt_params Optional parameters for the request.
 * @return {angular.IPromise<Object<string, number>>} Promise.
 */
RasterService.prototype.getRaster = function (coordinate, opt_params) {
  const params = opt_params || /** @type {Object<string, string|number>} */ ({});
  params[Param.X] = coordinate[0];
  params[Param.Y] = coordinate[1];

  return this.$http_.get(this.url_, {params}).then((resp) => resp.data);
};

/**
 * @param {angular.IHttpResponse<Object<string, number>>} resp Ajax response.
 * @return {Object<string, number>} The response object.
 * @private
 */
RasterService.prototype.handleGetRaster_ = function (resp) {
  return resp.data;
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfRaster', []);
module.service('gmfRaster', RasterService);

export default module;
