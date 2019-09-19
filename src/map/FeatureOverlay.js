import angular from 'angular';
import {listen, unlistenByKey} from 'ol/events.js';
import {CollectionEvent} from 'ol/Collection.js';

/**
 * @constructor
 * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} manager The feature overlay manager.
 * @param {number} index This feature overlay's index.
 * @hidden
 */
export function FeatureOverlay(manager, index) {

  /**
   * @type {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr}
   * @private
   */
  this.manager_ = manager;

  /**
   * @type {?import("ol/Collection.js").default<import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>>}
   * @private
   */
  this.features_ = null;

  /**
   * @type {number}
   * @private
   */
  this.index_ = index;

  /**
   * @type {import("ol/events.js").EventsKey[]}
   */
  this.listenerKeys_ = [];
}


/**
 * Add a feature to the feature overlay.
 * @param {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>} feature The feature to add.
 */
FeatureOverlay.prototype.addFeature = function(feature) {
  this.manager_.addFeature(feature, this.index_);
};


/**
 * Remove a feature from the feature overlay.
 * @param {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>} feature The feature to remove.
 */
FeatureOverlay.prototype.removeFeature = function(feature) {
  this.manager_.removeFeature(feature, this.index_);
};


/**
 * Remove all the features from the feature overlay.
 */
FeatureOverlay.prototype.clear = function() {
  this.manager_.clear(this.index_);
};


/**
 * Configure this feature overlay with a feature collection. Features added
 * to the collection are also added to the overlay. Same for removal. If you
 * configure the feature overlay with a feature collection you will use the
 * collection to add and remove features instead of using the overlay's
 * `addFeature`, `removeFeature` and `clear` functions.
 * @param {import("ol/Collection.js").default<import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>>} features Feature collection.
 */
FeatureOverlay.prototype.setFeatures = function(features) {
  if (this.features_ !== null) {
    this.features_.clear();
    this.listenerKeys_.forEach(unlistenByKey);
  }
  if (features !== null) {
    features.forEach((feature) => {
      this.addFeature(feature);
    });
    this.listenerKeys_.push(listen(features, 'add', this.handleFeatureAdd_, this));
    this.listenerKeys_.push(listen(features, 'remove', this.handleFeatureRemove_, this));
  }
  this.features_ = features;
};


/**
 * Set a style for the feature overlay.
 * @param {import("ol/style/Style.js").default|Array<import("ol/style/Style.js").default>|import('ol/style/Style.js').StyleFunction} style
 * Style.
 */
FeatureOverlay.prototype.setStyle = function(style) {
  this.manager_.setStyle(style, this.index_);
};


/**
 * @param {Event|import('ol/events/Event.js').default} evt Feature collection event.
 * @private
 */
FeatureOverlay.prototype.handleFeatureAdd_ = function(evt) {
  if (evt instanceof CollectionEvent) {
    const feature = /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>} */ (
      evt.element
    );
    this.addFeature(feature);
  }
};


/**
 * @param {Event|import('ol/events/Event.js').default} evt Feature collection event.
 * @private
 */
FeatureOverlay.prototype.handleFeatureRemove_ = function(evt) {
  if (evt instanceof CollectionEvent) {
    const feature = /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>} */ (
      evt.element
    );
    this.removeFeature(feature);
  }
};


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoFeatureOverlay', []);


export default module;
