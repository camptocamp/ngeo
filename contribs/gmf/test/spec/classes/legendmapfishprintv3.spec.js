// The MIT License (MIT)
//
// Copyright (c) 2021-2022 Camptocamp SA
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
import {getLayer as gmfLayertreeSyncLayertreeMapGetLayer} from 'gmf/layertree/SyncLayertreeMap.js';
import LegendMapFishPrintV3 from 'gmf/print/LegendMapFishPrintV3.js';
import gmfTestDataThemes from '../data/themes.js';
import {setupSyncLayertreeMap} from '../services/syncLayertreeMap.spec.js';
import gmfExternalDatasourceOGC from 'gmf/datasource/ExternalOGC.js';
import ngeoDatasourceWMSGroup from 'ngeo/datasource/WMSGroup.js';

describe('gmf.print.LegendMapFishPrintV3', () => {
  /** @type {import('gmf/print/LegendMapFishPrintV3.js').default} */
  let legendMapFishPrintV3;
  /** @type {angular.auto.IInjectorService} */
  let injector;
  /** @type {import('ngeo/map/LayerHelper.js').LayerHelper} */
  let ngeoLayerHelper;
  /** @type {import('gmf/datasource/ExternalDataSourcesManager.js').ExternalDatSourcesManager} */
  let gmfExternalDataSourcesManager;
  /** @type {JQuery} */
  let element;
  /** @type {import("ol/Map.js").default} */
  let map;
  /** @type {(treeCtrl: import("ngeo/layertree/Controller.js").LayertreeController) => import("ol/layer/Base").default} */
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
    // @ts-ignore
    [element, map, getLayer] = setupSyncLayertreeMap().slice(2);

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

  /**
   * @return {Array<import('gmf/themes.js').GmfTheme>}
   */
  const getThemes = () => {
    return /** @type {Array<import('gmf/themes.js').GmfTheme>} */ (
      /** @type any */ (gmfTestDataThemes.themes)
    );
  };

  /**
   * Create a layer and add it in the layer group of the map.
   * The layer to add is defined by the theme and the group index.
   * @param {number} themeIndex
   * @param {number} groupIndex
   */
  const addLayerInMap = (themeIndex, groupIndex) => {
    angular.mock.inject(($rootScope, $compile) => {
      // Init, compile layertree
      $rootScope.tree = gmfTestDataThemes.themes[themeIndex];
      $rootScope.map = map;
      $rootScope.getLayer = getLayer;
      $compile(element)($rootScope);
      $rootScope.$digest();
    });

    // @ts-ignore
    const roottreeCtrl = element.scope().layertreeCtrl;
    const treeGroup = roottreeCtrl.children[groupIndex];
    gmfLayertreeSyncLayertreeMapGetLayer(treeGroup);
  };

  it('Should make legend for one ol layer with two wms layers', () => {
    // Activate some layers (see matching tree in GMF admin) in theme "demo", group "layers"
    // @ts-ignore
    gmfTestDataThemes.themes[1].children[1].children[1].metadata.isChecked = true; // police (with legend image)
    // @ts-ignore
    gmfTestDataThemes.themes[1].children[1].children[2].metadata.isChecked = true; // post_office
    addLayerInMap(1, 1);

    const legend = legendMapFishPrintV3.getLegend(getThemes(), 25000, 254, [0, 0]);
    expect(legend).toEqual({
      'classes': [
        {
          'name': 'Layers',
          'classes': [
            {
              'name': 'police_stations',
              'icons': [
                'https://geomapfish-demo-2-6.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/images/railways.png',
              ],
            },
            {
              'name': 'post_office',
              'icons': [
                'https://geomapfish-demo-2-6.camptocamp.com/mapserv_proxy?ogcserver=Main+PNG&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin&FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=post_office&SCALE=25000',
              ],
            },
          ],
        },
      ],
    });
  });

  it('Should make legend for one ol layer with two wms layers (no title)', () => {
    // @ts-ignore: private.
    legendMapFishPrintV3.gmfLegendOptions_.showGroupsTitle = false;
    // Activate some layers (see matching tree in GMF admin) in theme "demo", group "layers"
    // @ts-ignore
    gmfTestDataThemes.themes[1].children[1].children[1].metadata.isChecked = true; // police (with legend image)
    // @ts-ignore
    gmfTestDataThemes.themes[1].children[1].children[2].metadata.isChecked = true; // post_office
    addLayerInMap(1, 1);

    const legend = legendMapFishPrintV3.getLegend(getThemes(), 25000, 254, [0, 0]);
    expect(legend).toEqual({
      'classes': [
        {
          'classes': [
            {
              'name': 'police_stations',
              'icons': [
                'https://geomapfish-demo-2-6.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/images/railways.png',
              ],
            },
            {
              'name': 'post_office',
              'icons': [
                'https://geomapfish-demo-2-6.camptocamp.com/mapserv_proxy?ogcserver=Main+PNG&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin&FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=post_office&SCALE=25000',
              ],
            },
          ],
        },
      ],
    });
  });

  it('Should make legend for one ol layer with two wms layers (QGIS)', () => {
    // For QGIS, take in account dpi except on legend image.
    // Activate some layers (see matching tree in GMF admin) in theme "QGIS server", group "QGIS server"
    // @ts-ignore
    gmfTestDataThemes.themes[13].children[0].children[0].metadata.isChecked = true; // points
    // @ts-ignore
    gmfTestDataThemes.themes[13].children[0].children[1].metadata.isChecked = true; // railways
    addLayerInMap(13, 0);

    const legend = legendMapFishPrintV3.getLegend(getThemes(), 25000, 254, [0, 0]);
    expect(legend).toEqual({
      'classes': [
        {
          'name': 'QGIS server',
          'classes': [
            {
              'name': 'points',
              'icons': [
                'https://geomapfish-demo-2-6.camptocamp.com/mapserv_proxy?ogcserver=QGIS+server&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin&FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=points&DPI=254&BBOX=0%2C0&SRS=EPSG%3A3857&SRCWIDTH=NaN&SRCHEIGHT=NaN&ITEMFONTFAMILY=DejaVu%20Sans&ITEMFONTSIZE=8&LAYERFONTFAMILY=DejaVu%20Sans&LAYERFONTSIZE=10',
              ],
              'dpi': 254,
            },
            {
              'name': 'railways',
              'icons': [
                'https://geomapfish-demo-2-6.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/images/railways.png',
              ],
            },
          ],
        },
      ],
    });
  });

  it('Should make legend for one ol layer with two wms layers in the same node', () => {
    // Activate some layers (see matching tree in GMF admin) in theme "demo", group "OSM functions"
    // Note: There is another "two_layers" in the group 0 ("OSM functions mixed", this is the
    // same node but must be note activated (the group title would be wrong).)
    // @ts-ignore
    gmfTestDataThemes.themes[1].children[4].children[7].metadata.isChecked = true; // two_layers
    addLayerInMap(1, 0);

    const legend = legendMapFishPrintV3.getLegend(getThemes(), 25000, 254, [0, 0]);
    expect(legend).toEqual({
      'classes': [
        {
          'name': 'OSM functions',
          'classes': [
            {
              'name': 'two_layers',
              'classes': [
                {
                  'name': 'sustenance',
                  'icons': [
                    'https://geomapfish-demo-2-6.camptocamp.com/mapserv_proxy?ogcserver=Main+PNG&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin&FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=sustenance&SCALE=25000',
                  ],
                },
                {
                  'name': 'entertainment',
                  'icons': [
                    'https://geomapfish-demo-2-6.camptocamp.com/mapserv_proxy?ogcserver=Main+PNG&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin&FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=entertainment&SCALE=25000',
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('Should make legend for one ol layer having the same name as the wms layer', () => {
    // Activate some layers (see matching tree in GMF admin) in theme "Gestion des eaux", group "fuel"
    // @ts-ignore
    gmfTestDataThemes.themes[7].children[0].children[0].metadata.isChecked = true; // layer fuel
    addLayerInMap(7, 0);

    const legend = legendMapFishPrintV3.getLegend(getThemes(), 25000, 254, [0, 0]);
    expect(legend).toEqual({
      'classes': [
        {
          'name': 'fuel',
          'icons': [
            'https://geomapfish-demo-2-6.camptocamp.com/mapserv_proxy?ogcserver=Main+PNG&cache_version=cf85fcea5f7a4f6c866fd76a6da3da11&username=admin&FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=fuel&SCALE=25000',
          ],
        },
      ],
    });
  });

  it('Should make legend for one ol tile layer', () => {
    // Activate some layers (see matching tree in GMF admin) in theme "Cadastre", group "Cadastre"
    // layer ch.astra.hauptstrassennetz (with legend image)
    // @ts-ignore
    gmfTestDataThemes.themes[0].children[0].children[2].metadata.isChecked = true;
    addLayerInMap(0, 0);

    const legend = legendMapFishPrintV3.getLegend(getThemes(), 25000, 254, [0, 0]);
    expect(legend).toEqual({
      'classes': [
        {
          'name': 'Cadastre',
          'classes': [
            {
              'name': 'ch.astra.hauptstrassennetz',
              'icons': [
                'https://geomapfish-demo-2-6.camptocamp.com/static/cf85fcea5f7a4f6c866fd76a6da3da11/images/railways.png',
              ],
            },
          ],
        },
      ],
    });
  });

  const prepareExternalDatasource = () => {
    const dsOptions = {
      'id': 1,
      'name': 'External layer',
      'ogcImageType': 'image/png',
      'wmsLayers': [
        {
          'name': 'ch.test.externallayer',
          'queryable': true,
        },
      ],
      'ogcType': 'WMS',
      'visible': true,
      'wmsUrl': 'https://external.test.ch/?',
      'wmsInfoFormat': 'application/vnd.ogc.gml',
    };
    const dsLegend1 = {
      'title': 'External layer legend 1',
      'url': 'https://external.1.test.legend.ch',
      'name': 'ch.test.1.legend.externallayer',
    };
    const dsLegend2 = {
      'title': 'External layer legend 2',
      'url': 'https://external.2.test.legend.ch',
      'name': 'ch.test.2.legend.externallayer',
    };
    const dataSource1 = new gmfExternalDatasourceOGC(dsOptions, dsLegend1);
    const dataSource2 = new gmfExternalDatasourceOGC(dsOptions, dsLegend2);
    const wmsGroup1 = new ngeoDatasourceWMSGroup(
      {
        injector,
        dataSources: [dataSource1, dataSource1],
        // Same group name than the layer but two elements: it will be not simplified.
        title: 'External layer legend 1',
        url: 'https://external.1.test.ch/?',
      },
      ngeoLayerHelper
    );
    const wmsGroup2 = new ngeoDatasourceWMSGroup(
      {
        injector,
        dataSources: [dataSource2],
        // Same group name than the layer: it will be simplified.
        title: 'External layer legend 2',
        url: 'https://external.2.test.ch/?',
      },
      ngeoLayerHelper
    );
    gmfExternalDataSourcesManager.wmsGroupsCollection.push(wmsGroup1);
    gmfExternalDataSourcesManager.wmsGroupsCollection.push(wmsGroup2);
  };

  it('Should make legend for an external datasource', () => {
    prepareExternalDatasource();
    const legend = legendMapFishPrintV3.getLegend([], 25000, 254, [0, 0]);
    expect(legend).toEqual({
      'classes': [
        {
          'name': 'External layer legend 1',
          'classes': [
            {
              'name': 'External layer legend 1',
              'icons': [
                'https://external.1.test.legend.ch?FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=ch.test.1.legend.externallayer&SCALE=25000',
              ],
            },
            {
              'name': 'External layer legend 1',
              'icons': [
                'https://external.1.test.legend.ch?FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=ch.test.1.legend.externallayer&SCALE=25000',
              ],
            },
          ],
        },
        {
          'name': 'External layer legend 2',
          'icons': [
            'https://external.2.test.legend.ch?FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=ch.test.2.legend.externallayer&SCALE=25000',
          ],
        },
      ],
    });
  });

  it('Should make legend for an external datasource (no title)', () => {
    prepareExternalDatasource();
    // @ts-ignore: private.
    legendMapFishPrintV3.gmfLegendOptions_.showGroupsTitle = false;
    const legend = legendMapFishPrintV3.getLegend([], 25000, 254, [0, 0]);
    expect(legend).toEqual({
      'classes': [
        {
          'classes': [
            {
              'name': 'External layer legend 1',
              'icons': [
                'https://external.1.test.legend.ch?FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=ch.test.1.legend.externallayer&SCALE=25000',
              ],
            },
            {
              'name': 'External layer legend 1',
              'icons': [
                'https://external.1.test.legend.ch?FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=ch.test.1.legend.externallayer&SCALE=25000',
              ],
            },
          ],
        },
        {
          'classes': [
            {
              'name': 'External layer legend 2',
              'icons': [
                'https://external.2.test.legend.ch?FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=ch.test.2.legend.externallayer&SCALE=25000',
              ],
            },
          ],
        },
      ],
    });
  });
});
