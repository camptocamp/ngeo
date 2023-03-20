import angular from 'angular';
import gmfEditingEditFeature from 'gmf/editing/EditFeature.js';
import ngeoStatemanagerLocation from 'ngeo/statemanager/Location.js';
import olFeature from 'ol/Feature.js';

/**
 * @enum {string}
 * @hidden
 */
export const ObjecteditingParam = {
  /**
   * @type {string}
   */
  GEOM_TYPE: 'objectediting_geomtype',
  /**
   * @type {string}
   */
  ID: 'objectediting_id',
  /**
   * @type {string}
   */
  LAYER: 'objectediting_layer',
  /**
   * @type {string}
   */
  PROPERTY: 'objectediting_property',
  /**
   * @type {string}
   */
  THEME: 'objectediting_theme',
};

/**
 * A service that looks for certain parameters in the url and use them to fetch
 * a feature using the GMF protocol.
 *
 * @param {angular.IQService} $q Angular $q service.
 * @param {import("gmf/editing/EditFeature.js").EditingEditFeature} gmfEditFeature Gmf edit feature service.
 * @param {import("ngeo/statemanager/Location.js").StatemanagerLocation} ngeoLocation ngeo location service.
 * @constructor
 * @ngInject
 * @hidden
 */
export function ObjecteditingManagerService($q, gmfEditFeature, ngeoLocation) {
  /**
   * @type {angular.IQService}
   * @private
   */
  this.q_ = $q;

  /**
   * @type {import("gmf/editing/EditFeature.js").EditingEditFeature}
   * @private
   */
  this.gmfEditFeature_ = gmfEditFeature;

  /**
   * @type {import("ngeo/statemanager/Location.js").StatemanagerLocation}
   * @private
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {angular.IDeferred|null}
   * @private
   */
  this.getFeatureDefered_ = null;
}

/**
 * Use the EditFeature service to fetch a single feature using parameters in
 * the url. The method returns a promise that has the feature as argument in
 * the callback method. If any parameter in the url is missing, `null` is
 * returned, otherwise the query is made. If the query returns a feature, it
 * is returned, otherwise one is created with empty geometry and with the
 * property set.
 *
 * @return {angular.IPromise} Promise.
 */
ObjecteditingManagerService.prototype.getFeature = function () {
  if (!this.getFeatureDefered_) {
    this.getFeatureDefered_ = this.q_.defer();

    const geomType = this.ngeoLocation_.getParam(ObjecteditingParam.GEOM_TYPE);
    const id = this.ngeoLocation_.getParam(ObjecteditingParam.ID);
    const layer = this.ngeoLocation_.getParam(ObjecteditingParam.LAYER);
    const property = this.ngeoLocation_.getParam(ObjecteditingParam.PROPERTY);
    const theme = this.ngeoLocation_.getParam(ObjecteditingParam.THEME);

    if (geomType && id && layer && property && theme) {
      this.gmfEditFeature_
        .getFeaturesWithComparisonFilters(
          [layer],
          [
            {
              operator: 'eq',
              property: property,
              value: id,
            },
          ]
        )
        .then(this.handleGetFeatures_.bind(this, property, id));
    } else {
      this.getFeatureDefered_.resolve(null);
    }
  }

  return this.getFeatureDefered_.promise;
};

/**
 * @return {string|undefined} The geometry type.
 */
ObjecteditingManagerService.prototype.getGeomType = function () {
  return this.ngeoLocation_.getParam(ObjecteditingParam.GEOM_TYPE);
};

/**
 * @return {number|undefined} The gmf layer node id.
 */
ObjecteditingManagerService.prototype.getLayerNodeId = function () {
  return this.ngeoLocation_.getParamAsInt(ObjecteditingParam.LAYER);
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
ObjecteditingManagerService.prototype.handleGetFeatures_ = function (key, value, features) {
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
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfObjectEditingManager', [
  gmfEditingEditFeature.name,
  ngeoStatemanagerLocation.name,
]);
module.service('gmfObjectEditingManager', ObjecteditingManagerService);

export default module;
