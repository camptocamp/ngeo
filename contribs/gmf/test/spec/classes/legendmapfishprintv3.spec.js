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
import {LAYER_NODE_NAME_KEY} from 'ngeo/map/LayerHelper.js';
import ngeoDatasourceWMSGroup from 'ngeo/datasource/WMSGroup.js';
import LegendMapFishPrintV3 from 'gmf/print/LegendMapFishPrintV3.js';
import {DATALAYERGROUP_NAME} from 'gmf/index.js';
import gmfExternalDatasourceOGC from 'gmf/datasource/ExternalOGC.js';

describe('gmf.print.LegendMapFishPrintV3', () => {
  /** @type {import('gmf/print/LegendMapFishPrintV3.js').default} */
  let legendMapFishPrintV3;
  /** @type {angular.auto.IInjectorService} */
  let injector;
  /** @type {import('ngeo/map/LayerHelper.js').LayerHelper} */
  let ngeoLayerHelper;
  /** @type {import('gmf/datasource/ExternalDataSourcesManager.js').ExternalDatSourcesManager} */
  let gmfExternalDataSourcesManager;

  const layerTile = new olLayerTile({
    source: new olSourceTileImage({
      attributions: 'foo',
    }),
  });
  layerTile.set('capabilitiesStyles', [{legendURL: [{href: 'http://tile.com/icon'}]}]);
  layerTile.set(LAYER_NODE_NAME_KEY, 'layerTile');

  const sourceWMS1 = new olSourceImageWMS({
    params: {LAYERS: 'layerwms1, layerwms2'},
    url: 'http://wmslayer1.com',
    serverType: 'qgis',
  });
  const layerWMS1 = new olLayerLayer({source: sourceWMS1});
  layerWMS1.set(LAYER_NODE_NAME_KEY, 'layerwms1');

  const sourceWMS2 = new olSourceImageWMS({
    params: {LAYERS: 'layerwms'},
    url: 'http://wmslayer2.com',
    serverType: 'qgis',
  });

  const layerWMS2 = new olLayerLayer({source: sourceWMS2});
  // Same name than then unique WMS layer: it will be simplified.
  layerWMS2.set(LAYER_NODE_NAME_KEY, 'layerwms');

  const mapLayerGroup = new olLayerGroup();
  const map = new olMap({
    layers: mapLayerGroup,
  });

  const setMapLayers =
    /**
     * Add layers in a named group and add this group to the map.
     * @param {import('ol/layer/Layer').default<import("ol/source/Source.js").default>[]} layers the array
     * of layers to add to the map.
     * @param {string} groupName The group name.
     */
    (layers, groupName) => {
      const layerGroup = new olLayerGroup();
      layerGroup.setLayers(new olCollection(layers));
      layerGroup.set('groupName', DATALAYERGROUP_NAME); // For layerHelper to find the group.
      layerGroup.set(LAYER_NODE_NAME_KEY, groupName);
      mapLayerGroup.setLayers(new olCollection([layerGroup]));
    };

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
    // Reset map layers
    mapLayerGroup.setLayers(new olCollection());

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

  it('Should make legend for a wms with two layers', () => {
    setMapLayers([layerWMS1], 'layerGroup');
    const legend = legendMapFishPrintV3.getLegend([], 25000, 254, [0, 0]);
    expect(legend).toEqual({
      'classes': [
        {
          'name': 'layerGroup',
          'classes': [
            {
              'name': 'layerwms1',
              'classes': [
                {
                  'name': 'layerwms1',
                  'icons': [
                    'http://wmslayer1.com?FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=layerwms1&SCALE=25000&DPI=254&BBOX=0%2C0&SRS=EPSG%3A3857&WIDTH=NaN&HEIGHT=NaN&ITEMFONTFAMILY=DejaVu%20Sans&ITEMFONTSIZE=8&LAYERFONTFAMILY=DejaVu%20Sans&LAYERFONTSIZE=10',
                  ],
                  'dpi': 254,
                },
                {
                  'name': ' layerwms2',
                  'icons': [
                    'http://wmslayer1.com?FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=%20layerwms2&SCALE=25000&DPI=254&BBOX=0%2C0&SRS=EPSG%3A3857&WIDTH=NaN&HEIGHT=NaN&ITEMFONTFAMILY=DejaVu%20Sans&ITEMFONTSIZE=8&LAYERFONTFAMILY=DejaVu%20Sans&LAYERFONTSIZE=10',
                  ],
                  'dpi': 254,
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('Should make legend for a wms with one layer having the same name than the group', () => {
    // Same group name than the layer: it will be simplified.
    setMapLayers([layerWMS2], 'layerwms');
    const legend = legendMapFishPrintV3.getLegend([], 25000, 254, [0, 0]);
    expect(legend).toEqual({
      'classes': [
        {
          'name': 'layerwms',
          'icons': [
            'http://wmslayer2.com?FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=layerwms&SCALE=25000&DPI=254&BBOX=0%2C0&SRS=EPSG%3A3857&WIDTH=NaN&HEIGHT=NaN&ITEMFONTFAMILY=DejaVu%20Sans&ITEMFONTSIZE=8&LAYERFONTFAMILY=DejaVu%20Sans&LAYERFONTSIZE=10',
          ],
          'dpi': 254,
        },
      ],
    });
  });

  it('Should make legend for a tile layer', () => {
    // Same group name than the layer: it will be simplified.
    setMapLayers([layerTile], 'layerTile');
    const legend = legendMapFishPrintV3.getLegend([], 25000, 254, [0, 0]);
    expect(legend).toEqual({
      'classes': [
        {
          'name': 'layerTile',
          'icons': ['http://tile.com/icon'],
        },
      ],
    });
  });

  it('Should make legend for an external datasource', () => {
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
});
