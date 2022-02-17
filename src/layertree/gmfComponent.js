// The MIT License (MIT)
//
// Copyright (c) 2016-2022 Camptocamp SA
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
import {DATALAYERGROUP_NAME} from 'gmf/index';
import gmfDatasourceDataSourceBeingFiltered from 'gmf/datasource/DataSourceBeingFiltered';
import gmfLayerBeingSwipe from 'gmf/datasource/LayerBeingSwipe';
import gmfDatasourceExternalDataSourcesManager from 'gmf/datasource/ExternalDataSourcesManager';
import gmfPermalinkPermalink from 'gmf/permalink/Permalink';

import gmfLayertreeDatasourceGroupTreeComponent from 'gmf/layertree/datasourceGroupTreeComponent';

import gmfLayertreeSyncLayertreeMap from 'gmf/layertree/SyncLayertreeMap';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager';
import gmfThemeThemes, {
  getNodeMinResolution,
  getNodeMaxResolution,
  getSnappingConfig,
} from 'gmf/theme/Themes';
import gmfDatasourceOGC from 'gmf/datasource/OGC';
import {ServerType} from 'ngeo/datasource/OGC';

import gmfLayertreeNode from 'gmf/layertree/layertreeNode';
import ngeoLayertreeController, {LayertreeVisitorDecision} from 'ngeo/layertree/Controller';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper';
import ngeoMiscSyncArrays from 'ngeo/misc/syncArrays';
import ngeoMiscWMSTime from 'ngeo/misc/WMSTime';
import olLayerTile from 'ol/layer/Tile';
import olLayerLayer from 'ol/layer/Layer';
import {isEmpty} from 'ol/obj';
import olSourceImageWMS from 'ol/source/ImageWMS';
import olSourceTileWMS from 'ol/source/TileWMS';
import olSourceWMTS from 'ol/source/WMTS';
import LayerBase from 'ol/layer/Base';
import {getUid} from 'ol/util';

import 'bootstrap/js/src/collapse';

/**
 * Static function to create a popup with an iframe.
 *
 * @typedef {Function} openIframePopup
 * @param {string} url an url.
 * @param {string} title (text).
 * @param {string} [opt_width] CSS width.
 * @param {string} [opt_height] CSS height.
 * @param {boolean} [opt_apply] If true, trigger the Angular digest loop. Default to true.
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfLayertreeComponent', [
  gmfDatasourceDataSourceBeingFiltered.name,
  gmfDatasourceExternalDataSourcesManager.name,
  gmfPermalinkPermalink.name,
  gmfLayertreeDatasourceGroupTreeComponent.name,
  gmfLayertreeSyncLayertreeMap.name,
  gmfLayertreeTreeManager.name,
  gmfThemeThemes.name,
  gmfLayertreeNode.name,
  ngeoLayertreeController.name,
  ngeoMapLayerHelper.name,
  ngeoMiscWMSTime.name,
  gmfLayerBeingSwipe.name,
]);

// Overrides the path to the layertree template (used by each node, except
// the root node that path is defined by the gmfLayertreeTemplate value.
myModule.value(
  'gmfLayertreeNodeTemplateUrl',
  /**
   * @param {JQuery} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @returns {string} Template URL.
   */
  (element, attrs) => 'gmf/layertree'
);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/layertree', require('./gmfComponent.html'));
  }
);

myModule.value(
  'gmfLayertreeTemplate',
  /**
   * @param {JQuery} $element Element.
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} Template.
   */
  ($element, $attrs) => {
    const subTemplateUrl = 'gmf/layertree';
    return (
      '<div gmf-layertree-node="gmfLayertreeCtrl.root" ' +
      'gmf-layertree-node-map="gmfLayertreeCtrl.map" ' +
      'gmf-layertree-node-nodelayer="gmfLayertreeCtrl.getLayer(treeCtrl)" ' +
      'gmf-layertree-node-listeners="gmfLayertreeCtrl.listeners(treeScope, treeCtrl)" ' +
      `gmf-layertree-node-templateurl="${subTemplateUrl}">` +
      '</div>'
    );
  }
);

/**
 * @param {JQuery} $element Element.
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(JQuery, angular.IAttributes): string} gmfLayertreeTemplate Template function.
 * @returns {string} Template.
 * @ngInject
 * @private
 * @hidden
 */
function gmfLayertreeTemplate($element, $attrs, gmfLayertreeTemplate) {
  return gmfLayertreeTemplate($element, $attrs);
}

