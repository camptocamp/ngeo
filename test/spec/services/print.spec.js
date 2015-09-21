goog.require('ol.Feature');
goog.require('ol.Map');
goog.require('ol.extent');
goog.require('ol.geom.LineString');
goog.require('ol.geom.Point');
goog.require('ol.geom.Polygon');
goog.require('ol.layer.Image');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.TileWMS');
goog.require('ol.source.Vector');
goog.require('ol.source.WMTS');
goog.require('ol.style.Circle');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');
goog.require('ol.style.Text');
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

    describe('rotation', function() {

      beforeEach(function() {
        var view = map.getView();
        view.rotate(Math.PI);
      });

      it('rotation angle is correct', function() {
        var scale = 500;
        var dpi = 72;
        var layout = 'foo layout';
        var customAttributes = {'foo': 'fooval', 'bar': 'barval'};

        var spec = print.createSpec(map, scale, dpi, layout, customAttributes);
        expect(spec.attributes.map.rotation).toEqual(180);
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
              rotation: 0,
              scale: 500,
              rotation: 0,
              layers: [{
                baseURL: 'http://example.com/wms',
                imageFormat: 'image/jpeg',
                customParams: {
                  TRANSPARENT: true
                },
                layers: ['foo', 'bar'],
                type: 'wms',
                opacity: 1
              }]
            },
            foo: 'fooval',
            bar: 'barval'
          },
          layout: 'foo layout'
        });

      });

    });


    describe('TileWMS', function() {

      beforeEach(function() {
        map.addLayer(new ol.layer.Tile({
          source: new ol.source.TileWMS({
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
              rotation: 0,
              layers: [{
                baseURL: 'http://example.com/wms',
                imageFormat: 'image/jpeg',
                customParams: {
                  TRANSPARENT: true
                },
                layers: ['foo', 'bar'],
                type: 'wms',
                opacity: 1
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
          opacity: 0.5,
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
              rotation: 0,
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
                opacity: 0.5,
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

    describe('Vector', function() {
      var style0, style1, style2, style3, style4;

      beforeEach(function() {

        var feature0 = new ol.Feature({
          geometry: new ol.geom.Point([0, 0]),
          foo: '0'
        });

        var feature1 = new ol.Feature({
          geometry: new ol.geom.LineString([[0, 0], [1, 1]]),
          foo: '1'
        });

        var feature2 = new ol.Feature({
          geometry: new ol.geom.Polygon([[[0, 0], [1, 1], [1, 0], [0, 0]]]),
          foo: '2'
        });

        var feature3 = new ol.Feature({
          geometry: new ol.geom.Point([0, 0]),
          foo: '3'
        });

        style0 = new ol.style.Style({
          fill: new ol.style.Fill({
            color: [1, 1, 1, 0.1]
          }),
          image: new ol.style.Circle({
            radius: 1,
            stroke: new ol.style.Stroke({
              width: 1,
              color: [1, 1, 1, 0.1]
            })
          }),
          stroke: new ol.style.Stroke({
            width: 1,
            color: [1, 1, 1, 0.1]
          })
        });

        // styles for feature0
        var styles0 = [style0];

        style1 = new ol.style.Style({
          stroke: new ol.style.Stroke({
            width: 2,
            color: [2, 2, 2, 0.2]
          })
        });

        // styles for feature1
        var styles1 = [style0, style1];

        style2 = new ol.style.Style({
          fill: new ol.style.Fill({
            color: [3, 3, 3, 0.3]
          }),
          stroke: new ol.style.Stroke({
            width: 3,
            color: [3, 3, 3, 0.3]
          })
        });

        // styles for features2
        var styles2 = [style2];

        style3 = new ol.style.Style({
          text: new ol.style.Text({
            font: 'normal 16px "sans serif"',
            text: 'Ngeo',
            textAlign: 'left',
            offsetX: 42,
            offsetY: -42,
            fill: new ol.style.Fill({
              color: [3, 3, 3, 0.3]
            })
          })
        });

        // Here to check that no offset are present if textAlign is not there.
        style4 = new ol.style.Style({
          text: new ol.style.Text({
            font: 'normal 16px "sans serif"',
            text: 'Ngeo',
            offsetX: 42,
            offsetY: -42,
            fill: new ol.style.Fill({
              color: [3, 3, 3, 0.3]
            })
          })
        });

        // styles for features3
        var styles3 = [style3, style4];

        var styleFunction = function(feature, resolution) {
          var v = feature.get('foo');
          if (v == '0') {
            return styles0;
          } else if (v == '1') {
            return styles1;
          } else if (v == '2') {
            return styles2;
          } else if (v == '3') {
            return styles3;
          }
        };

        map.addLayer(new ol.layer.Vector({
          opacity: 0.8,
          source: new ol.source.Vector({
            features: [feature0, feature1, feature2, feature3]
          }),
          style: styleFunction
        }));
      });

      it('creates a valid spec object', function() {

        var scale = 500;
        var dpi = 72;
        var layout = 'foo layout';
        var customAttributes = {'foo': 'fooval', 'bar': 'barval'};

        var spec = print.createSpec(map, scale, dpi, layout, customAttributes);

        var styleId0 = goog.getUid(style0).toString();
        var styleId1 = goog.getUid(style1).toString();
        var styleId2 = goog.getUid(style2).toString();
        var styleId3 = goog.getUid(style3).toString();
        var styleId4 = goog.getUid(style4).toString();

        var expectedStyle = {
          version: 2
        };
        expectedStyle['[_ngeo_style_0 = \'' + styleId0 + '\']'] = {
          symbolizers: [{
            type: 'point',
            pointRadius: 1,
            strokeColor: '#010101',
            strokeOpacity: 0.1,
            strokeWidth: 1
          }]
        };
        expectedStyle['[_ngeo_style_1 = \'' + styleId1 + '\']'] = {
          symbolizers: [{
            type: 'line',
            strokeColor: '#020202',
            strokeOpacity: 0.2,
            strokeWidth: 2
          }]
        };
        expectedStyle['[_ngeo_style_0 = \'' + styleId2 + '\']'] = {
          symbolizers: [{
            type: 'polygon',
            fillColor: '#030303',
            fillOpacity: 0.3,
            strokeColor: '#030303',
            strokeOpacity: 0.3,
            strokeWidth: 3
          }]
        };
        expectedStyle['[_ngeo_style_0 = \'' + styleId3 + '\']'] = {
          symbolizers: [{
            type: 'Text',
            fontColor: '#030303',
            fontWeight: 'normal',
            fontSize: '16px',
            fontFamily: '"sans serif"',
            label: 'Ngeo',
            labelAlign: 'left',
            labelXOffset: 42,
            labelYOffset: 42
          }]
        };
        expectedStyle['[_ngeo_style_1 = \'' + styleId4 + '\']'] = {
          symbolizers: [{
            type: 'Text',
            fontColor: '#030303',
            fontWeight: 'normal',
            fontSize: '16px',
            fontFamily: '"sans serif"',
            label: 'Ngeo'
          }]
        };

        // the expected properties of feature0
        var properties0 = {
          foo: '0',
          '_ngeo_style_0': styleId0
        };

        // the expected properties of feature1
        var properties1 = {
          foo: '1',
          '_ngeo_style_0': styleId0,
          '_ngeo_style_1': styleId1
        };

        // the expected properties of feature2
        var properties2 = {
          foo: '2',
          '_ngeo_style_0': styleId2
        };

        // the expected properties of feature3
        var properties3 = {
          foo: '3',
          '_ngeo_style_0': styleId3,
          '_ngeo_style_1': styleId4
        };

        expect(spec).toEqual({
          attributes: {
            map: {
              dpi: 72,
              center: [3000, 4000],
              projection: 'EPSG:3857',
              rotation: 0,
              scale: 500,
              layers: [{
                geoJson: {
                  type: 'FeatureCollection',
                  features: [{
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [0, 0]
                    },
                    properties: properties0
                  }, {
                    type: 'Feature',
                    geometry: {
                      type: 'LineString',
                      coordinates: [[0, 0], [1, 1]]
                    },
                    properties: properties1
                  }, {
                    type: 'Feature',
                    geometry: {
                      type: 'Polygon',
                      coordinates: [[[0, 0], [1, 1], [1, 0], [0, 0]]]
                    },
                    properties: properties2
                  }, {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [0, 0]
                    },
                    properties: properties3
                  }]
                },
                opacity: 0.8,
                style: expectedStyle,
                type: 'geojson'
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
      expect(spy.mostRecentCall.args[0].data).toEqual({
        ref: 'deadbeef',
        statusURL: '/print/status/deadbeef.json',
        downloadURL: '/print/report/deadbeef.json'
      });
    });

    describe('cancel report request', function() {

      it('cancels the request', inject(function($q) {
        $httpBackend.expectPOST('http://example.com/print/report.pdf');

        var canceler = $q.defer();
        var promise = print.createReport(spec, {
          timeout: canceler.promise
        });

        canceler.resolve(); // abort the $http request

        // We will get an "Unflushed requests: 1" error in afterEach when
        // calling verifyNoOutstandingRequest if the aborting did not work.
      }));
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
      expect(spy.mostRecentCall.args[0].data).toEqual({
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

  describe('#getCapabilities', function() {
    var print;
    var $httpBackend;
    // Only used to test that getCapabilities fetch the json from the proper url
    var capabilities;

    beforeEach(inject(function (_$httpBackend_) {

      $httpBackend = _$httpBackend_;

      capabilities = {
        'test': true
      };

      $httpBackend.when('GET', 'http://example.com/print/capabilities.json')
          .respond(capabilities);
    }));

    beforeEach(function() {
      print = ngeoCreatePrint('http://example.com/print');
    });

    it('gets the correct capabilities', function () {
      var resp;
      print.getCapabilities().success(function(data) {
        resp = data;
      });
      $httpBackend.flush();
      expect(resp).toEqual(capabilities);
    });
  });

  describe('#cancel', function() {
    var print;
    var $httpBackend;

    beforeEach(inject(function(_$httpBackend_) {
      print = ngeoCreatePrint('http://example.com/print');
      $httpBackend = _$httpBackend_;
      $httpBackend.when('DELETE', 'http://example.com/print/cancel/deadbeef')
          .respond(200)
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('triggers the cancel request and resolves the promise', function() {
      $httpBackend.expectDELETE('http://example.com/print/cancel/deadbeef');
      var promise = print.cancel('deadbeef');

      var spy = jasmine.createSpy();
      promise.then(spy);

      $httpBackend.flush();

      expect(spy.calls.length).toBe(1);
      expect(spy.mostRecentCall.args[0].status).toEqual(200);
    });
  });
});
