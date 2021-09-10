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
import olCollection from 'ol/Collection';
import olMap from 'ol/Map';
import olLayerGroup from 'ol/layer/Group';
import olLayerTile from 'ol/layer/Tile';

describe('ngeo.map.BackgroundLayerMgr', () => {
  /** @type {import('ngeo/map/BackgroundLayerMgr').MapBackgroundLayerManager} */
  let ngeoBackgroundLayerMgr;
  /** @type {import('ngeo/map/LayerHelper').LayerHelper} */
  let ngeoLayerHelper;
  /** @type {import('ol/Map').default} */
  let map;
  const BACKGROUNDLAYERGROUP_NAME = 'background';

  beforeEach(() => {
    angular.mock.inject((_ngeoBackgroundLayerMgr_, _ngeoLayerHelper_) => {
      ngeoBackgroundLayerMgr = _ngeoBackgroundLayerMgr_;
      ngeoLayerHelper = _ngeoLayerHelper_;
    });

    map = new olMap({});
  });

  describe('#set', () => {
    it('sets the background layer #1', () => {
      const layer = new olLayerTile();
      ngeoBackgroundLayerMgr.set(map, layer);
      const bgGroup = ngeoLayerHelper.getGroupFromMap(map, BACKGROUNDLAYERGROUP_NAME);
      expect(bgGroup.getLayers().item(0)).toBe(layer);
    });

    it('sets the background layer #2', () => {
      const layer = new olLayerTile();
      ngeoBackgroundLayerMgr.set(map, layer);
      const bgGroup = ngeoLayerHelper.getGroupFromMap(map, BACKGROUNDLAYERGROUP_NAME);
      bgGroup.getLayers().setAt(1, new olLayerTile());
      expect(bgGroup.getLayers().getLength()).toBe(2);
      expect(bgGroup.getLayers().item(0)).toBe(layer);
    });

    it('sets the background layer #3', () => {
      const layer1 = new olLayerTile();
      ngeoBackgroundLayerMgr.set(map, layer1);
      const layer2 = new olLayerTile();
      ngeoBackgroundLayerMgr.set(map, layer2);
      const bgGroup = ngeoLayerHelper.getGroupFromMap(map, BACKGROUNDLAYERGROUP_NAME);
      expect(bgGroup.getLayers().getLength()).toBe(1);
      expect(bgGroup.getLayers().item(0)).toBe(layer2);
    });

    it('sets the opacity background layer', () => {
      const layer1 = new olLayerTile();
      ngeoBackgroundLayerMgr.set(map, layer1);
      const layer2 = new olLayerTile();
      ngeoBackgroundLayerMgr.setOpacityBgLayer(map, layer2);
      const bgGroup = ngeoLayerHelper.getGroupFromMap(map, BACKGROUNDLAYERGROUP_NAME);
      expect(bgGroup.getLayers().getLength()).toBe(2);
      expect(bgGroup.getLayers().item(0)).toBe(layer1);
      expect(bgGroup.getLayers().item(1)).toBe(layer2);
    });

    it('sets the ZINdex on active background layergroup', () => {
      const layer1 = new olLayerTile();
      const layer2 = new olLayerTile();
      const group = new olLayerGroup();
      const collection = new olCollection();

      collection.push(layer1);
      collection.push(layer2);
      group.setLayers(collection);

      ngeoBackgroundLayerMgr.set(map, group);
      const bgGroup = ngeoLayerHelper.getGroupFromMap(map, BACKGROUNDLAYERGROUP_NAME);
      const bgGroupLayers = /** @type {olLayerGroup} */ (bgGroup.getLayers().item(0)).getLayers();

      // We don't set ZIndex on the group, as OL is
      // just ordering it without regard it is group or layer
      expect(bgGroup.getZIndex()).toBe(undefined);

      // As we just set the layers ZIndex, this is where it is expected
      expect(bgGroupLayers.item(0).getZIndex()).toBe(-200);
      expect(bgGroupLayers.item(1).getZIndex()).toBe(-200);
    });

    it('sets the ZINdex on overlay background layergroup', () => {
      const layer1 = new olLayerTile();
      const layer2 = new olLayerTile();
      const group = new olLayerGroup();
      const collection = new olCollection();

      collection.push(layer1);
      collection.push(layer2);
      group.setLayers(collection);

      ngeoBackgroundLayerMgr.setOpacityBgLayer(map, group);
      const bgGroup = ngeoLayerHelper.getGroupFromMap(map, BACKGROUNDLAYERGROUP_NAME);
      const bgGroupLayers = /** @type {olLayerGroup} */ (bgGroup.getLayers().item(0)).getLayers();

      // We don't set ZIndex on the group, as OL is
      // just ordering it without regard it is group or layer
      expect(bgGroup.getZIndex()).toBe(undefined);

      // As we just set the layers ZIndex, this is where it is expected
      expect(bgGroupLayers.item(0).getZIndex()).toBe(-100);
      expect(bgGroupLayers.item(1).getZIndex()).toBe(-100);
    });

    it('unsets the background layer', () => {
      const layer = new olLayerTile();
      ngeoBackgroundLayerMgr.set(map, layer);
      ngeoBackgroundLayerMgr.set(map, null);
      const bgGroup = ngeoLayerHelper.getGroupFromMap(map, BACKGROUNDLAYERGROUP_NAME);
      expect(bgGroup.getLayers().getLength()).toBe(0);
    });
  });

  describe('#get', () => {
    it('returns `null` if no background layer', () => {
      const layer = ngeoBackgroundLayerMgr.get(map);
      expect(layer).toBe(null);
    });

    it('returns the current background layer', () => {
      const expectedLayer = new olLayerTile();
      ngeoBackgroundLayerMgr.set(map, expectedLayer);
      const layer = ngeoBackgroundLayerMgr.get(map);
      expect(layer).toBe(expectedLayer);
    });

    it('returns `null` if no opacity background layer', () => {
      const layer = ngeoBackgroundLayerMgr.getOpacityBgLayer(map);
      expect(layer).toBe(null);
    });

    it('returns the current opacity background layer', () => {
      const activeBgLayer = new olLayerTile();
      ngeoBackgroundLayerMgr.set(map, activeBgLayer);
      const opacityBgLayer = new olLayerTile();
      ngeoBackgroundLayerMgr.setOpacityBgLayer(map, opacityBgLayer);
      const layer = ngeoBackgroundLayerMgr.getOpacityBgLayer(map);
      expect(layer).toBe(opacityBgLayer);
    });
  });
});
