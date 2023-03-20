import angular from 'angular';
import gmfThemeThemes from 'gmf/theme/Themes.js';
import ngeoLayertreeController, {LayertreeVisitorDecision} from 'ngeo/layertree/Controller.js';
import ngeoMiscWMSTime from 'ngeo/misc/WMSTime.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerTile from 'ol/layer/Tile.js';

/**
 * Service to create layer based on a ngeo.layertree.Controller with a
 * GMFThemesGroup or a GMFThemesLeaf as node object.
 * This layer is also used to synchronise a state of ngeo.layertree.Controller
 * and its corresponding layer in the map.
 *
 * @constructor
 * @param {angular.IScope} $rootScope Angular rootScope.
 * @param {import("ngeo/map/LayerHelper.js").LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {import("ngeo/misc/WMSTime.js").WMSTime} ngeoWMSTime wms time service.
 * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes The gmf Themes service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfSyncLayertreeMap
 * @hidden
 */
export function SyncLayertreeMap($rootScope, ngeoLayerHelper, ngeoWMSTime, gmfThemes) {
  /**
   * @type {import("ngeo/map/LayerHelper.js").LayerHelper}
   * @private
   */
  this.layerHelper_ = ngeoLayerHelper;

  /**
   * @type {import("ngeo/misc/WMSTime.js").WMSTime}
   * @private
   */
  this.ngeoWMSTime_ = ngeoWMSTime;

  /**
   * @type {import('gmf/themes.js').GmfOgcServers}
   * @private
   */
  this.ogcServersObject_;

  gmfThemes.getOgcServersObject().then((ogcServersObject) => {
    this.ogcServersObject_ = ogcServersObject;
  });

  $rootScope.$on('ngeo-layertree-state', (map, treeCtrl, firstParent) => {
    this.sync_(firstParent);
  });
}

/**
 * Create, insert (or update) and return a layer from the GmfGroup or the
 * GmfLayer of the given treeCtrl.
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl ngeo layertree controller.
 * @param {import("ol/Map.js").default} map A map that contains the group to insert the not first
 *     level group layer.
 * @param {import("ol/layer/Group.js").default} dataLayerGroup the layer group to insert the first
 *     level group layer.
 * @param {number=} opt_position for first level Group, you can precise the
 *     position to add the group in the array of layers of the dataLayerGroup.
 * @return {import("ol/layer/Base.js").default|import("ol/layer/Group.js").default} a new layer.
 * @public
 */
SyncLayertreeMap.prototype.createLayer = function (treeCtrl, map, dataLayerGroup, opt_position) {
  /**
   * @type {import("ol/layer/Base.js").default|import("ol/layer/Group.js").default}
   */
  let layer = null;
  if (treeCtrl.node.children !== undefined && treeCtrl.node.mixed) {
    // Mixed groups
    layer = this.createGroup_(treeCtrl, map, dataLayerGroup, opt_position);
  } else if (treeCtrl.node.children === undefined && treeCtrl.parent.node.mixed) {
    // Layers in a mixed group
    layer = this.createLeafInAMixedGroup_(treeCtrl, map);
  } else if (treeCtrl.node.children === undefined) {
    // Layers in a non mixed group
    this.initGmfLayerInANotMixedGroup_(treeCtrl, map);
  } else if (treeCtrl.depth === 1 && !treeCtrl.node.mixed) {
    // First level group non mix
    layer = this.createGroup_(treeCtrl, map, dataLayerGroup, opt_position);
  }

  if (layer && treeCtrl.node.metadata.opacity) {
    layer.setOpacity(treeCtrl.node.metadata.opacity);
  }

  return layer;
};

/**
 * Synchronise the state of each layers corresponding to the given tree and
 * all its children.
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl ngeo layertree controller.
 * @private
 */
SyncLayertreeMap.prototype.sync_ = function (treeCtrl) {
  treeCtrl.traverseDepthFirst((treeCtrl) => {
    if (treeCtrl.layer && !treeCtrl.node.mixed) {
      this.updateLayerState_(
        /** @type import("ol/layer/Image.js").default|import("ol/layer/Tile.js").default */ (treeCtrl.layer),
        treeCtrl
      );
      return LayertreeVisitorDecision.DESCEND;
    }
  });
};

/**
 * Set the active state of a layer based on its treeCtrl state.
 * @param {import("ol/layer/Tile.js").default|import("ol/layer/Image.js").default} layer A layer.
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl ngeo layertree controller.
 * @private
 */
