/**
 * @fileoverview Provides a service that wraps an "unmanaged" vector layer,
 * used as a shared vector layer accross the application.
 *
 * Example:
 *
 * The application's main component/controller initializes the feature
 * overlay manager with the map:
 *
 * ngeoFeatureOverlayMgr.init(map);
 *
 * Once initialized, components of the application can use the manager to
 * create a feature overlay, configuring it with specific styles:
 *
 * var featureOverlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
 * featureOverlay.setStyle(myStyle);
 * featureOverlay.addFeature(myFeature);
 */
goog.provide('ngeo.FeatureOverlay');
goog.provide('ngeo.FeatureOverlayMgr');

goog.require('goog.object');
goog.require('ngeo');
goog.require('ol.Feature');
goog.require('ol.layer.Vector');
goog.require('ol.source.Vector');
goog.require('ol.style.Style');
goog.require('ol.style.StyleFunction');


/**
 * @typedef {{
 *  styleFunction: ol.style.StyleFunction,
 *  features: Object.<string, ol.Feature>
 * }}
 */
ngeo.FeatureOverlayGroup;



/**
 * @constructor
 */
ngeo.FeatureOverlayMgr = function() {

  /**
   * @type {Object.<string, number>}
   * @private
   */
  this.featureUidToGroupIndex_ = {};

  /**
   * @type {Array.<ngeo.FeatureOverlayGroup>}
   * @private
   */
  this.groups_ = [];

  /**
   * @type {ol.source.Vector}
   * @private
   */
  this.source_ = new ol.source.Vector();

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.layer_ = new ol.layer.Vector({
    source: this.source_,
    style: goog.bind(this.styleFunction_, this),
    useSpatialgroupIndex: false
  });

};


/**
 * @param {ol.Feature} feature The feature to add.
 * @param {number} groupIndex The group groupIndex.
 * @protected
 */
ngeo.FeatureOverlayMgr.prototype.addFeature = function(feature, groupIndex) {
  goog.asserts.assert(groupIndex >= 0);
  goog.asserts.assert(groupIndex < this.groups_.length);
  var featureUid = goog.getUid(feature).toString();
  this.featureUidToGroupIndex_[featureUid] = groupIndex;
  this.groups_[groupIndex].features[featureUid] = feature;
  this.source_.addFeature(feature);
};


/**
 * @param {ol.Feature} feature The feature to add.
 * @param {number} groupIndex The group groupIndex.
 * @protected
 */
ngeo.FeatureOverlayMgr.prototype.removeFeature = function(feature, groupIndex) {
  goog.asserts.assert(groupIndex >= 0);
  goog.asserts.assert(groupIndex < this.groups_.length);
  var featureUid = goog.getUid(feature).toString();
  delete this.featureUidToGroupIndex_[featureUid];
  delete this.groups_[groupIndex].features[featureUid];
  this.source_.removeFeature(feature);
};


/**
 * @param {number} groupIndex The group groupIndex.
 * @protected
 */
ngeo.FeatureOverlayMgr.prototype.clear = function(groupIndex) {
  goog.asserts.assert(groupIndex >= 0);
  goog.asserts.assert(groupIndex < this.groups_.length);
  var group = this.groups_[groupIndex];
  for (var featureUid in group.features) {
    this.removeFeature(group.features[featureUid], groupIndex);
  }
  goog.asserts.assert(goog.object.isEmpty(group.features));
};


/**
 * @return {ol.layer.Vector} The vector layer used internally.
 */
ngeo.FeatureOverlayMgr.prototype.getLayer = function() {
  return this.layer_;
};


/**
 * @return {ngeo.FeatureOverlay} Feature overlay.
 */
ngeo.FeatureOverlayMgr.prototype.getFeatureOverlay = function() {
  var groupIndex = this.groups_.length;
  this.groups_.push({
    styleFunction: ol.style.defaultStyleFunction,
    features: {}
  });
  return new ngeo.FeatureOverlay(this, groupIndex);
};


/**
 * @param {ol.Map} map Map.
 */
ngeo.FeatureOverlayMgr.prototype.init = function(map) {
  this.layer_.setMap(map);
};


/**
 * @param {ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction} style
 * Style.
 * @param {number} groupIndex Group index.
 * @protected
 */
ngeo.FeatureOverlayMgr.prototype.setStyle = function(style, groupIndex) {
  goog.asserts.assert(groupIndex >= 0);
  goog.asserts.assert(groupIndex < this.groups_.length);
  this.groups_[groupIndex].styleFunction = goog.isNull(style) ?
      ol.style.defaultStyleFunction : ol.style.createStyleFunction(style);
};


/**
 * @param {ol.Feature} feature Feature.
 * @param {number} resolution Resolution.
 * @return {Array.<ol.style.Style>} Styles.
 * @private
 */
ngeo.FeatureOverlayMgr.prototype.styleFunction_ =
    function(feature, resolution) {
  var featureUid = goog.getUid(feature).toString();
  goog.asserts.assert(featureUid in this.featureUidToGroupIndex_);
  var groupIndex = this.featureUidToGroupIndex_[featureUid];
  var group = this.groups_[groupIndex];
  return group.styleFunction(feature, resolution);
};



/**
 * @constructor
 * @param {ngeo.FeatureOverlayMgr} manager The feature overlay manager.
 * @param {number} index This feature overlay's index.
 */
ngeo.FeatureOverlay = function(manager, index) {

  /**
   * @type {ngeo.FeatureOverlayMgr}
   * @private
   */
  this.manager_ = manager;

  /**
   * @type {number}
   * @private
   */
  this.index_ = index;
};


/**
 * Add a feature to the feature overlay.
 * @param {ol.Feature} feature The feature to add.
 */
ngeo.FeatureOverlay.prototype.addFeature = function(feature) {
  this.manager_.addFeature(feature, this.index_);
};


/**
 * Remove a feature from the feature overlay.
 * @param {ol.Feature} feature The feature to add.
 */
ngeo.FeatureOverlay.prototype.removeFeature = function(feature) {
  this.manager_.removeFeature(feature, this.index_);
};


/**
 * Remove all the features from the feature overlay.
 */
ngeo.FeatureOverlay.prototype.clear = function() {
  this.manager_.clear(this.index_);
};


/**
 * Set a style for the feature overlay.
 * @param {ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction} style
 * Style.
 */
ngeo.FeatureOverlay.prototype.setStyle = function(style) {
  this.manager_.setStyle(style, this.index_);
};


ngeoModule.service('ngeoFeatureOverlayMgr', ngeo.FeatureOverlayMgr);
