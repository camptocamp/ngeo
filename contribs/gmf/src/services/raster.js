goog.provide('gmf.Raster');

goog.require('gmf');


/**
 * @enum {string}
 */
gmf.RasterParam = {
  X: 'lon',
  Y: 'lat'
};


/**
 * The Raster service.
 * Uses the c2cgeoportal's raster to obtain different kinds of
 * information at a specific coordinate.
 * @constructor
 * @struct
 * @param {angular.$http} $http Angular http service.
 * @param {string} gmfRasterUrl URL to a the c2cgeoportal raster service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfRaster
 */
gmf.Raster = function($http, gmfRasterUrl) {

  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {string}
   * @private
   */
  this.url_ = gmfRasterUrl;
};


/**
 * @param {ol.Coordinate} coordinate Coordinate.
 * @param {Object=} opt_params Optional parameters for the request.
 * @return {angular.$q.Promise} Promise.
 * @export
 */
gmf.Raster.prototype.getRaster = function(coordinate, opt_params) {

  const params = opt_params || {};
  params[gmf.RasterParam.X] = coordinate[0];
  params[gmf.RasterParam.Y] = coordinate[1];

  return this.$http_.get(this.url_, {
    params
  }).then(this.handleGetRaster_.bind(this));
};


/**
 * @param {angular.$http.Response} resp Ajax response.
 * @return {Object.<string, number>} The response object.
 * @private
 */
gmf.Raster.prototype.handleGetRaster_ = function(resp) {
  return resp.data;
};


gmf.module.service('gmfRaster', gmf.Raster);
