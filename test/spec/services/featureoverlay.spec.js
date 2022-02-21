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

// @ts-nocheck
import angular from 'angular';
import olMap from 'ol/Map';
import olCollection from 'ol/Collection';
import olFeature from 'ol/Feature';
import olStyleStyle from 'ol/style/Style';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr';

describe('ngeo.map.FeatureOverlayMgr', () => {
  /** @type {import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr} */
  let ngeoFeatureOverlayMgr;
  /** @type {import('ol/Map').default} */
  let map;
  /** @type {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>} */
  let layer;

  beforeEach(() => {
    map = new olMap({});

    angular.mock.inject(() => {
      ngeoFeatureOverlayMgr = ngeoMapFeatureOverlayMgr;
      ngeoMapFeatureOverlayMgr.groups_.forEach((value, index) => {
        ngeoMapFeatureOverlayMgr.clear(index);
      });
      ngeoMapFeatureOverlayMgr.groups_.length = 0;
      ngeoMapFeatureOverlayMgr.init(map);
      layer = ngeoMapFeatureOverlayMgr.getLayer();
    });
  });

  it('creates an unmanaged layer', () => {
    expect(map.getLayers().getLength()).toBe(0);
    expect(layer.getSource().getFeatures().length).toBe(0);
    expect(layer).toBeDefined();
  });

  it('adds and removes features', () => {
    expect(layer.getSource().getFeatures().length).toBe(0);
    const overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
    const feature = new olFeature();
    overlay.addFeature(feature);
    expect(layer.getSource().getFeatures().length).toBe(1);

    overlay.removeFeature(feature);
    expect(layer.getSource().getFeatures().length).toBe(0);
  });

  it('removes all the features', () => {
    expect(layer.getSource().getFeatures().length).toBe(0);
    const overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
    const feature = new olFeature();
    overlay.addFeature(feature);
    overlay.clear();
    expect(layer.getSource().getFeatures().length).toBe(0);
  });

  it("doesn't remove features from other overlays", () => {
    expect(layer.getSource().getFeatures().length).toBe(0);
    const overlay1 = ngeoFeatureOverlayMgr.getFeatureOverlay();
    const feature1 = new olFeature();
    overlay1.addFeature(feature1);

    const overlay2 = ngeoFeatureOverlayMgr.getFeatureOverlay();
    const feature2 = new olFeature();
    overlay2.addFeature(feature2);

    expect(layer.getSource().getFeatures().length).toBe(2);

    overlay2.clear();

    expect(layer.getSource().getFeatures().length).toBe(1);
  });

  it('correctly sets styles', () => {
    expect(layer.getSource().getFeatures().length).toBe(0);
    const overlay1 = ngeoFeatureOverlayMgr.getFeatureOverlay();
    const style1 = new olStyleStyle();
    overlay1.setStyle(style1);

    const overlay2 = ngeoFeatureOverlayMgr.getFeatureOverlay();
    const style2 = new olStyleStyle();
    overlay2.setStyle(style2);

    const feature1 = new olFeature();
    overlay1.addFeature(feature1);

    const feature2 = new olFeature();
    overlay2.addFeature(feature2);

    const styleFunction = ngeoFeatureOverlayMgr.getLayer().getStyleFunction();

    const resolution = 1;
    let styles;

    styles = styleFunction(feature1, resolution);
    expect(styles.length).toEqual(1);
    expect(styles[0]).toBe(style1);

    styles = styleFunction(feature2, resolution);
    expect(styles.length).toEqual(1);
    expect(styles[0]).toBe(style2);
  });

  describe('feature overlay configured with a feature collection', () => {
    let overlay, features;

    beforeEach(() => {
      ngeoFeatureOverlayMgr.groups_.forEach((value, index) => {
        ngeoFeatureOverlayMgr.clear(index);
      });
      ngeoFeatureOverlayMgr.groups_.length = 0;
      overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
      const feature1 = new olFeature();
      const feature2 = new olFeature();
      features = new olCollection([feature1, feature2]);
      overlay.setFeatures(features);
    });

    it('adds features to the overlay', () => {
      expect(layer.getSource().getFeatures().length).toBe(2);
    });

    describe('add features to the collection', () => {
      it('adds features to the overlay', () => {
        expect(layer.getSource().getFeatures().length).toBe(2);
        features.push(new olFeature());
        expect(layer.getSource().getFeatures().length).toBe(3);
      });
    });

    describe('remove features from the collection', () => {
      it('removes features from the overlay', () => {
        expect(layer.getSource().getFeatures().length).toBe(2);
        features.clear();
        expect(layer.getSource().getFeatures().length).toBe(0);
      });
    });

    describe('remove the collection', () => {
      it('removes the features from the collection', () => {
        expect(layer.getSource().getFeatures().length).toBe(2);
        overlay.setFeatures(null);
        expect(layer.getSource().getFeatures().length).toBe(0);
      });
    });

    it('Check is the collection is empty', () => {
      // Has 2 features per default: not empty.
      expect(layer.getSource().getFeatures().length).toBe(2);
      expect(overlay.isEmpty()).toBeFalsy();

      // Remove features: empty.
      features.clear();
      expect(layer.getSource().getFeatures().length).toBe(0);
      expect(overlay.isEmpty()).toBeTruthy();

      // Add one feature: not empty.
      features.push(new olFeature());
      expect(layer.getSource().getFeatures().length).toBe(1);
      expect(overlay.isEmpty()).toBeFalsy();

      // Set features with no collection: empty.
      overlay.setFeatures(null);
      expect(layer.getSource().getFeatures().length).toBe(0);
      expect(overlay.isEmpty()).toBeTruthy();
    });

    describe('replace the collection by another one', () => {
      it('uses the new collection and ignores the old one', () => {
        expect(layer.getSource().getFeatures().length).toBe(2);
        const newFeatures = new olCollection();
        overlay.setFeatures(newFeatures);
        expect(layer.getSource().getFeatures().length).toBe(0);

        newFeatures.push(new olFeature());
        expect(layer.getSource().getFeatures().length).toBe(1);

        features.push(new olFeature());
        expect(layer.getSource().getFeatures().length).toBe(1);
      });
    });
  });
});
