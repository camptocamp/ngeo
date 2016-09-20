/* global old_themes */
goog.require('gmf.TreeManager');
goog.require('gmf.test.data.old_themes');

describe('gmf.TreeManager', function() {
  var gmfTreeManager;
  var gmfThemes;
  var treeUrl;
  var $httpBackend;

  beforeEach(function() {
    inject(function($injector) {
      gmfTreeManager = $injector.get('gmfTreeManager');
      gmfThemes = $injector.get('gmfThemes');
      treeUrl = $injector.get('gmfTreeUrl') + '?cache_version=0';
      $httpBackend = $injector.get('$httpBackend');
      // FIXME use current version of the theme
      $httpBackend.when('GET', treeUrl).respond(old_themes);
      gmfTreeManager.setModeFlush(true);
    });
  });

  it('Is mode flush', function() {
    expect(gmfTreeManager.isModeFlush()).toBe(true);
  });

  it('Set mode flush', function() {
    expect(gmfTreeManager.isModeFlush()).toBe(true);
    gmfTreeManager.setModeFlush(false);
    expect(gmfTreeManager.isModeFlush()).toBe(false);
  });

  it('Add some groups', function() {
    // FIXME use current version of the theme
    var group0 = old_themes.themes[0].children[0];
    var group1 = old_themes.themes[1].children[0];
    // Add a group
    gmfTreeManager.addGroups([group0]);
    expect(gmfTreeManager.tree.children[0]).toEqual(group0);
    // Add the same group, It won't be added.
    gmfTreeManager.addGroups([group0]);
    expect(gmfTreeManager.tree.children.length).toBe(1);
    // Add another group, mode flush. It will replace the previous one.
    gmfTreeManager.addGroups([group1]);
    expect(gmfTreeManager.tree.children[0]).toEqual(group1);
    expect(gmfTreeManager.tree.children.length).toBe(1);
    // Add another group, mode add. It will be added first in children array.
    gmfTreeManager.setModeFlush(false);
    gmfTreeManager.addGroups([group0]);
    expect(gmfTreeManager.tree.children[0]).toEqual(group0);
    // First group is always there, but in second position.
    expect(gmfTreeManager.tree.children[1]).toEqual(group1);
  });

  it('Add a theme', function() {
    // FIXME use current version of the theme
    var theme0 = old_themes.themes[0];
    gmfTreeManager.addTheme(theme0);
    expect(gmfTreeManager.tree.children).toEqual(theme0.children);
    expect(gmfTreeManager.tree.name).toEqual(theme0.name);
  });

  it('Add a theme by name', function() {
    var spy = jasmine.createSpy();
    // FIXME use current version of the theme
    var theme0 = old_themes.themes[0];
    gmfTreeManager.addThemeByName(theme0.name);

    gmfThemes.getThemesObject().then(spy);
    $httpBackend.expectGET(treeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    expect(gmfTreeManager.tree.children).toEqual(theme0.children);
    expect(gmfTreeManager.tree.name).toEqual(theme0.name);
  });

  it('Add a group by name', function() {
    var spy = jasmine.createSpy();
    // FIXME use current version of the theme
    var group0 = old_themes.themes[0].children[0];
    var group1 = old_themes.themes[1].children[0];
    gmfTreeManager.addGroupByName(group0.name);
    gmfTreeManager.addGroupByName(group1.name, true);

    gmfThemes.getThemesObject().then(spy);
    $httpBackend.expectGET(treeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    expect(gmfTreeManager.tree.children[0]).toEqual(group1);
    expect(gmfTreeManager.tree.children[1]).toEqual(group0);
  });

  it('Add a group by layer name', function() {
    var spy = jasmine.createSpy();
    // FIXME use current version of the theme
    var group0 = old_themes.themes[0].children[0];
    var group1 = old_themes.themes[1].children[0];
    gmfTreeManager.addGroupByLayerName(group0.children[0].name);
    gmfTreeManager.addGroupByLayerName(group1.children[0].name, true);

    gmfThemes.getThemesObject().then(spy);
    $httpBackend.expectGET(treeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    expect(gmfTreeManager.tree.children[0]).toEqual(group1);
    expect(gmfTreeManager.tree.children[1]).toEqual(group0);
  });

  it('Remove a group', function() {
    // FIXME use current version of the theme
    var group0 = old_themes.themes[0].children[0];
    var group1 = old_themes.themes[1].children[0];
    gmfTreeManager.addGroups([group0, group1]);
    gmfTreeManager.removeGroup(group0);
    expect(gmfTreeManager.tree.children[0]).toEqual(group1);
  });
});
