/* global wmtsCapabilities */
goog.require('ngeo.LayerHelper');
goog.require('ngeo.test.data.wmtsCapabilities');

describe('ngeo.LayerHelper', () => {
  let ngeoLayerHelper;
  let layer;
  const wmtsSrc = 'http://fake/wmts/capabilities.xml';
  const wmtsName = 'layer-7328';
  let $httpBackend;

  beforeEach(() => {
    inject(($injector) => {
      ngeoLayerHelper = $injector.get('ngeoLayerHelper');
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', wmtsSrc).respond(wmtsCapabilities);
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Create a basic WMS layer', () => {
    layer = ngeoLayerHelper.createBasicWMSLayer('http://example.com/', 'a,b,c', 'image/jpeg');
    expect(layer.constructor).toBe(ol.layer.Image);
    const source = layer.getSource();
    expect(source.constructor).toBe(ol.source.ImageWMS);
    expect(source.getUrl()).toBe('http://example.com/');
    const params = source.getParams();
    expect(params.LAYERS).toBe('a,b,c');
    expect(params.FORMAT).toBe('image/jpeg');
  });

  it('Create a WMTS layer from capabilitites', () => {
    $httpBackend.expectGET(wmtsSrc);
    const spy = jasmine.createSpy();
    const promise = ngeoLayerHelper.createWMTSLayerFromCapabilitites(wmtsSrc,
      wmtsName);
    promise.then(spy);
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    layer = spy.calls.mostRecent().args[0];
    expect(layer.getSource().getLayer()).toBe(wmtsName);
  });

  it('Create a layergroup with layers', () => {
    layer = ngeoLayerHelper.createBasicWMSLayer('', '');
    const collection = new ol.Collection();
    collection.push(layer);
    const group = ngeoLayerHelper.createBasicGroup(collection);
    expect(group.getLayersArray().length).toBe(1);
  });

  it('Get an array of layer from a group', () => {
    layer = ngeoLayerHelper.createBasicWMSLayer('', '');
    const collection = new ol.Collection();
    collection.push(layer);
    const group = new ol.layer.Group();
    group.setLayers(collection);
    expect(ngeoLayerHelper.getFlatLayers(group).length).toBe(1);
  });

  it('Get WMS legend url', () => {
    const url = 'http://test';
    const layerName = 'wmsLayer';
    const scale = 0;
    const wmsLegendURL = ngeoLayerHelper.getWMSLegendURL(url, layerName, scale);
    const expectedResult = `${url}?FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=` +
      `WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=${layerName
      }&SCALE=${scale}`;
    expect(expectedResult).toBe(wmsLegendURL);
  });

  it('Get WMS legend icon url', () => {
    const url = 'http://test';
    const layerName = 'wmsLayer';
    const legendRule = 'legendRule';
    const wmsLegendURL = ngeoLayerHelper.getWMSLegendURL(url, layerName, undefined,
      legendRule);
    const expectedResult = `${url}?FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=` +
      `WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=${layerName
      }&RULE=${legendRule}`;
    expect(expectedResult).toBe(wmsLegendURL);
  });

  it('Get WMTS legend url', () => {
    $httpBackend.expectGET(wmtsSrc);
    const spy = jasmine.createSpy();
    const promise = ngeoLayerHelper.createWMTSLayerFromCapabilitites(wmtsSrc,
      wmtsName);
    promise.then(spy);
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    layer = spy.calls.mostRecent().args[0];
    const capabilitiesStyles = [{legendURL: [{href: 'http://legendURL'}]}];
    layer.set('capabilitiesStyles', capabilitiesStyles);
    const legend = ngeoLayerHelper.getWMTSLegendURL(layer);
    expect(legend).toBe('http://legendURL');
  });
});
