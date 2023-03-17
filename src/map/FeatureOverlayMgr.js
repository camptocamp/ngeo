import angular from 'angular';
import ngeoMapFeatureOverlay, {FeatureOverlay} from 'ngeo/map/FeatureOverlay.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import olLayerVector from 'ol/layer/Vector.js';
import {isEmpty} from 'ol/obj.js';
import olSourceVector from 'ol/source/Vector.js';
import {toFunction as toStyleFunction, createDefaultStyle as olStyleDefaultFunction} from 'ol/style/Style.js';

/**
 * @typedef {Object} MapFeatureOverlayGroup
 * @property {import('ol/style/Style.js').StyleFunction} styleFunction
 * @property {Object.<string, import('ol/Feature.js').default>} features
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
 * @constructor
 * @ngdoc service
 * @ngname ngeoFeatureOverlayMgr
 * @hidden
 */
export function FeatureOverlayMgr() {
  /**
   * @type {Object<string, number>}
   * @private
   */
  this.featureUidToGroupIndex_ = {};

  /**
   * @type {Array<MapFeatureOverlayGroup>}
   * @private
   */
  this.groups_ = [];

  /**
   * @type {import("ol/source/Vector.js").default}
   * @private
   */
  this.source_ = new olSourceVector({
    useSpatialIndex: false,
  });

  /**
   * @type {import("ol/layer/Vector.js").default}
   * @private
   */
  this.layer_ = new olLayerVector({
    source: this.source_,
    style: this.styleFunction_.bind(this),
    updateWhileAnimating: true,
    updateWhileInteracting: true,
  });
}

/**
 * @param {import("ol/Feature.js").default} feature The feature to add.
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
 * @param {import("ol/Feature.js").default} feature The feature to add.
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
 * @return {import("ol/layer/Vector.js").default} The vector layer used internally.
 */
FeatureOverlayMgr.prototype.getLayer = function () {
  return this.layer_;
};

/**
 * @return {import("ngeo/map/FeatureOverlay.js").FeatureOverlay} Feature overlay.
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
 * @param {import("ol/Map.js").default} map Map.
 */
FeatureOverlayMgr.prototype.init = function (map) {
  this.layer_.setMap(map);
};

/**
 * @param {import("ol/style/Style.js").StyleLike} style
 * Style.
 * @param {number} groupIndex Group index.
 */
FeatureOverlayMgr.prototype.setStyle = function (style, groupIndex) {
  console.assert(groupIndex >= 0);
  console.assert(groupIndex < this.groups_.length);
  this.groups_[groupIndex].styleFunction = style === null ? olStyleDefaultFunction : toStyleFunction(style);
};

/**
 * @param {import("ol/Feature.js").default|import("ol/render/Feature.js").default} feature Feature.
 * @param {number} resolution Resolution.
 * @return {Array.<import("ol/style/Style.js").default>|import("ol/style/Style.js").default} Styles.
 * @private
 */
FeatureOverlayMgr.prototype.styleFunction_ = function (feature, resolution) {
  const featureUid = olUtilGetUid(feature).toString();
  console.assert(featureUid in this.featureUidToGroupIndex_);
  const groupIndex = this.featureUidToGroupIndex_[featureUid];
  const group = this.groups_[groupIndex];
  return group.styleFunction(feature, resolution);
};

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoFeatureOverlayMgr', [ngeoMapFeatureOverlay.name]);
module.service('ngeoFeatureOverlayMgr', FeatureOverlayMgr);

export default module;
