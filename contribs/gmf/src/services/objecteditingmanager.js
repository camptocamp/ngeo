goog.provide('gmf.ObjectEditingManager');

goog.require('gmf.EditFeature');
goog.require('ngeo.Location');
goog.require('ol.Feature');


/**
 * A service that looks for certain parameters in the url and use them to fetch
 * a feature using the GMF protocol.
 *
 * @param {angular.$q} $q Angular $q service.
 * @param {gmf.EditFeature} gmfEditFeature Gmf edit feature service.
 * @param {ngeo.Location} ngeoLocation ngeo location service.
 * @constructor
 * @struct
 * @ngInject
 */
gmf.ObjectEditingManager = function($q, gmfEditFeature, ngeoLocation) {

  /**
   * @type {angular.$q}
   * @private
   */
  this.q_ = $q;

  /**
   * @type {gmf.EditFeature}
   * @private
   */
  this.gmfEditFeature_ = gmfEditFeature;

  /**
   * @type {ngeo.Location}
   * @private
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {angular.$q.Deferred|null}
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
 * @return {angular.$q.Promise} Promise.
 * @export
 */
gmf.ObjectEditingManager.prototype.getFeature = function() {

  if (!this.getFeatureDefered_) {
    this.getFeatureDefered_ = this.q_.defer();

    var id = this.ngeoLocation_.getParam(
      gmf.ObjectEditingManager.Param.ID);
    var layer = this.ngeoLocation_.getParam(
      gmf.ObjectEditingManager.Param.LAYER);
    var property = this.ngeoLocation_.getParam(
      gmf.ObjectEditingManager.Param.PROPERTY);
    var theme = this.ngeoLocation_.getParam(
      gmf.ObjectEditingManager.Param.THEME);

    if (id && layer && property && theme) {
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
 * Called after getting features with comparison filters. Resolve the defered
 * promise with the first returned feature (if any), otherwise resolve it
 * with a feature created with an empty geometry and the property key + value
 * that was used in the attempt to fetch it.
 *
 * @param {string} key Property key.
 * @param {string} value Property value.
 * @param {Array.<ol.Feature>} features List of features.
 * @private
 */
gmf.ObjectEditingManager.prototype.handleGetFeatures_ = function(
  key, value, features
) {

  var feature;

  if (features.length) {
    feature = features[0];
  } else {
    var featureProperties = {};
    featureProperties[key] = value;
    featureProperties['geometry'] = null;
    feature = new ol.Feature(featureProperties);
  }

  this.getFeatureDefered_.resolve(feature);
};


gmf.module.service('gmfObjectEditingManager', gmf.ObjectEditingManager);


/**
 * @enum {string}
 * @export
 */
gmf.ObjectEditingManager.Param = {
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