SyncLayertreeMap.prototype.updateLayerState_ = function (layer, treeCtrl) {
  const active = treeCtrl.getState() === 'on';
  if (treeCtrl.node.type === 'WMTS') {
    layer.setVisible(active);
  } else if (!treeCtrl.node.mixed && treeCtrl.depth === 1) {
    // First level non mixed group
    console.assert(layer instanceof olLayerImage);
    const names = [];
    const styles = [];
    treeCtrl.traverseDepthFirst((treeCtrl) => {
      if (treeCtrl.node.children === undefined && treeCtrl.getState() === 'on') {
        names.push(treeCtrl.node.layers);
        const style = treeCtrl.node.style !== undefined ? treeCtrl.node.style : '';
        styles.push(style);
        return LayertreeVisitorDecision.DESCEND;
      }
    });
    if (names.length === 0) {
      layer.setVisible(false);
    }
    /** @type {import("ol/source/ImageWMS.js").default} */ (layer.getSource()).updateParams({
      'LAYERS': names.reverse().join(','),
      'STYLES': styles.reverse().join(','),
    });
    if (names.length !== 0) {
      layer.setVisible(true);
    }
  } else {
    // WMS mixed layer
    console.assert(layer instanceof olLayerImage);
    layer.setVisible(active);
  }
};

/**
 * Create insert and return a layer group (for not mixed case) or a wmsLayer (for
 * mixed case). Take care about the insertion order in the map in case of first
 * level group.
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl ngeo layertree controller.
 * @param {import("ol/Map.js").default} map A map that contains the group to insert the not first
 *     level group layer.
 * @param {import("ol/layer/Group.js").default} dataLayerGroup the layer group to insert the first
 *     level group layer.
 * @param {number=} opt_position for first level Group, you can precise the
 *     position to add the group in the array of layers of the dataLayerGroup.
 * @return {import("ol/layer/Image.js").default|import("ol/layer/Group.js").default} a new layer.
 * @private
 */
SyncLayertreeMap.prototype.createGroup_ = function (treeCtrl, map, dataLayerGroup, opt_position) {
  const groupNode = /** @type {import('gmf/themes.js').GmfGroup} */ (treeCtrl.node);
  let layer = null;
  const isFirstLevelGroup = treeCtrl.parent.isRoot;

  let printNativeAngle = true;
  if (groupNode.metadata.printNativeAngle !== undefined) {
    printNativeAngle = groupNode.metadata.printNativeAngle;
  }

  if (isFirstLevelGroup) {
    // First level group
    layer = this.createLayerFromGroup_(treeCtrl, !!groupNode.mixed);
    // Insert the layer at the right place
    const position = opt_position | 0;
    dataLayerGroup.getLayers().insertAt(position, layer);
  } else {
    // Other Groups, create a group layer only in mixed groups
    const inAMixedGroup = !this.isOneParentNotMixed_(treeCtrl);
    if (inAMixedGroup) {
      layer = this.createLayerFromGroup_(treeCtrl, true);
      const layerGroup = /** @type {import("ol/layer/Group.js").default} */ (getLayer(treeCtrl.parent));
      layerGroup.getLayers().insertAt(0, layer);
    }
  }

  layer.set('printNativeAngle', printNativeAngle);
  return layer;
};

/**
 * Create, insert and return a layer group (for not mixed case) or a wmsLayer
 * for mixed case).
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl ngeo layertree controller.
 * @param {boolean} mixed True for a group layer, false for a WMS layer.
 * @return {import("ol/layer/Image.js").default|import("ol/layer/Group.js").default} a new layer.
 * @private
 */
SyncLayertreeMap.prototype.createLayerFromGroup_ = function (treeCtrl, mixed) {
  let layer;
  const groupNode = /** @type {import('gmf/themes.js').GmfGroup} */ (treeCtrl.node);
  if (mixed) {
    // Will be one ol.layer per each node.
    layer = this.layerHelper_.createBasicGroup();
  } else {
    // Will be one ol.layer for multiple WMS nodes.
    const timeParam = this.getTimeParam_(treeCtrl);
    const ogcServer = this.ogcServersObject_[groupNode.ogcServer || ''];
    console.assert(ogcServer);
    console.assert(ogcServer.url);
    console.assert(ogcServer.type);
    console.assert(ogcServer.imageType);
    layer = this.layerHelper_.createBasicWMSLayer(
      ogcServer.url,
      '',
      ogcServer.imageType,
      ogcServer.type,
      timeParam,
      undefined, // WMS parameters
      ogcServer.credential ? 'use-credentials' : 'anonymous'
    );
    let hasActiveChildren = false;
    treeCtrl.traverseDepthFirst((ctrl) => {
      // Update layer information and tree state.
      this.updateLayerReferences_(/** @type import('gmf/themes.js').GmfLayer */ (ctrl.node), layer);
      if (ctrl.node.metadata.isChecked) {
        ctrl.setState('on', false);
        this.updateLayerState_(/** @type {import("ol/layer/Image.js").default} */ (layer), ctrl);
        hasActiveChildren = true;
        return LayertreeVisitorDecision.DESCEND;
      }
    });
    layer.setVisible(hasActiveChildren);
    layer.set('layerNodeName', groupNode.name); //Really useful ?
  }
  return layer;
};

