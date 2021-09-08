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

import angular from 'angular';
import gmfTestDataPrintcapabilities from '../data/printcapabilities';
import olMap from 'ol/Map';
import olView from 'ol/View';

describe('GmfPrintController', () => {
  let $controller;
  /** @type {angular.IScope} */
  let $rootScope;
  /** @type {angular.IScope} */
  let $scope;
  /** @type {import('gmf/print/component').PrintController} */
  let gmfPrintCtrl;

  beforeEach(
    angular.mock.inject((_$controller_, _$rootScope_) => {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      const $element = angular.element('<div></div>');
      gmfPrintCtrl = $controller('GmfPrintController', {
        $element: $element,
        $scope: $scope,
        gmfPrintUrl: '',
      });
      gmfPrintCtrl.map = new olMap({
        view: new olView({
          center: [0, 0],
          zoom: 4,
        }),
      });
      gmfPrintCtrl.map.setSize([100, 100]);
      // @ts-ignore
      gmfPrintCtrl.parseCapabilities_({data: gmfTestDataPrintcapabilities});
    })
  );

  it('Set rotation', () => {
    expect(gmfPrintCtrl.rotation).toBe(0);
    gmfPrintCtrl.setRotation(25);
    expect(gmfPrintCtrl.rotation).toBe(25);
    gmfPrintCtrl.setRotation(190);
    expect(gmfPrintCtrl.rotation).toBe(180);
    gmfPrintCtrl.setRotation(-1000);
    expect(gmfPrintCtrl.rotation).toBe(-180);
  });

  it('Set layout and test depending layout information changes', () => {
    const title = 'title';
    // @ts-ignore
    gmfPrintCtrl.layoutInfo.title = title;

    gmfPrintCtrl.setLayout(gmfPrintCtrl.layoutInfo.layouts[1]);

    // @ts-ignore
    expect(gmfPrintCtrl.layoutInfo.title).toBe(title);
    expect(gmfPrintCtrl.layoutInfo.layout).toBe(gmfPrintCtrl.layoutInfo.layouts[1]);
  });

  it('Set scale and test map resolution change', () => {
    const baseScale = gmfPrintCtrl.layoutInfo.scales[1];
    const biggerScale =
      gmfPrintCtrl.layoutInfo.scales[2] > baseScale
        ? gmfPrintCtrl.layoutInfo.scales[2]
        : gmfPrintCtrl.layoutInfo.scales[0];

    gmfPrintCtrl.getSetScale(baseScale);
    expect(gmfPrintCtrl.layoutInfo.scale).toBe(baseScale);

    const view = gmfPrintCtrl.map.getView();
    const resolution = view.getResolution();
    gmfPrintCtrl.getSetScale(biggerScale);
    expect(resolution).toBeLessThan(view.getResolution());
  });

  it('Set dpi', () => {
    const dpi = 10;
    gmfPrintCtrl.setDpi(10);
    expect(gmfPrintCtrl.layoutInfo.dpi).toBe(dpi);
  });

  it('Is state', () => {
    expect(gmfPrintCtrl.isState('CAPABILITIES_NOT_LOADED')).toBeTruthy();
  });
});
