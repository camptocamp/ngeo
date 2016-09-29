goog.provide('gmf.XSDAttributes');

goog.require('gmf');
goog.require('goog.uri.utils');
goog.require('ngeo.format.XSDAttribute');


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
gmf.XSDAttributes = function($http, gmfLayersUrl) {

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
gmf.XSDAttributes.prototype.getAttributes = function(id) {
  if (!this.promises_[id]) {
    var url = goog.uri.utils.appendPath(
      this.baseUrl_,
      id.toString()
    ) + '/md.xsd';
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
gmf.XSDAttributes.prototype.handleGetAttributes_ = function(resp) {
  return new ngeo.format.XSDAttribute().read(resp.data);
};


gmf.module.service('gmfXSDAttributes', gmf.XSDAttributes);
