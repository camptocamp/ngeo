import 'angular-dynamic-locale';
import gmfContextualdataComponent from 'gmf/contextualdata/component.js';

import gmfLayertreeModule from 'gmf/layertree/module.js';
import gmfMapComponent from 'gmf/map/component.js';
import gmfPermalinkModule from 'gmf/permalink/module.js';
import gmfPrintComponent from 'gmf/print/component.js';
import gmfProfileModule from 'gmf/profile/module.js';
import gmfQueryExtraModule from 'gmf/query/extraModule.js';

const appModule = angular.module('gmfapp', []);

beforeEach(() =>  {
  appModule.requires.push('gettext');
  appModule.requires.push('tmh.dynamicLocale');
  appModule.requires.push(gmfContextualdataComponent.name);
  appModule.requires.push(gmfMapComponent.name);
  appModule.requires.push(gmfLayertreeModule.name);
  appModule.requires.push(gmfPermalinkModule.name);
  appModule.requires.push(gmfPrintComponent.name);
  appModule.requires.push(gmfProfileModule.name);
  appModule.requires.push(gmfQueryExtraModule.name);
});

beforeEach(angular.mock.module('gmfapp'));

beforeEach(() => {
  appModule.constant('angularLocaleScript', 'http://fake');
  appModule.constant('gmfLayersUrl', 'https://fake');

  angular.mock.module('gmfapp', ($provide) => {
    $provide.value('gmfTreeUrl', 'http://fake/gmf/themes');
    $provide.value('gmfShortenerCreateUrl', 'http://fake/gmf/short/create');
    $provide.value('authenticationBaseUrl', 'https://fake/gmf/authentication');
    $provide.value('gmfRasterUrl', 'https://fake/gmf/raster');
    $provide.value('gmfContextualdatacontentTemplateUrl', 'contextualdata.html');
    $provide.value('defaultTheme', 'Demo');
  });
});
