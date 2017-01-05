goog.provide('gmf.EditFeature');

goog.require('gmf');
goog.require('goog.uri.utils');
goog.require('ol.format.GeoJSON');


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
gmf.EditFeature = function($http, gmfLayersUrl) {

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
gmf.EditFeature.prototype.getFeaturesInExtent = function(layerIds, extent) {
  const ids = layerIds.join(',');
  const url = goog.uri.utils.appendParam(
    goog.uri.utils.appendPath(this.baseUrl_, ids),
    'bbox',
    extent.join(',')
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
 * @param {Array.<number>} layerIds List of layer ids to get the features from.
 * @param {Array.<gmfx.ComparisonFilter>} filters List of comparison filters
 * @return {angular.$q.Promise} Promise.
 */
gmf.EditFeature.prototype.getFeaturesWithComparisonFilters = function(
  layerIds, filters
) {

  const ids = layerIds.join(',');

  const properties = [];
  const params = {};

  let filter;
  for (let i = 0, ii = filters.length; i < ii; i++) {
    filter = filters[i];
    params[filter.property + '__' + filter.operator] = filter.value;
    properties.push(filter.property);
  }

  params['queryable'] = properties.join(',');

  const url = ol.uri.appendParams(
    goog.uri.utils.appendPath(this.baseUrl_, ids),
    params
  );

  return this.http_.get(url).then(this.handleGetFeatures_.bind(this));
};


/**
 * @param {angular.$http.Response} resp Ajax response.
 * @return {Array.<ol.Feature>} List of features.
 * @private
 */
gmf.EditFeature.prototype.handleGetFeatures_ = function(resp) {
  return new ol.format.GeoJSON().readFeatures(resp.data);
};


/**
 * @param {number} layerId The layer id that contains the feature.
 * @param {Array.<ol.Feature>} features List of features to insert.
 * @return {angular.$q.Promise} Promise.
 * @export
 */
gmf.EditFeature.prototype.insertFeatures = function(layerId, features) {
  const url = goog.uri.utils.appendPath(this.baseUrl_, layerId.toString());
  const geoJSON = new ol.format.GeoJSON().writeFeatures(features);
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
gmf.EditFeature.prototype.updateFeature = function(layerId, feature) {
  const url = goog.uri.utils.appendPath(
    this.baseUrl_,
    layerId.toString() + '/' + feature.getId()
  );
  const geoJSON = new ol.format.GeoJSON().writeFeature(feature);
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
gmf.EditFeature.prototype.deleteFeature = function(layerId, feature) {
  const url = goog.uri.utils.appendPath(
    this.baseUrl_,
    layerId.toString() + '/' + feature.getId()
  );
  return this.http_.delete(url, {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  });
};


gmf.module.service('gmfEditFeature', gmf.EditFeature);
