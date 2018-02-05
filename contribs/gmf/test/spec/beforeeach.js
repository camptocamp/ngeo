goog.require('gmf.controllers.defaultConfig');

goog.require('gmf.contextualdata.component');
goog.require('gmf.layertree.module');
goog.require('gmf.map.component');
goog.require('gmf.permalink.module');
goog.require('gmf.print.component');
goog.require('gmf.profile.module');
goog.require('gmf.query.extraModule');

const appModule = angular.module('gmfapp', []);

beforeEach(() =>  {
  appModule.requires.push(gmf.controllers.defaultConfig.name);
  appModule.requires.push(gmf.contextualdata.component.name);
  appModule.requires.push(gmf.map.component.name);
  appModule.requires.push(gmf.layertree.module.name);
  appModule.requires.push(gmf.permalink.module.name);
  appModule.requires.push(gmf.print.component.name);
  appModule.requires.push(gmf.profile.module.name);
  appModule.requires.push(gmf.query.extraModule.name);
});

beforeEach(angular.mock.module('gmfapp'));

beforeEach(() => {
  gmf.controllers.defaultConfig.constant('angularLocaleScript', 'http://fake');
  gmf.controllers.defaultConfig.constant('gmfLayersUrl', 'https://fake');

  angular.mock.module('gmfapp', ($provide) => {
    $provide.value('gmfTreeUrl', 'http://fake/gmf/themes');
    $provide.value('gmfShortenerCreateUrl', 'http://fake/gmf/short/create');
    $provide.value('authenticationBaseUrl', 'https://fake/gmf/authentication');
    $provide.value('gmfRasterUrl', 'https://fake/gmf/raster');
    $provide.value('gmfContextualdatacontentTemplateUrl', 'contextualdata.html');
    $provide.value('defaultTheme', 'Demo');
  });
});
