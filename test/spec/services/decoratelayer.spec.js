goog.require('ngeo.misc.decorate');
goog.require('ol.Map');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

describe('ngeo.misc.DecorateLayer', () => {
  it('can change the visibility', () => {
    const layer = new ol.layer.Tile({
      source: new ol.source.OSM(),
      visible: false
    });
    ngeo.misc.decorate.layer(layer);
    layer.visible = true;
    expect(layer.getVisible()).toBe(true);
    layer.visible = false;
    expect(layer.getVisible()).toBe(false);
  });

  it('can change the opacity', () => {
    const layer = new ol.layer.Tile({
      source: new ol.source.OSM(),
      opacity: 0.5
    });
    ngeo.misc.decorate.layer(layer);
    layer.opacity = 0.7;
    expect(layer.getOpacity()).toBe(0.7);
  });
});
