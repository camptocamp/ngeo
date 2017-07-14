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

describe('ngeo.Query', () => {

  let ngeoQuery;
  let ngeoQueryResult;

  beforeEach(() => {
    module('ngeo', ($provide) => {
      // reset services and values
      $provide.value('ngeoQueryOptions', {});
      $provide.service('ngeoQuery', ngeo.Query);
      $provide.value('ngeoQueryResult', {
        sources: [],
        total: 0
      });
    });

    inject(($injector) => {
      ngeoQuery = $injector.get('ngeoQuery');
      ngeoQueryResult = $injector.get('ngeoQueryResult');
    });
  });

  it('Create service', () => {
    expect(ngeoQuery instanceof ngeo.Query).toBe(true);
  });

  it('Add simple source to query', () => {
    const source = {
      id: 1,
      url: 'foo',
      layers: ['bar']
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

  it('Add source with wms layer to query', () => {
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
      id,
      layer,
      layers: ['bar']
    };
    ngeoQuery.addSource(source);
    // a source configured with a layer that uses a wms source should
    // automatically pick it as the wmsSource
    expect(source.wmsSource).toBe(wmsSource);
  });

  describe('Issue requests', () => {

    let map;
    let busStopLayer;
    const busStopSourceId = 'bus_stop';
    let informationLayer;
    const informationSourceId = 'information';
    let $httpBackend;

    const url = 'https://geomapfish-demo.camptocamp.net/2.2/wsgi/mapserv_proxy?ogcserver=Main+PNG&';
    const busStopParams = [
      'SERVICE=WMS',
      'VERSION=1.3.0',
      'REQUEST=GetFeatureInfo',
      'FORMAT=image%2Fpng',
      'TRANSPARENT=true',
      'QUERY_LAYERS=bus_stop',
      'LAYERS=bus_stop',
      'I=50',
      'J=50',
      'CRS=EPSG%3A21781',
      'STYLES=',
      'WIDTH=101',
      'HEIGHT=101',
      'BBOX=489100%2C119900%2C509300%2C140100',
      'FEATURE_COUNT=50',
      'INFO_FORMAT=application%2Fvnd.ogc.gml',
      'LAYERS=bus_stop',
      'QUERY_LAYERS=bus_stop'
    ].join('&');
    const busStopAndInformationParams = [
      'SERVICE=WMS',
      'VERSION=1.3.0',
      'REQUEST=GetFeatureInfo',
      'FORMAT=image%2Fpng',
      'TRANSPARENT=true',
      'QUERY_LAYERS=information',
      'LAYERS=information',
      'I=50',
      'J=50',
      'CRS=EPSG%3A21781',
      'STYLES=',
      'WIDTH=101',
      'HEIGHT=101',
      'BBOX=523700%2C142900%2C543900%2C163100',
      'FEATURE_COUNT=50',
      'INFO_FORMAT=application%2Fvnd.ogc.gml',
      'LAYERS=information,bus_stop',
      'QUERY_LAYERS=information,bus_stop'
    ].join('&');
    const requestUrlBusStop = `${url}${busStopParams}`;
    const requestUrlBusStopAndInformation = `${url}${busStopAndInformationParams}`;

    beforeEach(() => {

      inject(($injector) => {
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
        }),
        layers: ['bus_stop']
      });

      informationLayer = new ol.layer.Image({
        'querySourceIds': [informationSourceId],
        'source': new ol.source.ImageWMS({
          'url': url,
          params: {'LAYERS': 'information'}
        }),
        layers: ['information']
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
          projection,
          resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
          center: [537635, 152640],
          zoom: 0
        })
      });

    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Issue request with one source', () => {
      const coordinate = [499200, 130000];
      ngeoQuery.addSource({
        id: busStopSourceId,
        layer: busStopLayer,
        layers: ['bus_stop']
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

    it('Issue request with two sources', () => {
      const coordinate = [533800, 153000];
      ngeoQuery.addSource({
        id: busStopSourceId,
        layer: busStopLayer,
        layers: ['bus_stop']
      });
      ngeoQuery.addSource({
        id: informationSourceId,
        layer: informationLayer,
        layers: ['information']
      });
      ngeoQuery.issue(map, coordinate);
      $httpBackend.flush();
      expect(ngeoQueryResult.sources[0].features.length).toBe(4);
      expect(ngeoQueryResult.sources[1].features.length).toBe(3);
      expect(ngeoQueryResult.total).toBe(7);
    });

    it('When layers are not visible, no request is sent', () => {
      const coordinate = [533800, 153000];
      ngeoQuery.addSource({
        id: busStopSourceId,
        layer: busStopLayer,
        layers: ['bus_stop']
      });
      ngeoQuery.addSource({
        id: informationSourceId,
        layer: informationLayer,
        layers: ['information']
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

    it('Issues WFS request for one source', () => {
      $httpBackend.when('POST', url).respond(gmlResponseInformationWfs);

      const coordinate = [499200, 130000];
      // make a GetFeatureInfo request for this source
      ngeoQuery.addSource({
        id: busStopSourceId,
        layer: busStopLayer,
        layers: ['bus_stop']
      });
      // and a WFS GetFeature request for this one
      ngeoQuery.addSource({
        id: informationSourceId,
        layer: informationLayer,
        layers: ['information'],
        wfsQuery: true
      });
      ngeoQuery.issue(map, coordinate);
      $httpBackend.flush();
      expect(ngeoQueryResult.sources[0].features.length).toBe(1);
      expect(ngeoQueryResult.sources[1].features.length).toBe(3);
      expect(ngeoQueryResult.total).toBe(4);
    });

    it('Issues WFS request for two sources', () => {
      $httpBackend.when('POST', url).respond(gmlResponseBusStopWfs);
      $httpBackend.when('POST', `${url}?information`).respond(gmlResponseInformationWfs);

      const coordinate = [499200, 130000];
      ngeoQuery.addSource({
        id: busStopSourceId,
        layer: busStopLayer,
        layers: ['bus_stop'],
        wfsQuery: true
      });
      ngeoQuery.addSource({
        id: informationSourceId,
        layer: informationLayer,
        layers: ['information'],
        wfsQuery: true,
        urlWfs: `${url}?information`
      });
      ngeoQuery.issue(map, coordinate);
      $httpBackend.flush();
      expect(ngeoQueryResult.sources[0].features.length).toBe(2);
      expect(ngeoQueryResult.sources[1].features.length).toBe(3);
      expect(ngeoQueryResult.total).toBe(5);
      expect(ngeoQueryResult.sources[0].features[0].getId()).toBe('bus_stop_bus_stop.380835772');
    });

    it('Issues WFS request for one source (get count first)', () => {
      ngeoQuery.queryCountFirst_ = true;

      // request to get feature count
      $httpBackend.when('POST', url, body => body.indexOf('hits') != -1).respond(gmlResponseInformationHitsWfs);
      // request to get features
      $httpBackend.when('POST', url, body => body.indexOf('hits') == -1).respond(gmlResponseInformationWfs);

      const coordinate = [499200, 130000];
      // make a WFS GetFeature request for this source
      ngeoQuery.addSource({
        id: informationSourceId,
        layer: informationLayer,
        layers: ['information'],
        wfsQuery: true
      });

      ngeoQuery.issue(map, coordinate);
      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();

      expect(ngeoQueryResult.sources[0].features.length).toBe(3);
      expect(ngeoQueryResult.total).toBe(3);
    });

    it('Stops if too many features', () => {
      ngeoQuery.queryCountFirst_ = true;
      ngeoQuery.limit_ = 2;

      // request to get feature count
      $httpBackend.when('POST', url, body => body.indexOf('hits') != -1).respond(gmlResponseInformationHitsWfs);

      const coordinate = [499200, 130000];
      // make a WFS GetFeature request for this source
      ngeoQuery.addSource({
        id: informationSourceId,
        layer: informationLayer,
        layers: ['information'],
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

    describe('#getQueryableSources_', () => {
      it('gets sources for GetFeatureInfo requests', () => {
        ngeoQuery.addSource({
          id: busStopSourceId,
          layer: busStopLayer,
          layers: ['bus_stop']
        });
        ngeoQuery.addSource({
          id: informationSourceId,
          layer: informationLayer,
          layers: ['information']
        });

        const queryableSources = ngeoQuery.getQueryableSources_(map, false);
        expect(url in queryableSources.wfs).not.toBe(true);
        expect(url in queryableSources.wms).toBe(true);
        expect(queryableSources.wms[url].length).toBe(2);
      });

      it('gets sources for GetFeature requests', () => {
        ngeoQuery.addSource({
          id: busStopSourceId,
          layer: busStopLayer,
          layers: ['bus_stop'],
          wfsQuery: true
        });
        ngeoQuery.addSource({
          id: informationSourceId,
          layer: informationLayer,
          layers: ['information'],
          wfsQuery: false
        });

        const queryableSources = ngeoQuery.getQueryableSources_(map, true);
        expect(url in queryableSources.wms).not.toBe(true);
        expect(url in queryableSources.wfs).toBe(true);
        expect(queryableSources.wfs[url].length).toBe(1);
      });

      it('only gets visible layers', () => {
        map.getView().setResolution(50);
        // layer is not visible
        busStopLayer.setVisible(false);
        ngeoQuery.addSource({
          id: busStopSourceId,
          layer: busStopLayer,
          layers: ['bus_stop']
        });
        // layer is out of range
        informationLayer.setMinResolution(60);
        ngeoQuery.addSource({
          id: informationSourceId,
          layer: informationLayer,
          layers: ['information'],
          wfsQuery: true
        });
        const queryableSources = ngeoQuery.getQueryableSources_(map, false);
        expect(url in queryableSources.wms).not.toBe(true);
        expect(url in queryableSources.wfs).not.toBe(true);
      });
    });
  });
});
