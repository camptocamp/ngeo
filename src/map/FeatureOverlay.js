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
import {listen, unlistenByKey} from 'ol/events.js';
import {CollectionEvent} from 'ol/Collection.js';

/**
 * @class
 * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} manager The feature overlay manager.
 * @param {number} index This feature overlay's index.
 * @hidden
 */
export function FeatureOverlay(manager, index) {
  /**
   * @type {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr}
   */
  this.manager_ = manager;

  /**
   * @type {number}
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
FeatureOverlay.prototype.addFeature = function (feature) {
  this.manager_.addFeature(feature, this.index_);
};

/**
 * Remove a feature from the feature overlay.
 * @param {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>} feature The feature to remove.
 */
FeatureOverlay.prototype.removeFeature = function (feature) {
  this.manager_.removeFeature(feature, this.index_);
};

/**
 * Check if featureOverlay has no features.
 * @return {boolean} True if there is no features. False otherwise.
 */
FeatureOverlay.prototype.isEmpty = function () {
  return this.manager_.isEmpty(this.index_);
};

/**
 * Remove all the features from the feature overlay.
 */
FeatureOverlay.prototype.clear = function () {
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
FeatureOverlay.prototype.setFeatures = function (features) {
  // Remove old features collection.
  this.clear();
  this.listenerKeys_.forEach(unlistenByKey);

  // Add new feature collection.
  if (features !== null) {
    features.forEach((feature) => {
      this.addFeature(feature);
    });
    // Listen collection to sync features in the manager.
    this.listenerKeys_.push(listen(features, 'add', this.handleFeatureAdd_, this));
    this.listenerKeys_.push(listen(features, 'remove', this.handleFeatureRemove_, this));
  }
};

/**
 * Set a style for the feature overlay.
 * @param {import("ol/style/Style.js").default | import("ol/style/Style.js").default[] | import('ol/style/Style.js').StyleFunction} style
 * Style.
 */
FeatureOverlay.prototype.setStyle = function (style) {
  this.manager_.setStyle(style, this.index_);
};

/**
 * @param {Event|import('ol/events/Event.js').default} evt Feature collection event.
 */
FeatureOverlay.prototype.handleFeatureAdd_ = function (evt) {
  if (evt instanceof CollectionEvent) {
    const feature = /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>} */ (evt.element);
    this.addFeature(feature);
  }
};

/**
 * @param {Event|import('ol/events/Event.js').default} evt Feature collection event.
 */
FeatureOverlay.prototype.handleFeatureRemove_ = function (evt) {
  if (evt instanceof CollectionEvent) {
    const feature = /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>} */ (evt.element);
    this.removeFeature(feature);
  }
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoFeatureOverlay', []);

export default myModule;
