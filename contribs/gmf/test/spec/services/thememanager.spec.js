import gmfTestDataThemes from 'gmf/test/data/themes.js';

describe('gmf.theme.Manager', () => {
  let gmfThemeManager_;

  beforeEach(() => {
    angular.mock.inject((gmfThemeManager, gmfThemes, gmfTreeUrl, $httpBackend) => {
      gmfThemeManager_ = gmfThemeManager;

      const reGmfTreeUrl = new RegExp(`^${gmfTreeUrl}`);
      $httpBackend.when('GET', reGmfTreeUrl).respond(gmfTestDataThemes);
      $httpBackend.expectGET(reGmfTreeUrl);
      gmfThemes.loadThemes();
      $httpBackend.flush();
    });
  });

  it('Add a theme', () => {
    const theme0 = gmfTestDataThemes.themes[0];
    gmfThemeManager_.addTheme(theme0);
    expect(gmfThemeManager_.getThemeName()).toEqual(theme0.name);
  });
});
