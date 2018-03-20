goog.provide('gmf.layertree.component');

goog.require('gmf');
goog.require('gmf.datasource.DataSourceBeingFiltered');
goog.require('gmf.datasource.ExternalDataSourcesManager');
goog.require('gmf.permalink.Permalink');
/** @suppress {extraRequire} */
goog.require('gmf.layertree.datasourceGroupTreeComponent');
goog.require('gmf.layertree.SyncLayertreeMap');
goog.require('gmf.layertree.TreeManager');
goog.require('gmf.theme.Themes');
goog.require('goog.asserts');
goog.require('ngeo.datasource.OGC');
/** @suppress {extraRequire} */
goog.require('ngeo.layertree.component');
goog.require('ngeo.layertree.Controller');
goog.require('ngeo.map.LayerHelper');
goog.require('ngeo.misc.syncArrays');
goog.require('ngeo.misc.WMSTime');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Layer');
goog.require('ol.obj');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.TileWMS');
goog.require('ol.source.WMTS');

// webpack: import 'bootstrap/js/collapse.js';

/**
 * @type {!angular.Module}
 */
gmf.layertree.component = angular.module('gmfLayertreeComponent', [
  gmf.datasource.DataSourceBeingFiltered.module.name,
  gmf.datasource.ExternalDataSourcesManager.module.name,
  gmf.permalink.Permalink.module.name,
  gmf.layertree.datasourceGroupTreeComponent.name,
  gmf.layertree.SyncLayertreeMap.module.name,
  gmf.layertree.TreeManager.module.name,
  gmf.theme.Themes.module.name,
  ngeo.layertree.component.name,
  ngeo.layertree.Controller.module.name,
  ngeo.map.LayerHelper.module.name,
  ngeo.misc.WMSTime.module.name,
]);


// Overrides the path to the layertree template (used by each node, except
// the root node that path is defined by the gmfLayertreeTemplate value.
gmf.layertree.component.value('ngeoLayertreeTemplateUrl',
  /**
   * @param {angular.JQLite} element Element.
   * @param {angular.Attributes} attrs Attributes.
   * @return {string} Template URL.
   */
  (element, attrs) => `${gmf.baseModuleTemplateUrl}/layertree/component.html`); // nowebpack
// webpack: (element, attrs) => 'gmf/layertree');

// webpack: exports.run(/* @ngInject */ ($templateCache) => {
// webpack:   $templateCache.put('gmf/layertree', require('./component.html'));
// webpack: });


gmf.layertree.component.value('gmfLayertreeTemplate',
  /**
   * @param {!angular.JQLite} $element Element.
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} Template.
   */
  ($element, $attrs) => {
    const subTemplateUrl = `${gmf.baseModuleTemplateUrl}/layertree/component.html`; // nowebpack
    // webpack: const subTemplateUrl = 'gmf/layertree';
    return '<div ngeo-layertree="gmfLayertreeCtrl.root" ' +
          'ngeo-layertree-map="gmfLayertreeCtrl.map" ' +
          'ngeo-layertree-nodelayer="gmfLayertreeCtrl.getLayer(treeCtrl)" ' +
          'ngeo-layertree-listeners="gmfLayertreeCtrl.listeners(treeScope, treeCtrl)" ' +
          `ngeo-layertree-templateurl="${subTemplateUrl}">` +
          '</div>';
  }
);


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} gmfLayertreeTemplate Template function.
 * @return {string} Template.
 * @ngInject
 */
function gmfLayertreeTemplate($element, $attrs, gmfLayertreeTemplate) {
  return gmfLayertreeTemplate($element, $attrs);
}


/**
 * This component creates a layertree based on the c2cgeoportal JSON themes
 * source and a {@link ngeo.layertreeComponent}. The controller used by this
 * component defines some functions for each node that are created by a default
 * template. This default template can be overrided by setting the value
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
 * links will be opened in a popup (The window.gmfx.openIframePopup function must be available !)
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
 * @htmlAttribute {ol.Map} gmf-layertree-map The map.
 * @htmlAttribute {Object<string, string>|undefined} gmf-layertree-dimensions Global dimensions object.
 * @htmlAttribute {boolean|undefined} gmf-layertree-openlinksinnewwindow if true, open
 *     metadataURLs in a new window. Otherwise open them in a popup.
 *
 * @ngdoc component
 * @ngname gmfLayertreeComponent
 */