/**
 * This component creates a layertree based on the c2cgeoportal JSON themes
 * source and a {@link import('ngeo/layertreeComponent').default}. The controller used by this
 * component defines some functions for each node that are created by a default
 * template. This default template can be overridden by setting the value
 * 'gmf.layertreeTemplateUrl' but you will have to adapt the
 * ngeoLayertreeTemplateUrl value too (to define the children's nodes template
 * path).
 *
 * Example:
 *
 *      <gmf-layertree
 *        gmf-layertree-dimensions="ctrl.dimensions"
 *        gmf-layertree-map="ctrl.map">
 *      </gmf-layertree>
 *
 * You can add an attribute 'gmf-layertree-openlinksinnewwindow="::true"' to open
 * metadata URLs in a new window. By default, and in the default template,
 * links will be opened in a popup (The window.openIframePopup function must be available !)
 *
 * Used metadata:
 *
 *  - `isChecked`: if 'false' the layer visibility will be set to false.
 *  - `iconUrl`: layer icon full URL.
 *  - `legendRule`: WMS rule used to get a layer icon.
 *  - `isLegendExpanded: if 'true' the legend is expanded by default.
 *  - `metadataUrl`: Display a popup with the content of the given URL if
 *    possible also open a new window.
 *  - `exclusiveGroup`: Whether the group contains children that have to be mutually
 *      exclusive, meaning that only one child may be ON at any time.
 *  - `legend`: Display the legend of this layer. For WMS and WMTS layers.
 *  - `legendImage`: The URL to the image used as a legend in the layer tree. For WMS and WMTS layers.
 *  - `maxResolution`: The max resolution where the layer is visible. For WMS layers.
 *      On WMTS layers it will have an effect on the node in the layertree but not on the layertree directly.
 *  - `minResolution`: The min resolution where the layer is visible. For WMS layers.
 *      On WMTS layers it will have an effect on the node in the layertree but not on the layer directly.
 *  - `ogcServer`: The corresponding OGC server for a WMTS layer. For WMTS layers.
 *  - `opacity`: Layer opacity. 1.0 means fully visible, 0 means invisible, For WMS and WMTS layers.
 *  - `timeAttribute`: The name of the time attribute. For WMS(-T) layers.
 *  - `wmsLayers`: A corresponding WMS layer for WMTS layers. Used to query the WMTS layers and to print them.
 *      (See also printLayers and queryLayers metadata for more granularity). For WMTS Layers.
 *  - `printLayers`: A WMS layer that will be used instead of the WMTS layers in the print.
 *  - `queryLayers`: The WMS layers used as references to query the WMTS layers. For WMTS layers.
 *  - `isExpanded`: Whether the layer group is expanded by default. For layer groups (only).
 *  - `snappingConfig`: Whether the layer is used for snapping.
 *
 * @htmlAttribute {import('ol/Map').default} gmf-layertree-map The map.
 * @htmlAttribute {Object<string, string>|undefined} gmf-layertree-dimensions Global dimensions object.
 * @ngdoc component
 * @ngname gmfLayertreeComponent
 */
const layertreeComponent = {
  controller: 'GmfLayertreeController as gmfLayertreeCtrl',
  bindings: {
    'map': '=gmfLayertreeMap',
    'dimensions': '=?gmfLayertreeDimensions',
  },
  template: gmfLayertreeTemplate,
};

myModule.component('gmfLayertree', layertreeComponent);

/**
 * @param {JQuery} $element Element.
 * @param {angular.IScope} $scope Angular scope.
 * @param {import('ngeo/map/LayerHelper').LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {import('gmf/datasource/LayerBeingSwipe').LayerBeingSwipe} gmfLayerBeingSwipe
 * @param {import('gmf/datasource/DataSourceBeingFiltered').DataSourceBeingFiltered} gmfDataSourceBeingFiltered
 *    The Gmf value service that determines the data source currently being
 *    filtered.
 * @param {import('gmf/datasource/ExternalDataSourcesManager').ExternalDatSourcesManager} gmfExternalDataSourcesManager
 *    The Gmf external data sources manager service. Used here to fetch the external WMS groups.
 * @param {import('gmf/permalink/Permalink').PermalinkService} gmfPermalink The gmf permalink service.
 * @param {import('gmf/layertree/TreeManager').LayertreeTreeManager} gmfTreeManager
 *    gmf Tree Manager service.
 * @param {import('gmf/layertree/SyncLayertreeMap').SyncLayertreeMap} gmfSyncLayertreeMap
 *    gmfSyncLayertreeMap service.
 * @param {import('ngeo/misc/WMSTime').WMSTime} ngeoWMSTime wms time service.
 * @param {import('gmf/theme/Themes').ThemesService} gmfThemes The gmf Themes service.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {import('gmf/options').gmfLayerTreeOptions} gmfLayerTreeOptions The options.
 * @class
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname gmfLayertreeController
 */
