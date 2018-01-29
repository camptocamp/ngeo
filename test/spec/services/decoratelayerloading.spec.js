goog.require('ngeo.misc.decorate');
goog.require('ol.layer.Image');
goog.require('ol.layer.Group');
goog.require('ol.source.Image');
goog.require('ol.Collection');


describe('ngeo.misc.DecorateLayerLoading test suite', () => {
  let scope;

  beforeEach(angular.mock.inject(($rootScope) => {
    scope = $rootScope.$new();
  }));

  it('should increment layerLoadingCount recursively', () => {
    const imageSource = new ol.source.Image({});
    const layer = new ol.layer.Image({source: imageSource});
    const lg_1 = new ol.layer.Group();
    const lg_2 = new ol.layer.Group();

    ngeo.misc.decorate.layerLoading(layer, scope);
    ngeo.misc.decorate.layerLoading(lg_1, scope);
    ngeo.misc.decorate.layerLoading(lg_2, scope);

    lg_1.getLayers().insertAt(0, layer);
    lg_2.getLayers().insertAt(0, lg_1);

    expect(layer.get('load_count')).toBe(0);
    expect(lg_1.get('load_count')).toBe(0);
    expect(lg_2.get('load_count')).toBe(0);

    imageSource.dispatchEvent('imageloadstart');

    expect(layer.get('load_count')).toBe(1);
    expect(lg_1.get('load_count')).toBe(1);
    expect(lg_2.get('load_count')).toBe(1);

    imageSource.dispatchEvent('imageloadend');

    expect(layer.get('load_count')).toBe(0);
    expect(lg_1.get('load_count')).toBe(0);
    expect(lg_2.get('load_count')).toBe(0);
  });
});
