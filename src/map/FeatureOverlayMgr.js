// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
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
import ngeoMapFeatureOverlay, {FeatureOverlay} from 'ngeo/map/FeatureOverlay';
import {getUid as olUtilGetUid} from 'ol/util';
import olLayerVector from 'ol/layer/Vector';
import {isEmpty} from 'ol/obj';
import olSourceVector from 'ol/source/Vector';
import {toFunction as toStyleFunction, createDefaultStyle as olStyleDefaultFunction} from 'ol/style/Style';

/**
 * @typedef {Object} MapFeatureOverlayGroup
 * @property {import('ol/style/Style').StyleFunction} styleFunction
 * @property {Object<string, import('ol/Feature').default<import('ol/geom/Geometry').default>>} features
 */

/**
 * Provides a service that wraps an "unmanaged" vector layer,
 * used as a shared vector layer across the application.
 *
 * Example:
 *
 * The application's main component/controller initializes the feature
 * overlay manager with the map:
 *
 *     ngeoFeatureOverlayMgr.init(map);
 *
 * Once initialized, components of the application can use the manager to
 * create a feature overlay, configuring it with specific styles:
 *
 *     let featureOverlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
 *     featureOverlay.setStyle(myStyle);
 *     featureOverlay.addFeature(myFeature);
 *
 * @class
 * @ngdoc service
 * @ngname ngeoFeatureOverlayMgr
 * @hidden
 */
export function FeatureOverlayMgr() {
  /**
   * @type {Object<string, number>}
   */
  this.featureUidToGroupIndex_ = {};

  /**
   * @type {MapFeatureOverlayGroup[]}
   */
  this.groups_ = [];

  /**
   * @type {import('ol/source/Vector').default<import('ol/geom/Geometry').default>}
   */
  this.source_ = new olSourceVector({
    useSpatialIndex: false,
  });

  /**
   * @type {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
   */
  this.layer_ = new olLayerVector({
    source: this.source_,
    style: this.styleFunction_.bind(this),
    updateWhileAnimating: true,
    updateWhileInteracting: true,
  });
}

/**
 * @param {number} groupIndex The group groupIndex.
 * @return {boolean} True if the group has no features. False otherwise.
 */
FeatureOverlayMgr.prototype.isEmpty = function (groupIndex) {
  console.assert(groupIndex >= 0);
  console.assert(groupIndex < this.groups_.length);
  return isEmpty(this.groups_[groupIndex].features);
};

/**
 * @param {import('ol/Feature').default<import('ol/geom/Geometry').default>} feature The feature to add.
 * @param {number} groupIndex The group groupIndex.
 */
FeatureOverlayMgr.prototype.addFeature = function (feature, groupIndex) {
  console.assert(groupIndex >= 0);
  console.assert(groupIndex < this.groups_.length);
  const featureUid = olUtilGetUid(feature).toString();
  this.featureUidToGroupIndex_[featureUid] = groupIndex;
  this.groups_[groupIndex].features[featureUid] = feature;
  this.source_.addFeature(feature);
};

/**
 * @param {import('ol/Feature').default<import('ol/geom/Geometry').default>} feature The feature to add.
 * @param {number} groupIndex The group groupIndex.
 */
FeatureOverlayMgr.prototype.removeFeature = function (feature, groupIndex) {
  console.assert(groupIndex >= 0);
  console.assert(groupIndex < this.groups_.length);
  const featureUid = olUtilGetUid(feature).toString();
  delete this.featureUidToGroupIndex_[featureUid];
  delete this.groups_[groupIndex].features[featureUid];
  this.source_.removeFeature(feature);
};

/**
 * @param {number} groupIndex The group groupIndex.
 */
FeatureOverlayMgr.prototype.clear = function (groupIndex) {
  console.assert(groupIndex >= 0);
  console.assert(groupIndex < this.groups_.length);
  const group = this.groups_[groupIndex];
  for (const featureUid in group.features) {
    this.removeFeature(group.features[featureUid], groupIndex);
  }
  console.assert(isEmpty(group.features));
};

/**
 * @return {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>} The vector layer used internally.
 */
FeatureOverlayMgr.prototype.getLayer = function () {
  return this.layer_;
};

/**
 * @return {import('ngeo/map/FeatureOverlay').FeatureOverlay} Feature overlay.
 */
FeatureOverlayMgr.prototype.getFeatureOverlay = function () {
  const groupIndex = this.groups_.length;
  this.groups_.push({
    styleFunction: olStyleDefaultFunction,
    features: {},
  });
  return new FeatureOverlay(this, groupIndex);
};

/**
 * @param {import('ol/Map').default} map Map.
 */
FeatureOverlayMgr.prototype.init = function (map) {
  this.layer_.setMap(map);
};

/**
 * @param {import('ol/style/Style').StyleLike} style
 * Style.
 * @param {number} groupIndex Group index.
 */
FeatureOverlayMgr.prototype.setStyle = function (style, groupIndex) {
  console.assert(groupIndex >= 0);
  console.assert(groupIndex < this.groups_.length);
  this.groups_[groupIndex].styleFunction = style === null ? olStyleDefaultFunction : toStyleFunction(style);
};

/**
 * @param {import('ol/Feature').default<import('ol/geom/Geometry').default>|import('ol/render/Feature').default} feature Feature.
 * @param {number} resolution Resolution.
 * @return {import('ol/style/Style').default[] | import('ol/style/Style').default | void} Styles.
 */
FeatureOverlayMgr.prototype.styleFunction_ = function (feature, resolution) {
  const featureUid = olUtilGetUid(feature).toString();
  console.assert(featureUid in this.featureUidToGroupIndex_);
  const groupIndex = this.featureUidToGroupIndex_[featureUid];
  const group = this.groups_[groupIndex];
  return group.styleFunction(feature, resolution);
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoFeatureOverlayMgr', [ngeoMapFeatureOverlay.name]);
myModule.service('ngeoFeatureOverlayMgr', FeatureOverlayMgr);

export default myModule;