export function Controller(
  $element,
  $scope,
  ngeoLayerHelper,
  gmfLayerBeingSwipe,
  gmfDataSourceBeingFiltered,
  gmfExternalDataSourcesManager,
  gmfPermalink,
  gmfTreeManager,
  gmfSyncLayertreeMap,
  ngeoWMSTime,
  gmfThemes,
  $timeout,
  gmfLayerTreeOptions
) {
  /**
   * @type {import('gmf/options').gmfLayerTreeOptions}
   */
  this.options = gmfLayerTreeOptions;

  /**
   * @type {import('ol/Map').default}
   */
  this.map;

  /**
   * @type {?Object<string, string>}
   */
  this.dimensions = null;

  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;

  /**
   * @type {import('ngeo/map/LayerHelper').LayerHelper}
   */
  this.layerHelper_ = ngeoLayerHelper;

  /**
   * @type {import('gmf/datasource/LayerBeingSwipe').LayerBeingSwipe}
   */
  this.gmfLayerBeingSwipe = gmfLayerBeingSwipe;

  /**
   * @type {import('gmf/datasource/DataSourceBeingFiltered').DataSourceBeingFiltered}
   */
  this.gmfDataSourceBeingFiltered = gmfDataSourceBeingFiltered;

  /**
   * @type {import('gmf/datasource/ExternalDataSourcesManager').ExternalDatSourcesManager}
   */
  this.gmfExternalDataSourcesManager = gmfExternalDataSourcesManager;

  /**
   * @type {import('gmf/permalink/Permalink').PermalinkService}
   */
  this.gmfPermalink_ = gmfPermalink;

  /**
   * @type {import('gmf/layertree/TreeManager').LayertreeTreeManager}
   */
  this.gmfTreeManager_ = gmfTreeManager;

  const root = gmfTreeManager.root;
  if (!root) {
    throw new Error('Missing root');
  }

  /**
   * @type {import('gmf/themes').GmfRootNode}
   */
  this.root = root;

  /**
   * @type {import('gmf/layertree/SyncLayertreeMap').SyncLayertreeMap}
   */
  this.gmfSyncLayertreeMap_ = gmfSyncLayertreeMap;

  /**
   * @type {import('ngeo/misc/WMSTime').WMSTime}
   */
  this.ngeoWMSTime_ = ngeoWMSTime;

  /**
   * @type {Object<number, string[]>}
   */
  this.groupNodeStates_ = {};

  /**
   * @type {?import('ol/layer/Group').default}
   */
  this.dataLayerGroup_ = null;

  /**
   * @type {import('ol/layer/Base').default[]}
   */
  this.layers = [];

  /**
   * @type {import('gmf/theme/Themes').ThemesService}
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {angular.ITimeoutService}
   */
  this.$timeout_ = $timeout;

  // enter digest cycle on node collapse
  $element.on('shown.bs.collapse', () => {
    this.scope_.$apply();
  });
}

/**
 * Init the controller,
 */
Controller.prototype.$onInit = function () {
  this.dataLayerGroup_ = this.layerHelper_.getGroupFromMap(this.map, DATALAYERGROUP_NAME);

  ngeoMiscSyncArrays(this.dataLayerGroup_.getLayers().getArray(), this.layers, true, this.scope_, () => true);

  // watch any change on layers array to refresh the map
  this.scope_.$watchCollection(
    () => this.layers,
    () => {
      this.map.render();

      // If the layer being swiped is removed, unset it
      if (this.gmfLayerBeingSwipe.layer && !this.layers.includes(this.gmfLayerBeingSwipe.layer)) {
        this.gmfLayerBeingSwipe.layer = null;
      }
    }
  );

  // watch any change on dimensions object to refresh the layers
  this.scope_.$watchCollection(
    () => {
      if (this.gmfTreeManager_.rootCtrl) {
        return this.dimensions;
      }
    },
    (dimensions) => {
      if (dimensions) {
        if (!this.gmfTreeManager_.rootCtrl) {
          throw new Error('Missing gmfTreeManager_.rootCtrl');
        }
        this.updateDimensions_(this.gmfTreeManager_.rootCtrl);
      }
    }
  );
};

/**
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl Layer tree controller.
 */
