// The MIT License (MIT)
//
// Copyright (c) 2015-2022 Camptocamp SA
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

import {listen, unlistenByKey} from 'ol/events';
import {CollectionEvent} from 'ol/Collection';

import {FeatureOverlayMgr as NgeoMapFeatureOverlayMgrFeatureOverlayMgr} from 'ngeo/map/FeatureOverlayMgr';
import {EventsKey as OlEventsEventsKey} from 'ol/events';
import OlFeature from 'ol/Feature';
import OlGeomGeometry from 'ol/geom/Geometry';
import OlCollection from 'ol/Collection';
import OlStyleStyle from 'ol/style/Style';
import {StyleFunction as OlStyleStyleStyleFunction} from 'ol/style/Style';
import OlEventsEvent from 'ol/events/Event';

/**
 * Provides a featureOverlay used by the FeatureOverlayManager.
 *
 * Example of initialization:
 * const featureOverlay = new FeatureOverlay(manager, index);
 *
 * @param {NgeoMapFeatureOverlayMgrFeatureOverlayMgr} manager The feature overlay manager.
 * @param {number} index This feature overlay's index.
 */
export class FeatureOverlay {
  manager_: NgeoMapFeatureOverlayMgrFeatureOverlayMgr;

  index_: number;

  listenerKeys_: OlEventsEventsKey[];

  constructor(manager: NgeoMapFeatureOverlayMgrFeatureOverlayMgr, index: number) {
    this.manager_ = manager;
    this.index_ = index;
    this.listenerKeys_ = [];
  }

  /**
   * Add a feature to the feature overlay.
   *
   * @param {OlFeature<OlGeomGeometry>} feature The feature to add.
   */
  addFeature(feature: OlFeature<OlGeomGeometry>): void {
    this.manager_.addFeature(feature, this.index_);
  }

  /**
   * Remove a feature from the feature overlay.
   *
   * @param {OlFeature<OlGeomGeometry>} feature The feature to remove.
   */
  removeFeature(feature: OlFeature<OlGeomGeometry>): void {
    this.manager_.removeFeature(feature, this.index_);
  }

  /**
   * Check if featureOverlay has no features.
   *
   * @returns {boolean} True if there is no features. False otherwise.
   */
  isEmpty(): boolean {
    return this.manager_.isEmpty(this.index_);
  }

  /**
   * Remove all the features from the feature overlay.
   */
  clear(): void {
    this.manager_.clear(this.index_);
  }

  /**
   * Configure this feature overlay with a feature collection. Features added
   * to the collection are also added to the overlay. Same for removal. If you
   * configure the feature overlay with a feature collection you will use the
   * collection to add and remove features instead of using the overlay's
   * `addFeature`, `removeFeature` and `clear` functions.
   *
   * @param {OlCollection<OlFeature<OlGeomGeometry>>} features Feature collection.
   */
  setFeatures(features: OlCollection<OlFeature<OlGeomGeometry>>): void {
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
  }

  /**
   * Set a style for the feature overlay.
   *
   * @param {OlStyleStyle | OlStyleStyle[] | OlStyleStyleStyleFunction} style Style.
   */
  setStyle(style: OlStyleStyle | OlStyleStyle[] | OlStyleStyleStyleFunction): void {
    this.manager_.setStyle(style, this.index_);
  }

  /**
   * @param {Event|OlEventsEvent} evt Feature collection event.
   */
  handleFeatureAdd_(evt: Event | OlEventsEvent): void {
    if (evt instanceof CollectionEvent) {
      const feature = evt.element;
      this.addFeature(feature);
    }
  }

  /**
   * @param {Event|OlEventsEvent} evt Feature collection event.
   */
  handleFeatureRemove_(evt: Event | OlEventsEvent): void {
    if (evt instanceof CollectionEvent) {
      const feature = evt.element;
      this.removeFeature(feature);
    }
  }
}

export default FeatureOverlay;