/**
 * Create and insert a layer from a leaf in a mixed group.
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl ngeo layertree controller.
 * @param {import("ol/Map.js").default} map A map that contains the group to insert the layer.
 * @return {import("ol/layer/Tile.js").default|import("ol/layer/Image.js").default} a new layer.
 * @private
 */
SyncLayertreeMap.prototype.createLeafInAMixedGroup_ = function (treeCtrl, map) {
  const gmfLayer = /** @type {import('gmf/themes.js').GmfLayer} */ (treeCtrl.node);
  let layer;
  // Make layer.
  if (gmfLayer.type === 'WMTS') {
    layer = this.createWMTSLayer_(/** @type import('gmf/themes.js').GmfLayerWMTS */ (gmfLayer));
  } else {
    const gmfLayerWMS = /** @type import('gmf/themes.js').GmfLayerWMS */ (gmfLayer);
    const timeParam = this.getTimeParam_(treeCtrl);
    const ogcServer = this.ogcServersObject_[/** @type string */ (gmfLayerWMS.ogcServer)];
    console.assert(ogcServer);
    console.assert(ogcServer.url);
    console.assert(ogcServer.type);
    console.assert(gmfLayerWMS.layers);
    console.assert(ogcServer.imageType);

    const opt_params = {STYLES: gmfLayerWMS.style};

    layer = this.layerHelper_.createBasicWMSLayer(
      ogcServer.url,
      gmfLayerWMS.layers,
      ogcServer.imageType,
      ogcServer.type,
      timeParam,
      opt_params, // WMS parameters
      ogcServer.credential ? 'use-credentials' : 'anonymous'
    );
  }
  // Update layer information and tree state.
  layer.set('layerNodeName', gmfLayer.name); // Really useful ?
  this.updateLayerReferences_(gmfLayer, layer);
  const checked = gmfLayer.metadata.isChecked === true;
  if (checked) {
    treeCtrl.setState('on', false);
  }
  layer.setVisible(checked);
  // Insert layer in the map.
  const layerGroup = /** @type {import("ol/layer/Group.js").default} */ (getLayer(treeCtrl.parent));
  layerGroup.getLayers().insertAt(0, layer);
  return layer;
};

/**
 * Update a WMS layer with the given treeCtrl node information. Assumes that
 * the first parent with ogcServer information is linked to the layer to update
 * and that this treeCtrl node is a leafNode.
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl ngeo layertree controller.
 * @param {import("ol/Map.js").default} map A map that contains the layer to update.
 * @private
 */
SyncLayertreeMap.prototype.initGmfLayerInANotMixedGroup_ = function (treeCtrl, map) {
  const leafNode = /** @type {import('gmf/themes.js').GmfLayer} */ (treeCtrl.node);
  const firstLevelGroup = this.getFirstLevelGroupCtrl_(treeCtrl);
  console.assert(firstLevelGroup);
  const layer = /** @type {import("ol/layer/Image.js").default} */ (firstLevelGroup.layer);
  console.assert(layer instanceof olLayerImage);
  // Update layer information and tree state.
  this.updateLayerReferences_(leafNode, layer);
  if (leafNode.metadata.isChecked) {
    treeCtrl.setState('on', false);
    this.updateLayerState_(layer, firstLevelGroup);
  } else {
    treeCtrl.parent.refreshState();
  }
};

/**
 * Create and return a Tile layer.
 * @param {import('gmf/themes.js').GmfLayerWMTS} gmfLayerWMTS A leaf node.
 * @return {import("ol/layer/Tile.js").default} a Tile WMTS layer. (Source and capabilities can come
 *     later).
 * @private
 */