Controller.prototype.updateDimensions_ = function (treeCtrl) {
  treeCtrl.traverseDepthFirst((ctrl) => {
    if (ctrl.node.dimensions) {
      const layer = ctrl.layer;
      if (!(layer instanceof olLayerLayer)) {
        throw new Error('Wrong feature type');
      }
      this.updateLayerDimensions_(
        /** @type {olLayerLayer<import('ol/source/Source').default>} */ (layer),
        /** @type {import('gmf/themes').GmfGroup|import('gmf/themes').GmfLayer} */ (ctrl.node)
      );
      return LayertreeVisitorDecision.DESCEND;
    }
  });
};

/**
 * @param {olLayerLayer<import('ol/source/Source').default>} layer Layer to update.
 * @param {import('gmf/themes').GmfGroup|import('gmf/themes').GmfLayer} node Layer tree node.
 */
Controller.prototype.updateLayerDimensions_ = function (layer, node) {
  if (this.dimensions && node.dimensions) {
    /** @type {Object<string, ?string>} */
    const dimensions = {};
    for (const key in node.dimensions) {
      if (node.dimensions[key] === null) {
        const value = this.dimensions[key];
        if (value !== undefined) {
          dimensions[key] = value;
        }
      } else {
        dimensions[key] = node.dimensions[key];
      }
    }
    if (!isEmpty(dimensions)) {
      const source = layer.getSource();
      if (source instanceof olSourceWMTS) {
        source.updateDimensions(dimensions);
      } else if (source instanceof olSourceTileWMS || source instanceof olSourceImageWMS) {
        source.updateParams(dimensions);
      } else {
        // the source is not ready yet
        layer.once(/** @type {import('ol/Observable').EventTypes} */ ('change:source'), () => {
          if (!(layer instanceof olLayerLayer)) {
            throw new Error('Wrong feature type');
          }
          this.updateLayerDimensions_(layer, node);
        });
      }
    }
  }
};

/**
 * Use the gmfSyncLayertreeMap_ to create and get layer corresponding to this
 * treeCtrl. The layer will be inserted into the map. The layer can be null
 * if the treeCtrl is based on a node inside a mixed node. It this case, the
 * layer will be in the first parent declared as a mixed node.
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl tree controller of the
 *    node.
 * @returns {import('ol/layer/Base').default|import('ol/layer/Group').default|null} The OpenLayers
 *    layer or group for the node.
 */
Controller.prototype.getLayer = function (treeCtrl) {
  if (!this.dataLayerGroup_) {
    throw new Error('Missing dataLayerGroup');
  }
  let opt_position;
  if (treeCtrl.parent.isRoot) {
    this.gmfTreeManager_.rootCtrl = treeCtrl.parent;
    // Precise the index to add first level groups.
    opt_position =
      this.gmfTreeManager_.root.children.length - this.gmfTreeManager_.numberOfGroupsToAddInThisDigestLoop ||
      0;
  }

  const layer = this.gmfSyncLayertreeMap_.createLayer(treeCtrl, this.map, this.dataLayerGroup_, opt_position);

  if (layer instanceof olLayerLayer) {
    const node = /** @type {import('gmf/themes').GmfGroup|import('gmf/themes').GmfLayer} */ (treeCtrl.node);
    this.updateLayerDimensions_(layer, node);
  }

  return layer;
};

/**
 * Remove layer from this component's layergroup (and then, from the map) on
 * a ngeo layertree destroy event.
 *
 * @param {angular.IScope} scope treeCtrl scope.
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl ngeo layertree controller,
 *    from the current node.
 */
Controller.prototype.listeners = function (scope, treeCtrl) {
  if (!this.dataLayerGroup_) {
    throw new Error('Missing dataLayerGroup');
  }
  const dataLayerGroup = this.dataLayerGroup_;
  scope.$on('$destroy', () => {
    if (treeCtrl.layer) {
      // Remove the layer from the map.
      dataLayerGroup.getLayers().remove(treeCtrl.layer);
    }
  });
};

/**
 * Toggle the state of treeCtrl's node.
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl ngeo layertree controller,
 *    from the current node.
 */
Controller.prototype.toggleActive = function (treeCtrl) {
  const state = treeCtrl.getState();
  if (treeCtrl.node.metadata && treeCtrl.node.metadata.exclusiveGroup) {
    // If the treeCtrl has 'exclusiveGroup' enabled, then
    // 'intermediate' is considered as 'on'
    treeCtrl.setState(state === 'off' ? 'on' : 'off');
  } else {
    treeCtrl.setState(state === 'on' ? 'off' : 'on');
  }
};

/**
 * Return the current state of the given treeCtrl's node.
 * Return a class name that match with the current node activation state.
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl ngeo layertree controller,
 *    from the current node.
 * @returns {string} 'on' or 'off' or 'indeterminate'.
 */
