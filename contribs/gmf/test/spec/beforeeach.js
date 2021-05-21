// The MIT License (MIT)
//
// Copyright (c) 2014-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import 'angular-dynamic-locale';
import gmfContextualdataComponent from 'gmf/contextualdata/component.js';

import gmfLayertreeModule from 'gmf/layertree/module.js';
import gmfMapComponent from 'gmf/map/component.js';
import gmfPermalinkModule from 'gmf/permalink/module.js';
import gmfPrintComponent from 'gmf/print/component.js';
import gmfProfileModule from 'gmf/profile/module.js';
import gmfQueryExtraModule from 'gmf/query/extraModule.js';
import 'ngeo/proj/EPSG_2056.js';
import 'ngeo/proj/EPSG_21781.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const appModule = angular.module('gmfapp', []);

beforeEach(() => {
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

  angular.mock.module(
    'gmfapp',
    /**
     * @param {angular.IModule} $provide
     */
    ($provide) => {
      $provide.value('gmfTreeUrl', 'http://fake/gmf/themes');
      $provide.value('gmfShortenerCreateUrl', 'http://fake/gmf/short/create');
      $provide.value('authenticationBaseUrl', 'https://fake/gmf/authentication');
      $provide.value('gmfRasterUrl', 'https://fake/gmf/raster');
      $provide.value('ngeoPermalinkOgcserverUrl', 'http://fake/gmf/ogs_server');
      $provide.value('gmfContextualdatacontentTemplateUrl', 'contextualdata.html');
      $provide.value('defaultTheme', 'Demo');
      $provide.value('cacheVersion', '0');
      $provide.value('gmfAuthenticationConfig', {});
      $provide.value('gmfThemesOptions', {});
      $provide.value('ngeoMeasurePrecision', 0);
      $provide.value('ngeoMeasureDecimals', 0);
      $provide.value('ngeoMeasureSpherical', false);
      $provide.value('ngeoCsvEncoding', 'utf-8');
      $provide.value('ngeoCsvExtension', '.csv');
      $provide.value('ngeoCsvIncludeHeader', true);
      $provide.value('ngeoCsvQuote', '"');
      $provide.value('ngeoCsvSeparator', ',');
      $provide.value('gmfCsvFilename', 'query-results.csv');
      $provide.value('gmfAuthenticationNoReloadRole', null);
      $provide.value('gmfTreeManagerModeFlush', true);
      $provide.value('ngeoPointfilter', null);
      $provide.value('gmfPermalinkOptions', {});
      $provide.value('ngeoQueryOptions', {});
      $provide.value('gmfPrintOptions', {});
      $provide.value('gmfDisplayQueryGridOptions', {});
      $provide.value('gmfDisplayQueryWindowOptions', {});
      $provide.value('ngeoProfileOptions', {});
      $provide.value('gmfProfileOptions', {});
      $provide.value('ngeoWfsPermalinkOptions', {
        wfsTypes: [],
      });
    }
  );
});
