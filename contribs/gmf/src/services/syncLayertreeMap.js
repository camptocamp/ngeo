goog.provide('gmf.SyncLayertreeMap');

goog.require('gmf');


/**
 * TODO
 *
 * @constructor
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {gmf.TreeManager} gmfTreeManager gmf Tree Manager service.
 * @param {gmf.Themes} gmfThemes The gmf Themes service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfSyncLayertreeMap
 */
gmf.SyncLayertreeMap = function(ngeoLayerHelper, gmfTreeManager, gmfThemes) {

  /**
   * @type {ngeo.LayerHelper}
   * @private
   */
  this.layerHelper_ = ngeoLayerHelper;


  /**
   * @type {gmf.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;


  /**
   * @type {GmfOgcServers}
   * @private
   */
  this.ogcServersObject_;

  gmfThemes.getOgcServersObject().then(function(ogcServersObject) {
    this.ogcServersObject_ = ogcServersObject;
  }.bind(this));
};


/**
 * Create, insert (or update) and return a layer from the GmfThemesGroup or the
 * GmfThemesLeaf of the given treeCtrl.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @param {ol.Map} map A map that contains the group to insert the not first
 *     level group layer.
 * @param {ol.layer.Group} dataLayerGroup the layer group to insert the first
 *     level group layer.
 * @return {ol.layer.Base|ol.layer.Group} a new layer.
 * @public
 */
gmf.SyncLayertreeMap.prototype.createLayer = function(treeCtrl, map,
    dataLayerGroup) {
  var layer;
  if (treeCtrl.node.children) {
    layer = this.createGroup_(treeCtrl, dataLayerGroup, map);
  } else {
    layer = this.createLeaf_(treeCtrl, dataLayerGroup, map);
  }
  return layer;
};


/**
 * Synchronise the state of each layers corresponding to the given tree and
 * all its children.
 * @param {ol.Map} map A map that contains the layers.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @public
 */
gmf.SyncLayertreeMap.prototype.syncAll = function(map, treeCtrl) {
  var treeCtrls = [];
  this.getFlatTree(treeCtrl, treeCtrls);
  treeCtrls.forEach(function(item) {
    var layer = this.getLayerById(map, item.node.id);
    if (layer) {
      this.updateLayerState_(layer, item);
    }
  }, this);
};


/**
 * Return a Group or a WMSLayer that its "gmfThemesGroupId" correspony to the
 * given id.
 * @param {ol.Map} map A map that contains the group (or WMSLayer) to find.
 * @param {number} id The id of a group node.
 * @return {ol.layer.Group|ol.layer.ImageWMS|null} The corresponding group
 *     (or WMSLayer).
 * @public
 */
gmf.SyncLayertreeMap.prototype.getLayerGroupById = function(map, id) {
  var groupsArray = this.layerHelper_.getFlatMapElements(map.getLayerGroup());
  var searchedGroup = null;
  groupsArray.some(function(group) {
    var groupId = group.getProperties()['gmfThemesGroupId'];
    if (groupId === id) {
      return searchedGroup = group;
    }
  });
  return searchedGroup;
};


/**
 * Return a layer that its "querySourceIds" correspond to the given id.
 * @param {ol.Map} map A map that contains the layer to find.
 * @param {number} id The id of a leaf node.
 * @return {ol.layer.Base|null} The corresponding layer.
 * @public
 */
gmf.SyncLayertreeMap.prototype.getLayerById = function(map, id) {
  var layersArray = map.getLayerGroup().getLayersArray();
  var searchedLayer = null;
  layersArray.some(function(layer) {
    var ids = layer.getProperties()['querySourceIds'];
    if (ids === id || ids instanceof Array && ids.indexOf(id) > -1) {
      return searchedLayer = layer;
    }
  });
  return searchedLayer;
};


/**
 * Set the active state of a layer based on its treeCtrl state.
 * @param {ol.layer.WMTS|ol.layer.ImageWMS} layer A layer.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @private
 */
