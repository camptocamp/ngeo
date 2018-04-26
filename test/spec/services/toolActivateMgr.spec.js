import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';

describe('ngeo.misc.ToolActivateMgr', () => {
  let interaction1, interaction2, interaction3, tool1, tool2, tool3;
  let ngeoToolActivateMgr;
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
