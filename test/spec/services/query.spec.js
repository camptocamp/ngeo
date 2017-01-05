/* global gmlResponseBusStop,
          gmlResponseBusStopAndInformation,
          gmlResponseInformationWfs,
          gmlResponseBusStopWfs,
          gmlResponseInformationWfs,
          gmlResponseInformationHitsWfs,
          gmlResponseInformationWfs,
          gmlResponseInformationHitsWfs */
goog.require('ngeo.Query');
goog.require('ngeo.test.data.msGMLOutputBusStop');
goog.require('ngeo.test.data.msGMLOutputBusStopAndInformation');
goog.require('ngeo.test.data.msGMLOutputBusStopWfs');
goog.require('ngeo.test.data.msGMLOutputInformationWfs');
goog.require('ngeo.test.data.msGMLOutputInformationHitsWfs');

describe('ngeo.Query', function() {

  let ngeoQuery;
  let ngeoQueryResult;

  beforeEach(function() {
    module('ngeo', function($provide) {
      // reset services and values
      $provide.value('ngeoQueryOptions', {});
      $provide.service('ngeoQuery', ngeo.Query);
      $provide.value('ngeoQueryResult', {
        sources: [],
        total: 0
      });
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
    const source = {
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
    const id = 1;
    const wmsSource = new ol.source.ImageWMS({
      url: 'foo',
      params: {'LAYERS': 'bar'}
    });
    const layer = new ol.layer.Image({
      querySourceIds: [id],
      source: wmsSource
    });
    const source = {
      id: id,
      layer: layer
    };
    ngeoQuery.addSource(source);
    // a source configured with a layer that uses a wms source should
    // automatically pick it as the wmsSource
    expect(source.wmsSource).toBe(wmsSource);
  });

  describe('Issue requests', function() {

    let map;
    let busStopLayer;
    const busStopSourceId = 'bus_stop';
    let informationLayer;
    const informationSourceId = 'information';
    let $httpBackend;

    const url = 'https://geomapfish-demo.camptocamp.net/1.6/wsgi/mapserv_proxy';
    const requestUrlBusStop = url + '?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&INFO_FORMAT=application%2Fvnd.ogc.gml&FEATURE_COUNT=50&I=50&J=50&CRS=EPSG%3A21781&STYLES=&WIDTH=101&HEIGHT=101&BBOX=489100%2C119900.00000000003%2C509300%2C140100.00000000003&LAYERS=bus_stop&QUERY_LAYERS=bus_stop';
    const requestUrlBusStopAndInformation = url + '?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&INFO_FORMAT=application%2Fvnd.ogc.gml&FEATURE_COUNT=50&I=50&J=50&CRS=EPSG%3A21781&STYLES=&WIDTH=101&HEIGHT=101&BBOX=523700%2C142900.00000000003%2C543900%2C163100.00000000003&LAYERS=information%2Cbus_stop&QUERY_LAYERS=information%2Cbus_stop';

    beforeEach(function() {

      inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', requestUrlBusStop).respond(gmlResponseBusStop);
        $httpBackend.when('GET', requestUrlBusStopAndInformation).respond(
            gmlResponseBusStopAndInformation);
      });

      busStopLayer = new ol.layer.Image({
        'querySourceIds': [busStopSourceId],
        'source': new ol.source.ImageWMS({
          'url': url,
          params: {'LAYERS': 'bus_stop'}
        })
      });

      informationLayer = new ol.layer.Image({
        'querySourceIds': [informationSourceId],
        'source': new ol.source.ImageWMS({
          'url': url,
          params: {'LAYERS': 'information'}
        })
      });

      const projection = ol.proj.get('EPSG:21781');
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
      const coordinate = [499200, 130000.00000000003];
      ngeoQuery.addSource({
        id: busStopSourceId,
        layer: busStopLayer
      });
      ngeoQuery.issue(map, coordinate);
      $httpBackend.flush();
      expect(ngeoQueryResult.sources[0].features.length).toBe(1);
      expect(ngeoQueryResult.total).toBe(1);
      ngeoQuery.clear();
      expect(ngeoQueryResult.sources[0].features.length).toBe(0);
      expect(ngeoQueryResult.total).toBe(0);
      expect(ngeoQuery.requestCancelers_.length).toBe(1);
    });

    it('Issue request with two sources', function() {
      const coordinate = [533800, 153000.00000000003];
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
      expect(ngeoQueryResult.sources[0].features.length).toBe(4);
      expect(ngeoQueryResult.sources[1].features.length).toBe(3);
      expect(ngeoQueryResult.total).toBe(7);
    });

    it('When layers are not visible, no request is sent', function() {
      const coordinate = [533800, 153000.00000000003];
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
      const spy = jasmine.createSpy();
      expect(spy.calls.count()).toBe(0);
      expect(ngeoQueryResult.sources[0].features.length).toBe(0);
      expect(ngeoQueryResult.sources[1].features.length).toBe(0);
      expect(ngeoQueryResult.total).toBe(0);
    });

    it('Issues WFS request for one source', function() {
      $httpBackend.when('POST', url).respond(gmlResponseInformationWfs);

      const coordinate = [499200, 130000.00000000003];
      // make a GetFeatureInfo request for this source
      ngeoQuery.addSource({
        id: busStopSourceId,
        layer: busStopLayer
      });
      // and a WFS GetFeature request for this one
      ngeoQuery.addSource({
        id: informationSourceId,
        layer: informationLayer,
        wfsQuery: true
      });
      ngeoQuery.issue(map, coordinate);
      $httpBackend.flush();
      expect(ngeoQueryResult.sources[0].features.length).toBe(1);
      expect(ngeoQueryResult.sources[1].features.length).toBe(3);
      expect(ngeoQueryResult.total).toBe(4);
    });

    it('Issues WFS request for two sources', function() {
      $httpBackend.when('POST', url).respond(gmlResponseBusStopWfs);
      $httpBackend.when('POST', url + '?information').respond(gmlResponseInformationWfs);

      const coordinate = [499200, 130000];
      ngeoQuery.addSource({
        id: busStopSourceId,
        layer: busStopLayer,
        wfsQuery: true
      });
      ngeoQuery.addSource({
        id: informationSourceId,
        layer: informationLayer,
        wfsQuery: true,
        urlWfs: url + '?information'
      });
      ngeoQuery.issue(map, coordinate);
      $httpBackend.flush();
      expect(ngeoQueryResult.sources[0].features.length).toBe(2);
      expect(ngeoQueryResult.sources[1].features.length).toBe(3);
      expect(ngeoQueryResult.total).toBe(5);
      expect(ngeoQueryResult.sources[0].features[0].getId()).toBe('bus_stop_bus_stop.380835772');
    });

    it('Issues WFS request for one source (get count first)', function() {
      ngeoQuery.queryCountFirst_ = true;

      // request to get feature count
      $httpBackend.when('POST', url, function(body) {
        return body.indexOf('hits') != -1;
      }).respond(gmlResponseInformationHitsWfs);
      // request to get features
      $httpBackend.when('POST', url, function(body) {
        return body.indexOf('hits') == -1;
      }).respond(gmlResponseInformationWfs);

      const coordinate = [499200, 130000.00000000003];
      // make a WFS GetFeature request for this source
      ngeoQuery.addSource({
        id: informationSourceId,
        layer: informationLayer,
        wfsQuery: true
      });

      ngeoQuery.issue(map, coordinate);
      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();

      expect(ngeoQueryResult.sources[0].features.length).toBe(3);
      expect(ngeoQueryResult.total).toBe(3);
    });

    it('Stops if too many features', function() {
      ngeoQuery.queryCountFirst_ = true;
      ngeoQuery.limit_ = 2;

      // request to get feature count
      $httpBackend.when('POST', url, function(body) {
        return body.indexOf('hits') != -1;
      }).respond(gmlResponseInformationHitsWfs);

      const coordinate = [499200, 130000.00000000003];
      // make a WFS GetFeature request for this source
      ngeoQuery.addSource({
        id: informationSourceId,
        layer: informationLayer,
        wfsQuery: true
      });

      ngeoQuery.issue(map, coordinate);
      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();

      expect(ngeoQueryResult.sources[0].tooManyResults).toBe(true);
      expect(ngeoQueryResult.sources[0].features.length).toBe(0);
      expect(ngeoQueryResult.total).toBe(0);
    });

    describe('#getQueryableSources_', function() {
      it('gets sources for GetFeatureInfo requests', function() {
        ngeoQuery.addSource({
          id: busStopSourceId,
          layer: busStopLayer
        });
        ngeoQuery.addSource({
          id: informationSourceId,
          layer: informationLayer
        });

        const queryableSources = ngeoQuery.getQueryableSources_(map, false);
        expect(url in queryableSources.wfs).not.toBe(true);
        expect(url in queryableSources.wms).toBe(true);
        expect(queryableSources.wms[url].length).toBe(2);
      });

      it('gets sources for GetFeature requests', function() {
        ngeoQuery.addSource({
          id: busStopSourceId,
          layer: busStopLayer,
          wfsQuery: true
        });
        ngeoQuery.addSource({
          id: informationSourceId,
          layer: informationLayer,
          wfsQuery: false
        });

        const queryableSources = ngeoQuery.getQueryableSources_(map, true);
        expect(url in queryableSources.wms).not.toBe(true);
        expect(url in queryableSources.wfs).toBe(true);
        expect(queryableSources.wfs[url].length).toBe(1);
      });

      it('only gets visible layers', function() {
        map.getView().setResolution(50);
        // layer is not visible
        busStopLayer.setVisible(false);
        ngeoQuery.addSource({
          id: busStopSourceId,
          layer: busStopLayer
        });
        // layer is out of range
        informationLayer.setMinResolution(60);
        ngeoQuery.addSource({
          id: informationSourceId,
          layer: informationLayer,
          wfsQuery: true
        });
        const queryableSources = ngeoQuery.getQueryableSources_(map, false);
        expect(url in queryableSources.wms).not.toBe(true);
        expect(url in queryableSources.wfs).not.toBe(true);
      });
    });
  });

});