gmf.SyncLayertreeMap.prototype.updateLayerState_ = function(layer, treeCtrl) {
  var active = treeCtrl.getState() === 'on';
  var source = layer.getSource();
  if (source instanceof ol.source.WMTS) {
    layer.setVisible(active);
  } else if (source instanceof ol.source.ImageWMS) {
    var allPossibleWMSLayerParam = this.getAllPossibleWMSLayerParam(treeCtrl);
    var currentWMSLayerParam = layer.getVisible() ?
        source.getParams()['LAYERS'].split(',') : [];
    var WMSLayerParam = treeCtrl.node.name.split(',');
    var newWMSLayerParam = [];

    allPossibleWMSLayerParam.forEach(function(possibleItem) {
      WMSLayerParam.forEach(function(item) {
        if (possibleItem === item) {
          if (active) {
            newWMSLayerParam.push(possibleItem);
          }
        } else {
          if (currentWMSLayerParam.indexOf(possibleItem) > -1) {
            newWMSLayerParam.push(possibleItem);
          }
        }
      });
    });
    this.layerHelper_.updateWMSLayerState(layer, newWMSLayerParam.join(','));
  }
};


/**
 * Get all possible WMSLayerParam names for a given tree. The collection of
 * names start from the first level group and take care of the order.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @return {Array.<string>} Array of names.
 * @public
 */
gmf.SyncLayertreeMap.prototype.getAllPossibleWMSLayerParam = function(treeCtrl) {
  var firstLevelTree = this.getFirstParentTree_(treeCtrl);
  var treeCtrls = [];
  this.getFlatTree(firstLevelTree, treeCtrls);
  var WMSLayerParams = [];
  treeCtrls.forEach(function(item) {
    WMSLayerParams.push(item.node['layers']);
  });
  // join then split for group layers named "shop,bank".
  return WMSLayerParams.join(',').split(',');
};


/**
 * Fill the given array with all layertree objects of any level from the
 * children of the given layertree.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @param {Array.<ngeo.LayertreeController>} treeCtrls array that will contains
 * the ngeo layertree controller.
 * @public
 */
gmf.SyncLayertreeMap.prototype.getFlatTree = function(treeCtrl, treeCtrls) {
  var children = treeCtrl.children;
  if (children.length > 0) {
    children.forEach(function(child) {
      this.getFlatTree(child, treeCtrls);
    }, this);
  } else {
    treeCtrls.push(treeCtrl);
  }
};


/**
 * Create insert and return a layer group (for not mixed case) or a wmsLayer (for
 * mixed case). Take care about the insertion order in the map in case of first
 * level group.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @param {ol.Map} map A map that contains the group to insert the not first
 *     level group layer.
 * @param {ol.layer.Group} dataLayerGroup the layer group to insert the first
 *     level group layer.
 * @return {ol.layer.ImageWMS|ol.layer.Group} a new layer.
 * @private
 */
gmf.SyncLayertreeMap.prototype.createGroup_ = function(treeCtrl, map,
    dataLayerGroup) {
  var groupNode = treeCtrl.node;
  var layer;
  var isFirstLevelGroup = treeCtrl.parent.isRoot;

  if (isFirstLevelGroup) { // First level group
    layer = this.createLayerFromGroup_(groupNode.mixed, groupNode);
    // Insert the layer at the right place
    var position = this.gmfTreeManager_.tree.children.length -
        this.gmfTreeManager_.layersToAddAtOnce | 0;
    dataLayerGroup.getLayers().insertAt(position, layer);

  } else { // Other Groups, create a group layer only in mixed groups
    var inAMixedGroup = !this.isOneParentNotMixed_(treeCtrl);
    if (inAMixedGroup) {
      layer = this.createLayerFromGroup_(true);
      var layerGroup = this.getLayerGroupById(map, treeCtrl.parent.node.id);
      layerGroup.getLayers().insertAt(0, layer);
    }
  }
  return layer;
};


