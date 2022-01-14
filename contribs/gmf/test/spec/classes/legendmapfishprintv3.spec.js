// The MIT License (MIT)
//
// Copyright (c) 2021 Camptocamp SA
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
import olMap from 'ol/Map.js';
import olCollection from 'ol/Collection.js';
import olLayerGroup from 'ol/layer/Group.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerLayer from 'ol/layer/Layer.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceTileImage from 'ol/source/TileImage.js';
import {NODE_IS_LEAF, LAYER_NODE_NAME_KEY} from 'ngeo/map/LayerHelper.js';
import ngeoDatasourceWMSGroup from 'ngeo/datasource/WMSGroup.js';
import LegendMapFishPrintV3 from 'gmf/print/LegendMapFishPrintV3.js';
import {DATALAYERGROUP_NAME} from 'gmf/index.js';
import gmfExternalDatasourceOGC from 'gmf/datasource/ExternalOGC.js';
import {setupSyncLayertreeMap} from '../services/syncLayertreeMap.spec.js';

describe('gmf.print.LegendMapFishPrintV3', () => {
  /** @type {import('gmf/print/LegendMapFishPrintV3.js').default} */
  let legendMapFishPrintV3;
  /** @type {angular.auto.IInjectorService} */
  let injector;
  /** @type {import('ngeo/map/LayerHelper.js').LayerHelper} */
  let ngeoLayerHelper;
  /** @type {import('gmf/datasource/ExternalDataSourcesManager.js').ExternalDatSourcesManager} */
  let gmfExternalDataSourcesManager;
  let $httpBackend_;
  let gmfSyncLayertreeMap_;
  let element;
  let map;
  let getLayer;

  const legendOptions = {
    label: {qgis: true},
    params: {
      qgis: {
        ITEMFONTFAMILY: 'DejaVu Sans',
        ITEMFONTSIZE: '8',
        LAYERFONTFAMILY: 'DejaVu Sans',
        LAYERFONTSIZE: '10',
      },
    },
  };

  beforeEach(() => {
    [$httpBackend_, gmfSyncLayertreeMap_, element, map, getLayer] = setupSyncLayertreeMap();

    angular.mock.inject(($injector) => {
      injector = $injector;
      ngeoLayerHelper = $injector.get('ngeoLayerHelper');
      gmfExternalDataSourcesManager = $injector.get('gmfExternalDataSourcesManager');
      legendMapFishPrintV3 = new LegendMapFishPrintV3(
        $injector.get('gettextCatalog'),
        ngeoLayerHelper,
        gmfExternalDataSourcesManager,
        legendOptions,
        map
      );
    });
  });

  it('Should be instantiated', () => {
    expect(legendMapFishPrintV3).toBeTruthy();
  });

});
