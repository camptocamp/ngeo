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

import olLayerGroup from 'ol/layer/Group';
import olLayerTile from 'ol/layer/Tile';
import ImageWMS from 'ol/source/ImageWMS';
import {dpi as screenDpi} from 'ngeo/utils';
import {NODE_IS_LEAF, LAYER_NODE_NAME_KEY} from 'ngeo/map/LayerHelper';
import {DATALAYERGROUP_NAME} from 'gmf/index';
import ExternalOGC from 'gmf/datasource/ExternalOGC';
import {getFlatNodes, findObjectByName} from 'gmf/theme/Themes';

/**
 * Get the print legend for MapFishPrint V3 from the OpenLayers map and the GMF Layertree.
 *
 * @hidden
 */
export default class LegendMapFishPrintV3 {
  /**
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import('ngeo/map/LayerHelper').LayerHelper} ngeoLayerHelper The ngeo Layer Helper service.
   * @param {import('gmf/datasource/ExternalDataSourcesManager').ExternalDatSourcesManager} gmfExternalDataSourcesManager The manager of external datasources.
   * @param {import('gmf/options').OptionsLegendType} legendOptions The options for the legend.
   * @param {import('ol/Map').default} map the map to extract the legend from.
   */
  constructor(gettextCatalog, ngeoLayerHelper, gmfExternalDataSourcesManager, legendOptions, map) {
    /**
     * @type {angular.gettext.gettextCatalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;

    /**
     * @type {import('ngeo/map/LayerHelper').LayerHelper}
     * @private
     */
    this.ngeoLayerHelper_ = ngeoLayerHelper;

    /**
     * @type {import('gmf/datasource/ExternalDataSourcesManager').ExternalDatSourcesManager}
     * @private
     */
    this.gmfExternalDataSourcesManager_ = gmfExternalDataSourcesManager;

    /**
     * @type {import('gmf/options').OptionsLegendType}
     * @private
     */
    this.gmfLegendOptions_ = {
      useBbox: true,
      label: {},
      params: {},
      showGroupsTitle: true,
    };
    if (legendOptions) {
      Object.assign(this.gmfLegendOptions_, legendOptions);
    }

    /**
     * @type {import('ol/Map').default}
     * @private
     */
    this.map_ = map;
  }

