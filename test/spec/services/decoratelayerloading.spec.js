/*global describe beforeEach inject expect it */
/*eslint no-undef: "error"*/

goog.require('ngeo.DecorateLayerLoading');
goog.require('ol.layer.Image');
goog.require('ol.layer.Group');
goog.require('ol.source.Image');
goog.require('ol.Collection');


describe('DecorateLayerLoading test suite', function() {
  let decorateLayerLoading;
  let scope;

  beforeEach(inject(function($injector, $rootScope) {
    decorateLayerLoading = $injector.get('ngeoDecorateLayerLoading');
    scope = $rootScope.$new();
  }));

  it('should increment layerLoadingCount recursively', function() {
    const imageSource = new ol.source.Image({});
    const layer = new ol.layer.Image({source: imageSource});
    const lg_1 = new ol.layer.Group();
    const lg_2 = new ol.layer.Group();

    decorateLayerLoading(layer, scope);
    decorateLayerLoading(lg_1, scope);
    decorateLayerLoading(lg_2, scope);

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
