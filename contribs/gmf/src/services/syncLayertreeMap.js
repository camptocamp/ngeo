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
 * TODO
 * @param {gmfThemesGroup} groupNode TODO.
 * @export
 */
gmf.SyncLayertreeMap.prototype.createLayer = function(treeCtrl,
    dataLayerGroup, map) {
  var layer;
  if (treeCtrl.node.children) {
    layer = this.createGroup_(treeCtrl, dataLayerGroup, map);
  } else {
    layer = this.createLeaf_(treeCtrl, dataLayerGroup, map);
  }
  return layer;
};


/**
 * TODO
 * @param {string} layersParam TODO.
 * @export
 */
gmf.SyncLayertreeMap.prototype.removeLayer = function(layersParam) {
  console.log('TODO');
};


/**
 * TODO
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @export
 */
gmf.SyncLayertreeMap.prototype.syncAll = function(map, firstLevelTreeCtrl) {
  var treeCtrls = [];
  this.getFlatTree(firstLevelTreeCtrl, treeCtrls);
  treeCtrls.forEach(function(treeCtrl) {
    var layer = this.getLayerById(map, treeCtrl.node.id);
    if (layer) {
      this.updateLayerState_(layer, treeCtrl);
    }
  }, this);
};


/**
 * TODO
 * @param {string} layersParam TODO.
 * @return {ol.layer.Group | ol.layer.Base | null} The corresponding layer.
 * @export
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
 * TODO
 * @param {string} layersParam TODO.
 * @return {ol.layer.Group | ol.layer.Base | null} The corresponding layer.
 * @export
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
 * TODO
 * @param {string} layersParam TODO.
 * @return {ol.layer.Group | ol.layer.Base | null} The corresponding layer.
 * @export
 */
gmf.SyncLayertreeMap.prototype.updateLayerState_ = function(layer, treeCtrl) {
  var active = treeCtrl.getState() === 'on';
  var source = layer.getSource();
  if (source instanceof ol.source.WMTS) {
    layer.setVisible(active);
  } else if (source instanceof ol.source.ImageWMS) {
    var allPossibleWMSLayerParam = this.getAllPossibleWMSLayerParam_(treeCtrl);
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
 * TODO
 * @param {string} layersParam TODO.
 * @return {ol.layer.Group | ol.layer.Base | null} The corresponding layer.
 * @public
 */
gmf.SyncLayertreeMap.prototype.getAllPossibleWMSLayerParam_ = function(treeCtrl) {
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
 * @param {GmfThemesNode} node Layertree node.
 * @param {Array.<GmfThemesNode>} nodes An array.
 * @export
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
 * TODO
 * @private
 */
gmf.SyncLayertreeMap.prototype.createGroup_ = function(treeCtrl,
    dataLayerGroup, map) {
  var groupNode = treeCtrl.node;
  var layer;
  var isFirstLevelGroup = treeCtrl.parent.isRoot;

  if (isFirstLevelGroup) { // First level group
    layer = this.createLayerFromGroup_(groupNode, groupNode.mixed);
    // Insert the layer at the right place
    var position = this.gmfTreeManager_.tree.children.length -
        this.gmfTreeManager_.layersToAddAtOnce | 0;
    dataLayerGroup.getLayers().insertAt(position, layer);

  } else { // Other Groups, create a group layer only in mixed groups
    var inAMixedGroup = !this.isOneParentNotMixed_(treeCtrl);
    if (inAMixedGroup) {
      layer = this.createLayerFromGroup_(groupNode, true);
      var layerGroup = this.getLayerGroupById(map, treeCtrl.parent.node.id);
      layerGroup.getLayers().insertAt(0, layer);
    }
  }
  return layer;
};


/**
 * TODO
 * @private
 */
gmf.SyncLayertreeMap.prototype.createLayerFromGroup_ = function(groupNode, mixed) {
  var layer;
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
 * TODO
 * @private
 */
gmf.SyncLayertreeMap.prototype.createLeaf_ = function(treeCtrl, dataLayerGroup,
    map) {
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
 * TODO
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
 * TODO
 * FIXME handle times
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
 * TODO
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
 * TODO
 * @private
 */
gmf.SyncLayertreeMap.prototype.updateLayerReferences_ = function(LeafNode,
    layer) {
  var id = LeafNode.id;
  var querySourceIds = layer.get('querySourceIds') || [];
  querySourceIds.push(id);
  layer.set('querySourceIds', querySourceIds);

  if (LeafNode.editable) {
    var editableIds = layer.get('editableIds') || [];
    editableIds.push(id);
    layer.set('editableIds', editableIds);
  }

  var disclaimer = LeafNode.metadata.disclaimer;
  if (disclaimer) {
    var disclaimers = layer.get('disclaimers') || [];
    disclaimers.push(LeafNode.metadata.disclaimer);
    layer.set('disclaimers', disclaimers);
  }
};


/**
 * Retrieve the "top level" layertree.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {ngeo.LayertreeController} the top level layertree.
 * @public
 */
gmf.SyncLayertreeMap.prototype.getFirstParentTree_ = function(treeCtrl) {
  var tree = treeCtrl;
  while (tree.depth > 1) {
    tree = tree.parent;
  }
  return tree;
};


/**
 * TODO
 * @private
 */
gmf.SyncLayertreeMap.prototype.isOneParentNotMixed_ = function(treeCtrl) {
  var tree = treeCtrl;
  var isOneParentNotMix = false;
  while (tree.parent && !isOneParentNotMix) {
    isOneParentNotMix = tree.node.mixed === false;
    tree = tree.parent;
  }
  return isOneParentNotMix;
};

/**
 * TODO
 * @private
 */
gmf.SyncLayertreeMap.prototype.getFirstParentTreeWithOgcServer_ = function(treeCtrl) {
  var tree = treeCtrl;
  var treeWithOgcServer = null;
  while (tree.parent && !treeWithOgcServer) {
    if (tree.node.ogcServer) {
      treeWithOgcServer = tree;
    }
    tree = tree.parent;
  }
  return treeWithOgcServer;
};


gmf.module.service('gmfSyncLayertreeMap', gmf.SyncLayertreeMap);
