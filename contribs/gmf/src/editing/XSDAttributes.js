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
 * @hidden
 */
export function EditingXSDAttributeService($http, gmfLayersUrl) {

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
   * @type {Object<number, angular.IPromise<import('ngeo/format/Attribute.js').Attribute[]>>}
   * @private
   */
  this.promises_ = {};

}


/**
 * @param {number} id Layer id.
 * @return {angular.IPromise<import('ngeo/format/Attribute.js').Attribute[]>} Promise.
 */
EditingXSDAttributeService.prototype.getAttributes = function(id) {
  if (!this.promises_[id]) {
    const url = `${this.baseUrl_}/${id}/md.xsd`;
    this.promises_[id] = this.http_.get(url).then(resp => new ngeoFormatXSDAttribute().read(resp.data));
  }
  return this.promises_[id];
};


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfXSDAttributes', []);
module.service('gmfXSDAttributes', EditingXSDAttributeService);


export default module;
