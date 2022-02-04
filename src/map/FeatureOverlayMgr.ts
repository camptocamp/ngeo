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

import {FeatureOverlay} from 'ngeo/map/FeatureOverlay';
import {getUid as olUtilGetUid} from 'ol/util';
import olLayerVector from 'ol/layer/Vector';
import {isEmpty} from 'ol/obj';
import olSourceVector from 'ol/source/Vector';
import {toFunction as toStyleFunction, createDefaultStyle as olStyleDefaultFunction} from 'ol/style/Style';

import OlSourceVector from 'ol/source/Vector';
import OlGeomGeometry from 'ol/geom/Geometry';
import OlLayerVector from 'ol/layer/Vector';
import {StyleFunction as OlStyleStyleStyleFunction} from 'ol/style/Style';
import OlFeature from 'ol/Feature';
import OlMap from 'ol/Map';
import {StyleLike as OlStyleStyleStyleLike} from 'ol/style/Style';
import OlRenderFeature from 'ol/render/Feature';
import OlStyleStyle from 'ol/style/Style';

type MapFeatureOverlayGroup = {
  styleFunction: OlStyleStyleStyleFunction;
  features: {
    [x: string]: OlFeature<OlGeomGeometry>;
  };
};

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
 */
export class FeatureOverlayMgr {
  featureUidToGroupIndex_: {[x: string]: number};

  groups_: MapFeatureOverlayGroup[];

  source_: OlSourceVector<OlGeomGeometry>;

  layer_: OlLayerVector<OlSourceVector<OlGeomGeometry>>;

  constructor() {
    this.featureUidToGroupIndex_ = {};
    this.groups_ = [];
    this.source_ = new olSourceVector({
      useSpatialIndex: false,
    });
    this.layer_ = new olLayerVector({
      source: this.source_,
      style: this.styleFunction_.bind(this),
      updateWhileAnimating: true,
      updateWhileInteracting: true,
    });
  }

  /**
   * @param {number} groupIndex The group groupIndex.
   * @returns {boolean} True if the group has no features. False otherwise.
   */
  isEmpty(groupIndex: number): boolean {
    console.assert(groupIndex >= 0);
    console.assert(groupIndex < this.groups_.length);
    return isEmpty(this.groups_[groupIndex].features);
  }

  /**
   * @param {OlFeature<OlGeomGeometry>} feature The feature to add.
   * @param {number} groupIndex The group groupIndex.
   */
  addFeature(feature: OlFeature<OlGeomGeometry>, groupIndex: number): void {
    console.assert(groupIndex >= 0);
    console.assert(groupIndex < this.groups_.length);
    const featureUid = olUtilGetUid(feature).toString();
    this.featureUidToGroupIndex_[featureUid] = groupIndex;
    this.groups_[groupIndex].features[featureUid] = feature;
    this.source_.addFeature(feature);
  }

  /**
   * @param {OlFeature<OlGeomGeometry>} feature The feature to add.
   * @param {number} groupIndex The group groupIndex.
   */
  removeFeature(feature: OlFeature<OlGeomGeometry>, groupIndex: number): void {
    console.assert(groupIndex >= 0);
    console.assert(groupIndex < this.groups_.length);
    const featureUid = olUtilGetUid(feature).toString();
    delete this.featureUidToGroupIndex_[featureUid];
    delete this.groups_[groupIndex].features[featureUid];
    this.source_.removeFeature(feature);
  }

  /**
   * @param {number} groupIndex The group groupIndex.
   */
  clear(groupIndex: number): void {
    console.assert(groupIndex >= 0);
    console.assert(groupIndex < this.groups_.length);
    const group = this.groups_[groupIndex];
    for (const featureUid in group.features) {
      this.removeFeature(group.features[featureUid], groupIndex);
    }
    console.assert(isEmpty(group.features));
  }

  /**
   * @returns {olLayerVector<olSourceVector<OlGeomGeometry>>} The vector layer used internally.
   */
  getLayer(): olLayerVector<olSourceVector<OlGeomGeometry>> {
    return this.layer_;
  }

  /**
   * @returns {FeatureOverlay} Feature overlay.
   */
  getFeatureOverlay(): FeatureOverlay {
    const groupIndex = this.groups_.length;
    this.groups_.push({
      styleFunction: olStyleDefaultFunction,
      features: {},
    });
    return new FeatureOverlay(this, groupIndex);
  }

  /**
   * @param {OlMap} map Map.
   */
  init(map: OlMap): void {
    this.layer_.setMap(map);
  }

  /**
   * @param {OlStyleStyleStyleLike} style
   * Style.
   * @param {number} groupIndex Group index.
   */
  setStyle(style: OlStyleStyleStyleLike, groupIndex: number): void {
    console.assert(groupIndex >= 0);
    console.assert(groupIndex < this.groups_.length);
    this.groups_[groupIndex].styleFunction = style === null ? olStyleDefaultFunction : toStyleFunction(style);
  }

  /**
   * @param {OlFeature<OlGeomGeometry>|OlRenderFeature} feature Feature.
   * @param {number} resolution Resolution.
   * @returns Styles.
   */
  styleFunction_(
    feature: OlFeature<OlGeomGeometry> | OlRenderFeature,
    resolution: number
  ): void | OlStyleStyle | OlStyleStyle[] {
    const featureUid = olUtilGetUid(feature).toString();
    console.assert(featureUid in this.featureUidToGroupIndex_);
    const groupIndex = this.featureUidToGroupIndex_[featureUid];
    const group = this.groups_[groupIndex];
    return group.styleFunction(feature, resolution);
  }
}

const featureOverlayMgr = new FeatureOverlayMgr();
export default featureOverlayMgr;