  /**
   * Return a legend for MapFishPrint V3 based on the map and the GMF layertree.
   *
   * @param {import('gmf/themes').GmfTheme[]} nodesThemes all the nodes of the themes object.
   * @param {number} scale The scale to get the legend (for wms layers only).
   * @param {number} dpi The DPI.
   * @param {number[]} bbox The bbox.
   * @returns {unknown?} Legend object for print report or null.
   */
  getLegend(nodesThemes, scale, dpi, bbox) {
    /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass[]} */
    const internalLegend = this.getInternalLegendItems_(nodesThemes, scale, dpi, bbox);
    /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass[]} */
    const externalLegend = this.getExternalLegendItems_(scale);
    /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegend} */
    const legend = {classes: [...externalLegend, ...internalLegend]};

    return legend.classes.length > 0 ? legend : null;
  }

  /**
   * Get legend classes from the layertree only.
   *
   * @param {import('gmf/themes').GmfTheme[]} nodesThemes the current themes.
   * @param {number} scale The scale to get the legend.
   * @param {number} dpi The DPI.
   * @param {number[]} bbox The bbox.
   * @returns {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass[]} Legend classes.
   * @private
   */
  getInternalLegendItems_(nodesThemes, scale, dpi, bbox) {
    const dataLayerGroup = this.ngeoLayerHelper_.getGroupFromMap(this.map_, DATALAYERGROUP_NAME);
    /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass[]} */
    const groupClasses = [];
    // Iter first on layers to preserve the user order. Use reverse to have a top to bottom order.
    dataLayerGroup.getLayers().getArray().reverse().forEach(layer => {
      let nodeFirstLevel;
      // Get the node that match this layer
      nodesThemes.some(nodeTheme => {
        nodeFirstLevel = nodeTheme.children.find(node => node.name === layer.get(LAYER_NODE_NAME_KEY))
        return nodeFirstLevel !== undefined;
      });
      if (nodeFirstLevel) {
        // Collect the legend classes for this node and this layer.
        const item = this.collectLegendClassesInTree_(nodeFirstLevel, layer, scale, dpi, bbox);
        this.addClassItemToArray_(groupClasses, item);
      }
    });
    return groupClasses;
  }

  /**
   * Extract recursively a legend from a node and regardings activated layers.
   *
   * @param {import('gmf/themes').GmfGroup|import('gmf/themes').GmfLayer} node the current themes node.
   * @param {import("ol/layer/Base").default} layer or layer group to extract the legend from.
   * @param {number} scale The scale to get the legend.
   * @param {number} dpi The DPI.
   * @param {number[]} bbox The bbox.
   * @returns {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} Legend classes.
   * @private
   */
  collectLegendClassesInTree_(node, layer, scale, dpi, bbox) {
    const gettextCatalog = this.gettextCatalog_;
    /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} */
    const legendGroupItem = {};

    // Case of parent node: create a new legend class with the node title and iter on children.
    if (node.hasOwnProperty('children')) {
      const nodeGroup = /** @type {import('gmf/themes.js').GmfGroup} */ (node);
      if (this.gmfLegendOptions_.showGroupsTitle) {
        legendGroupItem.name = gettextCatalog.getString(nodeGroup.name);
      }
      /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass[]} */
      const groupClasses = [];
      legendGroupItem.classes = groupClasses;
      nodeGroup.children.forEach((nodeChild) => {
        const associatedLayer = this.ngeoLayerHelper_.getLayerByNodeName(nodeChild.name, [layer]) || layer;
        const child = this.collectLegendClassesInTree_(nodeChild, associatedLayer, scale, dpi, bbox);
        this.addClassItemToArray_(groupClasses, child);
      });
      return this.tryToSimplifyLegendGroup_(legendGroupItem);
    }

    if (layer instanceof olLayerGroup) {
      return;
    }

    // Case of leaf node: Create a legend class item matching the layer.
    const nodeLeaf = /** @type {import('gmf/themes').GmfLayer} */ (node);
    const layerLeaf = /** @type {import('ol/layer/Layer').default<import('ol/source/Source').default>} */ (
      layer
    );
    // Layer is not visible then return nothing.
    if (!layerLeaf.getVisible()) {
      return null;
    }
    // Layer is a tile, get the legend for this tile layer.
    if (layerLeaf instanceof olLayerTile) {
      return this.getLegendItemFromTileLayer_(nodeLeaf, layerLeaf, dpi);
    }
    // Layer is a wms layer.
    const NodeWms = /** @type {import('gmf/themes').GmfLayerWMS} */ (
      /** @type {any} */ (nodeLeaf));
    const layerWms = /** @type {import('ol/layer/Layer').default<import('ol/source/ImageWMS').default>} */ (
      layerLeaf
    );
    // Get the legend if it has activated (visible) layer names.
    const layerNames = layerWms.getSource().getParams().LAYERS;
    if (!layerNames.contains(NodeWms.layers)) {
      return null;
    }
    return this.getLegendItemFromlayerWms_(
      NodeWms,
      layerWms,
      scale,
      dpi,
      bbox
    );
  }

  /**
   * Get legend classes from external datasources.
   *
   * @param {number} scale The scale to get the legend.
   * @returns {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass[]} Legend classes.
   * @private
   */
  getExternalLegendItems_(scale) {
    // Get external layers
    const wmsGroups = this.gmfExternalDataSourcesManager_.wmsGroups;

    /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass[]} */
    const topClasses = [];

    wmsGroups.forEach((group) => {
      /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass[]} */
      const groupClasses = [];
      /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} */
      const legendGroupItem = {
        classes: groupClasses,
      };
      if (this.gmfLegendOptions_.showGroupsTitle) {
        legendGroupItem.name = group.title;
      }

      group.dataSourcesCollection.forEach((dataSource) => {
        this.addClassItemToArray_(groupClasses, this.getLegendItemFromExternalDatasource_(dataSource, scale));
      });

      this.addClassItemToArray_(topClasses, this.tryToSimplifyLegendGroup_(legendGroupItem));
    });

    return topClasses;
  }

  /**
   * Add a classItem to a classes array if the classItem to add is not null.
   * If the classItem have embedded classes, these classes must have classItem. Otherwise the given
   * classItem will be not added.
   *
   * @param {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass[]} classes Array to add an element.
   * @param {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} classItem The class to add.
   * @private
   */
  addClassItemToArray_(classes, classItem) {
    if (classItem && (classItem.classes ? classItem.classes.length > 0 : true)) {
      classes.push(classItem);
    }
  }

  /**
   * If a Legend item have only one children and the children name is identical to its name, then return
   * only the children (cut one level). Shrink also if both names are null or undefined.
   * Otherwise return the given legend item.
   *
   * @param {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} legendGroupItem A legend item.
   * @returns {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} The same legend item or a
   * shrunk one.
   * @private
   */
  tryToSimplifyLegendGroup_(legendGroupItem) {
    if (legendGroupItem.classes.length === 1 && legendGroupItem.classes[0].name === legendGroupItem.name) {
      return legendGroupItem.classes[0];
    }
    return legendGroupItem;
  }

  /**
   * Create a legend item from the given WMTS layer.
   * @param {import('gmf/themes').GmfLayer} node the current themes node.
   * @param {import("ol/layer/Tile").default} layer The layer to extract the legend from.
   * @param {number} dpi The DPI.
   * @returns {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} Legend object for print report
   * or null.
   * @private
   */
  getLegendItemFromTileLayer_(node, layer, dpi) {
    const gettextCatalog = this.gettextCatalog_;
    let icon_dpi = this.getMetadataLegendImage_(node, dpi);
    if (!icon_dpi) {
      const url = this.ngeoLayerHelper_.getWMTSLegendURL(layer);
      if (url) {
        icon_dpi = {
          url: url,
          dpi: screenDpi(),
        };
      }
    }
    // Add only classes without legend url.
    if (icon_dpi) {
      return {
        name: gettextCatalog.getString(node.name),
        icons: [icon_dpi.url],
      };
    }
    return null;
  }

  /**
   * Create a legend item from the given WMS layer and from the given node.
   * @param {import('gmf/themes').GmfLayerWMS} node the current themes node.
   * @param {import("ol/layer/Layer").default<import("ol/source/ImageWMS").default>} layer the layer
   * that match the given node.
   * @param {number} scale The scale to get the legend.
   * @param {number} dpi The DPI.
   * @param {number[]} bbox The bbox.
   * @returns {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} Legend object for print report
   * or null.
   * @private
   */
  getLegendItemFromlayerWms_(node, layer, scale, dpi, bbox) {
    const gettextCatalog = this.gettextCatalog_;
    const source = layer.getSource();
    if (!(source instanceof ImageWMS)) {
      throw new Error('Wrong source type');
    }
    // @ts-ignore: private...
    if (!source.serverType_) {
      throw new Error('Missing source.serverType_');
    }
    // @ts-ignore: private...
    const serverType = source.serverType_;

    /**
     * @param {string} nodeName
     * @param {LegendURLDPI} icon_dpi
     * @param {string} serverType
     * @return {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass}
     */
    const getLegendItem = (nodeName, icon_dpi, serverType) => {
      const legendItem = {
        name: this.gmfLegendOptions_.label[serverType] === false ? '' : gettextCatalog.getString(nodeName),
        icons: [icon_dpi.url],
      };
      if (icon_dpi.dpi != screenDpi()) {
        Object.assign(legendItem, {dpi: icon_dpi.dpi});
      }
      return legendItem;
    }

    // Case node as a legend image
    let icon_dpi = this.getMetadataLegendImage_(node, dpi);
    if (icon_dpi) {
      return getLegendItem(node.name, icon_dpi, serverType);
    }

    // Case node has no legend image => Get the url for each WMS layer.
    /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass[]} */
    const legendLayerClasses = [];
    /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} */
    const legendGroupItem = {
      classes: legendLayerClasses,
    };
    if (this.gmfLegendOptions_.showGroupsTitle) {
      legendGroupItem.name = gettextCatalog.getString(node.name);
    }
    const layerNames = node.layers.split(',');
    layerNames.forEach((name) => {
      if (!icon_dpi) {
        const url = this.ngeoLayerHelper_.getWMSLegendURL(
          source.getUrl(),
          name,
          scale,
          undefined,
          undefined,
          undefined,
          serverType,
          dpi,
          this.gmfLegendOptions_.useBbox ? bbox : undefined,
          this.map_.getView().getProjection().getCode(),
          this.gmfLegendOptions_.params[serverType]
        );
        if (!url) {
          throw new Error('Missing url');
        }
        icon_dpi = {
          url: url,
          dpi: serverType === 'qgis' ? dpi : screenDpi(),
        };
      }
      legendLayerClasses.push(getLegendItem(name, icon_dpi, serverType));
    });
    if (legendLayerClasses.length == 1) {
      const firstLegendLayer = legendLayerClasses[0];
      firstLegendLayer.name = legendGroupItem.name;
      delete firstLegendLayer.classes;
      return firstLegendLayer;
    }
    return this.tryToSimplifyLegendGroup_(legendGroupItem);
  }

  /**
   * Create a legend item from the given external datasource.
   *
   * @param {import('ngeo/datasource/DataSource').default} dataSource The datasource to extract the legend
   * from.
   * @param {number} scale The scale to get the legend.
   * @returns {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} Legend object for print report
   * or null.
   * @private
   */
  getLegendItemFromExternalDatasource_(dataSource, scale) {
    if (dataSource instanceof ExternalOGC && dataSource.visible) {
      const url = this.ngeoLayerHelper_.getWMSLegendURL(dataSource.legend.url, dataSource.legend.name, scale);
      return {
        name: dataSource.legend.title,
        icons: [url],
      };
    }
  }

  /**
   * @typedef {Object} LegendURLDPI
   * @property {string} url The URL
   * @property {number} dpi The DPI
   */

  /**
   * Return the metadata legendImage of a layer from the given node
   * or undefined.
   * @param {number} [dpi=96] the image DPI.
   * @param {import('gmf/themes').GmfLayer|import('gmf/themes').GmfLayerWMS} node the node to extract metadata from.
   * @return {LegendURLDPI|undefined} The legendImage with selected DPI or undefined.
   * @private
   */
  getMetadataLegendImage_(node, dpi = -1) {
    if (dpi == -1) {
      dpi = screenDpi();
    }

    let found_dpi = dpi;
    let legendImage;
    let hiDPILegendImages;
    if (node && node.metadata) {
      legendImage = node.metadata.legendImage;
      hiDPILegendImages = node.metadata.hiDPILegendImages;
    }
    let dist = Number.MAX_VALUE;
    if (legendImage) {
      dist = Math.abs(Math.log(screenDpi() / dpi));
      found_dpi = screenDpi();
    }
    if (hiDPILegendImages) {
      for (const str_dpi in hiDPILegendImages) {
        const new_dpi = parseFloat(str_dpi);
        const new_dist = Math.abs(Math.log(new_dpi / dpi));
        if (new_dist < dist) {
          dist = new_dist;
          found_dpi = new_dpi;
          legendImage = hiDPILegendImages[str_dpi];
        }
      }
    }

    if (legendImage) {
      return {
        url: legendImage,
        dpi: found_dpi,
      };
    }
  }
}
