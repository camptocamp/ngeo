goog.provide('gmf.EditFeature');

goog.require('gmf');
goog.require('goog.uri.utils');
goog.require('ol.format.GeoJSON');


/**
 * Service that provides methods to get, insert, update and delete vector
 * features with the use of a GeoMapFish server as back-end.
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
   * @type {string}
   * @private
   */
  this.baseUrl_ = gmfLayersUrl;

};


/**
 * @param {Array.<number>} layerIds List of layer ids to get the features from.
 * @param {ol.Extent} extent The extent where to get the features from.
 * @return {angular.$q.Promise} Promise.
 * @export
 */
gmf.EditFeature.prototype.getFeatures = function(layerIds, extent) {
  var ids = layerIds.join(',');
  var url = goog.uri.utils.appendParam(
    goog.uri.utils.appendPath(this.baseUrl_, ids),
    'bbox',
    extent.join(',')
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
  var url = goog.uri.utils.appendPath(this.baseUrl_, layerId.toString());
  var geoJSON = new ol.format.GeoJSON().writeFeatures(features);
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
  var url = goog.uri.utils.appendPath(
    this.baseUrl_,
    layerId.toString() + '/' + feature.getId()
  );
  var geoJSON = new ol.format.GeoJSON().writeFeature(feature);
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
  var url = goog.uri.utils.appendPath(
    this.baseUrl_,
    layerId.toString() + '/' + feature.getId()
  );
  return this.http_.delete(url, {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  });
};


gmf.module.service('gmfEditFeature', gmf.EditFeature);
