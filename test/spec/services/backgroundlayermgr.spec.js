goog.require('ol.Collection');
goog.require('ol.Map');
goog.require('ol.layer.Group');
goog.require('ol.layer.Tile');

describe('ngeo.map.BackgroundLayerMgr', () => {
  let ngeoBackgroundLayerMgr;
  let ngeoLayerHelper;
  let map;
  const BACKGROUNDLAYERGROUP_NAME = 'background';

  beforeEach(() => {
    angular.mock.inject((_ngeoBackgroundLayerMgr_, _ngeoLayerHelper_) => {
      ngeoBackgroundLayerMgr = _ngeoBackgroundLayerMgr_;
      ngeoLayerHelper = _ngeoLayerHelper_;
    });

    map = new ol.Map({});
  });

  describe('#set', () => {

    it('sets the background layer #1', () => {
      const layer = new ol.layer.Tile();
      ngeoBackgroundLayerMgr.set(map, layer);
      const bgGroup = ngeoLayerHelper.getGroupFromMap(map, BACKGROUNDLAYERGROUP_NAME);
      expect(bgGroup.getLayers().item(0)).toBe(layer);
    });

    it('sets the background layer #2', () => {
      const layer = new ol.layer.Tile();
      ngeoBackgroundLayerMgr.set(map, layer);
      const bgGroup = ngeoLayerHelper.getGroupFromMap(map, BACKGROUNDLAYERGROUP_NAME);
      bgGroup.getLayers().setAt(1, new ol.layer.Tile());
      expect(bgGroup.getLayers().getLength()).toBe(2);
      expect(bgGroup.getLayers().item(0)).toBe(layer);
    });

    it('sets the background layer #3', () => {
      const layer1 = new ol.layer.Tile();
      ngeoBackgroundLayerMgr.set(map, layer1);
      const layer2 = new ol.layer.Tile();
      ngeoBackgroundLayerMgr.set(map, layer2);
      const bgGroup = ngeoLayerHelper.getGroupFromMap(map, BACKGROUNDLAYERGROUP_NAME);
      expect(bgGroup.getLayers().getLength()).toBe(1);
      expect(bgGroup.getLayers().item(0)).toBe(layer2);
    });

    it('sets the opacity background layer', () => {
      const layer1 = new ol.layer.Tile();
      ngeoBackgroundLayerMgr.set(map, layer1);
      const layer2 = new ol.layer.Tile();
      ngeoBackgroundLayerMgr.setOpacityBgLayer(map, layer2);
      const bgGroup = ngeoLayerHelper.getGroupFromMap(map, BACKGROUNDLAYERGROUP_NAME);
      expect(bgGroup.getLayers().getLength()).toBe(2);
      expect(bgGroup.getLayers().item(0)).toBe(layer1);
      expect(bgGroup.getLayers().item(1)).toBe(layer2);
    });

    it('sets the ZINdex on active background layergroup', () => {
      const layer1 = new ol.layer.Tile();
      const layer2 = new ol.layer.Tile();
      const group = new ol.layer.Group();
      const collection = new ol.Collection();

      collection.push(layer1);
      collection.push(layer2);
      group.setLayers(collection);

      ngeoBackgroundLayerMgr.set(map, group);
      const bgGroup = ngeoLayerHelper.getGroupFromMap(map, BACKGROUNDLAYERGROUP_NAME);
      const bgGroupLayers = bgGroup.getLayers().item(0).getLayers();

      // We don't set ZIndex on the group, as OL is
      // just ordering it without regard it is group or layer
      expect(bgGroup.getZIndex()).toBe(0);

      // As we just set the layers ZIndex, this is where it is expected
      expect(bgGroupLayers.item(0).getZIndex()).toBe(-200);
      expect(bgGroupLayers.item(1).getZIndex()).toBe(-200);
    });

    it('sets the ZINdex on overlay background layergroup', () => {
      const layer1 = new ol.layer.Tile();
      const layer2 = new ol.layer.Tile();
      const group = new ol.layer.Group();
      const collection = new ol.Collection();

      collection.push(layer1);
      collection.push(layer2);
      group.setLayers(collection);

      ngeoBackgroundLayerMgr.setOpacityBgLayer(map, group);
      const bgGroup = ngeoLayerHelper.getGroupFromMap(map, BACKGROUNDLAYERGROUP_NAME);
      const bgGroupLayers = bgGroup.getLayers().item(0).getLayers();

      // We don't set ZIndex on the group, as OL is
      // just ordering it without regard it is group or layer
      expect(bgGroup.getZIndex()).toBe(0);

      // As we just set the layers ZIndex, this is where it is expected
      expect(bgGroupLayers.item(0).getZIndex()).toBe(-100);
      expect(bgGroupLayers.item(1).getZIndex()).toBe(-100);
    });

    it('unsets the background layer', () => {
      const layer = new ol.layer.Tile();
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
      const expectedLayer = new ol.layer.Tile();
      ngeoBackgroundLayerMgr.set(map, expectedLayer);
      const layer = ngeoBackgroundLayerMgr.get(map);
      expect(layer).toBe(expectedLayer);
    });

    it('returns `null` if no opacity background layer', () => {
      const layer = ngeoBackgroundLayerMgr.getOpacityBgLayer(map);
      expect(layer).toBe(null);
    });

    it('returns the current opacity background layer', () => {
      const activeBgLayer = new ol.layer.Tile();
      ngeoBackgroundLayerMgr.set(map, activeBgLayer);
      const opacityBgLayer = new ol.layer.Tile();
      ngeoBackgroundLayerMgr.setOpacityBgLayer(map, opacityBgLayer);
      const layer = ngeoBackgroundLayerMgr.getOpacityBgLayer(map);
      expect(layer).toBe(opacityBgLayer);
    });
  });

});
