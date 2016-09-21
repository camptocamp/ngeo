goog.provide('gmf.SyncLayertreeMap');

goog.require('gmf');
goog.require('gmf.WMSTime');
goog.require('ol.layer.Image');
goog.require('ol.layer.Tile');

/**
 * Service to create layer based on a ngeo.LayertreeController with a
 * GMFThemesGroup ou GMFThemesLeaf as node object.
 * This layer is also used to synchronise a state of ngeo.LayertreeController
 * and its corresponding layer in the map.
 *
 * @constructor
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {gmf.Themes} gmfThemes The gmf Themes service.
 * @param {gmf.WMSTime} gmfWMSTime wms time service.
 * @ngInject
 * @ngdoc service
 * @ngname gmfSyncLayertreeMap
 */
gmf.SyncLayertreeMap = function(ngeoLayerHelper, gmfThemes, gmfWMSTime) {

  /**
   * @type {ngeo.LayerHelper}
   * @private
   */
  this.layerHelper_ = ngeoLayerHelper;

  /**
   * @type {gmf.WMSTime}
   * @private
   */
  this.gmfWMSTime_ = gmfWMSTime;

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
 * @param {number=} opt_position for first level Group, you can precise the
 *     position to add the group in the array of layers of the dataLayerGroup.
 * @return {ol.layer.Base|ol.layer.Group} a new layer.
 * @public
 */
gmf.SyncLayertreeMap.prototype.createLayer = function(treeCtrl, map,
    dataLayerGroup, opt_position) {
  var layer;
  if (treeCtrl.node.children) {
    layer = this.createGroup_(treeCtrl, map, dataLayerGroup, opt_position);
  } else {
    layer = this.createLeaf_(treeCtrl, map);
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
gmf.SyncLayertreeMap.prototype.sync = function(map, treeCtrl) {
  var treeCtrls = [];
  ngeo.LayertreeController.getFlatTree(treeCtrl, treeCtrls);
  treeCtrls.forEach(function(item) {
    var layer = this.getLayer(item);
    if (layer instanceof ol.layer.Image || layer instanceof ol.layer.Tile) {
      this.updateLayerState_(layer, item);
    }
  }, this);
};


/**
 * Set the active state of a layer based on its treeCtrl state.
 * @param {ol.layer.Tile|ol.layer.Image} layer A layer.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @private
 */
gmf.SyncLayertreeMap.prototype.updateLayerState_ = function(layer, treeCtrl) {
  var active = treeCtrl.getState() === 'on';
  var source = layer.getSource();
  if (source instanceof ol.source.WMTS) {
    layer.setVisible(active);
  } else if (source instanceof ol.source.ImageWMS) {
    goog.asserts.assertInstanceof(layer, ol.layer.Image);
    var allPossibleWMSLayerParam = this.getAllPossibleWMSLayerParam(treeCtrl);
    allPossibleWMSLayerParam.reverse(); // Reverse to to keep order.
    var activeWMSLayerParam = layer.getVisible() ?
        source.getParams()['LAYERS'].split(',') : [];
    var thisNodeWMSLayerParam = treeCtrl.node.layers.split(',');
    var newWMSLayerParam = [];

    // Check one possible name after the other if it must be added in the new
    // WMSLayerParam. That keep the order of layers.
    allPossibleWMSLayerParam.forEach(function(possibleItem) {
      thisNodeWMSLayerParam.forEach(function(nodeItem) {
        // If the possible name is the current treeCtrl name and it's active
        // then add it.
        if (possibleItem === nodeItem) {
          if (active) {
            newWMSLayerParam.push(possibleItem);
          }
        } else {
          // If not but it's on the map, add it.
          if (activeWMSLayerParam.indexOf(possibleItem) > -1) {
            // Except if the name in one in the current TreeCtrl (it must pass
            // by the previous if).
            if (thisNodeWMSLayerParam.indexOf(possibleItem) < 0) {
              newWMSLayerParam.push(possibleItem);
            }
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
  var firstLevelTree = ngeo.LayertreeController.getFirstParentTree(treeCtrl);
  var treeCtrls = [];
  ngeo.LayertreeController.getFlatTree(firstLevelTree, treeCtrls);
  var WMSLayerParams = [];
  treeCtrls.forEach(function(item) {
    WMSLayerParams.push(item.node['layers']);
  });
  // join then split for group layers named "shop,bank".
  return WMSLayerParams.join(',').split(',');
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
 * @param {number=} opt_position for first level Group, you can precise the
 *     position to add the group in the array of layers of the dataLayerGroup.
 * @return {ol.layer.Image|ol.layer.Group} a new layer.
 * @private
 */
gmf.SyncLayertreeMap.prototype.createGroup_ = function(treeCtrl, map,
    dataLayerGroup, opt_position) {
  var groupNode = /** @type {GmfThemesGroup} */ (treeCtrl.node);
  var layer = null;
  var isFirstLevelGroup = treeCtrl.parent.isRoot;

  if (isFirstLevelGroup) { // First level group
    layer = this.createLayerFromGroup_(treeCtrl, !!groupNode.mixed);
    // Insert the layer at the right place
    var position = opt_position | 0;
    dataLayerGroup.getLayers().insertAt(position, layer);

  } else { // Other Groups, create a group layer only in mixed groups
    var inAMixedGroup = !this.isOneParentNotMixed_(treeCtrl);
    if (inAMixedGroup) {
      layer = this.createLayerFromGroup_(treeCtrl, true);
      var layerGroup = /** @type {ol.layer.Group} */ (
              this.getLayer(treeCtrl.parent));
      layerGroup.getLayers().insertAt(0, layer);
    }
  }
  return layer;
};


/**
 * Create, insert and return a layer group (for not mixed case) or a wmsLayer
 * for mixed case).
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @param {boolean} mixed True for a group layer, false for a WMS layer.
 * @return {ol.layer.Image|ol.layer.Group} a new layer.
 * @private
 */
gmf.SyncLayertreeMap.prototype.createLayerFromGroup_ = function(treeCtrl,
    mixed) {
  var layer;
  var groupNode = /** @type {GmfThemesGroup} */ (treeCtrl.node);
  if (mixed) { // Will be one ol.layer per each node.
    layer = this.layerHelper_.createBasicGroup();
  } else { // Will be one ol.layer for multiple WMS nodes.
    var timeParam = this.getTimeParam_(treeCtrl);
    var ogcServer = this.ogcServersObject_[groupNode.ogcServer || ''];
    goog.asserts.assert(ogcServer);
    goog.asserts.assert(ogcServer.url);
    goog.asserts.assert(ogcServer.type);
    layer = this.layerHelper_.createBasicWMSLayer(ogcServer.url, '',
            ogcServer.type, timeParam);
    layer.set('layerNodeName', groupNode.name); //Really useful ?
  }
  return layer;
};


/**
 * Create and insert (or update) a layer from a leaf.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @param {ol.Map} map A map that contains the group to insert the layer.
 * @return {ol.layer.Tile|ol.layer.Image|null} a new layer.
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
 * @return {ol.layer.Tile|ol.layer.Image} a new layer.
 * @private
 */
gmf.SyncLayertreeMap.prototype.createLeafInAMixedGroup_ = function(treeCtrl,
    map) {
  var leafNode = /** @type {GmfThemesLeaf} */ (treeCtrl.node);
  var layer;
  // Make layer.
  if (leafNode.type === 'WMTS') {
    layer = this.createWMTSLayer_(leafNode);
  } else {
    var timeParam = this.getTimeParam_(treeCtrl);
    var ogcServer = this.ogcServersObject_[leafNode.ogcServer || ''];
    goog.asserts.assert(ogcServer);
    goog.asserts.assert(ogcServer.url);
    goog.asserts.assert(ogcServer.type);
    goog.asserts.assert(leafNode.layers);
    layer = this.layerHelper_.createBasicWMSLayer(ogcServer.url,
            leafNode.layers, ogcServer.type, timeParam);
  }
  // Update layer information and tree state.
  layer.set('layerNodeName', leafNode.name); // Really useful ?
  this.updateLayerReferences_(leafNode, layer);
  var checked = leafNode.metadata.isChecked === true;
  if (checked) {
    treeCtrl.setState('on');
  }
  layer.setVisible(checked);
  // Insert layer in the map.
  var layerGroup = /** @type {ol.layer.Group} */ (this.getLayer(treeCtrl));
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
  var leafNode = /** @type {GmfThemesLeaf} */ (treeCtrl.node);
  var notMixedTreeCtrl = this.getFirstNotMixedParentTreeCtrl_(treeCtrl);
  goog.asserts.assert(notMixedTreeCtrl);
  var wmsLayer = /** @type {ol.layer.Image} */ (
          this.getLayer(notMixedTreeCtrl));
  goog.asserts.assertInstanceof(wmsLayer, ol.layer.Image);
  //Update layer information and tree state.
  this.updateLayerReferences_(leafNode, wmsLayer);
  if (leafNode.metadata.isChecked) {
    treeCtrl.setState('on');
    this.updateLayerState_(wmsLayer, treeCtrl);
  }
};


/**
 * Create and return a Tile layer.
 * @param {GmfThemesLeaf} leafNode A leaf node.
 * @return {ol.layer.Tile} a Tile WMTS layer. (Source and capabilities can come
 *     later).
 * @private
 */
gmf.SyncLayertreeMap.prototype.createWMTSLayer_ = function(leafNode) {
  var newLayer = new ol.layer.Tile();
  goog.asserts.assert(leafNode.url);
  goog.asserts.assert(leafNode.layer);
  this.layerHelper_.createWMTSLayerFromCapabilitites(leafNode.url,
        leafNode.layer, leafNode.dimensions).then(function(layer) {
          newLayer.setSource(layer.getSource());
          newLayer.set('capabilitiesStyles', layer.get('capabilitiesStyles'));
        });
  return newLayer;
};


/**
 * Update properties of a layer with the node of a given leafNode.
 * @param {GmfThemesLeaf} leafNode a leaf node.
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
 * Get the time parameter for a WMS Layer. If it's a group and it doesn't have
 * time, get the first time parameter available in any child.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @return {string|undefined} A wms time param.
 * @private
 */
gmf.SyncLayertreeMap.prototype.getTimeParam_ = function(treeCtrl) {
  var wmsTime;
  var timeParam;
  var node = treeCtrl.node;
  if (node.time) {
    wmsTime = node.time;
  } else if (node.children) {
    var treeCtrls = [];
    ngeo.LayertreeController.getFlatTree(treeCtrl, treeCtrls);
    treeCtrls.some(function(item) {
      if (item.node.time) {
        return wmsTime = item.node.time;
      }
    });
  }
  if (wmsTime) {
    var timeValues = this.gmfWMSTime_.getOptions(wmsTime)['values'];
    timeParam = this.gmfWMSTime_.formatWMSTimeParam(wmsTime, {
      start : timeValues[0] || timeValues,
      end : timeValues[1]
    });
  }
  return timeParam;
};

/**
 * Return the layer used by the given treeCtrl.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @return {ol.layer.Base} The layer.
 * @public
 */
gmf.SyncLayertreeMap.prototype.getLayer = function(treeCtrl) {
  var tree = treeCtrl;
  var layer = null;
  while (!tree.isRoot && layer === null) {
    if (tree.layer) {
      layer = tree.layer;
    }
    tree = tree.parent;
  }
  return layer;
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
 * Return the first parent, from the root parent, that is not mixed.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller.
 * @return {ngeo.LayertreeController} The first not mixed parent.
 * @private
 */
gmf.SyncLayertreeMap.prototype.getFirstNotMixedParentTreeCtrl_ = function(
    treeCtrl) {
  var tree = treeCtrl;
  var notMixedParent = null;
  while (!tree.isRoot) {
    if (tree.node.mixed === false) {
      notMixedParent = tree;
    }
    tree = tree.parent;
  }
  return notMixedParent;
};


gmf.module.service('gmfSyncLayertreeMap', gmf.SyncLayertreeMap);
