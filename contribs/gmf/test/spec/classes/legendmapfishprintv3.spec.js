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
import LegendMapFishPrintV3 from 'gmf/print/LegendMapFishPrintV3.js';

describe('gmf.print.LegendMapFishPrintV3', () => {
  /*
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import("ngeo/map/LayerHelper.js").LayerHelper} ngeoLayerHelper The ngeo Layer Helper service.
   * @param {import("gmf/datasource/ExternalDataSourcesManager.js").ExternalDatSourcesManager} gmfExternalDataSourcesManager The manager of external datasources.
   * @param {import('gmf/options.js').OptionsLegendType} legendOptions The options for the legend.
   * @param {import("ol/Map.js").default} map the map to extract the legend from.
   */
  //constructor(gettextCatalog, ngeoLayerHelper, gmfExternalDataSourcesManager, legendOptions, map) {

  /** @type {import('gmf/print/LegendMapFishPrintV3.js').default} */
  let legendMapFishPrintV3 = null;

  beforeEach(() => {
    angular.mock.inject(($injector) => {
      const gettextCatalog = $injector.get('gettextCatalog');
      const ngeoLayerHelper = $injector.get('ngeoLayerHelper');
      const gmfExternalDataSourcesManager = $injector.get('gmfExternalDataSourcesManager');
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
      const map = new olMap({});
      legendMapFishPrintV3 = new LegendMapFishPrintV3(
        gettextCatalog,
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