Controller.prototype.getNodeState = function (treeCtrl) {
  return treeCtrl.getState();
};

/**
 * Update the `timeRangeValue` property of the data source bound to the
 * given tree controller and the state of the permalink using the given time.
 *
 * LayertreeController.prototype.updateTimeData - description
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} layertreeCtrl ngeo layertree controller
 * @param {import('ngeo/datasource/OGC').TimeRange} time The start
 * and optionally the end datetime (for time range selection) selected by user
 */
Controller.prototype.updateTimeData = function (layertreeCtrl, time) {
  this.updateWMSTimeLayerState(layertreeCtrl, time);
  this.gmfPermalink_.refreshLayerTime(layertreeCtrl, time);
};

/**
 * Update the `timeRangeValue` property of the data source bound to the
 * given tree controller using the given time. If the tree controller has
 * no data source, it means that it has children and they might have
 * data sources.
 *
 * The setting of the TIME parameter on the layer occurs in the
 * `gmf.datasource.Manager` service
 *
 * LayertreeController.prototype.updateWMSTimeLayerState - description
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} layertreeCtrl ngeo layertree controller
 * @param {import('ngeo/datasource/OGC').TimeRange} time The start
 * and optionally the end datetime (for time range selection) selected by user
 */
Controller.prototype.updateWMSTimeLayerState = function (layertreeCtrl, time) {
  if (!time) {
    return;
  }
  const dataSource = /** @type {?import("ngeo/datasource/OGC").default} */ (layertreeCtrl.getDataSource());
  if (dataSource) {
    if (!(dataSource instanceof gmfDatasourceOGC)) {
      throw new Error('Wrong dataSource type');
    }
    dataSource.timeRangeValue = time;
  } else if (layertreeCtrl.children) {
    for (let i = 0, ii = layertreeCtrl.children.length; i < ii; i++) {
      this.updateWMSTimeLayerState(layertreeCtrl.children[i], time);
    }
  }
};

/**
 * Get the icon image URL for the given treeCtrl's layer. It can only return a
 * string for internal WMS layers without multiple childlayers in the node.
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl ngeo layertree controller,
 *    from the current node.
 * @returns {string|undefined} The icon legend URL or undefined.
 */
Controller.prototype.getLegendIconURL = function (treeCtrl) {
  const iconUrl = treeCtrl.node.metadata.iconUrl;

  if (iconUrl !== undefined) {
    return iconUrl;
  }

  const gmfGroup = /** @type {import('gmf/themes').GmfGroup} */ (treeCtrl.node);
  if (gmfGroup.children !== undefined) {
    return undefined;
  }

  const gmfLayer = /** @type {import('gmf/themes').GmfLayer} */ (treeCtrl.node);
  if (gmfLayer.type !== 'WMS') {
    return undefined;
  }

  const gmfLayerWMS = /** @type {import('gmf/themes').GmfLayerWMS} */ (/** @type {any} */ (gmfLayer));

  const legendRule = gmfLayerWMS.metadata.legendRule;

  if (legendRule === undefined) {
    return undefined;
  }

  //In case of multiple layers for a gmfLayerWMS, always take the first layer
  //name to get the icon
  const layerName = gmfLayerWMS.layers.split(',')[0];
  const gmfOgcServer = this.gmfTreeManager_.getOgcServer(treeCtrl);
  return this.layerHelper_.getWMSLegendURL(gmfOgcServer.url, layerName, undefined, legendRule, 20, 20);
};

/**
 * Get the legends object (<LayerName: url> for each layer) for the given treeCtrl.
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl ngeo layertree controller,
 *    from the current node.
 * @returns {?Object<string, string>} A <layerName: url> object that provides a
 *     layer for each layer.
 */
