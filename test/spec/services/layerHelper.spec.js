goog.require('ngeo.LayerHelper');
goog.require('ngeo.test.data.wmtsCapabilities');

describe('ngeo.LayerHelper', function() {
  var ngeoLayerHelper;
  var map;
  var layer;
  var wmtsSrc = 'http://fake/wmts/capabilities.xml';
  var wmtsName = 'layer-7328';

  beforeEach(function() {
    map = new ol.Map({});
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

    expect(spy.calls.length).toBe(1);
    layer = spy.mostRecentCall.args[0];
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
});
