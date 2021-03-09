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

import olLayerGroup from 'ol/layer/Group.js';
import olLayerTile from 'ol/layer/Tile.js';
import ImageWMS from 'ol/source/ImageWMS.js';
import {dpi as screenDpi} from 'ngeo/utils.js';
import {NODE_IS_LEAF, LAYER_NODE_NAME_KEY} from 'ngeo/map/LayerHelper.js';
import {DATALAYERGROUP_NAME} from 'gmf/index.js';
import ExternalOGC from 'gmf/datasource/ExternalOGC.js';
import {findGroupByLayerNodeName, findObjectByName} from 'gmf/theme/Themes.js';

/**
 * Get the print legend for MapFishPrint V3 from the OpenLayers map and the GMF Layertree.
 * @hidden
 */
export default class LegendMapFishPrintV3 {
  /**
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import("ngeo/map/LayerHelper.js").LayerHelper} ngeoLayerHelper The ngeo Layer Helper service.
   * @param {import("gmf/datasource/ExternalDataSourcesManager.js").ExternalDatSourcesManager} gmfExternalDataSourcesManager The manager of external datasources.
   * @param {import("gmf/options.js").OptionsLegendType} legendOptions The options for the legend.
   * @param {import("ol/Map.js").default} map the map to extract the legend from.
   */
  constructor(gettextCatalog, ngeoLayerHelper, gmfExternalDataSourcesManager, legendOptions, map) {
    /**
     * @type {angular.gettext.gettextCatalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;

    /**
     * @type {import("ngeo/map/LayerHelper.js").LayerHelper}
     * @private
     */
    this.ngeoLayerHelper_ = ngeoLayerHelper;

    /**
     * @type {import("gmf/datasource/ExternalDataSourcesManager.js").ExternalDatSourcesManager}
     * @private
     */
    this.gmfExternalDataSourcesManager_ = gmfExternalDataSourcesManager;

    /**
     * @type {import('gmf/options.js').OptionsLegendType}
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
     * @type {import("ol/Map.js").default}
     * @private
     */
    this.map_ = map;
  }

