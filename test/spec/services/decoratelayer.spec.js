goog.require('ngeo.DecorateLayer');
goog.require('ol.Map');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

describe('ngeo.DecorateLayer', function() {
  var ngeoDecorateLayer;

  beforeEach(function() {
    inject(function($injector) {
      ngeoDecorateLayer = $injector.get('ngeoDecorateLayer');
    });
  });

  it('can change the visibility', function() {
    var layer = new ol.layer.Tile({
      source: new ol.source.OSM(),
      visible: false
    });
    ngeoDecorateLayer(layer);
    layer.visible = true;
    expect(layer.getVisible()).toBe(true);
    layer.visible = false;
    expect(layer.getVisible()).toBe(false);
  });

  it('can change the opacity', function() {
    var layer = new ol.layer.Tile({
      source: new ol.source.OSM(),
      opacity: 0.5
    });
    ngeoDecorateLayer(layer);
    layer.opacity = 0.7;
    expect(layer.getOpacity()).toBe(0.7);
  });
});
