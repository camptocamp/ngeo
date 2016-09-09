goog.provide('gmf.SyncLayertreeMap');

goog.require('gmf');


/**
 * TODO
 *
 * @constructor
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @ngInject
 * @ngdoc service
 * @ngname gmfSyncLayertreeMap
 */
gmf.SyncLayertreeMap = function(ngeoLayerHelper) {

  /**
   * @type {ngeo.LayerHelper}
   * @private
   */
  this.layerHelper_ = ngeoLayerHelper;
};


/**
 * TODO
 * @param {Object} firstLevelGroup TODO.
 * @export
 */
gmf.SyncLayertreeMap.prototype.createLayers = function(firstLevelGroup) {
  console.log('TODO');
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
  this.getFlatTree_(firstLevelTreeCtrl, treeCtrls);
  treeCtrls.forEach(function(treeCtrl) {
    var layer = this.getLayerById(map, treeCtrl);
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
gmf.SyncLayertreeMap.prototype.getLayerById = function(map, treeCtrl) {
  var layersArray = map.getLayerGroup().getLayersArray();
  var id = treeCtrl.node.id;
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
  } else if(source instanceof ol.source.ImageWMS) {

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
  this.getFlatTree_(firstLevelTree, treeCtrls);
  var WMSLayerParams = [];
  treeCtrls.forEach(function(item) {
    WMSLayerParams.push(item.node['layers']);
  });
  // join then split for group layers named "shop,bank".
  return WMSLayerParams.join(',').split(',');
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
 * @param {GmfThemesNode} node Layertree node.
 * @param {Array.<GmfThemesNode>} nodes An array.
 * @export
 */
gmf.SyncLayertreeMap.prototype.getFlatTree_ = function(treeCtrl, treeCtrls) {
  var children = treeCtrl.children;
  if (children.length > 0) {
    children.forEach(function(child) {
      this.getFlatTree_(child, treeCtrls);
    }, this);
  } else {
    treeCtrls.push(treeCtrl);
  }
};

gmf.module.service('gmfSyncLayertreeMap', gmf.SyncLayertreeMap);
