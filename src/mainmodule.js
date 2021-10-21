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
import ngeoDatasourceModule from 'ngeo/datasource/module';
import ngeoDownloadModule from 'ngeo/download/module';
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

export default angular.module('ngeo', [
  ngeoDatasourceModule.name,
  ngeoDownloadModule.name,
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
]);
