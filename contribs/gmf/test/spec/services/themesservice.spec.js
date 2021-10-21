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
import gmfTestDataThemes from '../data/themes';
import gmfTestDataThemescapabilities from '../data/themescapabilities';
import {listen} from 'ol/events';

describe('gmf.theme.Themes', () => {
  /** @type {import('gmf/theme/Themes').ThemesService} */
  let gmfThemes;
  /** @type {string} */
  let treeUrl;
  /** @type {angular.IHttpBackendService} */
  let $httpBackend;

  beforeEach(() => {
    angular.mock.inject((_gmfThemes_, _gmfTreeUrl_, _$httpBackend_) => {
      gmfThemes = _gmfThemes_;
      treeUrl = _gmfTreeUrl_;
      $httpBackend = _$httpBackend_;
      $httpBackend.when('GET', treeUrl).respond(gmfTestDataThemes);
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Get background layers', () => {
    const spy = jasmine.createSpy();
    gmfThemes.getBgLayers().then(spy);
    /** @type {string[]} */
    const urls = [];

    $httpBackend.expectGET(treeUrl);
    gmfTestDataThemes.background_layers.forEach((bgLayer) => {
      const response =
        bgLayer.name == 'OSM' ? gmfTestDataThemescapabilities.map : gmfTestDataThemescapabilities.asitvd;
      $httpBackend.when('GET', bgLayer.url).respond(response);
      if (!urls.includes(bgLayer.url)) {
        urls.push(bgLayer.url);
        $httpBackend.expectGET(bgLayer.url);
      }
    });
    gmfThemes.loadThemes();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    const response = /** @type {import('ol/layer/Base').default[]} */ (spy.calls.mostRecent().args[0]);
    expect(response.length).toBe(4);
    const responseFirstBgName = response[1].get('label');
    const firstBgName = gmfTestDataThemes.background_layers[0].name;
    expect(responseFirstBgName).toBe(firstBgName);
    expect(response[1].get('querySourceIds')).toBeDefined();
  });

  it('Returns hasEditableLayers', () => {
    const spy = jasmine.createSpy();
    gmfThemes.hasEditableLayers().then(spy);

    $httpBackend.expectGET(treeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    const response = spy.calls.mostRecent().args;
    expect(response[0]).toBe(true);
  });

  it('Emit change event', () => {
    const spy = jasmine.createSpy();
    const eventSpy = jasmine.createSpy();
    listen(gmfThemes, 'change', eventSpy);

    // @ts-ignore
    gmfThemes.promise_.then(spy);

    gmfThemes.loadThemes();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
  });

  it('Load themes', () => {
    const spy = jasmine.createSpy();
    // @ts-ignore
    gmfThemes.promise_.then(spy);

    $httpBackend.expectGET(treeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    const data = /** @type {import('gmf/themes').GmfTheme} */ (spy.calls.mostRecent().args[0]);
    expect(Object.keys(data)[0]).toBe(Object.keys(gmfTestDataThemes)[0]);
  });

  it('Get themes object', () => {
    const spy = jasmine.createSpy();
    gmfThemes.getThemesObject().then(spy);

    $httpBackend.expectGET(treeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    const resultThemes = /** @type {import('gmf/themes').GmfTheme[]} */ (spy.calls.mostRecent().args[0]);
    const dataFirstKey = Object.keys(resultThemes[0])[0];
    const themesThemesFirstKey = Object.keys(gmfTestDataThemes.themes[0])[0];
    expect(dataFirstKey).toBe(themesThemesFirstKey);
  });

  it('Get a theme object (find a specific theme)', () => {
    const themeName = 'Enseignement';
    const spy = jasmine.createSpy();
    gmfThemes.getThemeObject(themeName).then(spy);

    $httpBackend.expectGET(treeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    const resultTheme = /** @type {import('gmf/themes').GmfTheme} */ (spy.calls.mostRecent().args[0]);
    expect(resultTheme.name).toBe(themeName);
  });
});
