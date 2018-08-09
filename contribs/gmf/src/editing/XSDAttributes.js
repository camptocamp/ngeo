/**
 * @module gmf.editing.XSDAttributes
 */
import ngeoFormatXSDAttribute from 'ngeo/format/XSDAttribute.js';

/**
 * An service used to fetch the XSD attribute definition of layers using their
 * id from a GeoMapFish server.
 *
 * @constructor
 * @struct
 * @param {angular.$http} $http Angular http service.
 * @param {string} gmfLayersUrl Url to the GeoMapFish layers service.
 * @ngInject
 */
const exports = function($http, gmfLayersUrl) {

  /**
   * @type {angular.$http}
   * @private
   */
  this.http_ = $http;

  /**
   * @type {string}
   * @private
   */
  this.baseUrl_ = gmfLayersUrl;

  /**
   * @type {Object.<number, !angular.$q.Promise>}
   * @private
   */
  this.promises_ = {};

};


/**
 * @param {number} id Layer id.
 * @return {angular.$q.Promise} Promise.
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
 * @param {angular.$http.Response} resp Ajax response.
 * @return {Array.<ngeox.Attribute>} List of attributes.
 * @export
 */
exports.prototype.handleGetAttributes_ = function(resp) {
  return new ngeoFormatXSDAttribute().read(resp.data);
};


/**
 * @type {!angular.Module}
 */
exports.module = angular.module('gmfXSDAttributes', []);
exports.module.service('gmfXSDAttributes', exports);


export default exports;
