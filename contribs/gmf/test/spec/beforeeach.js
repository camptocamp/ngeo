goog.require('gmf.controllers.defaultConfig');

beforeEach(() => {
  const gmfModule = angular.module('gmfDefaultConfig');
  gmfModule.constant('angularLocaleScript', 'http://fake');
  gmfModule.constant('gmfLayersUrl', 'https://fake');

  angular.mock.module('gmfDefaultConfig', ($provide) => {
    $provide.value('gmfTreeUrl', 'http://fake/gmf/themes');
    $provide.value('gmfShortenerCreateUrl', 'http://fake/gmf/short/create');
    $provide.value('authenticationBaseUrl', 'https://fake/gmf/authentication');
    $provide.value('gmfRasterUrl', 'https://fake/gmf/raster');
    $provide.value('gmfContextualdatacontentTemplateUrl', 'contextualdata.html');
    $provide.value('defaultTheme', 'Demo');
  });
});
