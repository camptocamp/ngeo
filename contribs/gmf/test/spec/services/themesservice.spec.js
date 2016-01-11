goog.require('gmf.Themes');
goog.require('gmf.ThemesEventType');
goog.require('gmf.test.data.themes');

describe('gmf.Themes', function() {
  var gmfThemes;
  var treeUrl;

  beforeEach(function() {
    inject(function($injector) {
      gmfThemes = $injector.get('gmfThemes');
      treeUrl = $injector.get('gmfTreeUrl');
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', treeUrl).respond(themes);
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Get background layers', function() {
    var spy = jasmine.createSpy();
    goog.events.listenOnce(gmfThemes, gmf.ThemesEventType.LOAD, function(evt) {
      gmfThemes.getBgLayers().then(spy);
    }, undefined, this);

    $httpBackend.expectGET(treeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();

    expect(spy.calls.length).toBe(1);
    var response = spy.mostRecentCall.args[0];
    var responseFirstBgName = response[0].name;
    var firstBgName = themes.background_layers[0].name;
    expect(responseFirstBgName).toBe(firstBgName);
  });

  it('Load themes', function() {
    var spy = jasmine.createSpy();
    goog.events.listenOnce(gmfThemes, gmf.ThemesEventType.LOAD, function(evt) {
      gmfThemes.promise_.then(spy);
    }, undefined, this);

    $httpBackend.expectGET(treeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();

    expect(spy.calls.length).toBe(1);
    var data = spy.mostRecentCall.args[0];
    expect(Object.keys(data)[0]).toBe(Object.keys(themes)[0]);
  });

  it('Get themes object', function() {
    var spy = jasmine.createSpy();
    goog.events.listenOnce(gmfThemes, gmf.ThemesEventType.LOAD, function(evt) {
      gmfThemes.getThemesObject().then(spy);
    }, undefined, this);

    $httpBackend.expectGET(treeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();

    expect(spy.calls.length).toBe(1);
    var resultThemes = spy.mostRecentCall.args[0];
    var dataFirstKey = Object.keys(resultThemes[0])[0];
    var themesThemesFirstKey = Object.keys(themes.themes[0])[0];
    expect(dataFirstKey).toBe(themesThemesFirstKey);
  });

  it('Get a theme object (find a specific theme)', function() {
    var themeName = 'Enseignement';
    var spy = jasmine.createSpy();
    goog.events.listenOnce(gmfThemes, gmf.ThemesEventType.LOAD, function(evt) {
      gmfThemes.getThemeObject(themeName).then(spy);
    }, undefined, this);

    $httpBackend.expectGET(treeUrl);
    gmfThemes.loadThemes();
    $httpBackend.flush();

    expect(spy.calls.length).toBe(1);
    var resultTheme = spy.mostRecentCall.args[0];
    expect(resultTheme.name).toBe(themeName);
  });
});
