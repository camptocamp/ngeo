/**
 * @module import("gmf/objectediting/Manager.js").default
 */
import angular from 'angular';
import gmfEditingEditFeature from 'gmf/editing/EditFeature.js';
import ngeoStatemanagerLocation from 'ngeo/statemanager/Location.js';
import olFeature from 'ol/Feature.js';

/**
 * A service that looks for certain parameters in the url and use them to fetch
 * a feature using the GMF protocol.
 *
 * @param {angular.IQService} $q Angular $q service.
 * @param {import("gmf/editing/EditFeature.js").default} gmfEditFeature Gmf edit feature service.
 * @param {import("ngeo/statemanager/Location.js").default} ngeoLocation ngeo location service.
 * @constructor
 * @ngInject
 */
const exports = function($q, gmfEditFeature, ngeoLocation) {

  /**
   * @type {angular.IQService}
   * @private
   */
  this.q_ = $q;

  /**
   * @type {import("gmf/editing/EditFeature.js").default}
   * @private
   */
  this.gmfEditFeature_ = gmfEditFeature;

  /**
   * @type {import("ngeo/statemanager/Location.js").default}
   * @private
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {angular.IDeferred|null}
   * @private
   */
  this.getFeatureDefered_ = null;

};


/**
 * Use the EditFeature service to fetch a single feature using parameters in
 * the url. The method returns a promise that has the feature as argument in
 * the callback method. If any parameter in the url is missing, `null` is
 * returned, otherwise the query is made. If the query returns a feature, it
 * is returned, otherwise one is created with empty geometry and with the
 * property set.
 *
 * @return {angular.IPromise} Promise.
 * @export
 */
exports.prototype.getFeature = function() {

  if (!this.getFeatureDefered_) {
    this.getFeatureDefered_ = this.q_.defer();

    const geomType = this.ngeoLocation_.getParam(
      exports.Param.GEOM_TYPE);
    const id = this.ngeoLocation_.getParam(
      exports.Param.ID);
    const layer = this.ngeoLocation_.getParam(
      exports.Param.LAYER);
    const property = this.ngeoLocation_.getParam(
      exports.Param.PROPERTY);
    const theme = this.ngeoLocation_.getParam(
      exports.Param.THEME);

    if (geomType && id && layer && property && theme) {
      this.gmfEditFeature_.getFeaturesWithComparisonFilters(
        [layer],
        [{
          operator: 'eq',
          property: property,
          value: id
        }]
      ).then(this.handleGetFeatures_.bind(this, property, id));
    } else {
      this.getFeatureDefered_.resolve(null);
    }
  }

  return this.getFeatureDefered_.promise;

};


/**
 * @return {string|undefined} The geometry type.
 * @export
 */
exports.prototype.getGeomType = function() {
  return this.ngeoLocation_.getParam(
    exports.Param.GEOM_TYPE);
};


/**
 * @return {number|undefined} The gmf layer node id.
 * @export
 */
exports.prototype.getLayerNodeId = function() {
  return this.ngeoLocation_.getParamAsInt(
    exports.Param.LAYER);
};


/**
 * Called after getting features with comparison filters. Resolve the deferred
 * promise with the first returned feature (if any), otherwise resolve it
 * with a feature created with an empty geometry and the property key + value
 * that was used in the attempt to fetch it.
 *
 * @param {string} key Property key.
 * @param {string} value Property value.
 * @param {Array.<import("ol/Feature.js").default>} features List of features.
 * @private
 */
exports.prototype.handleGetFeatures_ = function(key, value, features) {
  let feature;

  if (features.length) {
    feature = features[0];
  } else {
    const featureProperties = {};
    featureProperties[key] = value;
    featureProperties['geometry'] = null;
    feature = new olFeature(featureProperties);
  }

  this.getFeatureDefered_.resolve(feature);
};


/**
 * @enum {string}
 * @export
 */
exports.Param = {
  /**
   * @type {string}
   * @export
   */
  GEOM_TYPE: 'objectediting_geomtype',
  /**
   * @type {string}
   * @export
   */
  ID: 'objectediting_id',
  /**
   * @type {string}
   * @export
   */
  LAYER: 'objectediting_layer',
  /**
   * @type {string}
   * @export
   */
  PROPERTY: 'objectediting_property',
  /**
   * @type {string}
   * @export
   */
  THEME: 'objectediting_theme'
};


/**
 * @type {!angular.IModule}
 */
exports.module = angular.module('gmfObjectEditingManager', [
  gmfEditingEditFeature.module.name,
  ngeoStatemanagerLocation.module.name,
]);
exports.module.service('gmfObjectEditingManager', exports);


export default exports;
