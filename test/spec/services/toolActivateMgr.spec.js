goog.require('ngeo.ToolActivateMgr');

describe('ngeo.ToolActivateMgr', function() {
  var tool;
  var ngeoToolActivateMgr;

  beforeEach(function() {
    fnResulT1 = undefined;
    fnResulT2 = undefined;
    tool1 = new ngeo.ToolActivate(
        'testTool',
        function() {fnResultT1 = 'T1-Activated';},
        function() {fnResultT1 = 'T1-Deactivated';},
        true
    );
    tool2 = new ngeo.ToolActivate(
        'testTool',
        function() {fnResultT2 = 'T2-Activated';},
        function() {fnResultT2 = 'T2-Deactivated';}
    );
    inject(function($injector) {
      ngeoToolActivateMgr = $injector.get('ngeoToolActivateMgr');
    });
  });

  it('Register a tool', function() {
    ngeoToolActivateMgr.registerTool(tool1);
    expect(ngeoToolActivateMgr.getGroups().testTool[0]).toBe(tool1);
    ngeoToolActivateMgr.registerTool(tool2);
    expect(ngeoToolActivateMgr.getGroups().testTool[1]).toBe(tool2);
  });

  it('Unregister a tool', function() {
    ngeoToolActivateMgr.registerTool(tool1);
    ngeoToolActivateMgr.registerTool(tool2);
    ngeoToolActivateMgr.unregisterTool(tool1);
    expect(ngeoToolActivateMgr.getGroups().testTool.length).toBe(1);
    expect(ngeoToolActivateMgr.getGroups().testTool[0]).toBe(tool2);
  });

  it('Unregister a group', function() {
    ngeoToolActivateMgr.registerTool(tool1);
    ngeoToolActivateMgr.unregisterGroup(tool1.toolsGroupName);
    expect(Object.keys(ngeoToolActivateMgr.getGroups()).length).toBe(0);
  });

  it('Active a tool', function() {
    ngeoToolActivateMgr.registerTool(tool1);
    ngeoToolActivateMgr.registerTool(tool2);

    ngeoToolActivateMgr.activateTool(tool1);
    expect(fnResultT1).toBe('T1-Activated');
    expect(fnResultT2).toBe('T2-Deactivated');

    fnResultT1 = undefined;
    fnResultT2 = undefined;
    ngeoToolActivateMgr.activateTool(tool2);
    expect(fnResultT1).toBe('T1-Deactivated');
    expect(fnResultT2).toBe('T2-Activated');
  });

  it('Deactive a tool', function() {
    ngeoToolActivateMgr.registerTool(tool1);
    ngeoToolActivateMgr.registerTool(tool2);

    ngeoToolActivateMgr.deactivateTool(tool1);
    expect(fnResultT1).toBe('T1-Activated');
    expect(fnResultT2).toBe('T2-Deactivated');

    fnResultT1 = undefined;
    fnResultT2 = undefined;
    ngeoToolActivateMgr.deactivateTool(tool2);
    expect(fnResultT1).toBe('T1-Activated');
    expect(fnResultT2).toBe('T2-Deactivated');
  });

});
