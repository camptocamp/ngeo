goog.provide('ngeo.map.FeatureOverlayMgr');

goog.require('ngeo');
goog.require('ol');
goog.require('ol.layer.Vector');
goog.require('ol.obj');
goog.require('ol.source.Vector');
goog.require('ol.style.Style');

goog.require('goog.asserts');
goog.require('ngeo.map.FeatureOverlay');


/**
 * @typedef {{
 *  styleFunction: ol.StyleFunction,
 *  features: Object.<string, ol.Feature>
 * }}
 */
ngeo.map.FeatureOverlayGroup;


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
 * @struct
 * @ngdoc service
 * @ngname ngeoFeatureOverlayMgr
 */
ngeo.map.FeatureOverlayMgr = function() {

  /**
   * @type {Object.<string, number>}
   * @private
   */
  this.featureUidToGroupIndex_ = {};

  /**
   * @type {Array.<ngeo.map.FeatureOverlayGroup>}
   * @private
   */
  this.groups_ = [];

  /**
   * @type {ol.source.Vector}
   * @private
   */
  this.source_ = new ol.source.Vector({
    useSpatialIndex: false
  });

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.layer_ = new ol.layer.Vector({
    source: this.source_,
    style: this.styleFunction_.bind(this),
    updateWhileAnimating: true,
    updateWhileInteracting: true
  });

};


/**
 * @param {ol.Feature} feature The feature to add.
 * @param {number} groupIndex The group groupIndex.
 * @export
 */
ngeo.map.FeatureOverlayMgr.prototype.addFeature = function(feature, groupIndex) {
  goog.asserts.assert(groupIndex >= 0);
  goog.asserts.assert(groupIndex < this.groups_.length);
  const featureUid = ol.getUid(feature).toString();
  this.featureUidToGroupIndex_[featureUid] = groupIndex;
  this.groups_[groupIndex].features[featureUid] = feature;
  this.source_.addFeature(feature);
};


/**
 * @param {ol.Feature} feature The feature to add.
 * @param {number} groupIndex The group groupIndex.
 * @export
 */
ngeo.map.FeatureOverlayMgr.prototype.removeFeature = function(feature, groupIndex) {
  goog.asserts.assert(groupIndex >= 0);
  goog.asserts.assert(groupIndex < this.groups_.length);
  const featureUid = ol.getUid(feature).toString();
  delete this.featureUidToGroupIndex_[featureUid];
  delete this.groups_[groupIndex].features[featureUid];
  this.source_.removeFeature(feature);
};


/**
 * @param {number} groupIndex The group groupIndex.
 * @export
 */
ngeo.map.FeatureOverlayMgr.prototype.clear = function(groupIndex) {
  goog.asserts.assert(groupIndex >= 0);
  goog.asserts.assert(groupIndex < this.groups_.length);
  const group = this.groups_[groupIndex];
  for (const featureUid in group.features) {
    this.removeFeature(group.features[featureUid], groupIndex);
  }
  goog.asserts.assert(ol.obj.isEmpty(group.features));
};


/**
 * @return {ol.layer.Vector} The vector layer used internally.
 * @export
 */
ngeo.map.FeatureOverlayMgr.prototype.getLayer = function() {
  return this.layer_;
};


/**
 * @return {ngeo.map.FeatureOverlay} Feature overlay.
 * @export
 */
ngeo.map.FeatureOverlayMgr.prototype.getFeatureOverlay = function() {
  const groupIndex = this.groups_.length;
  this.groups_.push({
    styleFunction: ol.style.Style.defaultFunction,
    features: {}
  });
  return new ngeo.map.FeatureOverlay(this, groupIndex);
};


/**
 * @param {ol.Map} map Map.
 * @export
 */
ngeo.map.FeatureOverlayMgr.prototype.init = function(map) {
  this.layer_.setMap(map);
};


/**
 * @param {ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction} style
 * Style.
 * @param {number} groupIndex Group index.
 * @export
 */
ngeo.map.FeatureOverlayMgr.prototype.setStyle = function(style, groupIndex) {
  goog.asserts.assert(groupIndex >= 0);
  goog.asserts.assert(groupIndex < this.groups_.length);
  this.groups_[groupIndex].styleFunction = style === null ?
    ol.style.Style.defaultFunction : ol.style.Style.createFunction(style);
};


/**
 * @param {ol.Feature|ol.render.Feature} feature Feature.
 * @param {number} resolution Resolution.
 * @return {Array.<ol.style.Style>|ol.style.Style} Styles.
 * @private
 */
ngeo.map.FeatureOverlayMgr.prototype.styleFunction_ = function(feature, resolution) {
  const featureUid = ol.getUid(feature).toString();
  goog.asserts.assert(featureUid in this.featureUidToGroupIndex_);
  const groupIndex = this.featureUidToGroupIndex_[featureUid];
  const group = this.groups_[groupIndex];
  return group.styleFunction(feature, resolution);
};


/**
 * @type {!angular.Module}
 */
ngeo.map.FeatureOverlayMgr.module = angular.module('ngeoFeatureOverlayMgr', [
  ngeo.map.FeatureOverlay.module.name
]);
ngeo.map.FeatureOverlayMgr.module.service('ngeoFeatureOverlayMgr', ngeo.map.FeatureOverlayMgr);
ngeo.module.requires.push(ngeo.map.FeatureOverlayMgr.module.name);
