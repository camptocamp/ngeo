import angular from 'angular';
import {getUid as olUtilGetUid} from 'ol/util.js';
import * as olEvents from 'ol/events.js';
import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';

import ngeoMiscColorpickerComponent from 'ngeo/misc/colorpickerComponent.js';

import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';

/**
 * @type {!angular.IModule}
 */
const module = angular.module('gmfDrawingFeatureStyle', [
  ngeoMiscColorpickerComponent.name,
  ngeoMiscFeatureHelper.name,
]);


module.run(/* @ngInject */ ($templateCache) => {
  // @ts-ignore: webpack
  $templateCache.put('gmf/drawing/featureStyleComponent', require('./featureStyleComponent.html'));
});


/**
 * Directive used to set the style of a vector feature. The options depend
 * on the type of geometry.
 * Example:
 *
 *     <gmf-featurestyle
 *         gmf-featurestyle-feature="ctrl.selectedFeature">
 *     </gmf-featurestyle>
 *
 * @htmlAttribute {import("ol/Feature.js").default} gmf-featurestyle-feature The feature.
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfFeaturestyle
 */
function directive() {
  return {
    controller: 'GmfFeaturestyleController as fsCtrl',
    scope: {
      'feature': '=gmfFeaturestyleFeature'
    },
    bindToController: true,
    templateUrl: 'gmf/drawing/featureStyleComponent'
  };
}


module.directive('gmfFeaturestyle', directive);


/**
 * @param {!angular.IScope} $scope Angular scope.
 * @param {import("ngeo/misc/FeatureHelper.js").default} ngeoFeatureHelper Gmf feature helper service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfFeaturestyleController
 */
function Controller($scope, ngeoFeatureHelper) {

  /**
   * @type {number}
   * @export
   */
  this.uid = olUtilGetUid(this);

  /**
   * @type {?import("ol/Feature.js").default}
   * @export
   */
  this.feature;

  /**
   * @type {!angular.IScope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {import("ngeo/misc/FeatureHelper.js").default}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  /**
   * @type {string|undefined}
   * @export
   */
  this.color = undefined;

  /**
   * @type {string|undefined}
   * @export
   */
  this.label = undefined;

  /**
   * @type {string|undefined}
   * @export
   */
  this.measure = undefined;

  $scope.$watch(
    () => this.color,
    this.handleColorSet_.bind(this)
  );

  /**
   * @type {Array.<import("ol/events.js").EventsKey>}
   * @private
   */
  this.featureListenerKeys_ = [];

  /**
   * @type {string|undefined}
   * @export
   */
  this.type;

  $scope.$watch(
    () => this.feature,
    this.handleFeatureSet_.bind(this)
  );

}


/**
 * Called when a new feature is set, which can also be null.
 * @param {?import("ol/Feature.js").default} newFeature New feature or null value.
 * @param {?import("ol/Feature.js").default} previousFeature Previous feature or null value.
 * @private
 */
Controller.prototype.handleFeatureSet_ = function(newFeature, previousFeature) {

  const keys = this.featureListenerKeys_;

  if (previousFeature) {
    keys.forEach(olEvents.unlistenByKey);
    keys.length = 0;
    this.type = undefined;
    this.color = undefined;
    this.measure = undefined;
    this.label = undefined;
  }

  if (newFeature) {
    [
      ngeoFormatFeatureProperties.ANGLE,
      ngeoFormatFeatureProperties.COLOR,
      ngeoFormatFeatureProperties.NAME,
      ngeoFormatFeatureProperties.SHOW_LABEL,
      ngeoFormatFeatureProperties.OPACITY,
      ngeoFormatFeatureProperties.SHOW_MEASURE,
      ngeoFormatFeatureProperties.SIZE,
      ngeoFormatFeatureProperties.STROKE
    ].forEach(function(propName) {
      keys.push(
        olEvents.listen(
          newFeature,
          `change:${propName}`,
          this.handleFeatureChange_,
          this
        )
      );
    }, this);

    const geometry = newFeature.getGeometry();
    console.assert(geometry, 'Geometry should be thruthy');

    keys.push(
      olEvents.listen(
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
 * @param {string|undefined} newColor Color.
 * @private
 */
Controller.prototype.handleColorSet_ = function(newColor) {
  if (this.feature && newColor) {
    const currentColor = this.feature.get(ngeoFormatFeatureProperties.COLOR);
    if (currentColor !== newColor) {
      this.feature.set(ngeoFormatFeatureProperties.COLOR, newColor);
    }
  }
};


/**
 * @param {number|undefined} value A name value to set or undefined to get.
 * @return {number} The angle of the feature.
 * @export
 */
Controller.prototype.getSetAngle = function(value) {
  return this.getSetProperty_(ngeoFormatFeatureProperties.ANGLE, value);
};


/**
 * @param {string|undefined} value A name value to set or undefined to get.
 * @return {string} The name of the feature.
 * @export
 */
Controller.prototype.getSetName = function(value) {
  return this.getSetProperty_(ngeoFormatFeatureProperties.NAME, value);
};

/**
 * @param {boolean|undefined} value A value to set or undefined for the
 *     purpose of showing the attribute labels or not.
 * @return {boolean} Whether to show the labels or not.
 * @export
 */
Controller.prototype.getSetShowLabel = function(value) {
  return typeof this.getSetProperty_(ngeoFormatFeatureProperties.SHOW_LABEL, value);
};

/**
 * @param {number|undefined} value A stroke value to set or undefined to get.
 * @return {number} The stroke of the feature.
 * @export
 */
Controller.prototype.getSetOpacity = function(value) {
  return typeof this.getSetProperty_(ngeoFormatFeatureProperties.OPACITY, value);
};


/**
 * @param {boolean|undefined} value A value to set or undefined to get for the
 *     purpose of showing the geometry measurements or not.
 * @return {boolean} Whether to show the measurements or not.
 * @export
 */
Controller.prototype.getSetShowMeasure = function(value) {
  return this.getSetProperty_(ngeoFormatFeatureProperties.SHOW_MEASURE, value);
};


/**
 * @param {number|undefined} value A size value to set or undefined to get.
 * @return {number} The size of the feature.
 * @export
 */
Controller.prototype.getSetSize = function(value) {
  return this.getSetProperty_(ngeoFormatFeatureProperties.SIZE, value);
};


/**
 * @param {number|undefined} value A stroke value to set or undefined to get.
 * @return {number} The stroke of the feature.
 * @export
 */
Controller.prototype.getSetStroke = function(value) {
  return this.getSetProperty_(ngeoFormatFeatureProperties.STROKE, value);
};


/**
 * @param {string} key The property name.
 * @param {boolean|number|string|undefined} value A value to set or undefined
 *     to get.
 * @return {boolean|number|string} The property value of the feature.
 * @private
 */
Controller.prototype.getSetProperty_ = function(key, value) {
  if (value !== undefined) {
    this.feature.set(key, value);
  }
  return /** @type {boolean|number|string} */ (this.feature.get(key));
};


/**
 * @private
 */
Controller.prototype.handleFeatureChange_ = function() {
  const feature = this.feature;

  if (!feature) {
    return;
  }

  this.featureHelper_.setStyle(feature, true);
};


/**
 * @private
 */
Controller.prototype.handleGeometryChange_ = function() {
  console.assert(this.feature);
  this.measure = this.featureHelper_.getMeasure(this.feature);

  const showMeasure = this.featureHelper_.getShowMeasureProperty(this.feature);
  if (showMeasure) {
    this.handleFeatureChange_();
  }

  this.scope_.$apply();
};


module.controller('GmfFeaturestyleController', Controller);


export default module;
