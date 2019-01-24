import angular from 'angular';
import {DATALAYERGROUP_NAME} from 'gmf/index.js';
import gmfDatasourceDataSourceBeingFiltered from 'gmf/datasource/DataSourceBeingFiltered.js';
import gmfDatasourceExternalDataSourcesManager from 'gmf/datasource/ExternalDataSourcesManager.js';
import gmfPermalinkPermalink from 'gmf/permalink/Permalink.js';

import gmfLayertreeDatasourceGroupTreeComponent from 'gmf/layertree/datasourceGroupTreeComponent.js';

import gmfLayertreeSyncLayertreeMap from 'gmf/layertree/SyncLayertreeMap.js';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';
import gmfThemeThemes, {getNodeMinResolution, getNodeMaxResolution} from 'gmf/theme/Themes.js';
import ngeoDatasourceOGC, {ServerType} from 'ngeo/datasource/OGC.js';

import ngeoLayertreeComponent from 'ngeo/layertree/component.js';

import ngeoLayertreeController from 'ngeo/layertree/Controller.js';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper.js';
import ngeoMiscSyncArrays from 'ngeo/misc/syncArrays.js';
import ngeoMiscWMSTime from 'ngeo/misc/WMSTime.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerLayer from 'ol/layer/Layer.js';
import * as olObj from 'ol/obj.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceTileWMS from 'ol/source/TileWMS.js';
import olSourceWMTS from 'ol/source/WMTS.js';

import 'bootstrap/js/src/collapse.js';


/**
 * Static function to create a popup with an iframe.
 * @typedef {Function} openIframePopup
 * @param {string} url an url.
 * @param {string} title (text).
 * @param {string=} opt_width CSS width.
 * @param {string=} opt_height CSS height.
 * @param {boolean=} opt_apply If true, trigger the Angular digest loop. Default to true.
 */


/**
 * @type {!angular.IModule}
 */
const module = angular.module('gmfLayertreeComponent', [
  gmfDatasourceDataSourceBeingFiltered.name,
  gmfDatasourceExternalDataSourcesManager.name,
  gmfPermalinkPermalink.name,
  gmfLayertreeDatasourceGroupTreeComponent.name,
  gmfLayertreeSyncLayertreeMap.name,
  gmfLayertreeTreeManager.name,
  gmfThemeThemes.name,
  ngeoLayertreeComponent.name,
  ngeoLayertreeController.name,
  ngeoMapLayerHelper.name,
  ngeoMiscWMSTime.name,
]);


// Overrides the path to the layertree template (used by each node, except
// the root node that path is defined by the gmfLayertreeTemplate value.
module.value('ngeoLayertreeTemplateUrl',
  /**
   * @param {JQuery} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @return {string} Template URL.
   */
  (element, attrs) => 'gmf/layertree');

module.run(/* @ngInject */ ($templateCache) => {
  // @ts-ignore: webpack
  $templateCache.put('gmf/layertree', require('./component.html'));
});


module.value('gmfLayertreeTemplate',
  /**
   * @param {!JQuery} $element Element.
   * @param {!angular.IAttributes} $attrs Attributes.
   * @return {string} Template.
   */
  ($element, $attrs) => {
    const subTemplateUrl = 'gmf/layertree';
    return '<div ngeo-layertree="gmfLayertreeCtrl.root" ' +
          'ngeo-layertree-map="gmfLayertreeCtrl.map" ' +
          'ngeo-layertree-nodelayer="gmfLayertreeCtrl.getLayer(treeCtrl)" ' +
          'ngeo-layertree-listeners="gmfLayertreeCtrl.listeners(treeScope, treeCtrl)" ' +
          `ngeo-layertree-templateurl="${subTemplateUrl}">` +
          '</div>';
  }
);


/**
 * @param {!JQuery} $element Element.
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!JQuery, !angular.IAttributes): string} gmfLayertreeTemplate Template function.
 * @return {string} Template.
 * @ngInject
 */