Controller.prototype.getLegendsObject = function (treeCtrl) {
  /** @type {Object<string, string>} */
  const legendsObject = {};
  if (/** @type {import('gmf/themes').GmfGroup} */ (treeCtrl.node).children !== undefined) {
    return null;
  }

  const gmfLayer = /** @type {import('gmf/themes').GmfLayer} */ (treeCtrl.node);
  const gmfLayerDefaultName = gmfLayer.name;
  if (gmfLayer.metadata.legendImage) {
    legendsObject[gmfLayerDefaultName] = gmfLayer.metadata.legendImage;
    return legendsObject;
  }

  const layer = treeCtrl.layer;
  if (gmfLayer.type === 'WMTS') {
    if (!(layer instanceof olLayerTile)) {
      throw new Error('Wrong layer');
    }
    const wmtsLegendURL = this.layerHelper_.getWMTSLegendURL(layer);
    if (wmtsLegendURL !== undefined) {
      legendsObject[gmfLayerDefaultName] = wmtsLegendURL;
    }
    return wmtsLegendURL ? legendsObject : null;
  } else {
    const gmfLayerWMS = /** @type {import('gmf/themes').GmfLayerWMS} */ (/** @type {any} */ (gmfLayer));
    const layersNames = gmfLayerWMS.layers;
    const gmfOgcServer = this.gmfTreeManager_.getOgcServer(treeCtrl);
    const scale = this.getScale_();
    // QGIS can handle multiple layers natively. Use Multiple URLs for other map
    // servers
    let layerNamesList;
    if (gmfOgcServer.type === ServerType.QGISSERVER) {
      layerNamesList = [layersNames];
    } else {
      layerNamesList = layersNames.split(',');
    }
    layerNamesList.forEach((layerName) => {
      const wmtsLegendURL = this.layerHelper_.getWMSLegendURL(gmfOgcServer.url, layerName, scale);
      if (!wmtsLegendURL) {
        throw new Error('Missing wmtsLegendURL');
      }
      legendsObject[layerName] = wmtsLegendURL;
    });
    return legendsObject;
  }
};

/**
 * Get the number of legends object for this layertree controller.
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl ngeo layertree controller,
 *    from the current node.
 * @returns {number} The number of Legends object.
 */
Controller.prototype.getNumberOfLegendsObject = function (treeCtrl) {
  const legendsObject = this.getLegendsObject(treeCtrl);
  return legendsObject ? Object.keys(legendsObject).length : 0;
};

/**
 * Return the current scale of the map.
 *
 * @returns {number} Scale.
 */
Controller.prototype.getScale_ = function () {
  const view = this.map.getView();
  const resolution = view.getResolution();
  if (resolution === undefined) {
    throw new Error('Missing resolution');
  }
  const mpu = view.getProjection().getMetersPerUnit();
  if (!mpu) {
    throw new Error('Missing mpu');
  }
  const dpi = 25.4 / 0.28;
  return resolution * mpu * 39.37 * dpi;
};

/**
 * Is snapping activated for this LayertreeController
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl ngeo layertree controller.
 * @returns {boolean} True if snapping is activated for that layer.
 */
Controller.prototype.isSnappingActivated = function (treeCtrl) {
  if (treeCtrl.properties.snapping !== undefined) {
    if (typeof treeCtrl.properties.snapping !== 'boolean') {
      throw new Error('Wrong snappingActive type');
    }
    return treeCtrl.properties.snapping;
  }
  // Default to node.metadata.activated
  const node = /** @type {import('gmf/themes').GmfLayer} */ (treeCtrl.node);
  const config = getSnappingConfig(node);
  return config !== null && config.activated;
};

/**
 * Toggle snapping for this LayertreeController.
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl ngeo layertree controller.
 */
Controller.prototype.toggleSnapping = function (treeCtrl) {
  treeCtrl.properties.snapping = !this.isSnappingActivated(treeCtrl);
};

/**
 * Opens a openIframePopup with the content of the metadata url of a node.
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl ngeo layertree controller,
 *    from the current node.
 */
Controller.prototype.displayMetadata = function (treeCtrl) {
  const node = treeCtrl.node;
  const metadataURL = node.metadata.metadataUrl;
  if (metadataURL !== undefined) {
    // FIXME layertree should not rely on a window function.
    // @ts-ignore: gmfx is available, see upper
    const gmfx = window.gmfx;
    if (gmfx.openIframePopup) {
      gmfx.openIframePopup(metadataURL, node.name, undefined, undefined, false);
    }
  }
};

/**
 * Update the layers order in the map and the treeCtrl in the treeManager after
 * a reorder of the first-level groups. Then update the permalink.
 */
