import gmfTestDataThemes from 'gmf/test/data/themes.js';

describe('gmf.layertree.TreeManager', () => {
  let gmfTreeManager;
  let gmfThemes;
  let treeUrl;
  let $httpBackend;
  let $timeout;

  beforeEach(() => {
    angular.mock.inject((_$timeout_, _$httpBackend_, _gmfTreeManager_, _gmfThemes_, _gmfTreeUrl_) => {
      $timeout = _$timeout_;
      gmfTreeManager = _gmfTreeManager_;
      gmfThemes = _gmfThemes_;
      treeUrl = `${_gmfTreeUrl_}?cache_version=0`;
      $httpBackend = _$httpBackend_;
      $httpBackend.when('GET', treeUrl).respond(gmfTestDataThemes);
    });
  });

  it('Add some groups', () => {
    const group0 = gmfTestDataThemes.themes[0].children[0];
    const group1 = gmfTestDataThemes.themes[1].children[0];
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
    const group0 = gmfTestDataThemes.themes[0].children[0];
    const group1 = gmfTestDataThemes.themes[1].children[0];
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

  it('Add a group by layer name', () => {
    const spy = jasmine.createSpy();
    const group0 = gmfTestDataThemes.themes[0].children[0];
    const group1 = gmfTestDataThemes.themes[1].children[0];
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

  it('Remove a group', () => {
    const group0 = gmfTestDataThemes.themes[0].children[0];
    const group1 = gmfTestDataThemes.themes[1].children[0];
    gmfTreeManager.setFirstLevelGroups([group0, group1]);
    $timeout.flush();
    gmfTreeManager.removeGroup(group0);
    expect(gmfTreeManager.root.children[0]).toEqual(group1);
  });
});
