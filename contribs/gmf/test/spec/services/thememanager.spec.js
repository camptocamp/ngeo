import gmfTestDataThemes from 'gmf/test/data/themes.js';

describe('gmf.theme.Manager', () => {
  let gmfThemeManager_;
  //var gmfTreeManager_;

  beforeEach(() => {
    angular.mock.inject((gmfThemeManager, /*gmfTreeManager, */gmfThemes, gmfTreeUrl, $httpBackend) => {
      gmfThemeManager_ = gmfThemeManager;
      //gmfTreeManager_ = gmfTreeManager;

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
    //expect(gmfTreeManager_.root.children).toEqual(theme0.children);
  });
});