Controller.prototype.afterReorder = function () {
  if (!this.gmfTreeManager_.rootCtrl) {
    throw new Error('Missing gmfTreeManager_.rootCtrl');
  }
  const gmfRootGroup = /** @type {import('gmf/themes').GmfGroup} */ (this.gmfTreeManager_.rootCtrl.node);
  const groupNodes = gmfRootGroup.children;
  const currentTreeCtrls = this.gmfTreeManager_.rootCtrl.children;
  /** @type {import('ngeo/layertree/Controller').LayertreeController[]} */
  const treeCtrls = [];

  // Get order of first-level groups for treectrl and layers;
  groupNodes.forEach((node) => {
    currentTreeCtrls.some((treeCtrl) => {
      if (treeCtrl.node === node) {
        treeCtrls.push(treeCtrl);
        // TODO - validate this, used to be a plain `return`, which is
        // not truthy and doesn't break the `some`, but I suspect this
        // is not the wanted behaviour...
        return false;
      }
      return false;
    });
  });

  // Update gmfTreeManager rootctrl children order
  this.gmfTreeManager_.rootCtrl.children = treeCtrls;

  // Update map 'data' groupe layers order
  this.layers.length = 0;
  this.gmfTreeManager_.rootCtrl.children.forEach((child) => {
    if (!(child.layer instanceof LayerBase)) {
      throw new Error('Wrong child.layer');
    }
    this.layers.push(child.layer);
  });

  // Update the permalink order
  this.gmfPermalink_.refreshFirstLevelGroups();
};

/**
 * @param {import('gmf/themes').GmfGroup} node Layer tree node to tag popup identifier.
 */
Controller.prototype.tagPopup = function (node) {
  const uid = getUid(node);

  // Find the random id associated with the new popup being opened.
  const popupId = $(`#popup-id-${uid}`).attr('aria-describedby');
  if (!node.popupId) {
    node.popupId = popupId;
  } else {
    delete node.popupId;
  }
};

/**
 * @param {import('gmf/themes').GmfGroup} node Layer tree node to remove.
 */
Controller.prototype.removeNode = function (node) {
  this.gmfTreeManager_.parseTreeNodes(node);
  this.gmfTreeManager_.removeGroup(node);
};

Controller.prototype.removeAllNodes = function () {
  this.gmfTreeManager_.parseTreeNodes(this.root);
  this.gmfTreeManager_.removeAll();
  this.gmfExternalDataSourcesManager.removeAll();
};

/**
 * @returns {number} first level node count.
 */
Controller.prototype.nodesCount = function () {
  return this.gmfTreeManager_.root.children.length;
};

/**
 * Return 'out-of-resolution' if the current resolution of the map is out of
 * the min/max resolution in the node.
 *
 * @param {import('gmf/themes').GmfLayerWMS} gmfLayer the GeoMapFish Layer. WMTS layer is
 *     also allowed (the type is defined as GmfLayerWMS only to avoid some
 *     useless tests to know if a minResolutionHint property can exist
 *     on the node).
 * @returns {string|undefined} 'out-of-resolution' or undefined.
 */
Controller.prototype.getResolutionStyle = function (gmfLayer) {
  const resolution = this.map.getView().getResolution();
  if (resolution === undefined) {
    throw new Error('Missing resolution');
  }
  const minResolution = getNodeMinResolution(gmfLayer);
  if (minResolution !== undefined && resolution < minResolution) {
    return 'out-of-resolution';
  }
  const maxResolution = getNodeMaxResolution(gmfLayer);
  if (maxResolution !== undefined && resolution > maxResolution) {
    return 'out-of-resolution';
  }
  return undefined;
};

/**
 * Set the resolution of the map with the max or min resolution of the node.
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl ngeo layertree controller,
 *    from the current node.
 */
Controller.prototype.zoomToResolution = function (treeCtrl) {
  const gmfLayer = /** @type {import('gmf/themes').GmfLayerWMS} */ (/** @type {any} */ (treeCtrl.node));
  const view = this.map.getView();
  const resolution = view.getResolution();
  if (resolution === undefined) {
    throw new Error('Missing resolution');
  }
  const minResolution = getNodeMinResolution(gmfLayer);
  const constrainResolution = view.getConstraints().resolution;
  const size = this.map.getSize();
  if (size === undefined) {
    throw new Error('Missing size');
  }
  if (minResolution !== undefined && resolution < minResolution) {
    view.setResolution(constrainResolution(minResolution, 1, size, undefined));
  } else {
    const maxResolution = getNodeMaxResolution(gmfLayer);
    if (maxResolution !== undefined && resolution > maxResolution) {
      view.setResolution(constrainResolution(maxResolution, -1, size, undefined));
    }
  }
};

/**
 * Set the swipe option on the map.
 *    from the current node.
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl Ngeo tree controller.
 * @type {import('gmf/datasource/LayerBeingSwipe').LayerBeingSwipe}
 */
Controller.prototype.toggleSwipeLayer = function (treeCtrl) {
  if (!treeCtrl.layer) {
    console.error('No layer');
  } else if (this.gmfLayerBeingSwipe.layer === treeCtrl.layer) {
    this.gmfLayerBeingSwipe.layer = null;
    this.map.render();
  } else {
    this.gmfLayerBeingSwipe.layer = null;
    this.$timeout_(() => {
      this.gmfLayerBeingSwipe.layer = treeCtrl.layer;
      this.map.render();
    }, 0);
  }
};