gmf.layertree.component.component_ = {
  controller: 'GmfLayertreeController as gmfLayertreeCtrl',
  bindings: {
    'map': '=gmfLayertreeMap',
    'dimensions': '=?gmfLayertreeDimensions',
    'openLinksInNewWindow': '<?gmfLayertreeOpenlinksinnewwindow',
  },
  template: gmfLayertreeTemplate
};

gmf.layertree.component.component('gmfLayertree', gmf.layertree.component.component_);


/**
 * @param {angular.JQLite} $element Element.
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!ngeo.map.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {gmfx.datasource.DataSourceBeingFiltered} gmfDataSourceBeingFiltered
 *     The Gmf value service that determines the data source currently being
 *     filtered.
 * @param {!gmf.datasource.ExternalDataSourcesManager}
 *     gmfExternalDataSourcesManager The Gmf external data sources manager
 *     service. Used here to fetch the external WMS groups.
 * @param {!gmf.permalink.Permalink} gmfPermalink The gmf permalink service.
 * @param {!gmf.layertree.TreeManager} gmfTreeManager gmf Tree Manager service.
 * @param {!gmf.layertree.SyncLayertreeMap} gmfSyncLayertreeMap gmfSyncLayertreeMap service.
 * @param {!ngeo.misc.WMSTime} ngeoWMSTime wms time service.
 * @param {!gmf.theme.Themes} gmfThemes The gmf Themes service.
 * @constructor
 * @private
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname gmfLayertreeController
 */
