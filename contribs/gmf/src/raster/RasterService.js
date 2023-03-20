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
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {string}
   * @private
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
 * @param {Object=} opt_params Optional parameters for the request.
 * @return {angular.IPromise} Promise.
 */
RasterService.prototype.getRaster = function (coordinate, opt_params) {
  const params = opt_params || {};
  params[Param.X] = coordinate[0];
  params[Param.Y] = coordinate[1];

  return this.$http_
    .get(this.url_, {
      params,
    })
    .then(this.handleGetRaster_.bind(this));
};

/**
 * @param {angular.IHttpResponse} resp Ajax response.
 * @return {Object.<string, number>} The response object.
 * @private
 */
RasterService.prototype.handleGetRaster_ = function (resp) {
  return resp.data;
};

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfRaster', []);
module.service('gmfRaster', RasterService);

export default module;
