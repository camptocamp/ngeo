goog.require('ol.Map');
goog.require('ol.extent');
goog.require('ol.layer.Image');
goog.require('ol.layer.Tile');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.WMTS');
goog.require('ol.tilegrid.WMTS');
goog.require('ngeo.CreatePrint');
goog.require('ngeo.Print');

describe('ngeo.CreatePrint', function() {

  var ngeoCreatePrint;

  beforeEach(function() {
    inject(function($injector) {
      ngeoCreatePrint = $injector.get('ngeoCreatePrint');
    });

  });

  it('creates an ngeo.Print instance', function() {
    var print = ngeoCreatePrint('http://example.com/print');
    expect(print instanceof ngeo.Print).toBe(true);
  });

  describe('#createSpec', function() {

    var print;
    var map;

    beforeEach(function() {
      print = ngeoCreatePrint('http://example.com/print');
      map = new ol.Map({
        view: new ol.View({
          center: [3000, 4000],
          zoom: 0
        })
      });
    });

    describe('ImageWMS', function() {

      beforeEach(function() {
        map.addLayer(new ol.layer.Image({
          source: new ol.source.ImageWMS({
            url: 'http://example.com/wms',
            params: {
              'LAYERS': 'foo,bar',
              'FORMAT': 'image/jpeg'
            }
          })
        }));
      });

      it('creates a valid spec object', function() {

        var scale = 500;
        var dpi = 72;
        var layout = 'foo layout';
        var customAttributes = {'foo': 'fooval', 'bar': 'barval'};

        var spec = print.createSpec(map, scale, dpi, layout, customAttributes);

        expect(spec).toEqual({
          attributes: {
            map: {
              dpi: 72,
              center: [3000, 4000],
              projection: 'EPSG:3857',
              scale: 500,
              layers: [{
                baseURL: 'http://example.com/wms',
                imageFormat: 'image/jpeg',
                layers: ['foo', 'bar'],
                type: 'wms'
              }]
            },
            foo: 'fooval',
            bar: 'barval'
          },
          layout: 'foo layout'
        });

      });

    });

    describe('WMTS', function() {

      beforeEach(function() {
        var projection = ol.proj.get('EPSG:3857');
        map.addLayer(new ol.layer.Tile({
          source: new ol.source.WMTS({
            dimensions: {'TIME': 'time'},
            format: 'image/jpeg',
            layer: 'layer',
            matrixSet: 'matrixset',
            projection: projection,
            requestEncoding: 'REST',
            style: 'style',
            tileGrid: new ol.tilegrid.WMTS({
              matrixIds: ['00', '01', '02'],
              origin: ol.extent.getTopLeft(projection.getExtent()),
              resolutions: [2000, 1000, 500],
              tileSize: 512
            }),
            url: 'http://example.com/wmts/{Layer}/{Style}/{TileMatrixSet}/' +
                '{TileMatrix}/{TileRow}/{TileCol}.jpeg',
            version: '1.1.0'
          })
        }));
      });

      it('creates a valid spec object', function() {

        var scale = 500;
        var dpi = 72;
        var layout = 'foo layout';
        var customAttributes = {'foo': 'fooval', 'bar': 'barval'};

        var spec = print.createSpec(map, scale, dpi, layout, customAttributes);

        expect(spec).toEqual({
          attributes: {
            map: {
              dpi: 72,
              center: [3000, 4000],
              projection: 'EPSG:3857',
              scale: 500,
              layers: [{
                baseURL: 'http://example.com/wmts/layer/{Style}/' +
                    '{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg',
                dimensions: ['TIME'],
                dimensionParams: {'TIME': 'time'},
                imageFormat: 'image/jpeg',
                layer: 'layer',
                matrices: [{
                  identifier: '00',
                  scaleDenominator: 7142857.142857144,
                  tileSize: [512, 512],
                  topLeftCorner: ol.extent.getTopLeft(
                      ol.proj.get('EPSG:3857').getExtent()),
                  matrixSize: [1, 1]
                }, {
                  identifier: '01',
                  scaleDenominator: 3571428.571428572,
                  tileSize: [512, 512],
                  topLeftCorner: ol.extent.getTopLeft(
                      ol.proj.get('EPSG:3857').getExtent()),
                  matrixSize: [2, 2]
                }, {
                  identifier: '02',
                  scaleDenominator: 1785714.285714286,
                  tileSize: [512, 512],
                  topLeftCorner: ol.extent.getTopLeft(
                      ol.proj.get('EPSG:3857').getExtent()),
                  matrixSize: [4, 4]
                }],
                matrixSet: 'matrixset',
                requestEncoding: 'REST',
                style: 'style',
                type: 'WMTS',
                version: '1.1.0'
              }]
            },
            foo: 'fooval',
            bar: 'barval'
          },
          layout: 'foo layout'
        });

      });

    });

    describe('layer order', function() {

      beforeEach(function() {
        map.addLayer(new ol.layer.Image({
          source: new ol.source.ImageWMS({
            url: 'http://example.com/wms/bottom',
            params: {
              'LAYERS': 'foo,bar',
              'FORMAT': 'image/jpeg'
            }
          })
        }));

        map.addLayer(new ol.layer.Image({
          source: new ol.source.ImageWMS({
            url: 'http://example.com/wms/top',
            params: {
              'LAYERS': 'foo,bar',
              'FORMAT': 'image/jpeg'
            }
          })
        }));

      });

      it('reverses the layer order', function() {

        var scale = 500;
        var dpi = 72;
        var layout = 'foo layout';
        var customAttributes = {'foo': 'fooval', 'bar': 'barval'};

        var spec = print.createSpec(map, scale, dpi, layout, customAttributes);

        var layers = spec.attributes.map.layers;
        expect(layers.length).toBe(2);
        expect(layers[0].baseURL).toBe('http://example.com/wms/top');
        expect(layers[1].baseURL).toBe('http://example.com/wms/bottom');
      });

    });

  });

  describe('#createReport', function() {

    var print;
    var spec;
    var $httpBackend;

    beforeEach(function() {
      print = ngeoCreatePrint('http://example.com/print');

      spec = {
        attributes: {
          map: {
            dpi: 72,
            center: [3000, 4000],
            projection: 'EPSG:3857',
            scale: 500,
            layers: [{
              baseURL: 'http://example.com/wms',
              imageFormat: 'image/jpeg',
              layers: ['foo', 'bar'],
              type: 'wms'
            }]
          },
          foo: 'fooval',
          bar: 'barval'
        },
        layout: 'foo layout'
      };

      inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', 'http://example.com/print/report.pdf')
            .respond({
                ref: 'deadbeef',
                statusURL: '/print/status/deadbeef.json',
                downloadURL: '/print/report/deadbeef.json'
            });
      });
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('triggers the report request and resolves the promise', function() {
      $httpBackend.expectPOST('http://example.com/print/report.pdf');
      var promise = print.createReport(spec);

      var spy = jasmine.createSpy();
      promise.then(spy);

      $httpBackend.flush();

      expect(spy.calls.length).toBe(1);
      expect(spy.mostRecentCall.args[0]).toEqual({
        ref: 'deadbeef',
        statusURL: '/print/status/deadbeef.json',
        downloadURL: '/print/report/deadbeef.json'
      });
    });

  });

  describe('#getStatus', function() {

    var print;
    var spec;
    var $httpBackend;

    beforeEach(function() {
      print = ngeoCreatePrint('http://example.com/print');

      spec = {
        attributes: {
          map: {
            dpi: 72,
            center: [3000, 4000],
            projection: 'EPSG:3857',
            scale: 500,
            layers: [{
              baseURL: 'http://example.com/wms',
              imageFormat: 'image/jpeg',
              layers: ['foo', 'bar'],
              type: 'wms'
            }]
          },
          foo: 'fooval',
          bar: 'barval'
        },
        layout: 'foo layout'
      };

      inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET',
            'http://example.com/print/status/deadbeef.json').respond({
                done: false,
                downloadURL: '/print/report/deadbeef.json'
            });
      });
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('triggers the status request and resolves the promise', function() {
      $httpBackend.expectGET('http://example.com/print/status/deadbeef.json');
      var promise = print.getStatus('deadbeef');

      var spy = jasmine.createSpy();
      promise.then(spy);

      $httpBackend.flush();

      expect(spy.calls.length).toBe(1);
      expect(spy.mostRecentCall.args[0]).toEqual({
        done: false,
        downloadURL: '/print/report/deadbeef.json'
      });
    });

  });

  describe('#getReportUrl', function() {
    var print;

    beforeEach(function() {
      print = ngeoCreatePrint('http://example.com/print');
    });

    it('returns the report URL', function() {
      var url = print.getReportUrl('deadbeef');
      expect(url).toBe('http://example.com/print/report/deadbeef');
    });
  });

});