  /**
   * Return a legend for MapFishPrint V3 based on the map and the GMF layertree.
   * @param {import('gmf/themes.js').GmfTheme[]} currentThemes the current themes.
   * @param {number} scale The scale to get the legend (for wms layers only).
   * @param {number} dpi The DPI.
   * @param {number[]} bbox The bbox.
   * @return {unknown?} Legend object for print report or null.
   */
  getLegend(currentThemes, scale, dpi, bbox) {
    /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass[]} */
    const internalLegend = this.getInternalLegendItems_(currentThemes, scale, dpi, bbox);
    /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass[]} */
    const externalLegend = this.getExternalLegendItems_(scale);
    /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegend} */
    const legend = {classes: [...externalLegend, ...internalLegend]};

    return legend.classes.length > 0 ? legend : null;
  }

  /**
   * Get legend classes from the layertree only.
   * @param {import('gmf/themes.js').GmfTheme[]} currentThemes the current themes.
   * @param {number} scale The scale to get the legend.
   * @param {number} dpi The DPI.
   * @param {number[]} bbox The bbox.
   * @return {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass[]} Legend classes.
   * @private
   */
  getInternalLegendItems_(currentThemes, scale, dpi, bbox) {
    const dataLayerGroup = this.ngeoLayerHelper_.getGroupFromMap(this.map_, DATALAYERGROUP_NAME);
    const legend = this.collectLegendClassesInTree_(dataLayerGroup, currentThemes, scale, dpi, bbox);
    return legend ? legend.classes : [];
  }

  /**
   * Extract recursively a legend from a layer.
   * @param {import("ol/layer/Base.js").default} layer or layer group to extract the legend from.
   * @param {import('gmf/themes.js').GmfTheme[]} currentThemes the current themes.
   * @param {number} scale The scale to get the legend.
   * @param {number} dpi The DPI.
   * @param {number[]} bbox The bbox.
   * @return {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} Legend classes.
   * @private
   */
  collectLegendClassesInTree_(layer, currentThemes, scale, dpi, bbox) {
    /*
     * Case of layer group:
     * - Create a legend item for the group (with a name if the layer has a name, which should be the case
     *   except for the tree's top-level group).
     * - Call this function on layer's children and try to add the resulting legendItem to the group.
     * - Return the group item (simplified if possible).
     */
    if (layer instanceof olLayerGroup) {
      const gettextCatalog = this.gettextCatalog_;
      /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass[]} */
      const groupClasses = [];
      /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} */
      const legendGroupItem = {};
      if (layer.get(LAYER_NODE_NAME_KEY) && this.gmfLegendOptions_.showGroupsTitle) {
        legendGroupItem.name = gettextCatalog.getString(layer.get(LAYER_NODE_NAME_KEY));
      }
      legendGroupItem.classes = groupClasses;
      // Iterate with a "reverse" to have top-level layers at the top of the legend.
      const sublayers = layer.getLayers().getArray().reverse();
      sublayers.forEach((sublayer) => {
        const child = this.collectLegendClassesInTree_(sublayer, currentThemes, scale, dpi, bbox);
        this.addClassItemToArray_(groupClasses, child);
      });
      return this.tryToSimplifyLegendGroup_(legendGroupItem);
    }

    // Case of leaf layer: Create a legend class item matching the layer.
    const leafLayer = /** @type {import('ol/layer/Layer').default<import("ol/source/Source.js").default>} */ (layer);
    if (leafLayer.getVisible() && leafLayer.getSource()) {
      // For WMTS layers.
      if (leafLayer instanceof olLayerTile) {
        return this.getLegendItemFromTileLayer_(currentThemes, leafLayer, dpi);
      }

      return this.getLegendItemFromWMSLayer_(
        /** @type {import("ol/layer/Layer.js").default<import("ol/source/ImageWMS.js").default>} */ (leafLayer),
        currentThemes,
        scale,
        dpi,
        bbox
      );
    }
    return null;
  }

  /**
   * Get legend classes from external datasources.
   * @param {number} scale The scale to get the legend.
   * @return {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass[]} Legend classes.
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
   * @param {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} legendGroupItem A legend item.
   * @return {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} The same legend item or a
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
   * @param {import('gmf/themes.js').GmfTheme[]} currentThemes the current themes.
   * @param {import("ol/layer/Tile.js").default} layer The layer to extract the legend from.
   * @param {number} dpi The DPI.
   * @return {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} Legend object for print report
   * or null.
   * @private
   */
  getLegendItemFromTileLayer_(currentThemes, layer, dpi) {
    const gettextCatalog = this.gettextCatalog_;
    const layerName = layer.get(LAYER_NODE_NAME_KEY);
    let icon_dpi = this.getMetadataLegendImage_(currentThemes, layerName, dpi);
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
        name: gettextCatalog.getString(layerName),
        icons: [icon_dpi.url],
      };
    }
    return null;
  }

  /**
   * Create a legend item from the given WMS layer.
   * @param {import("ol/layer/Layer.js").default<import("ol/source/ImageWMS.js").default>} layer The layer
   * to extract the legend from.
   * @param {import('gmf/themes.js').GmfTheme[]} currentThemes the current themes.
   * @param {number} scale The scale to get the legend.
   * @param {number} dpi The DPI.
   * @param {number[]} bbox The bbox.
   * @return {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} Legend object for print report
   * or null.
   * @private
   */
  getLegendItemFromWMSLayer_(layer, currentThemes, scale, dpi, bbox) {
    const gettextCatalog = this.gettextCatalog_;
    const source = layer.getSource();
    if (!(source instanceof ImageWMS)) {
      throw new Error('Wrong source type');
    }
    // @ts-ignore: private...
    if (!source.serverType_) {
      throw new Error('Missing source.serverType_');
    }
    /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass[]} */
    const legendLayerClasses = [];
    /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} */
    const legendGroupItem = {
      classes: legendLayerClasses,
    };
    if (this.gmfLegendOptions_.showGroupsTitle) {
      legendGroupItem.name = gettextCatalog.getString(layer.get(LAYER_NODE_NAME_KEY));
    }
    // For each name in a WMS layer.
    const layerNames = /** @type {string} */ (source.getParams().LAYERS).split(',');
    // Iterate with a "reverse" to have top-level layers at the top of the legend.
    layerNames.reverse().forEach((name) => {
      // Don't add classes without legend url or from layers without any
      // active name.
      if (name.length !== 0) {
        let icon_dpi = this.getMetadataLegendImage_(currentThemes, name, dpi);
        // @ts-ignore: private...
        const type = icon_dpi ? 'image' : source.serverType_;
        if (!icon_dpi) {
          const url = this.ngeoLayerHelper_.getWMSLegendURL(
            source.getUrl(),
            name,
            scale,
            undefined,
            undefined,
            undefined,
            // @ts-ignore: private...
            source.serverType_,
            dpi,
            this.gmfLegendOptions_.useBbox ? bbox : undefined,
            this.map_.getView().getProjection().getCode(),
            // @ts-ignore: private...
            this.gmfLegendOptions_.params[source.serverType_]
          );
          if (!url) {
            throw new Error('Missing url');
          }
          icon_dpi = {
            url: url,
            dpi: type === 'qgis' ? dpi : screenDpi(),
          };
        }
        const legendLayerItem = {
          name: this.gmfLegendOptions_.label[type] === false ? '' : gettextCatalog.getString(name),
          icons: [icon_dpi.url],
        };
        if (icon_dpi.dpi != screenDpi()) {
          Object.assign(legendLayerItem, {dpi: icon_dpi.dpi});
        }
        legendLayerClasses.push(legendLayerItem);
      }
    });
    // For wms layer in a mixed wms-group with only one element, do not show the name of the wms but only
    // the name of the tree leaf node.
    if (layer.get(NODE_IS_LEAF) && legendLayerClasses.length == 1) {
      const firstLegendLayer = legendLayerClasses[0];
      firstLegendLayer.name = legendGroupItem.name;
      delete firstLegendLayer.classes;
      return firstLegendLayer;
    }
    return this.tryToSimplifyLegendGroup_(legendGroupItem);
  }

  /**
   * Create a legend item from the given external datasource.
   * @param {import("ngeo/datasource/DataSource.js").default} dataSource The datasource to extract the legend
   * from.
   * @param {number} scale The scale to get the legend.
   * @return {import('ngeo/print/mapfish-print-v3').MapFishPrintLegendClass} Legend object for print report
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
   * Return the metadata legendImage of a layer from the found corresponding node
   * or undefined.
   * @param {string} layerName a layer name.
   * @param {number} [dpi=96] the image DPI.
   * @param {import('gmf/themes.js').GmfTheme[]} currentThemes the current themes.
   * @return {LegendURLDPI|undefined} The legendImage with selected DPI or undefined.
   * @private
   */
  getMetadataLegendImage_(currentThemes, layerName, dpi = -1) {
    if (dpi == -1) {
      dpi = screenDpi();
    }
    const groupNode = findGroupByLayerNodeName(currentThemes, layerName);
    let found_dpi = dpi;
    let node;
    if (groupNode && groupNode.children) {
      node = findObjectByName(groupNode.children, layerName);
    }
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
