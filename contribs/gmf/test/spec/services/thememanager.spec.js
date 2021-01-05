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
import gmfTestDataThemes from '../data/themes.js';

describe('gmf.theme.Manager', () => {
  let gmfThemeManager_;

  beforeEach(() => {
    angular.mock.inject((gmfThemeManager, gmfThemes, gmfTreeUrl, $httpBackend) => {
      gmfThemeManager_ = gmfThemeManager;

      const reGmfTreeUrl = new RegExp(`^${gmfTreeUrl}`);
      $httpBackend.when('GET', reGmfTreeUrl).respond(gmfTestDataThemes);
      $httpBackend.expectGET(reGmfTreeUrl);
      gmfThemes.loadThemes();
      $httpBackend.flush();
    });
  });

  it('Add a theme', () => {
    const theme0 = gmfTestDataThemes.themes[0];
    gmfThemeManager_.addTheme(theme0);
    expect(gmfThemeManager_.getThemeName()).toEqual(theme0.name);
  });
});
