/* global themes */
goog.require('gmf.TreeManager');
goog.require('gmf.test.data.themes');

describe('gmf.TreeManager', function() {
  let gmfTreeManager;
  let gmfThemes;
  let treeUrl;
  let $httpBackend;
  let $timeout;

  beforeEach(function() {
    inject(function($injector) {
      $timeout = $injector.get('$timeout');
      gmfTreeManager = $injector.get('gmfTreeManager');
      gmfThemes = $injector.get('gmfThemes');
      treeUrl = $injector.get('gmfTreeUrl') + '?cache_version=0';
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', treeUrl).respond(themes);
    });
  });

  it('Add some groups', function() {
    const group0 = themes.themes[0].children[0];
    const group1 = themes.themes[1].children[0];
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

  it('Add a group by name', function() {
    const spy = jasmine.createSpy();
    const group0 = themes.themes[0].children[0];
    const group1 = themes.themes[1].children[0];
    gmfTreeManager.addGroupByName(group0.name);
    gmfTreeManager.addGroupByName(group1.name, true);

    gmfThemes.getThemesObject().then(spy);
    $httpBackend.expectGET(treeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();
    $timeout.flush();

    expect(spy.calls.count()).toBe(1);
    expect(gmfTreeManager.root.children[0]).toEqual(group1);
    expect(gmfTreeManager.root.children[1]).toEqual(group0);
  });

  it('Add a group by layer name', function() {
    const spy = jasmine.createSpy();
    const group0 = themes.themes[0].children[0];
    const group1 = themes.themes[1].children[0];
    gmfTreeManager.addGroupByLayerName(group0.children[0].name);
    gmfTreeManager.addGroupByLayerName(group1.children[0].name, true);

    gmfThemes.getThemesObject().then(spy);
    $httpBackend.expectGET(treeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();
    $timeout.flush();

    expect(spy.calls.count()).toBe(1);
    expect(gmfTreeManager.root.children[0]).toEqual(group1);
    expect(gmfTreeManager.root.children[1]).toEqual(group0);
  });

  it('Remove a group', function() {
    const group0 = themes.themes[0].children[0];
    const group1 = themes.themes[1].children[0];
    gmfTreeManager.setFirstLevelGroups([group0, group1]);
    $timeout.flush();
    gmfTreeManager.removeGroup(group0);
    expect(gmfTreeManager.root.children[0]).toEqual(group1);
  });
});
