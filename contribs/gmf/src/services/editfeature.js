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
 * @param {angular.$injector} $injector Main injector.
 * @param {angular.$q} $q Angular $q service.
 * @ngInject
 */
gmf.EditFeature = function($http, $injector, $q) {

  /**
   * @type {angular.$http}
   * @private
   */
  this.http_ = $http;

  /**
   * @type {angular.$q}
   * @private
   */
  this.q_ = $q;

  /**
   * Url to the GeoMapFish layers service. Required in applications that use:
   * - the editfeature tools
   * - the objectediting tools
   *
   * @type {?string}
   * @private
   */
  this.baseUrl_ = $injector.has('gmfLayersUrl') ?
    $injector.get('gmfLayersUrl') : null;

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
  goog.asserts.assert(this.baseUrl_, 'GMF layers url must be defined');
  var ids = layerIds.join(',');
  var url = goog.uri.utils.appendParam(
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
 * @export
 */
gmf.EditFeature.prototype.getFeaturesWithComparisonFilters = function(
  layerIds, filters
) {

  if (this.baseUrl_) {
    goog.asserts.assert(filters.length, 'Should have at least one filter.');

    var ids = layerIds.join(',');

    var properties = [];
    var params = {};

    var filter;
    for (var i = 0, ii = filters.length; i < ii; i++) {
      filter = filters[i];
      params[filter.property + '__' + filter.operator] = filter.value;
      properties.push(filter.property);
    }

    params['queryable'] = properties.join(',');

    var url = ol.uri.appendParams(
      goog.uri.utils.appendPath(this.baseUrl_, ids),
      params
    );

    return this.http_.get(url).then(this.handleGetFeatures_.bind(this));
  } else {
    // Dummy promise
    var deferred = this.q_.defer();
    deferred.resolve([]);
    return deferred.promise;
  }
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
  goog.asserts.assert(this.baseUrl_, 'GMF layers url must be defined');
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
  goog.asserts.assert(this.baseUrl_, 'GMF layers url must be defined');
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
  goog.asserts.assert(this.baseUrl_, 'GMF layers url must be defined');
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
