goog.provide('gmf.FeaturestyleController');
goog.provide('gmf.featurestyleDirective');

goog.require('gmf');
goog.require('ngeo.FeatureHelper');
/** @suppress {extraRequire} */
goog.require('ngeo.colorpickerDirective');


/**
 * Directive used to set the style of a vector feature. The options depend
 * on the type of geometry.
 * Example:
 *
 *     <gmf-featurestyle
 *         gmf-featurestyle-feature="ctrl.selectedFeature">
 *     </gmf-featurestyle>
 *
 * @htmlAttribute {ol.Feature} gmf-featurestyle-feature The feature.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfFeaturestyle
 */
gmf.featurestyleDirective = function() {
  return {
    controller: 'GmfFeaturestyleController',
    scope: {
      'feature': '=gmfFeaturestyleFeature'
    },
    bindToController: true,
    controllerAs: 'fsCtrl',
    templateUrl: gmf.baseTemplateUrl + '/featurestyle.html'
  };
};

gmf.module.directive('gmfFeaturestyle', gmf.featurestyleDirective);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {ngeo.FeatureHelper} ngeoFeatureHelper Gmf feature helper service.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfFeaturestyleController
 */
gmf.FeaturestyleController = function($scope, ngeoFeatureHelper) {

  /**
   * @type {?ol.Feature}
   * @export
   */
  this.feature;

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {ngeo.FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  /**
   * @type {?string}
   * @export
   */
  this.color = null;

  /**
   * @type {?string}
   * @export
   */
  this.measure = null;

  $scope.$watch(
    function() {
      return this.color;
    }.bind(this),
    this.handleColorSet_.bind(this)
  );

  /**
   * @type {Array.<ol.EventsKey>}
   * @private
   */
  this.featureListenerKeys_ = [];

  /**
   * @type {?string}
   * @export
   */
  this.type;

  $scope.$watch(
    function() {
      return this.feature;
    }.bind(this),
    this.handleFeatureSet_.bind(this)
  );

};


/**
 * Called when a new feature is set, which can also be null.
 * @param {?ol.Feature} newFeature New feature or null value.
 * @param {?ol.Feature} previousFeature Previous feature or null value.
 * @private
 */
gmf.FeaturestyleController.prototype.handleFeatureSet_ = function(
    newFeature, previousFeature) {

  var keys = this.featureListenerKeys_;

  if (previousFeature) {
    keys.forEach(function(key) {
      ol.events.unlistenByKey(key);
    }, this);
    this.type = null;
    this.color = null;
    this.measure = null;
  }

  if (newFeature) {
    [
      ngeo.FeatureProperties.ANGLE,
      ngeo.FeatureProperties.COLOR,
      ngeo.FeatureProperties.NAME,
      ngeo.FeatureProperties.OPACITY,
      ngeo.FeatureProperties.SHOW_MEASURE,
      ngeo.FeatureProperties.SIZE,
      ngeo.FeatureProperties.STROKE
    ].forEach(function(propName) {
      keys.push(
          ol.events.listen(
              newFeature,
              ol.Object.getChangeEventType(propName),
              this.handleFeatureChange_,
              this
          )
      );
    }, this);

    var geometry = newFeature.getGeometry();
    goog.asserts.assert(geometry, 'Geometry should be thruthy');

    keys.push(
        ol.events.listen(
            geometry,
            'change',
            this.handleGeometryChange_,
            this
        )
    );

    this.type = this.featureHelper_.getType(newFeature);
    this.color = this.featureHelper_.getColorProperty(newFeature);
    this.measure = this.featureHelper_.getMeasure(newFeature);
  }
};


/**
 * @param {?string} newColor Color.
 * @private
 */
gmf.FeaturestyleController.prototype.handleColorSet_ = function(
    newColor) {
  if (this.feature && newColor) {
    var currentColor = this.feature.get(ngeo.FeatureProperties.COLOR);
    if (currentColor !== newColor) {
      this.feature.set(ngeo.FeatureProperties.COLOR, newColor);
    }
  }
};


/**
 * @param {number|undefined} value A name value to set or undefined to get.
 * @return {number} The angle of the feature.
 * @export
 */
gmf.FeaturestyleController.prototype.getSetAngle = function(value) {
  return /** @type {number} */ (
      this.getSetProperty_(ngeo.FeatureProperties.ANGLE, value));
};


/**
 * @param {string|undefined} value A name value to set or undefined to get.
 * @return {string} The name of the feature.
 * @export
 */
gmf.FeaturestyleController.prototype.getSetName = function(value) {
  return /** @type {string} */ (
      this.getSetProperty_(ngeo.FeatureProperties.NAME, value));
};


/**
 * @param {string|undefined} value A stroke value to set or undefined to get.
 * @return {string} The stroke of the feature.
 * @export
 */
gmf.FeaturestyleController.prototype.getSetOpacity = function(value) {
  return /** @type {string} */ (
      this.getSetProperty_(ngeo.FeatureProperties.OPACITY, value));
};


/**
 * @param {boolean|undefined} value A value to set or undefined to get for the
 *     purpose of showing the geometry measurements or not.
 * @return {boolean} Whether to show the measurements or not.
 * @export
 */
gmf.FeaturestyleController.prototype.getSetShowMeasure = function(value) {
  return /** @type {boolean} */ (
      this.getSetProperty_(ngeo.FeatureProperties.SHOW_MEASURE, value));
};


/**
 * @param {string|undefined} value A size value to set or undefined to get.
 * @return {string} The size of the feature.
 * @export
 */
gmf.FeaturestyleController.prototype.getSetSize = function(value) {
  return /** @type {string} */ (
      this.getSetProperty_(ngeo.FeatureProperties.SIZE, value));
};


/**
 * @param {string|undefined} value A stroke value to set or undefined to get.
 * @return {string} The stroke of the feature.
 * @export
 */
gmf.FeaturestyleController.prototype.getSetStroke = function(value) {
  return /** @type {string} */ (
      this.getSetProperty_(ngeo.FeatureProperties.STROKE, value));
};


/**
 * @param {string} key The property name.
 * @param {boolean|number|string|undefined} value A value to set or undefined
 *     to get.
 * @return {boolean|number|string} The property value of the feature.
 * @private
 */
gmf.FeaturestyleController.prototype.getSetProperty_ = function(key, value) {
  if (value !== undefined) {
    this.feature.set(key, value);
  }
  return /** @type {boolean|number|string} */ (this.feature.get(key));
};


/**
 * @private
 */
gmf.FeaturestyleController.prototype.handleFeatureChange_ = function() {
  var feature = this.feature;

  if (!feature) {
    return;
  }

  this.featureHelper_.setStyle(feature, true);
};


/**
 * @private
 */
gmf.FeaturestyleController.prototype.handleGeometryChange_ = function() {
  var feature = this.feature;
  this.measure = this.featureHelper_.getMeasure(feature);

  var showMeasure = this.featureHelper_.getShowMeasureProperty(feature);
  if (showMeasure) {
    this.handleFeatureChange_();
  }

  this.scope_.$apply();
};


gmf.module.controller('GmfFeaturestyleController', gmf.FeaturestyleController);
