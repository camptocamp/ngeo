goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');

goog.exportSymbol('ngeo.ToolActivate', ngeo.ToolActivate);

goog.exportProperty(
    ngeo.ToolActivateMgr.prototype,
    'registerTool',
    ngeo.ToolActivateMgr.prototype.registerTool);

goog.exportProperty(
    ngeo.ToolActivateMgr.prototype,
    'unregisterTool',
    ngeo.ToolActivateMgr.prototype.unregisterTool);

goog.exportProperty(
    ngeo.ToolActivateMgr.prototype,
    'unregisterGroup',
    ngeo.ToolActivateMgr.prototype.unregisterGroup);

goog.exportProperty(
    ngeo.ToolActivateMgr.prototype,
    'activateTool',
    ngeo.ToolActivateMgr.prototype.activateTool);

goog.exportProperty(
    ngeo.ToolActivateMgr.prototype,
    'deactivateTool',
    ngeo.ToolActivateMgr.prototype.deactivateTool);

goog.exportProperty(
    ngeo.ToolActivateMgr.prototype,
    'getGroups',
    ngeo.ToolActivateMgr.prototype.getGroups);