gmf.layertree.component.Controller_ = function($element, $scope, ngeoLayerHelper, gmfDataSourceBeingFiltered,
  gmfExternalDataSourcesManager, gmfPermalink, gmfTreeManager, gmfSyncLayertreeMap, ngeoWMSTime, gmfThemes) {

  /**
   * @type {?ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {?Object<string, string>}
   * @export
   */
  this.dimensions;

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {!ngeo.map.LayerHelper}
   * @private
   */
  this.layerHelper_ = ngeoLayerHelper;

  /**
   * @type {gmfx.datasource.DataSourceBeingFiltered}
   * @export
   */
  this.gmfDataSourceBeingFiltered = gmfDataSourceBeingFiltered;

  /**
   * @type {!gmf.datasource.ExternalDataSourcesManager}
   * @export
   */
  this.gmfExternalDataSourcesManager = gmfExternalDataSourcesManager;

  /**
   * @type {!gmf.permalink.Permalink}
   * @private
   */
  this.gmfPermalink_ = gmfPermalink;

  /**
   * @type {!gmf.layertree.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;

  const root = gmfTreeManager.root;
  goog.asserts.assert(root);

  /**
   * @type {!gmfThemes.GmfRootNode}
   * @export
   */
  this.root = root;

  /**
   * @type {!gmf.layertree.SyncLayertreeMap}
   * @private
   */
  this.gmfSyncLayertreeMap_ = gmfSyncLayertreeMap;

  /**
   * @type {!ngeo.misc.WMSTime}
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
   * @type {?ol.layer.Group}
   * @private
   */
  this.dataLayerGroup_ = null;

  /**
   * @type {!Array.<!ol.layer.Base>}
   * @export
   */
  this.layers = [];

  /**
   * @type {!gmf.theme.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  // enter digest cycle on node collapse
  $element.on('shown.bs.collapse', () => {
    this.scope_.$apply();
  });
};


/**
 * Init the controller,
 */
gmf.layertree.component.Controller_.prototype.$onInit = function() {
  this.openLinksInNewWindow = this.openLinksInNewWindow === true;
  this.dataLayerGroup_ = this.layerHelper_.getGroupFromMap(this.map,
    gmf.DATALAYERGROUP_NAME);

  ngeo.misc.syncArrays(this.dataLayerGroup_.getLayers().getArray(), this.layers, true, this.scope_, () => true);

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
 * @param {ngeo.layertree.Controller} treeCtrl Layer tree controller.
 * @private
 */
gmf.layertree.component.Controller_.prototype.updateDimensions_ = function(treeCtrl) {
  treeCtrl.traverseDepthFirst((ctrl) => {
    if (ctrl.node.dimensions) {
      const layer = ctrl.layer;
      goog.asserts.assertInstanceof(layer, ol.layer.Layer);
      this.updateLayerDimensions_(layer, /** @type gmfThemes.GmfGroup|gmfThemes.GmfLayer */ (ctrl.node));
    }
  });
};


/**
 * @param {ol.layer.Layer} layer Layer to update.
 * @param {gmfThemes.GmfGroup|gmfThemes.GmfLayer} node Layer tree node.
 * @private
 */
gmf.layertree.component.Controller_.prototype.updateLayerDimensions_ = function(layer, node) {
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
    if (!ol.obj.isEmpty(dimensions)) {
      const source = layer.getSource();
      if (source instanceof ol.source.WMTS) {
        source.updateDimensions(dimensions);
      } else if (source instanceof ol.source.TileWMS || source instanceof ol.source.ImageWMS) {
        source.updateParams(dimensions);
      } else {
        // the source is not ready yet
        layer.once('change:source', () => {
          goog.asserts.assertInstanceof(layer, ol.layer.Layer);
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
 * @param {ngeo.layertree.Controller} treeCtrl tree controller of the node
 * @return {ol.layer.Base|ol.layer.Group|null} The OpenLayers layer or group
 *     for the node.
 * @export
 */
gmf.layertree.component.Controller_.prototype.getLayer = function(treeCtrl) {
  let opt_position;
  if (treeCtrl.parent.isRoot) {
    this.gmfTreeManager_.rootCtrl = treeCtrl.parent;
    // Precise the index to add first level groups.
    opt_position = this.gmfTreeManager_.root.children.length -
        this.gmfTreeManager_.numberOfGroupsToAddInThisDigestLoop || 0;
  }

  const layer = this.gmfSyncLayertreeMap_.createLayer(treeCtrl, this.map,
    this.dataLayerGroup_, opt_position);

  if (layer instanceof ol.layer.Layer) {
    const node = /** @type {gmfThemes.GmfGroup|gmfThemes.GmfLayer} */ (treeCtrl.node);
    this.updateLayerDimensions_(layer, node);
  }

  return layer;
};


/**
 * Remove layer from this component's layergroup (and then, from the map) on
 * a ngeo layertree destroy event.
 * @param {angular.Scope} scope treeCtrl scope.
 * @param {ngeo.layertree.Controller} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @export
 */
gmf.layertree.component.Controller_.prototype.listeners = function(scope, treeCtrl) {
  const dataLayerGroup = this.dataLayerGroup_;
  scope.$on('$destroy', () => {
    // Remove the layer from the map.
    dataLayerGroup.getLayers().remove(treeCtrl.layer);
  });
};

/**
 * Toggle the state of treeCtrl's node.
 * @param {ngeo.layertree.Controller} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @export
 */
gmf.layertree.component.Controller_.prototype.toggleActive = function(treeCtrl) {
  treeCtrl.setState(treeCtrl.getState() === 'on' ? 'off' : 'on');
};


/**
 * Return the current state of the given treeCtrl's node.
 * Return a class name that match with the current node activation state.
 * @param {ngeo.layertree.Controller} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {string} 'on' or 'off' or 'indeterminate'.
 * @export
 */
gmf.layertree.component.Controller_.prototype.getNodeState = function(treeCtrl) {
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
 * @param {ngeo.layertree.Controller} layertreeCtrl ngeo layertree controller
 * @param {{start : number, end : number}} time The start
 * and optionally the end datetime (for time range selection) selected by user
 * @export
 */
gmf.layertree.component.Controller_.prototype.updateWMSTimeLayerState = function(
  layertreeCtrl, time) {
  if (!time) {
    return;
  }
  const dataSource = layertreeCtrl.getDataSource();
  if (dataSource) {
    goog.asserts.assertInstanceof(dataSource, ngeo.datasource.OGC);
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
 * @param {ngeo.layertree.Controller} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {string|undefined} The icon legend URL or undefined.
 * @export
 */
gmf.layertree.component.Controller_.prototype.getLegendIconURL = function(treeCtrl) {
  const iconUrl = treeCtrl.node.metadata.iconUrl;

  if (iconUrl !== undefined) {
    return iconUrl;
  }

  if (treeCtrl.node.children !== undefined) {
    return undefined;
  }

  const gmfLayer = /** @type {gmfThemes.GmfLayer} */ (treeCtrl.node);
  if (gmfLayer.type !== 'WMS') {
    return undefined;
  }

  const gmfLayerWMS = /** @type {gmfThemes.GmfLayerWMS} */ (gmfLayer);

  const legendRule = gmfLayerWMS.metadata.legendRule;

  if (legendRule === undefined) {
    return undefined;
  }

  //In case of multiple layers for a gmfLayerWMS, always take the first layer
  //name to get the icon
  const layerName = gmfLayerWMS.layers.split(',')[0];
  const gmfOgcServer = this.gmfTreeManager_.getOgcServer(treeCtrl);
  return this.layerHelper_.getWMSLegendURL(
    gmfOgcServer.url, layerName, undefined, legendRule
  );
};


/**
 * Get the legends object (<LayerName: url> for each layer) for the given treeCtrl.
 * @param {ngeo.layertree.Controller} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {Object.<string, string>} A <layerName: url> object that provides a
 *     layer for each layer.
 * @export
 */
gmf.layertree.component.Controller_.prototype.getLegendsObject = function(treeCtrl) {
  const legendsObject = {};
  if (/** @type gmfThemes.GmfGroup */ (treeCtrl.node).children !== undefined) {
    return null;
  }

  const gmfLayer = /** @type {gmfThemes.GmfLayer} */ (treeCtrl.node);
  const gmfLayerDefaultName = gmfLayer.name;
  if (gmfLayer.metadata.legendImage) {
    legendsObject[gmfLayerDefaultName] = gmfLayer.metadata.legendImage;
    return legendsObject;
  }

  const layer = treeCtrl.layer;
  if (gmfLayer.type === 'WMTS') {
    goog.asserts.assertInstanceof(layer, ol.layer.Tile);
    const wmtsLegendURL = this.layerHelper_.getWMTSLegendURL(layer);
    legendsObject[gmfLayerDefaultName] = wmtsLegendURL;
    return wmtsLegendURL ? legendsObject : null;
  } else {
    const gmfLayerWMS = /** @type {gmfThemes.GmfLayerWMS} */ (gmfLayer);
    let layersNames = gmfLayerWMS.layers;
    const gmfOgcServer = this.gmfTreeManager_.getOgcServer(treeCtrl);
    const scale = this.getScale_();
    // QGIS can handle multiple layers natively. Use Mutliple urls for other map
    // servers
    if (gmfOgcServer.type === ngeo.datasource.OGC.ServerType.QGISSERVER) {
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
 * @param {ngeo.layertree.Controller} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {number} The number of Legends object.
 * @export
 */
gmf.layertree.component.Controller_.prototype.getNumberOfLegendsObject = function(treeCtrl) {
  const legendsObject = this.getLegendsObject(treeCtrl);
  return legendsObject ? Object.keys(legendsObject).length : 0;
};


/**
 * Return the current scale of the map.
 * @return {number} Scale.
 * @private
 */
gmf.layertree.component.Controller_.prototype.getScale_ = function() {
  const view = this.map.getView();
  const resolution = view.getResolution();
  const mpu = view.getProjection().getMetersPerUnit();
  const dpi = 25.4 / 0.28;
  return resolution * mpu * 39.37 * dpi;
};


/**
 * Opens a gmfx.openIframePopup with the content of the metadata url of a node.
 * @param {ngeo.layertree.Controller} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @export
 */
gmf.layertree.component.Controller_.prototype.displayMetadata = function(treeCtrl) {
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
gmf.layertree.component.Controller_.prototype.afterReorder = function() {
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
  }, this);

  // Update gmfTreeManager rootctrl children order
  this.gmfTreeManager_.rootCtrl.children = treeCtrls;

  // Update map 'data' groupe layers order
  this.layers.length = 0;
  this.gmfTreeManager_.rootCtrl.children.forEach(function(child) {
    this.layers.push(child.layer);
  }, this);

  // Update the permalink order
  this.gmfPermalink_.refreshFirstLevelGroups();
};


/**
 * @param {gmfThemes.GmfGroup} node Layer tree node to remove.
 * @export
 */
gmf.layertree.component.Controller_.prototype.removeNode = function(node) {
  this.gmfTreeManager_.removeGroup(node);
};


/**
 * @export
 */
gmf.layertree.component.Controller_.prototype.removeAllNodes = function() {
  this.gmfTreeManager_.removeAll();
};


/**
 * @return {number} first level node count.
 * @export
 */
gmf.layertree.component.Controller_.prototype.nodesCount = function() {
  return this.gmfTreeManager_.root.children.length;
};

/**
 * Return 'out-of-resolution' if the current resolution of the map is out of
 * the min/max resolution in the node.
 * @param {gmfThemes.GmfLayerWMS} gmfLayer the GeoMapFish Layer. WMTS layer is
 *     also allowed (the type is defined as GmfLayerWMS only to avoid some
 *     useless tests to know if a minResolutionHint property can exist
 *     on the node).
 * @return {string|undefined} 'out-of-resolution' or undefined.
 * @export
 */
gmf.layertree.component.Controller_.prototype.getResolutionStyle = function(gmfLayer) {
  const resolution = this.map.getView().getResolution();
  const minResolution = gmf.theme.Themes.getNodeMinResolution(gmfLayer);
  if (minResolution !== undefined && resolution < minResolution) {
    return 'out-of-resolution';
  }
  const maxResolution = gmf.theme.Themes.getNodeMaxResolution(gmfLayer);
  if (maxResolution !== undefined && resolution > maxResolution) {
    return 'out-of-resolution';
  }
  return undefined;
};


/**
 * Set the resolution of the map with the max or min resolution of the node.
 * @param {ngeo.layertree.Controller} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @export
 */
gmf.layertree.component.Controller_.prototype.zoomToResolution = function(treeCtrl) {
  const gmfLayer = /** @type {gmfThemes.GmfLayerWMS} */ (treeCtrl.node);
  const view = this.map.getView();
  const resolution = view.getResolution();
  const minResolution = gmf.theme.Themes.getNodeMinResolution(gmfLayer);
  if (minResolution !== undefined && resolution < minResolution) {
    view.setResolution(view.constrainResolution(minResolution, 0, 1));
  } else {
    const maxResolution = gmf.theme.Themes.getNodeMaxResolution(gmfLayer);
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
gmf.layertree.component.Controller_.prototype.toggleNodeLegend = function(legendNodeId) {
  $(legendNodeId).toggle({
    toggle: true
  });
};


/**
 * @param {gmf.datasource.OGC} ds Data source to filter.
 * @export
 */
gmf.layertree.component.Controller_.prototype.toggleFiltrableDataSource = function(ds) {
  this.gmfDataSourceBeingFiltered.dataSource = ds;
};


/**
 * @param {string} legendNodeId The DOM node legend id
 * @return {boolean} Whenever the legend is currently displayed.
 * @export
 */
gmf.layertree.component.Controller_.prototype.isNodeLegendVisible = function(legendNodeId) {
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
 * @param {!ngeo.layertree.Controller} treeCtrl Ngeo tree controller.
 * @return {boolean} Whether the layer tree controller supports being
 *     "customized" or not.
 * @export
 */
gmf.layertree.component.Controller_.prototype.supportsCustomization = function(treeCtrl) {
  return !treeCtrl.isRoot &&
    (
      this.supportsLegend(treeCtrl) ||
      this.supportsOpacityChange(treeCtrl)
    );
};


/**
 * @param {!ngeo.layertree.Controller} treeCtrl Ngeo tree controller.
 * @return {boolean} Whether the layer tree controller supports having a
 *     legend being shown.
 * @export
 */
gmf.layertree.component.Controller_.prototype.supportsLegend = function(treeCtrl) {
  const node = /** @type {!gmfThemes.GmfGroup} */ (treeCtrl.node);
  return !!node.metadata &&
    !!node.metadata.legend &&
    !!this.getLegendsObject(treeCtrl);
};


/**
 * @param {!ngeo.layertree.Controller} treeCtrl Ngeo tree controller.
 * @return {boolean} Whether the layer tree controller supports having its
 *     layer opacity being changed or not.
 * @export
 */
gmf.layertree.component.Controller_.prototype.supportsOpacityChange = function(treeCtrl) {
  const node = /** @type {!gmfThemes.GmfGroup} */ (treeCtrl.node);
  const parentNode = /** @type {!gmfThemes.GmfGroup} */ (treeCtrl.parent.node);
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

gmf.layertree.component.controller('GmfLayertreeController', gmf.layertree.component.Controller_);
