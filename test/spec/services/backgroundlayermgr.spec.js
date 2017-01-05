goog.require('ngeo.BackgroundLayerMgr');

describe('ngeo.BackgroundLayerMgr', function() {
  let ngeoBackgroundLayerMgr;
  let map;

  beforeEach(function() {
    inject(function($injector) {
      ngeoBackgroundLayerMgr = $injector.get('ngeoBackgroundLayerMgr');
    });

    map = new ol.Map({});
  });

  describe('#set', function() {

    it('sets the background layer #1', function() {
      const layer = new ol.layer.Tile();
      ngeoBackgroundLayerMgr.set(map, layer);
      expect(map.getLayers().item(0)).toBe(layer);
    });

    it('sets the background layer #2', function() {
      map.addLayer(new ol.layer.Tile());
      const layer = new ol.layer.Tile();
      ngeoBackgroundLayerMgr.set(map, layer);
      expect(map.getLayers().getLength()).toBe(2);
      expect(map.getLayers().item(0)).toBe(layer);
    });

    it('sets the background layer #3', function() {
      const layer1 = new ol.layer.Tile();
      ngeoBackgroundLayerMgr.set(map, layer1);
      const layer2 = new ol.layer.Tile();
      ngeoBackgroundLayerMgr.set(map, layer2);
      expect(map.getLayers().getLength()).toBe(1);
      expect(map.getLayers().item(0)).toBe(layer2);
    });

    it('unsets the background layer', function() {
      const layer = new ol.layer.Tile();
      ngeoBackgroundLayerMgr.set(map, layer);
      ngeoBackgroundLayerMgr.set(map, null);
      expect(map.getLayers().getLength()).toBe(0);
    });

  });

  describe('#get', function() {

    it('returns `null` if no background layer', function() {
      const layer = ngeoBackgroundLayerMgr.get(map);
      expect(layer).toBe(null);
    });

    it('returns the current background layer', function() {
      const expectedLayer = new ol.layer.Tile();
      ngeoBackgroundLayerMgr.set(map, expectedLayer);
      const layer = ngeoBackgroundLayerMgr.get(map);
      expect(layer).toBe(expectedLayer);
    });
  });

});