function gmfLayertreeTemplate($element, $attrs, gmfLayertreeTemplate) {
  return gmfLayertreeTemplate($element, $attrs);
}


/**
 * This component creates a layertree based on the c2cgeoportal JSON themes
 * source and a {@link import("ngeo/layertreeComponent.js").default}. The controller used by this
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
 * Used UI metadata:
 *
 *  * isChecked: if 'false' the layer visibility will be set to false.
 *  * iconUrl: layer icon full URL.
 *  * legendRule: WMS rule used to get a layer icon.
 *  * isLegendExpanded: if 'true' the legend is expanded by default.
 *  * metadataUrl: Display a popup with the content of the given URL if
 *    possible also open a new window.
 *
 * @htmlAttribute {import("ol/Map.js").default} gmf-layertree-map The map.
 * @htmlAttribute {Object<string, string>|undefined} gmf-layertree-dimensions Global dimensions object.
 * @htmlAttribute {boolean|undefined} gmf-layertree-openlinksinnewwindow if true, open
 *     metadataURLs in a new window. Otherwise open them in a popup.
 *
 * @ngdoc component
 * @ngname gmfLayertreeComponent
 */
const component = {
  controller: 'GmfLayertreeController as gmfLayertreeCtrl',
  bindings: {
    'map': '=gmfLayertreeMap',
    'dimensions': '=?gmfLayertreeDimensions',
    'openLinksInNewWindow': '<?gmfLayertreeOpenlinksinnewwindow',
  },
  template: gmfLayertreeTemplate
};

module.component('gmfLayertree', component);


/**
 * @param {JQuery} $element Element.
 * @param {!angular.IScope} $scope Angular scope.
 * @param {!import("ngeo/map/LayerHelper.js").default} ngeoLayerHelper Ngeo Layer Helper.
 * @param {DataSourceBeingFiltered} gmfDataSourceBeingFiltered
 *     The Gmf value service that determines the data source currently being
 *     filtered.
 * @param {!import("gmf/datasource/ExternalDataSourcesManager.js").default}
 *     gmfExternalDataSourcesManager The Gmf external data sources manager
 *     service. Used here to fetch the external WMS groups.
 * @param {!import("gmf/permalink/Permalink.js").default} gmfPermalink The gmf permalink service.
 * @param {!import("gmf/layertree/TreeManager.js").default} gmfTreeManager gmf Tree Manager service.
 * @param {!import("gmf/layertree/SyncLayertreeMap.js").default} gmfSyncLayertreeMap gmfSyncLayertreeMap service.
 * @param {!import("ngeo/misc/WMSTime.js").default} ngeoWMSTime wms time service.
 * @param {!import("gmf/theme/Themes.js").default} gmfThemes The gmf Themes service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname gmfLayertreeController
 */
