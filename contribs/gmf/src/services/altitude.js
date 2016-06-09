goog.provide('gmf.Altitude');

goog.require('gmf');


/**
 * @enum {string}
 */
gmf.AltitudeParam = {
  X: 'lon',
  Y: 'lat'
};


/**
 * The Altitude service, uses the
 * c2cgeoportal's raster to obtain different kinds of altitude information
 * at a specific coordinate.
 * @constructor
 * @param {angular.$http} $http Angular http service.
 * @param {string} gmfRasterUrl URL to a raster service with altitude layers.
 * @ngInject
 * @ngdoc service
 * @ngname gmfAltitude
 */
gmf.Altitude = function($http, gmfRasterUrl) {

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
gmf.Altitude.prototype.getAltitude = function(coordinate, opt_params) {

  var params = opt_params || {};
  params[gmf.AltitudeParam.X] = coordinate[0];
  params[gmf.AltitudeParam.Y] = coordinate[1];

  return this.$http_.get(this.url_, {
    params: params,
    withCredentials: true
  }).then(this.handleGetAltitude_.bind(this));
};


/**
 * @param {angular.$http.Response} resp Ajax response.
 * @return {Object.<string, number>} The altitude object.
 * @private
 */
gmf.Altitude.prototype.handleGetAltitude_ = function(resp) {
  return resp.data;
};


gmf.module.service('gmfAltitude', gmf.Altitude);
