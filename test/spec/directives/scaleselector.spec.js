// The MIT License (MIT)
//
// Copyright (c) 2015-2020 Camptocamp SA
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


import angular from 'angular';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';

describe('ngeo.map.scaleselector', () => {
  /** @type {JQuery<HTMLElement>} */
  let element;
  /** @type {import('ol/Map.js').default} */
  let map;
  /** @type {Object<string, *>} */
  let scales;

  beforeEach(() => {

    map = new olMap({
      view: new olView({
        center: [0, 0],
        zoom: 0
      })
    });

    element = angular.element(
      '<div ngeo-scaleselector="scales"' +
            'ngeo-scaleselector-map="map">' +
        '</div>');

    angular.mock.inject(($rootScope, $compile, $sce) => {
      scales = {
        '0': $sce.trustAsHtml('1&nbsp;:&nbsp;200\'000\'000'),
        '1': $sce.trustAsHtml('1&nbsp;:&nbsp;100\'000\'000'),
        '2': $sce.trustAsHtml('1&nbsp;:&nbsp;50\'000\'000'),
        '3': $sce.trustAsHtml('1&nbsp;:&nbsp;25\'000\'000'),
        '4': $sce.trustAsHtml('1&nbsp;:&nbsp;12\'000\'000')
      };

      $rootScope.map = map;
      $rootScope.scales = scales;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });

  });

  it('creates an element with expected number of li elements', () => {
    const lis = element.find('li');
    expect(lis.length).toBe(5);
  });

  describe('calling setZoom in Angular context', () => {

    it('does not throw', () => {
      const scope = element.scope();

      function test() {
        scope.$apply(() => {
          map.getView().setZoom(4);
        });
      }

      expect(test).not.toThrow();
      // @ts-ignore: scope
      expect(scope.scaleselectorCtrl.currentScale).toBe(scales[4]);
    });

  });

});
