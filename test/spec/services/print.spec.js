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

describe('ngeo.CreatePrint', () => {

  let ngeoCreatePrint;

  beforeEach(() => {
    inject(($injector) => {
      ngeoCreatePrint = $injector.get('ngeoCreatePrint');
    });

  });

  it('creates an ngeo.Print instance', () => {
    const print = ngeoCreatePrint('http://example.com/print');
    expect(print instanceof ngeo.Print).toBe(true);
  });

  describe('#createSpec', () => {

    let print;
    let map;

    beforeEach(() => {
      print = ngeoCreatePrint('http://example.com/print');
      map = new ol.Map({
        view: new ol.View({
          center: [3000, 4000],
          zoom: 0
        })
      });
    });

    describe('rotation', () => {

      beforeEach(() => {
        const view = map.getView();
        view.rotate(Math.PI);
      });

      it('rotation angle is correct', () => {
        const scale = 500;
        const dpi = 72;
        const layout = 'foo layout';
        const format = 'pdf';
        const customAttributes = {'foo': 'fooval', 'bar': 'barval'};

        const spec = print.createSpec(map, scale, dpi, layout, format,
          customAttributes);
        expect(spec.attributes.map.rotation).toEqual(180);
      });
    });

    describe('ImageWMS', () => {

      beforeEach(() => {
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

      it('creates a valid spec object', () => {

        const scale = 500;
        const dpi = 72;
        const layout = 'foo layout';
        const format = 'pdf';
        const customAttributes = {'foo': 'fooval', 'bar': 'barval'};

        const spec = print.createSpec(map, scale, dpi, layout, format,
          customAttributes);

        expect(spec).toEqual({
          attributes: {
            map: {
              dpi: 72,
              center: [3000, 4000],
              projection: 'EPSG:3857',
              rotation: 0,
              scale: 500,
              layers: [{
                baseURL: 'http://example.com/wms',
                imageFormat: 'image/jpeg',
                customParams: {
                  TRANSPARENT: true
                },
                layers: ['foo', 'bar'],
                type: 'wms',
                opacity: 1,
                serverType: undefined,
                version: undefined,
                useNativeAngle: true
              }]
            },
            foo: 'fooval',
            bar: 'barval'
          },
          format: 'pdf',
          layout: 'foo layout'
        });

      });

    });


    describe('TileWMS', () => {

      beforeEach(() => {
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

      it('creates a valid spec object', () => {

        const scale = 500;
        const dpi = 72;
        const layout = 'foo layout';
        const format = 'pdf';
        const customAttributes = {'foo': 'fooval', 'bar': 'barval'};

        const spec = print.createSpec(map, scale, dpi, layout, format,
          customAttributes);
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
                opacity: 1,
                serverType: undefined,
                version: undefined,
                useNativeAngle: true
              }]
            },
            foo: 'fooval',
            bar: 'barval'
          },
          format: 'pdf',
          layout: 'foo layout'
        });

      });

    });

    describe('WMTS', () => {

      beforeEach(() => {
        const projection = ol.proj.get('EPSG:3857');
        const extent = projection.getExtent();
        map.addLayer(new ol.layer.Tile({
          opacity: 0.5,
          source: new ol.source.WMTS({
            dimensions: {'TIME': 'time'},
            format: 'image/jpeg',
            layer: 'layer',
            matrixSet: 'matrixset',
            projection,
            requestEncoding: 'REST',
            style: 'style',
            tileGrid: new ol.tilegrid.WMTS({
              matrixIds: ['00', '01', '02'],
              extent,
              origin: ol.extent.getTopLeft(extent),
              resolutions: [2000, 1000, 500],
              tileSize: 512
            }),
            url: 'http://example.com/wmts/{Layer}/{Style}/{TileMatrixSet}/' +
                '{TileMatrix}/{TileRow}/{TileCol}.jpeg',
            version: '1.1.0'
          })
        }));
      });

      it('creates a valid spec object', () => {

        const scale = 500;
        const dpi = 72;
        const layout = 'foo layout';
        const format = 'pdf';
        const customAttributes = {'foo': 'fooval', 'bar': 'barval'};

        const spec = print.createSpec(map, scale, dpi, layout, format,
          customAttributes);

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
                  matrixSize: [39, 39]
                }, {
                  identifier: '01',
                  scaleDenominator: 3571428.571428572,
                  tileSize: [512, 512],
                  topLeftCorner: ol.extent.getTopLeft(
                    ol.proj.get('EPSG:3857').getExtent()),
                  matrixSize: [78, 78]
                }, {
                  identifier: '02',
                  scaleDenominator: 1785714.285714286,
                  tileSize: [512, 512],
                  topLeftCorner: ol.extent.getTopLeft(
                    ol.proj.get('EPSG:3857').getExtent()),
                  matrixSize: [156, 156]
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
          format: 'pdf',
          layout: 'foo layout'
        });

      });

    });

    describe('Vector', () => {
      let style0, style1, style2, style3, style4;

      beforeEach(() => {

        const feature0 = new ol.Feature({
          geometry: new ol.geom.Point([0, 0]),
          foo: '0'
        });

        const feature1 = new ol.Feature({
          geometry: new ol.geom.LineString([[0, 0], [1, 1]]),
          foo: '1'
        });

        const feature2 = new ol.Feature({
          geometry: new ol.geom.Polygon([[[0, 0], [1, 1], [1, 0], [0, 0]]]),
          foo: '2'
        });

        const feature3 = new ol.Feature({
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
        const styles0 = [style0];

        style1 = new ol.style.Style({
          stroke: new ol.style.Stroke({
            width: 2,
            color: [2, 2, 2, 0.2]
          })
        });

        // styles for feature1
        const styles1 = [style0, style1];

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
        const styles2 = [style2];

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

        // Here to check that textAlign default value is set.
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
        const styles3 = [style3, style4];

        const styleFunction = function(feature, resolution) {
          const v = feature.get('foo');
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

      it('creates a valid spec object', () => {

        const scale = 500;
        const dpi = 72;
        const layout = 'foo layout';
        const format = 'pdf';
        const customAttributes = {'foo': 'fooval', 'bar': 'barval'};

        const spec = print.createSpec(map, scale, dpi, layout, format,
          customAttributes);

        const styleId0 = ol.getUid(style0).toString();
        const styleId1 = ol.getUid(style1).toString();
        const styleId2 = ol.getUid(style2).toString();
        const styleId3 = ol.getUid(style3).toString();
        const styleId4 = ol.getUid(style4).toString();

        const expectedStyle = {
          version: 2
        };
        expectedStyle[`[_ngeo_style_0 = '${styleId0}']`] = {
          symbolizers: [{
            type: 'point',
            pointRadius: 1,
            strokeColor: '#010101',
            strokeOpacity: 0.1,
            strokeWidth: 1
          }]
        };
        expectedStyle[`[_ngeo_style_1 = '${styleId1}']`] = {
          symbolizers: [{
            type: 'line',
            strokeColor: '#020202',
            strokeOpacity: 0.2,
            strokeWidth: 2
          }]
        };
        expectedStyle[`[_ngeo_style_0 = '${styleId2}']`] = {
          symbolizers: [{
            type: 'polygon',
            fillColor: '#030303',
            fillOpacity: 0.3,
            strokeColor: '#030303',
            strokeOpacity: 0.3,
            strokeWidth: 3
          }]
        };
        expectedStyle[`[_ngeo_style_0 = '${styleId3}']`] = {
          symbolizers: [{
            type: 'Text',
            fontColor: '#030303',
            fontWeight: 'normal',
            fontSize: '16px',
            fontFamily: '"sans serif"',
            label: 'Ngeo',
            labelAlign: 'lm',
            labelXOffset: 42,
            labelYOffset: 42
          }]
        };
        expectedStyle[`[_ngeo_style_1 = '${styleId4}']`] = {
          symbolizers: [{
            type: 'Text',
            fontColor: '#030303',
            fontWeight: 'normal',
            fontSize: '16px',
            fontFamily: '"sans serif"',
            label: 'Ngeo',
            labelAlign: 'cm',
            labelXOffset: 42,
            labelYOffset: 42
          }]
        };

        // the expected properties of feature0
        const properties0 = {
          foo: '0',
          '_ngeo_style_0': styleId0
        };

        // the expected properties of feature1
        const properties1 = {
          foo: '1',
          '_ngeo_style_0': styleId0,
          '_ngeo_style_1': styleId1
        };

        // the expected properties of feature2
        const properties2 = {
          foo: '2',
          '_ngeo_style_0': styleId2
        };

        // the expected properties of feature3
        const properties3 = {
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
          format: 'pdf',
          layout: 'foo layout'
        });
      });

    });

    describe('layer order', () => {

      beforeEach(() => {
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

      it('reverses the layer order', () => {

        const scale = 500;
        const dpi = 72;
        const layout = 'foo layout';
        const format = 'pdf';
        const customAttributes = {'foo': 'fooval', 'bar': 'barval'};

        const spec = print.createSpec(map, scale, dpi, layout, format,
          customAttributes);

        const layers = spec.attributes.map.layers;
        expect(layers.length).toBe(2);
        expect(layers[0].baseURL).toBe('http://example.com/wms/top');
        expect(layers[1].baseURL).toBe('http://example.com/wms/bottom');
      });

    });

  });

  describe('#createReport', () => {

    let print;
    let spec;
    let $httpBackend;

    beforeEach(() => {
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

      inject(($injector) => {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', 'http://example.com/print/report.pdf')
          .respond({
            ref: 'deadbeef',
            statusURL: '/print/status/deadbeef.json',
            downloadURL: '/print/report/deadbeef.json'
          });
      });
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('triggers the report request and resolves the promise', () => {
      $httpBackend.expectPOST('http://example.com/print/report.pdf');
      const promise = print.createReport(spec);

      const spy = jasmine.createSpy();
      promise.then(spy);

      $httpBackend.flush();

      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.mostRecent().args[0].data).toEqual({
        ref: 'deadbeef',
        statusURL: '/print/status/deadbeef.json',
        downloadURL: '/print/report/deadbeef.json'
      });
    });

    /*    describe('cancel report request', () => {
      it('cancels the request', inject(($q) => {
        $httpBackend.expectPOST('http://example.com/print/report.pdf');

        const canceler = $q.defer();
        print.createReport(spec, {
          timeout: canceler.promise
        });

        canceler.resolve(); // abort the $http request

        // We will get an "Unflushed requests: 1" error in afterEach when
        // calling verifyNoOutstandingRequest if the aborting did not work.
      }));
    });*/
  });

  describe('#getStatus', () => {

    let print;
    let $httpBackend;

    beforeEach(() => {
      print = ngeoCreatePrint('http://example.com/print');

      inject(($injector) => {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET',
          'http://example.com/print/status/deadbeef.json').respond({
          done: false,
          downloadURL: '/print/report/deadbeef.json'
        });
      });
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('triggers the status request and resolves the promise', () => {
      $httpBackend.expectGET('http://example.com/print/status/deadbeef.json');
      const promise = print.getStatus('deadbeef');

      const spy = jasmine.createSpy();
      promise.then(spy);

      $httpBackend.flush();

      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.mostRecent().args[0].data).toEqual({
        done: false,
        downloadURL: '/print/report/deadbeef.json'
      });
    });

  });

  describe('#getReportUrl', () => {
    let print;

    beforeEach(() => {
      print = ngeoCreatePrint('http://example.com/print');
    });

    it('returns the report URL', () => {
      const url = print.getReportUrl('deadbeef');
      expect(url).toBe('http://example.com/print/report/deadbeef');
    });
  });

  describe('#getCapabilities', () => {
    let print;
    let $httpBackend;
    // Only used to test that getCapabilities fetch the json from the proper url
    let capabilities;

    beforeEach(inject((_$httpBackend_) => {

      $httpBackend = _$httpBackend_;

      capabilities = {
        'test': true
      };

      $httpBackend.when('GET', 'http://example.com/print/capabilities.json')
        .respond(capabilities);
    }));

    beforeEach(() => {
      print = ngeoCreatePrint('http://example.com/print');
    });

    it('gets the correct capabilities', () => {
      let resp;
      print.getCapabilities().then((response) => {
        resp = response.data;
      });
      $httpBackend.flush();
      expect(resp).toEqual(capabilities);
    });
  });

  describe('#cancel', () => {
    let print;
    let $httpBackend;

    beforeEach(inject((_$httpBackend_) => {
      print = ngeoCreatePrint('http://example.com/print');
      $httpBackend = _$httpBackend_;
      $httpBackend.when('DELETE', 'http://example.com/print/cancel/deadbeef')
        .respond(200);
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('triggers the cancel request and resolves the promise', () => {
      $httpBackend.expectDELETE('http://example.com/print/cancel/deadbeef');
      const promise = print.cancel('deadbeef');

      const spy = jasmine.createSpy();
      promise.then(spy);

      $httpBackend.flush();

      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.mostRecent().args[0].status).toEqual(200);
    });
  });
});
