// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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
   */
  this.q_ = $q;

  /**
   * @type {import("gmf/editing/EditFeature.js").EditingEditFeature}
   */
  this.gmfEditFeature_ = gmfEditFeature;

  /**
   * @type {import("ngeo/statemanager/Location.js").StatemanagerLocation}
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {?angular.IDeferred<?olFeature<import("ol/geom/Geometry.js").default>>}
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
 * @return {angular.IPromise<?olFeature<import("ol/geom/Geometry.js").default>>} Promise.
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
 * @param {Array<olFeature<import("ol/geom/Geometry.js").default>>} features List of features.
 */
ObjecteditingManagerService.prototype.handleGetFeatures_ = function (key, value, features) {
  let feature;

  if (features.length) {
    feature = features[0];
  } else {
    /** @type {Object<string, ?string>} */
    const featureProperties = {};
    featureProperties[key] = value;
    featureProperties.geometry = null;
    feature = new olFeature(featureProperties);
  }

  if (!this.getFeatureDefered_) {
    throw new Error('Missing getFeatureDefered');
  }
  this.getFeatureDefered_.resolve(feature);
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfObjectEditingManager', [
  gmfEditingEditFeature.name,
  ngeoStatemanagerLocation.name,
]);
module.service('gmfObjectEditingManager', ObjecteditingManagerService);

export default module;
