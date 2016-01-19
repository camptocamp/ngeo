goog.provide('gmf.GetLayerForCatalogNode');

goog.require('gmf');
goog.require('ngeo.LayerHelper');
goog.require('ol.Collection');
goog.require('ol.layer.Tile');


/**
 * @typedef {function(GmfThemesNode):ol.layer.Base}
 */
gmf.GetLayerForCatalogNode;


/**
 * @type {Array.<ol.layer.Base>}
 * @private
 */
gmf.layerCache_ = [];


/**
 * Function returning a function used to get the layer object for a catalog
 * tree node.
 **
 * @param {string} gmfWmsUrl The default wms url.
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @return {gmf.GetLayerForCatalogNode} The getLayerForCatalogNode function.
 *
 * @ngInject
 * @ngdoc service
 * @ngname gmfGetLayerForCatalogNode
 */
gmf.getLayerForCatalogNode = function(gmfWmsUrl, ngeoLayerHelper) {
  return getLayerForCatalogNode;

  /**
   * Create and return a layer corresponding to the ngeo layertree's node.
   * Currently only creates WMS layers (internal or external) and WMTS layers.
   * @param {GmfThemesNode} node Catalog tree node.
   * @return {ol.layer.Base} OpenLayers layer.
   */
  function getLayerForCatalogNode(node) {
    var layer;
    var layerName = node.name;
    var layerURL = node.url || gmfWmsUrl;
    var i, children = node.children;

    // If node is a group.
    if (goog.isDef(children)) {
      var layers = new ol.Collection();
      for (i = 0; i < children.length; i++) {
        layers.push(getLayerForCatalogNode(children[i]));
      }
      return ngeoLayerHelper.createBasicGroup(layers);
    }

    goog.asserts.assert(goog.isDefAndNotNull(layerName));

    // If node describes a layer that was already created.
    layer = ngeoLayerHelper.findLayer(gmf.layerCache_,
        ngeoLayerHelper.makeHelperID(layerURL, layerName));
    if (goog.isDefAndNotNull(layer)) {
      return layer;
    }

    // If node describes a layer that was not already created.
    if (node.type === 'WMTS') {
      var newLayer = new ol.layer.Tile();
      ngeoLayerHelper.setHelperID(newLayer, layerURL, layerName);
      var promise = ngeoLayerHelper.createWMTSLayerFromCapabilitites(layerURL,
          layerName);
      promise.then(function(layer) {
        if (goog.isDef(layer)) {
          newLayer.setSource(layer.getSource());
          newLayer.set('capabilitiesStyles', layer.get('capabilitiesStyles'));
        }
      });
      layer = newLayer;
    } else {
      layer = ngeoLayerHelper.createBasicWMSLayer(layerURL, layerName);
    }

    layer.set('label', node.name);
    layer.set('metadata', node.metadata);

    gmf.layerCache_.push(layer);

    return layer;
  }
};

gmfModule.factory('gmfGetLayerForCatalogNode', gmf.getLayerForCatalogNode);
