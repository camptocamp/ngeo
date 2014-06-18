goog.require('go_decoratelayer_service');
goog.require('ol.Map');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

describe('go_decoratelayer_service', function() {
  var goDecorateLayer;

  beforeEach(function() {
    inject(function($injector) {
      goDecorateLayer = $injector.get('goDecorateLayer');
    });
  });

  it('can change the visibility', function() {
    var layer = new ol.layer.Tile({
      source: new ol.source.OSM(),
      visible: false
    });
    goDecorateLayer(layer);
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
    goDecorateLayer(layer);
    layer.opacity = 0.7;
    expect(layer.getOpacity()).toBe(0.7);
  });
});
