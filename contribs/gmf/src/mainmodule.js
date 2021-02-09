// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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
import gmfAuthenticationModule from 'gmf/authentication/module.js';
import gmfBackgroundlayerselectorModule from 'gmf/backgroundlayerselector/module.js';
import gmfContextualdataModule from 'gmf/contextualdata/module.js';
import gmfDatasourceModule from 'gmf/datasource/module.js';
import gmfDisclaimerModule from 'gmf/disclaimer/module.js';
import gmfDrawingModule from 'gmf/drawing/module.js';
import gmfEditingModule from 'gmf/editing/module.js';
import gmfFiltersModule from 'gmf/filters/module.js';
import gmfHeaderModule from 'gmf/header/module.js';
import gmfImportModule from 'gmf/import/module.js';
import gmfLayertreeModule from 'gmf/layertree/module.js';
import gmfLidarprofileModule from 'gmf/lidarprofile/module.js';
import gmfMapModule from 'gmf/map/module.js';
import gmfObjecteditingModule from 'gmf/objectediting/module.js';
import gmfPermalinkModule from 'gmf/permalink/module.js';
import gmfPrintModule from 'gmf/print/module.js';
import gmfProfileModule from 'gmf/profile/module.js';
import gmfRasterModule from 'gmf/raster/module.js';
import gmfSearchModule from 'gmf/search/module.js';
import gmfThemeModule from 'gmf/theme/module.js';
import ngeoMainmodule from 'ngeo/mainmodule.js';

export default angular.module('gmf', [
  gmfAuthenticationModule.name,
  gmfBackgroundlayerselectorModule.name,
  gmfContextualdataModule.name,
  gmfDatasourceModule.name,
  gmfDisclaimerModule.name,
  gmfDrawingModule.name,
  gmfEditingModule.name,
  gmfFiltersModule.name,
  gmfHeaderModule.name,
  gmfImportModule.name,
  gmfLayertreeModule.name,
  gmfLidarprofileModule.name,
  gmfMapModule.name,
  gmfObjecteditingModule.name,
  gmfPermalinkModule.name,
  gmfPrintModule.name,
  gmfProfileModule.name,
  gmfRasterModule.name,
  gmfSearchModule.name,
  gmfThemeModule.name,
  ngeoMainmodule.name,
]);
