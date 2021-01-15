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
import LegendMapFishPrintV3 from 'gmf/print/LegendMapFishPrintV3.js';
import {DATALAYERGROUP_NAME} from 'gmf/index.js';

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
    angular.mock.inject(($injector) => {
      const gettextCatalog = $injector.get('gettextCatalog');
      const ngeoLayerHelper = $injector.get('ngeoLayerHelper');
      const gmfExternalDataSourcesManager = $injector.get('gmfExternalDataSourcesManager');
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
});
