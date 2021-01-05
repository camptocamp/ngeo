// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
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
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';

describe('ngeo.misc.ToolActivateMgr', () => {
  /** @type {Object<string, *>} */
  let interaction1;
  /** @type {Object<string, *>} */
  let interaction2;
  /** @type {Object<string, *>} */
  let interaction3;
  /** @type {ngeoMiscToolActivate} */
  let tool1;
  /** @type {ngeoMiscToolActivate} */
  let tool2;
  /** @type {ngeoMiscToolActivate} */
  let tool3;
  /** @type {import('ngeo/misc/ToolActivateMgr.js').ToolActivateMgr} */
  let ngeoToolActivateMgr;
  /** @type {angular.IScope} */
  let $rootScope;

  beforeEach(() => {
    interaction1 = {active: true};
    tool1 = new ngeoMiscToolActivate(interaction1, 'active');
    interaction2 = {active: false};
    tool2 = new ngeoMiscToolActivate(interaction2, 'active');
    interaction3 = {active: false};
    tool3 = new ngeoMiscToolActivate(interaction3, 'active');

    angular.mock.inject((_ngeoToolActivateMgr_, _$rootScope_) => {
      ngeoToolActivateMgr = _ngeoToolActivateMgr_;
      $rootScope = _$rootScope_;
    });
  });

  it('Register a tool', () => {
    ngeoToolActivateMgr.registerTool('group1', tool1);
    expect(ngeoToolActivateMgr.groups_.group1[0].tool).toBe(tool1);
    ngeoToolActivateMgr.registerTool('group1', tool2);
    expect(ngeoToolActivateMgr.groups_.group1[1].tool).toBe(tool2);
  });

  it('Unregister a tool', () => {
    ngeoToolActivateMgr.registerTool('group1', tool1);
    ngeoToolActivateMgr.registerTool('group1', tool2);
    $rootScope.$digest();

    ngeoToolActivateMgr.unregisterTool('group1', tool2);
    expect(ngeoToolActivateMgr.groups_.group1.length).toBe(1);

    // check that the listener on tool2 is removed
    tool2.setActive(true);
    $rootScope.$digest();
    expect(tool1.getActive()).toBe(true);
  });

  it('Activate a tool', () => {
    ngeoToolActivateMgr.registerTool('group1', tool1);
    ngeoToolActivateMgr.registerTool('group1', tool2);
    $rootScope.$digest();

    ngeoToolActivateMgr.activateTool(tool2);
    $rootScope.$digest();
    expect(interaction1.active).toBe(false);
    expect(interaction2.active).toBe(true);

    ngeoToolActivateMgr.activateTool(tool1);
    $rootScope.$digest();
    expect(interaction1.active).toBe(true);
    expect(interaction2.active).toBe(false);
  });

  it('Deactivate a tool', () => {
    ngeoToolActivateMgr.registerTool('group1', tool1);
    ngeoToolActivateMgr.registerTool('group1', tool2);
    $rootScope.$digest();

    ngeoToolActivateMgr.deactivateTool(tool1);
    $rootScope.$digest();
    expect(interaction1.active).toBe(false);
    expect(interaction2.active).toBe(false);
  });

  it('Deactivate a tool in a group with default tool', () => {
    ngeoToolActivateMgr.registerTool('group1', tool1);
    ngeoToolActivateMgr.registerTool('group1', tool2);
    ngeoToolActivateMgr.registerTool('group1', tool3, true);
    $rootScope.$digest();

    ngeoToolActivateMgr.deactivateTool(tool1);
    $rootScope.$digest();
    expect(interaction1.active).toBe(false);
    expect(interaction2.active).toBe(false);
    expect(interaction3.active).toBe(true);
  });

  it('Unregister group', () => {
    ngeoToolActivateMgr.registerTool('group1', tool1);
    ngeoToolActivateMgr.registerTool('group1', tool2);
    ngeoToolActivateMgr.registerTool('group1', tool3, true);
    $rootScope.$digest();

    ngeoToolActivateMgr.unregisterGroup('group1');
    expect(Object.keys(ngeoToolActivateMgr.groups_).length).toBe(0);

    // check that the listeners are removed
    tool2.setActive(true);
    $rootScope.$digest();
    expect(tool1.getActive()).toBe(true);
  });
});
