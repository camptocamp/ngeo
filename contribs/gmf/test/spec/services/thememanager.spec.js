/* global themes */
goog.require('gmf.ThemeManager');
goog.require('gmf.test.data.themes');

describe('gmf.ThemeManager', () => {
  let gmfThemeManager_;
  //var gmfTreeManager_;

  beforeEach(() => {
    inject((gmfThemeManager, /*gmfTreeManager, */gmfThemes, gmfTreeUrl, $httpBackend) => {
      gmfThemeManager_ = gmfThemeManager;
      //gmfTreeManager_ = gmfTreeManager;

      const reGmfTreeUrl = new RegExp(`^${gmfTreeUrl}`);
      $httpBackend.when('GET', reGmfTreeUrl).respond(themes);
      $httpBackend.expectGET(reGmfTreeUrl);
      gmfThemes.loadThemes();
      $httpBackend.flush();
    });
  });

  it('Add a theme', () => {
    const theme0 = themes.themes[0];
    gmfThemeManager_.addTheme(theme0);
    expect(gmfThemeManager_.getThemeName()).toEqual(theme0.name);
    //expect(gmfTreeManager_.root.children).toEqual(theme0.children);
  });
});