/**
 * Toggle the legend for a node
 *
 * @param {string} legendNodeId The DOM node legend id to toggle
 */
Controller.prototype.toggleNodeLegend = function (legendNodeId) {
  const div = document.querySelector(legendNodeId);
  if (div) {
    div.classList.toggle('show');
  }
};

/**
 * Toggle the menu for a node
 *
 * @param {string} menuNodeId The DOM node menu id to toggle
 */
Controller.prototype.toggleNodeMenu = function (menuNodeId) {
  const div = document.querySelector(menuNodeId);
  if (div) {
    div.classList.toggle('d-none');
  }
};

/**
 * @param {import('gmf/datasource/OGC').default} ds Data source to filter.
 */
Controller.prototype.toggleFiltrableDataSource = function (ds) {
  // Set it first to null to be sure to trigger the changes on this watched property.
  this.gmfDataSourceBeingFiltered.dataSource = null;
  this.$timeout_(() => {
    this.gmfDataSourceBeingFiltered.dataSource = ds;
  }, 0);
};

/**
 * @param {string} legendNodeId The DOM node legend id
 * @returns {boolean} Whenever the legend is currently displayed.
 */
Controller.prototype.isNodeLegendVisible = function (legendNodeId) {
  return $(legendNodeId).is(':visible');
};

/**
 * Determines whether the layer tree controller supports being customized.
 * For example, having its layer opacity changed, displaying its legend, etc.
 *
 * If any requirement is met, then the treeCtrl is considered supporting
 * "customization", regardless of what it actually is.
 *
 * The requirements are:
 *
 * - must not be the root controller, any of the following:
 *   - it supports legend
 *   - it supports having the layer opacity being changed
 *
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl Ngeo tree controller.
 * @returns {boolean} Whether the layer tree controller supports being
 *     "customized" or not.
 */
Controller.prototype.supportsCustomization = function (treeCtrl) {
  return !treeCtrl.isRoot && (this.supportsLegend(treeCtrl) || this.supportsOpacityChange(treeCtrl));
};

/**
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl Ngeo tree controller.
 * @returns {boolean} Whether the layer tree controller supports having a
 *     legend being shown.
 */
Controller.prototype.supportsLegend = function (treeCtrl) {
  const node = /** @type {import('gmf/themes').GmfGroup} */ (treeCtrl.node);
  return !!node.metadata && !!node.metadata.legend && !!this.getLegendsObject(treeCtrl);
};

/**
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl Ngeo tree controller.
 * @returns {boolean} Whether the layer tree controller supports having its
 *     layer opacity being changed or not.
 */
Controller.prototype.supportsOpacityChange = function (treeCtrl) {
  const node = /** @type {import('gmf/themes').GmfGroup} */ (treeCtrl.node);
  const parentNode = treeCtrl.parent
    ? /** @type {import('gmf/themes').GmfGroup} */ (treeCtrl.parent.node)
    : undefined;
  return (
    !!treeCtrl.layer &&
    ((treeCtrl.depth === 1 && !node.mixed) ||
      (treeCtrl.depth > 1 && parentNode.mixed && (!node.children || (node.children && !node.mixed))))
  );
};

/**
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl Ngeo tree controller.
 * @returns {boolean} Whether the layer tree controller has a filtrable datasource or not.
 */
Controller.prototype.isFiltrable = function (treeCtrl) {
  const datasource = /** @type {import('ngeo/datasource/OGC').OGC} */ (treeCtrl.getDataSource());
  return datasource ? datasource.filtrable : false;
};

/**
 * @param {import('ngeo/layertree/Controller').LayertreeController} treeCtrl Ngeo tree controller.
 * @returns {import('ngeo/layertree/Controller').LayertreeController} first parent that supports
 *     opacity change or is filtrable. Or null if there is any parent with layer functions.
 */
Controller.prototype.getFirstParentWithLayerFunctions = function (treeCtrl) {
  const parentTreeCtrl = /** @type {import('ngeo/layertree/Controller').LayertreeController} */ (
    treeCtrl.parent
  );
  if (!parentTreeCtrl) {
    return null;
  }
  if (this.supportsOpacityChange(parentTreeCtrl) || this.isFiltrable(parentTreeCtrl)) {
    return parentTreeCtrl;
  }
  return this.getFirstParentWithLayerFunctions(parentTreeCtrl);
};

myModule.controller('GmfLayertreeController', Controller);

export default myModule;