SyncLayertreeMap.prototype.createWMTSLayer_ = function (gmfLayerWMTS) {
  const newLayer = new olLayerTile();
  console.assert(gmfLayerWMTS.url);
  console.assert(gmfLayerWMTS.layer);
  this.layerHelper_
    .createWMTSLayerFromCapabilitites(
      gmfLayerWMTS.url,
      gmfLayerWMTS.layer,
      gmfLayerWMTS.matrixSet,
      gmfLayerWMTS.dimensions
    )
    .then((layer) => {
      newLayer.setSource(layer.getSource());
      newLayer.set('capabilitiesStyles', layer.get('capabilitiesStyles'));
    });
  return newLayer;
};

/**
 * Update properties of a layer with the node of a given leafNode.
 * @param {import('gmf/themes.js').GmfLayer|import('gmf/themes.js').GmfLayerWMS} leafNode a leaf node.
 * @param {import("ol/layer/Base.js").default} layer A layer.
 * @private
 */
SyncLayertreeMap.prototype.updateLayerReferences_ = function (leafNode, layer) {
  const id = olUtilGetUid(leafNode);
  const querySourceIds = layer.get('querySourceIds') || [];
  querySourceIds.push(id);
  layer.set('querySourceIds', querySourceIds);

  const disclaimer = leafNode.metadata.disclaimer;
  if (disclaimer) {
    const disclaimers = layer.get('disclaimers') || {};

    // 'all' means that the disclaimer is for all the layer.
    let layers = 'all';
    if ('layers' in leafNode) {
      layers = /** @type {import('gmf/themes.js').GmfLayerWMS} */ (leafNode).layers;
    }
    disclaimers[layers] = leafNode.metadata.disclaimer;
    layer.set('disclaimers', disclaimers);
  }
};

/**
 * Get the time parameter for a WMS Layer. If it's a group and it doesn't have
 * time, get the first time parameter available in any child.
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl ngeo layertree controller.
 * @return {string|undefined} A wms time param.
 * @private
 */
SyncLayertreeMap.prototype.getTimeParam_ = function (treeCtrl) {
  let wmsTime;
  let timeParam;
  const node = treeCtrl.node;
  if (node.time) {
    wmsTime = node.time;
  } else if (node.children) {
    treeCtrl.traverseDepthFirst((treeCtrl) => {
      if (treeCtrl.node.children === undefined && treeCtrl.node.time) {
        wmsTime = treeCtrl.node.time;
        return LayertreeVisitorDecision.STOP;
      }
    });
  }
  if (wmsTime) {
    const timeValues = this.ngeoWMSTime_.getOptions(wmsTime)['values'];
    timeParam = this.ngeoWMSTime_.formatWMSTimeParam(wmsTime, {
      start: timeValues[0] || timeValues,
      end: timeValues[1],
    });
  }
  return timeParam;
};

/**
 * Return true if a parent tree is mixed, based on its node.
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl ngeo layertree controller.
 * @return {boolean} True is any parent is mixed. False Otherwise.
 * @private
 */
SyncLayertreeMap.prototype.isOneParentNotMixed_ = function (treeCtrl) {
  let tree = treeCtrl.parent;
  let isOneParentNotMix = false;
  do {
    isOneParentNotMix = tree.node.mixed === false;
    tree = tree.parent;
  } while (tree.parent && !isOneParentNotMix);
  return isOneParentNotMix;
};

/**
 * Return the first parent, from the root parent, that is not mixed.
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl ngeo layertree controller.
 * @return {import("ngeo/layertree/Controller.js").LayertreeController} The first not mixed parent.
 * @private
 */
SyncLayertreeMap.prototype.getFirstLevelGroupCtrl_ = function (treeCtrl) {
  let tree = treeCtrl;
  while (!tree.parent.isRoot) {
    tree = tree.parent;
  }
  return tree;
};

/**
 * Return the layer used by the given treeCtrl.
 * @param {import("ngeo/layertree/Controller.js").LayertreeController} treeCtrl ngeo layertree controller.
 * @return {import("ol/layer/Base.js").default} The layer.
 * @hidden
 */
export function getLayer(treeCtrl) {
  let tree = treeCtrl;
  let layer = null;
  while (!tree.isRoot && layer === null) {
    if (tree.layer) {
      layer = tree.layer;
    }
    tree = tree.parent;
  }
  return layer;
}

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfSyncLayertreeMap', [
  gmfThemeThemes.name,
  ngeoLayertreeController.name,
  ngeoMiscWMSTime.name,
]);
module.service('gmfSyncLayertreeMap', SyncLayertreeMap);

export default module;
