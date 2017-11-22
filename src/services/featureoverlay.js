goog.provide('ngeo.FeatureOverlay');

goog.require('ngeo');
goog.require('ol');
goog.require('ol.events');
goog.require('ol.Collection');
goog.require('ol.Feature');
goog.require('ol.style.Style');


/**
 * @typedef {{
 *  styleFunction: ol.StyleFunction,
 *  features: Object.<string, ol.Feature>
 * }}
 */
ngeo.FeatureOverlayGroup;


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
   * @type {ol.Collection.<ol.Feature>}
   * @private
   */
  this.features_ = null;

  /**
   * @type {number}
   * @private
   */
  this.index_ = index;
};


/**
 * Add a feature to the feature overlay.
 * @param {ol.Feature} feature The feature to add.
 * @export
 */
ngeo.FeatureOverlay.prototype.addFeature = function(feature) {
  this.manager_.addFeature(feature, this.index_);
};


/**
 * Remove a feature from the feature overlay.
 * @param {ol.Feature} feature The feature to remove.
 * @export
 */
ngeo.FeatureOverlay.prototype.removeFeature = function(feature) {
  this.manager_.removeFeature(feature, this.index_);
};


/**
 * Remove all the features from the feature overlay.
 * @export
 */
ngeo.FeatureOverlay.prototype.clear = function() {
  this.manager_.clear(this.index_);
};


/**
 * Configure this feature overlay with a feature collection. Features added
 * to the collection are also added to the overlay. Same for removal. If you
 * configure the feature overlay with a feature collection you will use the
 * collection to add and remove features instead of using the overlay's
 * `addFeature`, `removeFeature` and `clear` functions.
 * @param {ol.Collection.<ol.Feature>} features Feature collection.
 * @export
 */
ngeo.FeatureOverlay.prototype.setFeatures = function(features) {
  if (this.features_ !== null) {
    this.features_.clear();
    ol.events.unlisten(this.features_, 'add', this.handleFeatureAdd_, this);
    ol.events.unlisten(this.features_, 'remove', this.handleFeatureRemove_, this);
  }
  if (features !== null) {
    features.forEach(function(feature) {
      this.addFeature(feature);
    }, this);
    ol.events.listen(features, 'add', this.handleFeatureAdd_, this);
    ol.events.listen(features, 'remove', this.handleFeatureRemove_, this);
  }
  this.features_ = features;
};


/**
 * Set a style for the feature overlay.
 * @param {ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction} style
 * Style.
 * @export
 */
ngeo.FeatureOverlay.prototype.setStyle = function(style) {
  this.manager_.setStyle(style, this.index_);
};


/**
 * @param {ol.Collection.Event} evt Feature collection event.
 * @private
 */
ngeo.FeatureOverlay.prototype.handleFeatureAdd_ = function(evt) {
  const feature = /** @type {ol.Feature} */ (evt.element);
  this.addFeature(feature);
};


/**
 * @param {ol.Collection.Event} evt Feature collection event.
 * @private
 */
ngeo.FeatureOverlay.prototype.handleFeatureRemove_ = function(evt) {
  const feature = /** @type {ol.Feature} */ (evt.element);
  this.removeFeature(feature);
};