function Controller($element, $scope, ngeoLayerHelper, gmfDataSourceBeingFiltered,
  gmfExternalDataSourcesManager, gmfPermalink, gmfTreeManager, gmfSyncLayertreeMap, ngeoWMSTime, gmfThemes) {

  /**
   * @type {?import("ol/Map.js").default}
   * @export
   */
  this.map;

  /**
   * @type {?Object<string, string>}
   * @export
   */
  this.dimensions;

  /**
   * @type {!angular.IScope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {!import("ngeo/map/LayerHelper.js").default}
   * @private
   */
  this.layerHelper_ = ngeoLayerHelper;

  /**
   * @type {DataSourceBeingFiltered}
   * @export
   */
  this.gmfDataSourceBeingFiltered = gmfDataSourceBeingFiltered;

  /**
   * @type {!import("gmf/datasource/ExternalDataSourcesManager.js").default}
   * @export
   */
  this.gmfExternalDataSourcesManager = gmfExternalDataSourcesManager;

  /**
   * @type {!import("gmf/permalink/Permalink.js").default}
   * @private
   */
  this.gmfPermalink_ = gmfPermalink;

  /**
   * @type {!import("gmf/layertree/TreeManager.js").default}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;

  const root = gmfTreeManager.root;
  console.assert(root);

  /**
   * @type {!import(gmf/themes.js).GmfRootNode}
   * @export
   */
  this.root = root;

  /**
   * @type {!import("gmf/layertree/SyncLayertreeMap.js").default}
   * @private
   */
  this.gmfSyncLayertreeMap_ = gmfSyncLayertreeMap;

  /**
   * @type {!import("ngeo/misc/WMSTime.js").default}
   * @private
   */
  this.ngeoWMSTime_ = ngeoWMSTime;

  /**
   * @type {!Object.<number, !Array.<string>>}
   * @private
   */
  this.groupNodeStates_ = {};

  /**
   * @type {boolean|undefined}
   * @export
   */
  this.openLinksInNewWindow;

  /**
   * @type {?import("ol/layer/Group.js").default}
   * @private
   */
  this.dataLayerGroup_ = null;

  /**
   * @type {!Array.<!import("ol/layer/Base.js").default>}
   * @export
   */
  this.layers = [];

  /**
   * @type {!import("gmf/theme/Themes.js").default}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  // enter digest cycle on node collapse
  $element.on('shown.bs.collapse', () => {
    this.scope_.$apply();
  });
}


/**
 * Init the controller,
 */
Controller.prototype.$onInit = function() {
  this.openLinksInNewWindow = this.openLinksInNewWindow === true;
  this.dataLayerGroup_ = this.layerHelper_.getGroupFromMap(this.map, DATALAYERGROUP_NAME);

  ngeoMiscSyncArrays(this.dataLayerGroup_.getLayers().getArray(), this.layers, true, this.scope_, () => true);

  // watch any change on layers array to refresh the map
  this.scope_.$watchCollection(() => this.layers,
    () => {
      this.map.render();
    });

  // watch any change on dimensions object to refresh the layers
  this.scope_.$watchCollection(() => {
    if (this.gmfTreeManager_.rootCtrl) {
      return this.dimensions;
    }
  }, (dimensions) => {
    if (dimensions) {
      this.updateDimensions_(this.gmfTreeManager_.rootCtrl);
    }
  });
};


/**
 * @param {import("ngeo/layertree/Controller.js").default} treeCtrl Layer tree controller.
 * @private
 */
Controller.prototype.updateDimensions_ = function(treeCtrl) {
  treeCtrl.traverseDepthFirst((ctrl) => {
    if (ctrl.node.dimensions) {
      const layer = ctrl.layer;
      console.assert(layer instanceof olLayerLayer);
      this.updateLayerDimensions_(layer, /** @type import(gmf/themes.js).GmfGroup|import(gmf/themes.js).GmfLayer */ (ctrl.node));
    }
  });
};


/**
 * @param {import("ol/layer/Layer.js").default} layer Layer to update.
 * @param {import(gmf/themes.js).GmfGroup|import(gmf/themes.js).GmfLayer} node Layer tree node.
 * @private
 */
Controller.prototype.updateLayerDimensions_ = function(layer, node) {
  if (this.dimensions && node.dimensions) {
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
    if (!olObj.isEmpty(dimensions)) {
      const source = layer.getSource();
      if (source instanceof olSourceWMTS) {
        source.updateDimensions(dimensions);
      } else if (source instanceof olSourceTileWMS || source instanceof olSourceImageWMS) {
        source.updateParams(dimensions);
      } else {
        // the source is not ready yet
        layer.once('change:source', () => {
          console.assert(layer instanceof olLayerLayer);
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
 * @param {import("ngeo/layertree/Controller.js").default} treeCtrl tree controller of the node
 * @return {import("ol/layer/Base.js").default|import("ol/layer/Group.js").default|null} The OpenLayers layer or group
 *     for the node.
 * @export
 */
Controller.prototype.getLayer = function(treeCtrl) {
  let opt_position;
  if (treeCtrl.parent.isRoot) {
    this.gmfTreeManager_.rootCtrl = treeCtrl.parent;
    // Precise the index to add first level groups.
    opt_position = this.gmfTreeManager_.root.children.length -
        this.gmfTreeManager_.numberOfGroupsToAddInThisDigestLoop || 0;
  }

  const layer = this.gmfSyncLayertreeMap_.createLayer(treeCtrl, this.map,
    this.dataLayerGroup_, opt_position);

  if (layer instanceof olLayerLayer) {
    const node = /** @type {import(gmf/themes.js).GmfGroup|import(gmf/themes.js).GmfLayer} */ (treeCtrl.node);
    this.updateLayerDimensions_(layer, node);
  }

  return layer;
};


/**
 * Remove layer from this component's layergroup (and then, from the map) on
 * a ngeo layertree destroy event.
 * @param {angular.IScope} scope treeCtrl scope.
 * @param {import("ngeo/layertree/Controller.js").default} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @export
 */
Controller.prototype.listeners = function(scope, treeCtrl) {
  const dataLayerGroup = this.dataLayerGroup_;
  scope.$on('$destroy', () => {
    // Remove the layer from the map.
    dataLayerGroup.getLayers().remove(treeCtrl.layer);
  });
};

/**
 * Toggle the state of treeCtrl's node.
 * @param {import("ngeo/layertree/Controller.js").default} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @export
 */
Controller.prototype.toggleActive = function(treeCtrl) {
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
 * @param {import("ngeo/layertree/Controller.js").default} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {string} 'on' or 'off' or 'indeterminate'.
 * @export
 */
Controller.prototype.getNodeState = function(treeCtrl) {
  return treeCtrl.getState();
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
 * @param {import("ngeo/layertree/Controller.js").default} layertreeCtrl ngeo layertree controller
 * @param {{start : number, end : number}} time The start
 * and optionally the end datetime (for time range selection) selected by user
 * @export
 */
Controller.prototype.updateWMSTimeLayerState = function(layertreeCtrl, time) {
  if (!time) {
    return;
  }
  const dataSource = layertreeCtrl.getDataSource();
  if (dataSource) {
    console.assert(dataSource instanceof ngeoDatasourceOGC);
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
 * @param {import("ngeo/layertree/Controller.js").default} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {string|undefined} The icon legend URL or undefined.
 * @export
 */
Controller.prototype.getLegendIconURL = function(treeCtrl) {
  const iconUrl = treeCtrl.node.metadata.iconUrl;

  if (iconUrl !== undefined) {
    return iconUrl;
  }

  if (treeCtrl.node.children !== undefined) {
    return undefined;
  }

  const gmfLayer = /** @type {import(gmf/themes.js).GmfLayer} */ (treeCtrl.node);
  if (gmfLayer.type !== 'WMS') {
    return undefined;
  }

  const gmfLayerWMS = /** @type {import(gmf/themes.js).GmfLayerWMS} */ (gmfLayer);

  const legendRule = gmfLayerWMS.metadata.legendRule;

  if (legendRule === undefined) {
    return undefined;
  }

  //In case of multiple layers for a gmfLayerWMS, always take the first layer
  //name to get the icon
  const layerName = gmfLayerWMS.layers.split(',')[0];
  const gmfOgcServer = this.gmfTreeManager_.getOgcServer(treeCtrl);
  return this.layerHelper_.getWMSLegendURL(
    gmfOgcServer.url, layerName, undefined, legendRule, 20, 20
  );
};


/**
 * Get the legends object (<LayerName: url> for each layer) for the given treeCtrl.
 * @param {import("ngeo/layertree/Controller.js").default} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {Object.<string, string>} A <layerName: url> object that provides a
 *     layer for each layer.
 * @export
 */
Controller.prototype.getLegendsObject = function(treeCtrl) {
  const legendsObject = {};
  if (/** @type import(gmf/themes.js).GmfGroup */ (treeCtrl.node).children !== undefined) {
    return null;
  }

  const gmfLayer = /** @type {import(gmf/themes.js).GmfLayer} */ (treeCtrl.node);
  const gmfLayerDefaultName = gmfLayer.name;
  if (gmfLayer.metadata.legendImage) {
    legendsObject[gmfLayerDefaultName] = gmfLayer.metadata.legendImage;
    return legendsObject;
  }

  const layer = treeCtrl.layer;
  if (gmfLayer.type === 'WMTS') {
    console.assert(layer instanceof olLayerTile);
    const wmtsLegendURL = this.layerHelper_.getWMTSLegendURL(layer);
    legendsObject[gmfLayerDefaultName] = wmtsLegendURL;
    return wmtsLegendURL ? legendsObject : null;
  } else {
    const gmfLayerWMS = /** @type {import(gmf/themes.js).GmfLayerWMS} */ (gmfLayer);
    let layersNames = gmfLayerWMS.layers;
    const gmfOgcServer = this.gmfTreeManager_.getOgcServer(treeCtrl);
    const scale = this.getScale_();
    // QGIS can handle multiple layers natively. Use Multiple URLs for other map
    // servers
    if (gmfOgcServer.type === ServerType.QGISSERVER) {
      layersNames = [layersNames];
    } else {
      layersNames = layersNames.split(',');
    }
    layersNames.forEach((layerName) => {
      legendsObject[layerName] = this.layerHelper_.getWMSLegendURL(gmfOgcServer.url, layerName, scale);
    });
    return legendsObject;
  }
};


/**
 * Get the number of legends object for this layertree controller.
 * @param {import("ngeo/layertree/Controller.js").default} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {number} The number of Legends object.
 * @export
 */
Controller.prototype.getNumberOfLegendsObject = function(treeCtrl) {
  const legendsObject = this.getLegendsObject(treeCtrl);
  return legendsObject ? Object.keys(legendsObject).length : 0;
};


/**
 * Return the current scale of the map.
 * @return {number} Scale.
 * @private
 */
Controller.prototype.getScale_ = function() {
  const view = this.map.getView();
  const resolution = view.getResolution();
  const mpu = view.getProjection().getMetersPerUnit();
  const dpi = 25.4 / 0.28;
  return resolution * mpu * 39.37 * dpi;
};


/**
 * Opens a openIframePopup with the content of the metadata url of a node.
 * @param {import("ngeo/layertree/Controller.js").default} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @export
 */
Controller.prototype.displayMetadata = function(treeCtrl) {
  const node = treeCtrl.node;
  const metadataURL = node.metadata['metadataUrl'];
  if (metadataURL !== undefined) {
    // FIXME layertree should not rely on a window function.
    const gmfx = window.gmfx;
    if (gmfx.openIframePopup) {
      gmfx.openIframePopup(metadataURL, node.name, undefined, undefined, false);
    }
  }
};


/**
 * Update the layers order in the map and the treeCtrl in the treeManager after
 * a reorder of the first-level groups. Then update the permalink.
 * @export
 */
Controller.prototype.afterReorder = function() {
  const groupNodes = this.gmfTreeManager_.rootCtrl.node.children;
  const currentTreeCtrls = this.gmfTreeManager_.rootCtrl.children;
  const treeCtrls = [];

  // Get order of first-level groups for treectrl and layers;
  groupNodes.forEach((node) => {
    currentTreeCtrls.some((treeCtrl) => {
      if (treeCtrl.node === node) {
        treeCtrls.push(treeCtrl);
        return;
      }
    });
  });

  // Update gmfTreeManager rootctrl children order
  this.gmfTreeManager_.rootCtrl.children = treeCtrls;

  // Update map 'data' groupe layers order
  this.layers.length = 0;
  this.gmfTreeManager_.rootCtrl.children.forEach((child) => {
    this.layers.push(child.layer);
  });

  // Update the permalink order
  this.gmfPermalink_.refreshFirstLevelGroups();
};


/**
 * @param {import(gmf/themes.js).GmfGroup} node Layer tree node to remove.
 * @export
 */
Controller.prototype.removeNode = function(node) {
  this.gmfTreeManager_.removeGroup(node);
};


/**
 * @export
 */
Controller.prototype.removeAllNodes = function() {
  this.gmfTreeManager_.removeAll();
};


/**
 * @return {number} first level node count.
 * @export
 */
Controller.prototype.nodesCount = function() {
  return this.gmfTreeManager_.root.children.length;
};

/**
 * Return 'out-of-resolution' if the current resolution of the map is out of
 * the min/max resolution in the node.
 * @param {import(gmf/themes.js).GmfLayerWMS} gmfLayer the GeoMapFish Layer. WMTS layer is
 *     also allowed (the type is defined as GmfLayerWMS only to avoid some
 *     useless tests to know if a minResolutionHint property can exist
 *     on the node).
 * @return {string|undefined} 'out-of-resolution' or undefined.
 * @export
 */
Controller.prototype.getResolutionStyle = function(gmfLayer) {
  const resolution = this.map.getView().getResolution();
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
 * @param {import("ngeo/layertree/Controller.js").default} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @export
 */
Controller.prototype.zoomToResolution = function(treeCtrl) {
  const gmfLayer = /** @type {import(gmf/themes.js).GmfLayerWMS} */ (treeCtrl.node);
  const view = this.map.getView();
  const resolution = view.getResolution();
  const minResolution = gmfThemeThemes.getNodeMinResolution(gmfLayer);
  if (minResolution !== undefined && resolution < minResolution) {
    view.setResolution(view.constrainResolution(minResolution, 0, 1));
  } else {
    const maxResolution = getNodeMaxResolution(gmfLayer);
    if (maxResolution !== undefined && resolution > maxResolution) {
      view.setResolution(view.constrainResolution(maxResolution, 0, -1));
    }
  }
};


/**
 * Toggle the legend for a node
 * @param {string} legendNodeId The DOM node legend id to toggle
 * @export
 */
Controller.prototype.toggleNodeLegend = function(legendNodeId) {
  $(legendNodeId).toggle({
    toggle: true
  });
};


/**
 * @param {import("gmf/datasource/OGC.js").default} ds Data source to filter.
 * @export
 */
Controller.prototype.toggleFiltrableDataSource = function(ds) {
  this.gmfDataSourceBeingFiltered.dataSource = ds;
};


/**
 * @param {string} legendNodeId The DOM node legend id
 * @return {boolean} Whenever the legend is currently displayed.
 * @export
 */
Controller.prototype.isNodeLegendVisible = function(legendNodeId) {
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
 * @param {!import("ngeo/layertree/Controller.js").default} treeCtrl Ngeo tree controller.
 * @return {boolean} Whether the layer tree controller supports being
 *     "customized" or not.
 * @export
 */
Controller.prototype.supportsCustomization = function(treeCtrl) {
  return !treeCtrl.isRoot &&
    (
      this.supportsLegend(treeCtrl) ||
      this.supportsOpacityChange(treeCtrl)
    );
};


/**
 * @param {!import("ngeo/layertree/Controller.js").default} treeCtrl Ngeo tree controller.
 * @return {boolean} Whether the layer tree controller supports having a
 *     legend being shown.
 * @export
 */
Controller.prototype.supportsLegend = function(treeCtrl) {
  const node = /** @type {!import(gmf/themes.js).GmfGroup} */ (treeCtrl.node);
  return !!node.metadata &&
    !!node.metadata.legend &&
    !!this.getLegendsObject(treeCtrl);
};


/**
 * @param {!import("ngeo/layertree/Controller.js").default} treeCtrl Ngeo tree controller.
 * @return {boolean} Whether the layer tree controller supports having its
 *     layer opacity being changed or not.
 * @export
 */
Controller.prototype.supportsOpacityChange = function(treeCtrl) {
  const node = /** @type {!import(gmf/themes.js).GmfGroup} */ (treeCtrl.node);
  const parentNode = /** @type {!import(gmf/themes.js).GmfGroup} */ (treeCtrl.parent.node);
  return !!treeCtrl.layer &&
    (
      (
        treeCtrl.depth === 1 && !node.mixed
      ) ||
      (
        treeCtrl.depth > 1 && parentNode.mixed
      )
    );
};

module.controller('GmfLayertreeController', Controller);


export default module;
