goog.require('ngeo.Query');
goog.require('ngeo.test.data.msGMLOutputBusStop');
goog.require('ngeo.test.data.msGMLOutputBusStopAndInformation');

describe('ngeo.Query', function() {

  var ngeoQuery;
  var ngeoQueryResult;

  beforeEach(function() {
    module('ngeo', function($provide) {
      $provide.value('ngeoQueryOptions', {});
    });

    inject(function($injector) {
      ngeoQuery = $injector.get('ngeoQuery');
      ngeoQueryResult = $injector.get('ngeoQueryResult');
    });
  });

  it('Create service', function() {
    expect(ngeoQuery instanceof ngeo.Query).toBe(true);
  });

  it('Add simple source to query', function() {
    var source = {
      id: 1,
      url: 'foo',
      params: {'LAYERS': 'bar'}
    };
    ngeoQuery.addSource(source);
    expect(ngeoQueryResult.sources.length).toBe(1);
    // defining 'url' and 'params' automatically creates the wmsSource
    expect(source.wmsSource instanceof ol.source.ImageWMS).toBe(true);
    // not defining an infoFormat should use GML by default
    expect(source.infoFormat).toBe(ngeo.QueryInfoFormatType.GML);
    // WMSGetFeatureInfo should be the default format when not defined
    expect(source.format instanceof ol.format.WMSGetFeatureInfo).toBe(true);
  });

  it('Add source with wms layer to query', function() {
    var id = 1;
    var wmsSource = new ol.source.ImageWMS({
      url: 'foo',
      params: {'LAYERS': 'bar'}
    });
    var layer = new ol.layer.Image({
      querySourceId: id,
      source: wmsSource
    });
    var source = {
      id: id,
      layer: layer
    };
    ngeoQuery.addSource(source);
    // a source configured with a layer that uses a wms source should
    // automatically pick it as the wmsSource
    expect(source.wmsSource).toBe(wmsSource);
  });

  describe('Issue request', function() {

    var map;
    var busStopLayer;
    var busStopSourceId = 'bus_stop';
    var informationLayer;
    var informationSourceId = 'information';
    var coordinate;
    var $httpBackend;

    beforeEach(function() {

      var url = 'https://geomapfish-demo.camptocamp.net/1.6/wsgi/mapserv_proxy';

      var requestUrlBusStop = url + '?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&INFO_FORMAT=application%2Fvnd.ogc.gml&FEATURE_COUNT=50&I=50&J=50&CRS=EPSG%3A21781&STYLES=&WIDTH=101&HEIGHT=101&BBOX=489100%2C119900.00000000003%2C509300%2C140100.00000000003&LAYERS=bus_stop&QUERY_LAYERS=bus_stop';
      var requestUrlBusStopAndInformation = url + '?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&INFO_FORMAT=application%2Fvnd.ogc.gml&FEATURE_COUNT=50&I=50&J=50&CRS=EPSG%3A21781&STYLES=&WIDTH=101&HEIGHT=101&BBOX=523700%2C142900.00000000003%2C543900%2C163100.00000000003&LAYERS=information%2Cbus_stop&QUERY_LAYERS=information%2Cbus_stop';

      inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', requestUrlBusStop).respond(gmlResponseBusStop);
        $httpBackend.when('GET', requestUrlBusStopAndInformation).respond(
            gmlResponseBusStopAndInformation);
        $httpBackend = $injector.get('$httpBackend');
      });

      busStopLayer = new ol.layer.Image({
        'querySourceId': busStopSourceId,
        'source': new ol.source.ImageWMS({
          'url': url,
          params: {'LAYERS': 'bus_stop'}
        })
      });

      informationLayer = new ol.layer.Image({
        'querySourceId': informationSourceId,
        'source': new ol.source.ImageWMS({
          'url': url,
          params: {'LAYERS': 'information'}
        })
      });

      var projection = ol.proj.get('EPSG:21781');
      projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);

      map = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          }),
          informationLayer,
          busStopLayer
        ],
        view: new ol.View({
          projection: projection,
          resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
          center: [537635, 152640],
          zoom: 0
        })
      });

    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Issue request with one source', function() {
      var coordinate = [499200, 130000.00000000003];
      ngeoQuery.addSource({
        id: busStopSourceId,
        layer: busStopLayer
      });
      ngeoQuery.issue(map, coordinate);
      $httpBackend.flush();
      expect(ngeoQueryResult.sources[2].features.length).toBe(1);
      expect(ngeoQueryResult.total).toBe(1);
      ngeoQuery.clear();
      expect(ngeoQueryResult.sources[2].features.length).toBe(0);
      expect(ngeoQueryResult.total).toBe(0);
    });

    it('Issue request with two sources', function() {
      var coordinate = [533800, 153000.00000000003];
      ngeoQuery.addSource({
        id: busStopSourceId,
        layer: busStopLayer
      });
      ngeoQuery.addSource({
        id: informationSourceId,
        layer: informationLayer
      });
      ngeoQuery.issue(map, coordinate);
      $httpBackend.flush();
      expect(ngeoQueryResult.sources[3].features.length).toBe(4);
      expect(ngeoQueryResult.sources[4].features.length).toBe(3);
      expect(ngeoQueryResult.total).toBe(7);
    });

    it('When layers are not visible, no request is sent', function() {
      var coordinate = [533800, 153000.00000000003];
      ngeoQuery.addSource({
        id: busStopSourceId,
        layer: busStopLayer
      });
      ngeoQuery.addSource({
        id: informationSourceId,
        layer: informationLayer
      });
      busStopLayer.setVisible(false);
      informationLayer.setVisible(false);
      ngeoQuery.issue(map, coordinate);
      var spy = jasmine.createSpy();
      expect(spy.calls.count()).toBe(0);
      expect(ngeoQueryResult.sources[5].features.length).toBe(0);
      expect(ngeoQueryResult.sources[6].features.length).toBe(0);
      expect(ngeoQueryResult.total).toBe(0);
    });
  });

});
