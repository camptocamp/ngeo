/**
 * @module gmf.editing.XSDAttributes
 */
import angular from 'angular';
import ngeoFormatXSDAttribute from 'ngeo/format/XSDAttribute.js';

/**
 * An service used to fetch the XSD attribute definition of layers using their
 * id from a GeoMapFish server.
 *
 * @constructor
 * @param {angular.IHttpService} $http Angular http service.
 * @param {string} gmfLayersUrl Url to the GeoMapFish layers service.
 * @ngInject
 */
const exports = function($http, gmfLayersUrl) {

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
   * @type {Object.<number, !angular.IPromise>}
   * @private
   */
  this.promises_ = {};

};


/**
 * @param {number} id Layer id.
 * @return {angular.IPromise} Promise.
 * @export
 */
exports.prototype.getAttributes = function(id) {
  if (!this.promises_[id]) {
    const url = `${this.baseUrl_}/${id}/md.xsd`;
    this.promises_[id] = this.http_.get(url).then(
      this.handleGetAttributes_.bind(this));
  }
  return this.promises_[id];
};

/**
 * @param {angular.IHttpResponse} resp Ajax response.
 * @return {Array.<Attribute>} List of attributes.
 * @export
 */
exports.prototype.handleGetAttributes_ = function(resp) {
  return new ngeoFormatXSDAttribute().read(resp.data);
};


/**
 * @type {!angular.IModule}
 */
exports.module = angular.module('gmfXSDAttributes', []);
exports.module.service('gmfXSDAttributes', exports);


export default exports;
