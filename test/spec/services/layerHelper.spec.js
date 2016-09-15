/* global wmtsCapabilities */
goog.require('ngeo.LayerHelper');
goog.require('ngeo.test.data.wmtsCapabilities');

describe('ngeo.LayerHelper', function() {
  var ngeoLayerHelper;
  var layer;
  var wmtsSrc = 'http://fake/wmts/capabilities.xml';
  var wmtsName = 'layer-7328';
  var $httpBackend;

  beforeEach(function() {
    inject(function($injector) {
      ngeoLayerHelper = $injector.get('ngeoLayerHelper');
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', wmtsSrc).respond(wmtsCapabilities);
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Create a basic WMS layer', function() {
    layer = ngeoLayerHelper.createBasicWMSLayer('', '');
    expect(layer.constructor).toBe(ol.layer.Image);
    expect(layer.getSource().constructor).toBe(ol.source.ImageWMS);
  });

  it('Create a WMTS layer from capabilitites', function() {
    $httpBackend.expectGET(wmtsSrc);
    var spy = jasmine.createSpy();
    var promise = ngeoLayerHelper.createWMTSLayerFromCapabilitites(wmtsSrc,
            wmtsName);
    promise.then(spy);
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    layer = spy.calls.mostRecent().args[0];
    expect(layer.getSource().getLayer()).toBe(wmtsName);
  });

  it('Create a layergroup with layers', function() {
    layer = ngeoLayerHelper.createBasicWMSLayer('', '');
    var collection = new ol.Collection();
    collection.push(layer);
    var group = ngeoLayerHelper.createBasicGroup(collection);
    expect(group.getLayersArray().length).toBe(1);
  });

  it('Get an array of layer from a group', function() {
    layer = ngeoLayerHelper.createBasicWMSLayer('', '');
    var collection = new ol.Collection();
    collection.push(layer);
    var group = new ol.layer.Group();
    group.setLayers(collection);
    expect(ngeoLayerHelper.getFlatLayers(group).length).toBe(1);
  });

  it('Get WMS legend url', function() {
    var url = 'http://test';
    var layerName = 'wmsLayer';
    var scale = 0;
    var legendRule = 'legendRule';
    var wmsLegendURL = ngeoLayerHelper.getWMSLegendURL(url, layerName, scale,
        legendRule);
    var expectedResult = url + '?FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=' +
      'wms&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=' + layerName +
      '&SCALE=' + scale + '&RULE=' + legendRule;
    expect(expectedResult).toBe(wmsLegendURL);
  });

  it('Get WMTS legend url', function() {
    $httpBackend.expectGET(wmtsSrc);
    var spy = jasmine.createSpy();
    var promise = ngeoLayerHelper.createWMTSLayerFromCapabilitites(wmtsSrc,
            wmtsName);
    promise.then(spy);
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    layer = spy.calls.mostRecent().args[0];
    var capabilitiesStyles = [{legendURL: [{href: 'http://legendURL'}]}];
    layer.set('capabilitiesStyles', capabilitiesStyles);
    var legend = ngeoLayerHelper.getWMTSLegendURL(layer);
    expect(legend).toBe('http://legendURL');
  });
});
