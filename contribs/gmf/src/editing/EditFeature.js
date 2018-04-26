/**
 * @module gmf.editing.EditFeature
 */
import olFormatGeoJSON from 'ol/format/GeoJSON.js';
import * as olUri from 'ol/uri.js';

/**
 * Service that provides methods to get, insert, update and delete vector
 * features with the use of a GeoMapFish Protocol as back-end.
 *
 * The GeoJSON format is used when obtaining or sending features.
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
   * Url to the GeoMapFish layers service. Required in applications that use:
   * - the editfeature tools
   * - the objectediting tools
   *
   * @type {string}
   * @private
   */
  this.baseUrl_ = gmfLayersUrl;

};


/**
 * Build a query to the MapFish protocol to fetch features from a list
 * of layer ids inside a specified extent.
 *
 * @param {Array.<number>} layerIds List of layer ids to get the features from.
 * @param {ol.Extent} extent The extent where to get the features from.
 * @return {angular.$q.Promise} Promise.
 * @export
 */
exports.prototype.getFeaturesInExtent = function(layerIds, extent) {
  const url = olUri.appendParams(
    `${this.baseUrl_}/${layerIds.join(',')}`,
    {
      'bbox': extent.join(',')
    }
  );
  return this.http_.get(url).then(this.handleGetFeatures_.bind(this));
};


/**
 * Build a query to the MapFish protocol to fetch features from a list
 * of layer ids and a list of comparison filters.
 *
 * This method is called in the ObjectEditing service, which is injected in
 * the permalink service, i.e. it's always called. Since we don't have to
 * define the url to the GMF Protocol (layers) a dummy promise returns an
 * empty array of features if the url is not defined.
 *
 * @param {!Array.<number>} layerIds List of layer ids to get the features from.
 * @param {!Array.<!gmfx.ComparisonFilter>} filters List of comparison filters
 * @return {angular.$q.Promise} Promise.
 */
exports.prototype.getFeaturesWithComparisonFilters = function(
  layerIds, filters
) {
  const properties = [];
  const params = {};

  for (const filter of filters) {
    params[`${filter.property}__${filter.operator}`] = filter.value;
    properties.push(filter.property);
  }

  params['queryable'] = properties.join(',');

  const url = olUri.appendParams(`${this.baseUrl_}/${layerIds.join(',')}`, params);
  return this.http_.get(url).then(this.handleGetFeatures_.bind(this));
};


/**
 * @param {angular.$http.Response} resp Ajax response.
 * @return {Array.<ol.Feature>} List of features.
 * @private
 */
exports.prototype.handleGetFeatures_ = function(resp) {
  return new olFormatGeoJSON().readFeatures(resp.data);
};


/**
 * @param {number} layerId The layer id that contains the feature.
 * @param {Array.<ol.Feature>} features List of features to insert.
 * @return {angular.$q.Promise} Promise.
 * @export
 */
exports.prototype.insertFeatures = function(layerId, features) {
  const url = `${this.baseUrl_}/${layerId}`;
  const geoJSON = new olFormatGeoJSON().writeFeatures(features);
  return this.http_.post(url, geoJSON, {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  });
};


/**
 * @param {number} layerId The layer id that contains the feature.
 * @param {ol.Feature} feature The feature to update.
 * @return {angular.$q.Promise} Promise.
 * @export
 */
exports.prototype.updateFeature = function(layerId, feature) {
  const url = `${this.baseUrl_}/${layerId.toString()}/${feature.getId()}`;
  const geoJSON = new olFormatGeoJSON().writeFeature(feature);
  return this.http_.put(url, geoJSON, {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  });
};


/**
 * @param {number} layerId The layer id that contains the feature.
 * @param {ol.Feature} feature The feature to delete.
 * @return {angular.$q.Promise} Promise.
 * @export
 */
exports.prototype.deleteFeature = function(layerId, feature) {
  const url = `${this.baseUrl_}/${layerId.toString()}/${feature.getId()}`;
  return this.http_.delete(url, {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  });
};


/**
 * @type {!angular.Module}
 */
exports.module = angular.module('gmfEditFeature', []);
exports.module.service('gmfEditFeature', exports);


export default exports;
