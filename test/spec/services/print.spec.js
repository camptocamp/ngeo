import ngeoPrintService from 'ngeo/print/Service.js';
import * as olBase from 'ol/index.js';
import olFeature from 'ol/Feature.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import * as olExtent from 'ol/extent.js';
import * as olProj from 'ol/proj.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olGeomPoint from 'ol/geom/Point.js';
import olGeomPolygon from 'ol/geom/Polygon.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceTileWMS from 'ol/source/TileWMS.js';
import olSourceVector from 'ol/source/Vector.js';
import olSourceWMTS from 'ol/source/WMTS.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleText from 'ol/style/Text.js';
import olStyleFill from 'ol/style/Fill.js';
import olTilegridWMTS from 'ol/tilegrid/WMTS.js';

describe('ngeo.print.Service', () => {

  let ngeoCreatePrint;

  beforeEach(() => {
    angular.mock.inject((_ngeoCreatePrint_) => {
      ngeoCreatePrint = _ngeoCreatePrint_;
    });

  });

  it('creates an ngeo.print.Service instance', () => {
    const print = ngeoCreatePrint('http://example.com/print');
    expect(print instanceof ngeoPrintService).toBe(true);
  });

  describe('#createSpec', () => {

    let print;
    let map;

    beforeEach(() => {
      print = ngeoCreatePrint('http://example.com/print');
      map = new olMap({
        view: new olView({
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
        map.addLayer(new olLayerImage({
          source: new olSourceImageWMS({
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
        map.addLayer(new olLayerTile({
          source: new olSourceTileWMS({
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
        const projection = olProj.get('EPSG:3857');
        const extent = projection.getExtent();
        map.addLayer(new olLayerTile({
          opacity: 0.5,
          source: new olSourceWMTS({
            dimensions: {'TIME': 'time'},
            format: 'image/jpeg',
            layer: 'layer',
            matrixSet: 'matrixset',
            projection: projection,
            requestEncoding: 'REST',
            style: 'style',
            tileGrid: new olTilegridWMTS({
              matrixIds: ['00', '01', '02'],
              extent: extent,
              origin: olExtent.getTopLeft(extent),
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
                baseURL: 'http://example.com/wmts/{Layer}/{Style}/' +
                    '{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg',
                dimensions: ['TIME'],
                dimensionParams: {'TIME': 'time'},
                imageFormat: 'image/jpeg',
                layer: 'layer',
                matrices: [{
                  identifier: '00',
                  scaleDenominator: 7142857.142857144,
                  tileSize: [512, 512],
                  topLeftCorner: olExtent.getTopLeft(
                    olProj.get('EPSG:3857').getExtent()),
                  matrixSize: [39, 39]
                }, {
                  identifier: '01',
                  scaleDenominator: 3571428.571428572,
                  tileSize: [512, 512],
                  topLeftCorner: olExtent.getTopLeft(
                    olProj.get('EPSG:3857').getExtent()),
                  matrixSize: [78, 78]
                }, {
                  identifier: '02',
                  scaleDenominator: 1785714.285714286,
                  tileSize: [512, 512],
                  topLeftCorner: olExtent.getTopLeft(
                    olProj.get('EPSG:3857').getExtent()),
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

        const feature0 = new olFeature({
          geometry: new olGeomPoint([0, 0]),
          foo: '0'
        });

        const feature1 = new olFeature({
          geometry: new olGeomLineString([[0, 0], [1, 1]]),
          foo: '1'
        });

        const feature2 = new olFeature({
          geometry: new olGeomPolygon([[[0, 0], [1, 1], [1, 0], [0, 0]]]),
          foo: '2'
        });

        const feature3 = new olFeature({
          geometry: new olGeomPoint([0, 0]),
          foo: '3'
        });

        style0 = new olStyleStyle({
          fill: new olStyleFill({
            color: [1, 1, 1, 0.1]
          }),
          image: new olStyleCircle({
            radius: 1,
            stroke: new olStyleStroke({
              width: 1,
              color: [1, 1, 1, 0.1]
            })
          }),
          stroke: new olStyleStroke({
            width: 1,
            color: [1, 1, 1, 0.1]
          })
        });

        // styles for feature0
        const styles0 = [style0];

        style1 = new olStyleStyle({
          stroke: new olStyleStroke({
            width: 2,
            color: [2, 2, 2, 0.2]
          })
        });

        // styles for feature1
        const styles1 = [style0, style1];

        style2 = new olStyleStyle({
          fill: new olStyleFill({
            color: [3, 3, 3, 0.3]
          }),
          stroke: new olStyleStroke({
            width: 3,
            color: [3, 3, 3, 0.3]
          })
        });

        // styles for features2
        const styles2 = [style2];

        style3 = new olStyleStyle({
          text: new olStyleText({
            font: 'normal 16px "sans serif"',
            text: 'Ngeo',
            textAlign: 'left',
            offsetX: 42,
            offsetY: -42,
            fill: new olStyleFill({
              color: [3, 3, 3, 0.3]
            })
          })
        });

        // Here to check that textAlign default value is set.
        style4 = new olStyleStyle({
          text: new olStyleText({
            font: 'normal 16px "sans serif"',
            text: 'Ngeo',
            offsetX: 42,
            offsetY: -42,
            fill: new olStyleFill({
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

        map.addLayer(new olLayerVector({
          opacity: 0.8,
          source: new olSourceVector({
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

        const styleId0 = olBase.getUid(style0).toString();
        const styleId1 = olBase.getUid(style1).toString();
        const styleId2 = olBase.getUid(style2).toString();
        const styleId3 = olBase.getUid(style3).toString();
        const styleId4 = olBase.getUid(style4).toString();

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
        map.addLayer(new olLayerImage({
          source: new olSourceImageWMS({
            url: 'http://example.com/wms/bottom',
            params: {
              'LAYERS': 'foo,bar',
              'FORMAT': 'image/jpeg'
            }
          })
        }));

        map.addLayer(new olLayerImage({
          source: new olSourceImageWMS({
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

      angular.mock.inject(($injector) => {
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
      it('cancels the request', angular.mock.inject(($q) => {
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

      angular.mock.inject(($injector) => {
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

    beforeEach(angular.mock.inject((_$httpBackend_) => {

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

    beforeEach(angular.mock.inject((_$httpBackend_) => {
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