/**
 * Create, insert and return a layer group (for not mixed case) or a wmsLayer
 * for mixed case).
 * @param {boolean} mixed True for a group layer, false for a WMS layer.
 * @param {GmfThemesGroup=} opt_groupNode node object that musts exist for not
 *     mixed group.
 * @return {ol.layer.ImageWMS|ol.layer.Group} a new layer.
 * @private
 */
gmf.SyncLayertreeMap.prototype.createLayerFromGroup_ = function(mixed,
  opt_groupNode) {
  var layer;
  var groupNode = opt_groupNode || {};
  if (mixed) { // Will be one ol.layer per each node.
    layer = this.layerHelper_.createBasicGroup();
  } else { // Will be one ol.layer for multiple WMS nodes.
    var ogcServer = this.ogcServersObject_[groupNode.ogcServer];
    goog.asserts.assert(ogcServer, Object);
    layer = this.layerHelper_.createBasicWMSLayer(ogcServer.url, '', ogcServer.type);
    layer.set('layerNodeName', groupNode.name); //Really useful ?
  }
  layer.set('gmfThemesGroupId', groupNode.id);
  return layer;
};


/**
 * Create and insert (or update) a layer from a leaf.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @param {ol.Map} map A map that contains the group to insert the layer.
 * @return {ol.layer.WMTS|ol.layer.ImageWMS|null} a new layer.
 * @private
 */
gmf.SyncLayertreeMap.prototype.createLeaf_ = function(treeCtrl, map) {
  var layer = null;
  var inAMixedGroup = !this.isOneParentNotMixed_(treeCtrl);
  if (inAMixedGroup) { // Create a new layer only in mixed groups
    layer = this.createLeafInAMixedGroup_(treeCtrl, map);
  } else {
    this.createLeafInANotMixedGroup_(treeCtrl, map);
  }
  return layer;
};


/**
 * Create and insert a layer from a leaf in a mixed group.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @param {ol.Map} map A map that contains the group to insert the layer.
 * @return {ol.layer.WMTS|ol.layer.ImageWMS} a new layer.
 * @private
 */
gmf.SyncLayertreeMap.prototype.createLeafInAMixedGroup_ = function(treeCtrl,
    map) {
  var leafNode = treeCtrl.node;
  var layer;
  // Make layer.
  if (leafNode.type === 'WMTS') {
    layer = this.createWMTSLayer_(leafNode);
  } else {
    var ogcServer = this.ogcServersObject_[leafNode.ogcServer];
    goog.asserts.assert(ogcServer, Object);
    layer = this.layerHelper_.createBasicWMSLayer(ogcServer.url,
            leafNode.layers, ogcServer.type); // FIXME handle time
  }
  //Update layer information and tree state.
  layer.set('layerNodeName', leafNode.name); // Really useful ?
  this.updateLayerReferences_(leafNode, layer);
  if (leafNode.metadata.isChecked) {
    treeCtrl.setState('on');
    layer.setVisible(true);
  }
  // Insert layer in the map.
  var layerGroup = this.getLayerGroupById(map, treeCtrl.parent.node.id);
  layerGroup.getLayers().insertAt(0, layer);
  return layer;
};


/**
 * Update a WMS layer with the given treeCtrl node information. Assumes that
 * the first parent with ogcServer information is linked to the layer to update
 * and that this treeCtrl nod is a leafNode.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @param {ol.Map} map A map that contains the layer to update.
 * @private
 */
