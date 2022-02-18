// The MIT License (MIT)
//
// Copyright (c) 2018-2022 Camptocamp SA
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
import ngeoDatasourceModule from 'ngeo/datasource/module';
import ngeoDrawModule from 'ngeo/draw/module';
import ngeoEditingModule from 'ngeo/editing/module';
import ngeoFilterModule from 'ngeo/filter/module';
import ngeoStreetviewModule from 'ngeo/streetview/module';
import ngeoGridModule from 'ngeo/grid/module';
import ngeoLayertreeModule from 'ngeo/layertree/module';
import ngeoMapModule from 'ngeo/map/module';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper';
import ngeoMeasureModule from 'ngeo/measure/module';
import ngeoPrintModule from 'ngeo/print/module';
import ngeoProfileModule from 'ngeo/profile/module';
import ngeoQueryModule from 'ngeo/query/module';
import ngeoSearchModule from 'ngeo/search/module';
import ngeoStatemanagerModule from 'ngeo/statemanager/module';
import ngeoStatemanagerWfsPermalink from 'ngeo/statemanager/WfsPermalink';
import ngeoMiscExtraModule from 'ngeo/misc/extraModule';
import gmfBackgroundlayerselectorModule from 'gmf/backgroundlayerselector/module';
import gmfContextualdataModule from 'gmf/contextualdata/module';
import gmfDisclaimerModule from 'gmf/disclaimer/module';
import gmfDrawingModule from 'gmf/drawing/module';
import gmfFiltersModule from 'gmf/filters/module';
import gmfHeaderModule from 'gmf/header/module';
import gmfImportModule from 'gmf/import/module';
import gmfObjecteditingModule from 'gmf/objectediting/module';
import gmfPermalinkModule from 'gmf/permalink/module';
import gmfRasterModule from 'gmf/raster/module';
import gmfThemeModule from 'gmf/theme/module';

export default angular.module('ngeo', [
  ngeoDatasourceModule.name,
  ngeoDrawModule.name,
  ngeoEditingModule.name,
  ngeoFilterModule.name,
  ngeoStreetviewModule.name,
  ngeoGridModule.name,
  ngeoLayertreeModule.name,
  ngeoMapModule.name,
  ngeoMapLayerHelper.name,
  ngeoMeasureModule.name,
  ngeoPrintModule.name,
  ngeoProfileModule.name,
  ngeoQueryModule.name,
  ngeoSearchModule.name,
  ngeoStatemanagerModule.name,
  ngeoStatemanagerWfsPermalink.name,
  ngeoMiscExtraModule.name,
  gmfBackgroundlayerselectorModule.name,
  gmfContextualdataModule.name,
  gmfDisclaimerModule.name,
  gmfDrawingModule.name,
  gmfFiltersModule.name,
  gmfHeaderModule.name,
  gmfImportModule.name,
  gmfObjecteditingModule.name,
  gmfPermalinkModule.name,
  gmfRasterModule.name,
  gmfThemeModule.name,
]);
