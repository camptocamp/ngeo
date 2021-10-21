// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// @ts-nocheck
import angular from 'angular';
import olMap from 'ol/Map';
import olView from 'ol/View';

describe('gmf.contextualdata.component', () => {
  let $compile;
  let $document;
  let contextualdataController;
  let map;
  /** @type {angular.IHttpBackendService} */
  let $httpBackend;
  let callbackSpy;

  beforeEach(
    angular.mock.inject((_$httpBackend_, _$rootScope_, _$compile_, _$document_) => {
      const $rootScope = _$rootScope_;
      $compile = _$compile_;
      $document = _$document_;
      $httpBackend = _$httpBackend_;

      const element = angular.element(
        '<gmf-map gmf-map-map="map" gmf-contextualdata="" gmf-contextualdata-map="::map" ' +
          'gmf-contextualdata-callback="callback"></gmf-map>'
      );
      element.css({
        position: 'absolute',
        top: 10,
        left: 20,
        width: 800,
        height: 400,
      });
      angular.element($document[0].body).append(element);
      const scope = $rootScope.$new();

      map = new olMap({
        view: new olView({
          center: [0, 0],
          zoom: 0,
          projection: 'EPSG:4326',
        }),
      });
      scope.map = map;
      callbackSpy = jasmine.createSpy();
      scope.callback = function (coordinate, data) {
        callbackSpy();
        return {
          'extra_value': data.elevation * 2,
        };
      };
      $compile(element)(scope);
      scope.$digest();

      contextualdataController = scope.cdCtrl;

      // mock getCoordinateFromPixel & getPixelFromCoordinate
      // since map has no frameState yet
      map.getCoordinateFromPixel = function (pixel) {
        return [1, 2];
      };
      map.getPixelFromCoordinate = function (coordinate) {
        return [50, 100];
      };

      // mock the template
      let html = '';
      html += '{{coord_4326_eastern}},{{coord_4326_northern}},';
      html += '{{coord_3857_eastern}},{{elevation}},';
      html += '{{extra_value}}';
      $httpBackend.whenGET('contextualdata.html').respond(html);

      $httpBackend.whenGET('https://fake/gmf/raster?lat=2&lon=1').respond({
        'elevation': 1234,
      });
    })
  );

  afterEach(() => {
    map.setTarget(null);
  });

  describe('#init', () => {
    it('creates a popover container', () => {
      const popover = $document.find('div.popover');
      expect(popover.length).toBe(1);
    });
  });

  describe('#popover', () => {
    it('popover content is correct', () => {
      const event = {
        clientX: 100,
        clientY: 200,
        preventDefault: () => {},
      };
      contextualdataController.handleMapContextMenu_(event);
      // make sure the template for contextualdatacontent directive is loaded
      $httpBackend.flush();
      const content = $document.find('div.popover-content')[0].innerHTML;
      expect(content).toBe('1,2,111319.49079327358,1234,2468');
      expect(callbackSpy.calls.count()).toBe(1);
    });
  });
});