gmf.SyncLayertreeMap.prototype.createLeafInANotMixedGroup_ = function(treeCtrl,
    map) {
  var leafNode = treeCtrl.node;
  var treeCtrlWithOgcServer = this.getFirstParentTreeWithOgcServer_(treeCtrl);
  var wmsLayer = this.getLayerGroupById(map, treeCtrlWithOgcServer.node.id);
  //Update layer information and tree state.
  this.updateLayerReferences_(leafNode, wmsLayer);
  if (leafNode.metadata.isChecked) {
    treeCtrl.setState('on');
  }
  var source = /** @type {ol.source.ImageWMS} */ (wmsLayer.getSource());
  var WMSLayerParam = source.getParams()['LAYERS'];
  WMSLayerParam = WMSLayerParam.length > 0 ? WMSLayerParam.split(',') : [];
  WMSLayerParam.push(leafNode.layers);
  this.layerHelper_.updateWMSLayerState(wmsLayer, WMSLayerParam.join(','));
};


/**
 * Create and return a WMTS.
 * @param {GmfThemesLeaf} leafNode A leaf node.
 * @return {ol.layer.WMTS} a WMTS layer. (Source and capabilities can come
 *     later).
 * @private
 */
gmf.SyncLayertreeMap.prototype.createWMTSLayer_ = function(leafNode) {
  var newLayer = new ol.layer.Tile();
  goog.asserts.assert(leafNode.url);
  this.layerHelper_.createWMTSLayerFromCapabilitites(leafNode.url,
        leafNode.layer, leafNode.dimensions).then(function(layer) {
          newLayer.setSource(layer.getSource());
          newLayer.set('capabilitiesStyles', layer.get('capabilitiesStyles'));
        });
  return newLayer;
};


/**
 * Update properties of a layer with the node of a given leafNode.
 * @param {GmfThemesLeaf} leafNode A leaf node.
 * @param {ol.layer.Base} layer A layer.
 * @private
 */
gmf.SyncLayertreeMap.prototype.updateLayerReferences_ = function(leafNode,
    layer) {
  var id = leafNode.id;
  var querySourceIds = layer.get('querySourceIds') || [];
  querySourceIds.push(id);
  layer.set('querySourceIds', querySourceIds);

  if (leafNode.editable) {
    var editableIds = layer.get('editableIds') || [];
    editableIds.push(id);
    layer.set('editableIds', editableIds);
  }

  var disclaimer = leafNode.metadata.disclaimer;
  if (disclaimer) {
    var disclaimers = layer.get('disclaimers') || [];
    disclaimers.push(leafNode.metadata.disclaimer);
    layer.set('disclaimers', disclaimers);
  }
};


/**
 * Get the "top level" layertree. Can return itself.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @return {ngeo.LayertreeController} the top level layertree.
 * @public
 */
gmf.SyncLayertreeMap.prototype.getFirstParentTree_ = function(treeCtrl) {
  var tree = treeCtrl;
  while (!tree.parent.isRoot) {
    tree = tree.parent;
  }
  return tree;
};


/**
 * Return true if a parent tree is mixed, based on its node.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @return {boolean} True is any parent is mixed. False Otherwise.
 * @private
 */
gmf.SyncLayertreeMap.prototype.isOneParentNotMixed_ = function(treeCtrl) {
  var tree = treeCtrl.parent;
  var isOneParentNotMix = false;
  do {
    isOneParentNotMix = tree.node.mixed === false;
    tree = tree.parent;
  }
  while (tree.parent && !isOneParentNotMix);
  return isOneParentNotMix;
};

/**
 * Return the first parent tree that contains a ogcServer value in its node.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @return {ngeo.LayertreeController} The first parent tree with an ogcServer
 *     information.
 * @private
 */
gmf.SyncLayertreeMap.prototype.getFirstParentTreeWithOgcServer_ = function(
    treeCtrl) {
  var tree = treeCtrl.parent;
  var treeWithOgcServer = null;
  do {
    if (tree.node.ogcServer) {
      treeWithOgcServer = tree;
    }
    tree = tree.parent;
  }
  while (tree.parent && !treeWithOgcServer);
  return treeWithOgcServer;
};


gmf.module.service('gmfSyncLayertreeMap', gmf.SyncLayertreeMap);
