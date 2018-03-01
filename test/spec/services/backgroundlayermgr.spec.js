goog.require('ngeo.BackgroundLayerMgr');
goog.require('ngeo.LayerHelper');

describe('ngeo.BackgroundLayerMgr', () => {
  let ngeoBackgroundLayerMgr;
  let ngeoLayerHelper;
  let map;
  const BACKGROUNDLAYERGROUP_NAME = 'background';

  beforeEach(() => {
    inject(($injector) => {
      ngeoBackgroundLayerMgr = $injector.get('ngeoBackgroundLayerMgr');
      ngeoLayerHelper = $injector.get('ngeoLayerHelper');
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
