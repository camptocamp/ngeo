goog.require('gmf.test.data.themes');
goog.require('gmf.test.data.themescapabilities');
goog.require('ol.events');

describe('gmf.theme.Themes', () => {
  let gmfThemes;
  let treeUrl;
  let $httpBackend;

  beforeEach(() => {
    angular.mock.inject((_gmfThemes_, _gmfTreeUrl_, _$httpBackend_) => {
      gmfThemes = _gmfThemes_;
      treeUrl = `${_gmfTreeUrl_}?cache_version=0`;
      $httpBackend = _$httpBackend_;
      $httpBackend.when('GET', treeUrl).respond(gmf.test.data.themes);
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Get background layers', () => {
    const spy = jasmine.createSpy();
    gmfThemes.getBgLayers().then(spy);
    const urls = [];

    $httpBackend.expectGET(treeUrl);
    gmf.test.data.themes.background_layers.forEach((bgLayer) => {
      const response = bgLayer.name == 'OSM' ? gmf.test.data.themescapabilities.map :
        gmf.test.data.themescapabilities.asitvd;
      $httpBackend.when('GET', bgLayer.url).respond(response);
      if (!urls.includes(bgLayer.url)) {
        urls.push(bgLayer.url);
        $httpBackend.expectGET(bgLayer.url);
      }
    });
    gmfThemes.loadThemes();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    const response = spy.calls.mostRecent().args[0];
    expect(response.length).toBe(4);
    const responseFirstBgName = response[1].get('label');
    const firstBgName = gmf.test.data.themes.background_layers[0].name;
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
    ol.events.listen(gmfThemes, 'change', eventSpy);

    gmfThemes.promise_.then(spy);

    gmfThemes.loadThemes();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
  });

  it('Load themes', () => {
    const spy = jasmine.createSpy();
    gmfThemes.promise_.then(spy);

    $httpBackend.expectGET(treeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    const data = spy.calls.mostRecent().args[0];
    expect(Object.keys(data)[0]).toBe(Object.keys(gmf.test.data.themes)[0]);
  });

  it('Get themes object', () => {
    const spy = jasmine.createSpy();
    gmfThemes.getThemesObject().then(spy);

    $httpBackend.expectGET(treeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    const resultThemes = spy.calls.mostRecent().args[0];
    const dataFirstKey = Object.keys(resultThemes[0])[0];
    const themesThemesFirstKey = Object.keys(gmf.test.data.themes.themes[0])[0];
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
    const resultTheme = spy.calls.mostRecent().args[0];
    expect(resultTheme.name).toBe(themeName);
  });
});
