// The MIT License (MIT)
//
// Copyright (c) 2016-2022 Camptocamp SA
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

describe('gmf.layertree.TreeManager', () => {
  /** @type {import('gmf/layertree/TreeManager').LayertreeTreeManager} */
  let gmfTreeManager;
  /** @type {import('gmf/theme/Themes').ThemesService} */
  let gmfThemes;
  /** @type {string} */
  let treeUrl;
  /** @type {angular.IHttpBackendService} */
  let $httpBackend;
  /** @type {angular.ITimeoutService} */
  let $timeout;

  beforeEach(() => {
    angular.mock.inject((_$timeout_, _$httpBackend_, _gmfTreeManager_, _gmfThemes_, _gmfTreeUrl_) => {
      $timeout = _$timeout_;
      gmfTreeManager = _gmfTreeManager_;
      gmfThemes = _gmfThemes_;
      treeUrl = _gmfTreeUrl_;
      $httpBackend = _$httpBackend_;
      $httpBackend.when('GET', treeUrl).respond(gmfTestDataThemes);
    });
  });

  /**
   * Delete unwanted randomly added property "$$hashKey".
   * @param {object} object
   */
  const cleanObject = (object) => {
    delete object.$$hashKey;
    Object.keys(object).forEach((key) => {
      if (object.hasOwnProperty(key) && Array.isArray(object[key])) {
        object[key].forEach((child) => cleanObject(child));
      }
    });
  };

  it('Add some groups', () => {
    const group0 = /** @type {import('gmf/themes').GmfGroup} */ (
      /** @type {unknown} */ (gmfTestDataThemes.themes[0].children[0])
    );
    const group1 = /** @type {import('gmf/themes').GmfGroup} */ (
      /** @type {unknown} */ (gmfTestDataThemes.themes[1].children[0])
    );
    // Add a group
    gmfTreeManager.setFirstLevelGroups([group0]);
    $timeout.flush();
    expect(gmfTreeManager.root.children[0]).toEqual(group0);
    // Add the same group, It won't be added.
    gmfTreeManager.setFirstLevelGroups([group0]);
    $timeout.flush();
    expect(gmfTreeManager.root.children.length).toBe(1);
    // Add another group, mode flush. It will replace the previous one.
    gmfTreeManager.setFirstLevelGroups([group1]);
    $timeout.flush();
    expect(gmfTreeManager.root.children[0]).toEqual(group1);
    expect(gmfTreeManager.root.children.length).toBe(1);
    // Add another group, mode add. It will be added first in children array.
    gmfTreeManager.addFirstLevelGroups([group0]);
    $timeout.flush();
    expect(gmfTreeManager.root.children[0]).toEqual(group0);
    // First group is always there, but in second position.
    expect(gmfTreeManager.root.children[1]).toEqual(group1);
  });

  it('Add a group by name', () => {
    const spy = jasmine.createSpy();
    const group0 = /** @type {import('gmf/themes').GmfGroup} */ (
      /** @type {unknown} */ (gmfTestDataThemes.themes[0].children[0])
    );
    const group1 = /** @type {import('gmf/themes').GmfGroup} */ (
      /** @type {unknown} */ (gmfTestDataThemes.themes[1].children[0])
    );
    gmfTreeManager.addGroupByName(group0.name);
    gmfTreeManager.addGroupByName(group1.name, true);

    gmfThemes.getThemesObject().then(spy);
    $httpBackend.expectGET(treeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();
    $timeout.flush();

    expect(spy.calls.count()).toBe(1);
    cleanObject(group0);
    cleanObject(group1);
    expect(gmfTreeManager.root.children[0]).toEqual(group1);
    expect(gmfTreeManager.root.children[1]).toEqual(group0);
  });

  it('Add a group by layer name', () => {
    const spy = jasmine.createSpy();
    const group0 = /** @type {import('gmf/themes').GmfGroup} */ (
      /** @type {unknown} */ (gmfTestDataThemes.themes[0].children[0])
    );
    const group1 = /** @type {import('gmf/themes').GmfGroup} */ (
      /** @type {unknown} */ (gmfTestDataThemes.themes[1].children[0])
    );
    gmfTreeManager.addGroupByLayerName(group0.children[0].name);
    gmfTreeManager.addGroupByLayerName(group1.children[0].name, true);

    gmfThemes.getThemesObject().then(spy);
    $httpBackend.expectGET(treeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();
    $timeout.flush();

    expect(spy.calls.count()).toBe(1);
    cleanObject(group0);
    cleanObject(group1);
    expect(gmfTreeManager.root.children[0]).toEqual(group1);
    expect(gmfTreeManager.root.children[1]).toEqual(group0);
  });

  it('Remove a group', () => {
    const group0 = /** @type {import('gmf/themes').GmfGroup} */ (
      /** @type {unknown} */ (gmfTestDataThemes.themes[0].children[0])
    );
    const group1 = /** @type {import('gmf/themes').GmfGroup} */ (
      /** @type {unknown} */ (gmfTestDataThemes.themes[1].children[0])
    );
    gmfTreeManager.setFirstLevelGroups([group0, group1]);
    $timeout.flush();
    gmfTreeManager.removeGroup(group0);
    expect(gmfTreeManager.root.children[0]).toEqual(group1);
  });
});
