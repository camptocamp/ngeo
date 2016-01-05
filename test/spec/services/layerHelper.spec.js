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

  it('Set a helperID on a layer', function() {
    layer = ngeoLayerHelper.createBasicWMSLayer('source', 'name');
    ngeoLayerHelper.setHelperID(layer, 'source', 'name');
    var param = ngeoLayerHelper.helperID;
    expect(layer.get(param)).toBe('source_name');
  });

  it('Make a helperID', function() {
    var id = ngeoLayerHelper.makeHelperID('source', 'name');
    expect(id).toBe('source_name');
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

  it('Get index of a layer', function() {
    layer = ngeoLayerHelper.createBasicWMSLayer('', 'testLayer');
    map.addLayer(layer);
    expect(ngeoLayerHelper.getLayerIndex(map, layer)).toBe(0);
  });

  it('Find a layer in an array of layers', function() {
    var layers = [];
    layer = ngeoLayerHelper.createBasicWMSLayer('', 'testLayer');
    var layerId = '_testLayer';
    expect(ngeoLayerHelper.findLayer(layers, layerId)).toBe(null);

    layers.push(layer);
    expect(ngeoLayerHelper.findLayer(layers, layerId)).toBe(layer);
  });

  it('Add a layer on the map', function() {
    layer = ngeoLayerHelper.createBasicWMSLayer('', 'testLayer');
    expect(ngeoLayerHelper.addLayerToMap(map, layer)).toBe(true);
    expect(ngeoLayerHelper.addLayerToMap(map, layer)).toBe(false);
  });

  it('Remove a layer from the map', function() {
    layer = ngeoLayerHelper.createBasicWMSLayer('', 'testLayer');
    map.addLayer(layer);
    expect(ngeoLayerHelper.removeLayerFromMap(map, layer)).toBe(true);
    expect(ngeoLayerHelper.removeLayerFromMap(map, layer)).toBe(false);
  });

  it('Add and remove multiple layers', function() {
    layer = ngeoLayerHelper.createBasicWMSLayer('', 'testLayer');
    ngeoLayerHelper.moveInOutLayers(map, [layer], true);
    expect(map.getLayers().array_.length).toBe(1);
    ngeoLayerHelper.moveInOutLayers(map, [layer], false);
    expect(map.getLayers().array_.length).toBe(0);
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
