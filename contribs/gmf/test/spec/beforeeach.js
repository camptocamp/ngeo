goog.require('gmf.controllers.defaultConfig');

goog.require('gmf.contextualdata.component');
goog.require('gmf.layertree.module');
goog.require('gmf.permalink.module');
goog.require('gmf.print.component');
goog.require('gmf.profile.module');
goog.require('gmf.query.extraModule');

beforeEach(() => {
  const gmfModule = angular.module('gmfDefaultConfig');
  gmfModule.constant('angularLocaleScript', 'http://fake');
  gmfModule.constant('gmfLayersUrl', 'https://fake');

  Array.prototype.push.apply(gmfModule.requires, [
    gmf.contextualdata.component.name,
    gmf.layertree.module.name,
    gmf.permalink.module.name,
    gmf.print.component.name,
    gmf.profile.module.name,
    gmf.query.extraModule.name,
  ]);

  angular.mock.module('gmfDefaultConfig', ($provide) => {
    $provide.value('gmfTreeUrl', 'http://fake/gmf/themes');
    $provide.value('gmfShortenerCreateUrl', 'http://fake/gmf/short/create');
    $provide.value('authenticationBaseUrl', 'https://fake/gmf/authentication');
    $provide.value('gmfRasterUrl', 'https://fake/gmf/raster');
    $provide.value('gmfContextualdatacontentTemplateUrl', 'contextualdata.html');
    $provide.value('defaultTheme', 'Demo');
  });
});
