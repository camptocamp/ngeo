goog.provide('gmf.LayertreeController');
goog.provide('gmf.layertreeDirective');

goog.require('gmf');
goog.require('ngeo.CreatePopup');
goog.require('ngeo.LayerHelper');
goog.require('ngeo.LayertreeController');
goog.require('ol.Collection');
goog.require('ol.layer.Tile');


gmf.module.value('gmfLayertreeTemplate',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template.
     */
    function(element, attrs) {
      var subTemplateUrl = gmf.baseTemplateUrl + '/layertree.html';
      return '<div ngeo-layertree="gmfLayertreeCtrl.tree" ' +
          'ngeo-layertree-map="gmfLayertreeCtrl.map" ' +
          'ngeo-layertree-nodelayer="gmfLayertreeCtrl.getLayer(node, depth)" ' +
          'ngeo-layertree-listeners="gmfLayertreeCtrl.listeners(treeScope, ' +
          'treeCtrl)" ' +
          'ngeo-layertree-templateurl="' + subTemplateUrl + '"' +
          '</div>';
    });


// Overrides the path to the layertree template (used by each nodes, except
// the root node that path is defined by the gmfLayertreeTemplate value.
ngeo.module.value('ngeoLayertreeTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
    function(element, attrs) {
      return gmf.baseTemplateUrl + '/layertree.html';
    });


/**
 * This directive creates a layertree based on the c2cgeoportal JSON themes
 * source and a {@link ngeo.layertreeDirective}. The controller used by this
 * directive defines some fonctions for each node that are created by a default
 * template. This default template can be overrided by setting the constant
 * 'gmf.layertreeTemplateUrl' but you will must adapt the
 * ngeoLayertreeTemplateUrl value too (to define the children's nodes template
 * path).
 *
 * Example:
 *
 *      <gmf-layertree
 *        gmf-layertree-source="ctrl.source"
 *        gmf-layertree-map="ctrl.map"
 *      </gmf-layertree>
 *
 * You can add an attribute 'gmf-layertree-openlinksinnewwindow="true"' to open
 * metadata URLs in a new window. By default, and in the default template,
 * links will be opened in a popup.
 *
 * @htmlAttribute {Object} gmf-layertree-source One theme (JSON).
 * @htmlAttribute {ol.Map} gmf-layertree-map The map.
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     gmfLayertreeTemplate Template for the directive.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfLayertreeDirective
 */
gmf.layertreeDirective = function(gmfLayertreeTemplate) {
  return {
    scope: {
      'map': '=gmfLayertreeMap',
      'tree': '=gmfLayertreeSource',
      'openLinksInNewWindowFn': '&gmfLayertreeOpenlinksinnewwindow'
    },
    bindToController: true,
    controller: 'GmfLayertreeController',
    controllerAs: 'gmfLayertreeCtrl',
    template: gmfLayertreeTemplate
  };
};

gmf.module.directive('gmfLayertree', gmf.layertreeDirective);


/**
 * @param {angular.$http} $http Angular http service.
 * @param {angular.$sce} $sce Angular sce service.
 * @param {ngeo.CreatePopup} ngeoCreatePopup Popup service.
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {string} gmfWmsUrl URL to the wms service to use by default.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname gmfLayertreeController
 */
gmf.LayertreeController = function($http, $sce, ngeoCreatePopup,
    ngeoLayerHelper, gmfWmsUrl) {

  /**
   * @private
   * @type {angular.$http}
   */
  this.$http_ = $http;

  /**
   * @private
   * @type {angular.$sce}
   */
  this.$sce_ = $sce;

  /**
   * @type {string}
   * @private
   */
  this.gmfWmsUrl_ = gmfWmsUrl;

  /**
   * @type {ngeo.LayerHelper}
   * @private
   */
  this.layerHelper_ = ngeoLayerHelper;

  /**
   * @private
   * @type {ngeo.Popup}
   */
  this.infoPopup_ = ngeoCreatePopup();

  /**
   * @type {Object.<string, !angular.$q.Promise>}
   * @private
   */
  this.promises_ = {};

  /**
   * @type {Object.<number, Array.<string>>}
   * @private
   */
  this.groupNodeStates_ = {};

  /**
   * @type {boolean}
   * @export
   */
  this.openLinksInNewWindow = this['openLinksInNewWindowFn']() === true ?
      true : false;

  /**
   * @type {ol.layer.Group}
   * @private
   */
  this.dataLayerGroup_ = this.layerHelper_.getGroupFromMap(this.map,
        gmf.LayertreeController.DATALAYERGROUP_NAME);
};


/**
 * @const
 */
gmf.LayertreeController.DATALAYERGROUP_NAME = 'data';


/**
 * @const
 */
gmf.LayertreeController.TYPE_MIXEDGROUP = 'MixedGroup';


/**
 * @const
 */
gmf.LayertreeController.TYPE_NOTMIXEDGROUP = 'NotMixedGroup';


/**
 * @const
 */
gmf.LayertreeController.TYPE_WMTS = 'WMTS';


/**
 * @const
 */
gmf.LayertreeController.TYPE_EXTERNALWMS = 'externalWMS';


/**
 * @const
 */
gmf.LayertreeController.TYPE_WMS = 'WMS';


/**
 * Return a "type" that defines the node.
 * @param {GmfThemesNode} node Layer tree node.
 * @return {string} A type.
 * @private
 */
gmf.LayertreeController.prototype.getNodeType_ = function(node) {
  var children = node.children;
  var mixed = node.mixed;
  if (node.children !== undefined && mixed) {
    return gmf.LayertreeController.TYPE_MIXEDGROUP;
  }
  if (children !== undefined && !mixed) {
    return gmf.LayertreeController.TYPE_NOTMIXEDGROUP;
  }
  if (node.type === 'WMTS') {
    return gmf.LayertreeController.TYPE_WMTS;
  }
  if (goog.isDefAndNotNull(node.url)) {
    return gmf.LayertreeController.TYPE_EXTERNALWMS;
  }
  return gmf.LayertreeController.TYPE_WMS;
};


/**
 * Create and return a layer corresponding to the ngeo layertree's node.
 * This function will only create a layer for each "top-level" (depth 1) groups.
 *
 * On "not mixed" type nodes, the returned layer will be an ol.layer.Image (WMS)
 * with each name of node's children as LAYERS parameters.
 *
 * On "mixed" type node, the returned  layer will be an ol.layer.Group with
 * a collection of layers that corresponds to each children of the node.
 *
 * All layer created will receive:
 *  - A 'querySourceId' parameter with the node id as value.
 *  - A 'layerName' parameter with the node name as value.
 *
 * All layer created will be added at the top of the map and with a Z Index
 * value of 1.
 *
 * If the node metadata 'isChecked' value is false, the layer visibility will
 * be set to false.
 * @param {GmfThemesNode} node Layer tree node.
 * @param {number=} opt_depth ngeo layertree node depth.
 * @param {boolean=} opt_createWMS True to allow create wms layer.
 * @return {ol.layer.Base} The OpenLayers layer or group for the node.
 * @export
 */
gmf.LayertreeController.prototype.getLayer = function(node, opt_depth,
        opt_createWMS) {
  var type = this.getNodeType_(node);
  var layer = null;

  if (opt_depth === 1) {
    switch (type) {
      case gmf.LayertreeController.TYPE_MIXEDGROUP:
        return this.getLayerCaseMixedGroup_(node);
      case gmf.LayertreeController.TYPE_NOTMIXEDGROUP:
        layer = this.getLayerCaseNotMixedGroup_(node);
        break;
      // no default
    }
    switch (type) {
      case gmf.LayertreeController.TYPE_WMTS:
        layer = this.getLayerCaseWMTS_(node);
        break;
      case gmf.LayertreeController.TYPE_WMS:
      case gmf.LayertreeController.TYPE_EXTERNALWMS:
        var url = node.url || this.gmfWmsUrl_;
        layer = opt_createWMS ?
            this.layerHelper_.createBasicWMSLayer(url, node.name) : null;
        break;
      // no default
    }
  }

  if (goog.isDefAndNotNull(layer)) {
    var ids = this.getNodeIds_(node);
    layer.set('querySourceIds', ids);
    layer.set('layerName', node.name);

    this.dataLayerGroup_.getLayers().insertAt(0, layer);

    // If layer is 'unchecked', set it to invisible.
    var metadata = node.metadata;
    if (node.children === undefined && goog.isDefAndNotNull(metadata)) {
      if (metadata['isChecked'] != 'true') {
        layer.setVisible(false);
      }
    }
  }

  return layer;
};


/**
 * Create an ol.layer.Group with all node's children as layers except others
 * groups.
 * @param {GmfThemesNode} node Layer tree node.
 * @return {ol.layer.Group} Layer group.
 * @private
 */
gmf.LayertreeController.prototype.getLayerCaseMixedGroup_ = function(node) {
  var i;
  var layers = new ol.Collection();
  var layer, subNode;
  var subNodes = [];
  var nodeNames = [];
  this.getFlatNodes_(node, subNodes);
  for (i = 0; i < subNodes.length; i++) {
    subNode = subNodes[i];
    // Create all sublayers include wms layers;
    layer = this.getLayer(subNode, 1, true);
    if (goog.isDefAndNotNull(layer)) {
      layers.push(layer);
      nodeNames.push(subNode.name);
    }
  }
  var group = this.layerHelper_.createBasicGroup(layers);

  // Keep a reference to this group.
  this.groupNodeStates_[goog.getUid(group)] = [];
  return group;
};


/**
 * Create an ol.layer.Image with all node's children as LAYERS params.
 * @param {GmfThemesNode} node Layer tree node.
 * @return {ol.layer.Image} Image layer.
 * @private
 */
gmf.LayertreeController.prototype.getLayerCaseNotMixedGroup_ = function(node) {
  var names = this.retrieveNodeNames_(node, true);
  var url = node.url || this.gmfWmsUrl_;
  var layer = this.layerHelper_.createBasicWMSLayer(url, '');
  this.updateWMSLayerState_(layer, names);

  // Keep a reference to this group with all layer name inside.
  this.groupNodeStates_[goog.getUid(layer)] = [];

  return layer;
};


/**
 * Create an ol.layer.Tile layer.
 * @param {GmfThemesNode} node Layertree node.
 * @return {ol.layer.Tile} The OpenLayers layer or group for the node.
 * @private
 */
gmf.LayertreeController.prototype.getLayerCaseWMTS_ = function(node) {
  var newLayer = new ol.layer.Tile();
  this.layerHelper_.createWMTSLayerFromCapabilitites(node.url || '', node.name)
    .then(function(layer) {
      newLayer.setSource(layer.getSource());
      newLayer.set('capabilitiesStyles', layer.get('capabilitiesStyles'));
    });
  return newLayer;
};


/**
 * Fill the given "nodes" array with all node in the given node including the
 * given node itself.
 * @param {GmfThemesNode} node Layertree node.
 * @param {Array.<GmfThemesNode>} nodes An array.
 * @private
 */
gmf.LayertreeController.prototype.getFlatNodes_ = function(node, nodes) {
  var i;
  var children = node.children;
  if (children !== undefined) {
    for (i = 0; i < children.length; i++) {
      this.getFlatNodes_(children[i], nodes);
    }
  } else {
    nodes.push(node);
  }
};


/**
 * Return all names existing in a node and in its children.
 * @param {GmfThemesNode} node Layer tree node.
 * @param {boolean=} opt_onlyChecked return only 'isChecked' node names.
 * @return {Array.<string>} An Array of all nodes names.
 * @private
 */
gmf.LayertreeController.prototype.retrieveNodeNames_ = function(node,
    opt_onlyChecked) {
  var names = [];
  var nodes = [];
  this.getFlatNodes_(node, nodes);
  var metadata, n, i;
  for (i = 0; i < nodes.length; i++) {
    n = nodes[i];
    metadata = n.metadata;
    if (!opt_onlyChecked ||
        (goog.isDefAndNotNull(metadata) && metadata['isChecked'] != 'false')) {
      names.push(n.name);
    }
  }
  return names;
};


/**
 * Retrieve the "top level" layertree.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {ngeo.LayertreeController} the top level layertree.
 * @private
 */
gmf.LayertreeController.prototype.retrieveFirstParentTree_ = function(treeCtrl) {
  var tree = treeCtrl;
  while (tree.depth > 1) {
    tree = tree.parent;
  }
  return tree;
};


/**
 * Remove layer from this component's layergroup (and then, from the map) on
 * a ngeo layertree destroy event.
 * @param {angular.Scope} scope treeCtrl scope.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @export
 */
gmf.LayertreeController.prototype.listeners = function(scope, treeCtrl) {
  var dataLayerGroup = this.dataLayerGroup_;
  scope.$on('$destroy', function() {
    // Remove the layer from the map.
    dataLayerGroup.getLayers().remove(treeCtrl.layer);
  }.bind(treeCtrl));
};


/**
 * Return 'outOfResolution' if the current resolution of the map is out of
 * the min/max resolution in the node.
 * @param {GmfThemesNode} node Layer tree node.
 * @return {?string} 'outOfResolution' or null.
 * @export
 */
gmf.LayertreeController.prototype.getResolutionStyle = function(node) {
  var style;
  var resolution = this.map.getView().getResolution();
  var maxExtent = node.maxResolutionHint;
  var minExtent = node.minResolutionHint;
  if (minExtent !== undefined && resolution < minExtent ||
      maxExtent !== undefined && resolution > maxExtent) {
    style = 'outOfResolution';
  }
  return style || null;
};


/**
 * Toggle the state of treeCtrl's node.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @export
 */
gmf.LayertreeController.prototype.toggleActive = function(treeCtrl) {
  var node = /** @type {GmfThemesNode} */ (treeCtrl.node);
  var type = this.getNodeType_(node);
  var layer = treeCtrl.layer;
  var i, layers, nodeNames;
  var firstParentTree = this.retrieveFirstParentTree_(treeCtrl);
  var firstParentTreeLayer = firstParentTree.layer;
  // Check if the current node state is 'activated'.
  var isActive = (this.getNodeState(treeCtrl) === 'on') ? true : false;

  // Deactivate/activate the corresponding layer(s).
  switch (type) {
    case gmf.LayertreeController.TYPE_WMS:
    case gmf.LayertreeController.TYPE_WMTS:
    case gmf.LayertreeController.TYPE_EXTERNALWMS:

      if (firstParentTreeLayer instanceof ol.layer.Group) {
        layer.setVisible(!isActive);

      } else {
        // If layer of the group is a wms in a not mixed group:
        var firstParentTreeSource = /** @type {ol.source.ImageWMS} */
            (firstParentTreeLayer.getSource());
        var firstParentTreeNode =  /** @type {GmfThemesNode} */
            (firstParentTree.node);
        var currentLayersNames = (firstParentTreeLayer.getVisible()) ?
            firstParentTreeSource.getParams()['LAYERS'].split(',') : [];
        var name, newLayersNames = [];
        nodeNames = this.retrieveNodeNames_(firstParentTreeNode);
        // Add/remove layer and keep order of layers in layergroup.
        for (i = 0; i < nodeNames.length; i++) {
          name = nodeNames[i];
          if (name === node.name) {
            if (!isActive) {
              newLayersNames.push(name);
            }
          } else if (currentLayersNames.indexOf(name) >= 0) {
            newLayersNames.push(name);
          }
        }
        goog.asserts.assertInstanceof(firstParentTreeLayer, ol.layer.Image);
        this.updateWMSLayerState_(firstParentTreeLayer, newLayersNames);
      }
      break;

    case gmf.LayertreeController.TYPE_MIXEDGROUP:
      var nodeLayers = [];
      var l, source;
      nodeNames = this.retrieveNodeNames_(node);
      layers = this.layerHelper_.getFlatLayers(firstParentTreeLayer);
      for (i = 0; i < layers.length; i++) {
        l = layers[i];
        source = layers[i].getSource();
        if (source instanceof ol.source.WMTS) {
          if (nodeNames.indexOf(source.getLayer()) >= 0) {
            nodeLayers.push(l);
          }
        } else if (source instanceof ol.source.ImageWMS) {
          if (nodeNames.indexOf(source.getParams()['LAYERS']) >= 0) {
            nodeLayers.push(l);
          }
        }
      }
      for (i = 0; i < nodeLayers.length; i++) {
        nodeLayers[i].setVisible(!isActive);
      }
      break;

    case gmf.LayertreeController.TYPE_NOTMIXEDGROUP:
      nodeNames = this.retrieveNodeNames_(node);
      source = /** @type {ol.source.ImageWMS} */
          (firstParentTreeLayer.getSource());
      layers = firstParentTreeLayer.getVisible() ?
          source.getParams()['LAYERS'].split(',') : [];
      if (isActive) {
        for (i = 0; i < nodeNames.length; i++) {
          goog.array.remove(layers, nodeNames[i]);
        }
      } else {
        for (i = 0; i < nodeNames.length; i++) {
          goog.array.insert(layers, nodeNames[i]);
        }
      }
      firstParentTreeLayer = /** @type {ol.layer.Image} */
          (firstParentTreeLayer);
      this.updateWMSLayerState_(firstParentTreeLayer, layers);
      break;
    // no default
  }
};


/**
 * Return the current state of the given treeCtrl's node.
 * Return a class name that match with the current node activation state.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {string} 'on' or 'off' or 'indeterminate'.
 * @export
 */
gmf.LayertreeController.prototype.getNodeState = function(treeCtrl) {
  var style;
  var layer = treeCtrl.layer;
  var node = /** @type {GmfThemesNode} */ (treeCtrl.node);
  var type = this.getNodeType_(node);
  var firstParentTree = this.retrieveFirstParentTree_(treeCtrl);
  var firstParentTreeLayer = firstParentTree.layer;
  var firstParentTreeSource;
  var currentLayersNames = this.groupNodeStates_[
      goog.getUid(firstParentTreeLayer)];

  switch (type) {
    case gmf.LayertreeController.TYPE_WMS:
    case gmf.LayertreeController.TYPE_WMTS:
    case gmf.LayertreeController.TYPE_EXTERNALWMS:
      if (firstParentTreeLayer instanceof ol.layer.Group) {
        // If layer is not define (That occures the first time, because the
        // layer is just in the first parent group) add it to current tree to
        // save time next.
        if (!goog.isDefAndNotNull(layer)) {
          this.addLayerToLeaf_(treeCtrl);
          layer = treeCtrl.layer;
        }
        // Get style of this node depending if the relative layer is visible.
        style = goog.isDefAndNotNull(layer) && layer.getVisible() ?
            'on' : 'off';

      } else {
        // If layer of the group is a wms in a not mixed group:
        firstParentTreeSource = /** @type {ol.source.ImageWMS} */
            (firstParentTreeLayer.getSource());
        var layersNames =
            firstParentTreeSource.getParams()['LAYERS'].split(',');
        // Get style for this layer depending if the layer is on the map or not
        // and if the layer is visible;
        style = layersNames.indexOf(node.name) < 0 ||
            !firstParentTreeLayer.getVisible() ? 'off' : 'on';
      }

      // Update group state
      if (style === 'on') {
        goog.array.insert(currentLayersNames, node.name);
      } else {
        goog.array.remove(currentLayersNames, node.name);
      }

      break;

    case gmf.LayertreeController.TYPE_MIXEDGROUP:
    case gmf.LayertreeController.TYPE_NOTMIXEDGROUP:
      var nodeNames = this.retrieveNodeNames_(node);
      var i, found = 0;
      for (i = 0; i < nodeNames.length; i++) {
        if (currentLayersNames.indexOf(nodeNames[i]) >= 0) {
          found++;
        }
      }
      if (found === 0) {
        style = 'off';
      } else if (found === nodeNames.length) {
        style = 'on';
      } else {
        style = 'indeterminate';
      }
      break;
    // no default
  }
  return style || 'off';
};


/**
 * Get the layer corresponding to the given layertree node from the layer
 * group "top level" layertree and add this layer to the given layertree.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @private
 */
gmf.LayertreeController.prototype.addLayerToLeaf_ = function(treeCtrl) {
  var groupTree = this.retrieveFirstParentTree_(treeCtrl);
  var layers = this.layerHelper_.getFlatLayers(groupTree.layer);
  var node = treeCtrl.node;
  var source, l, i;
  for (i = 0; i < layers.length; i++) {
    l = layers[i];
    source = l.getSource();
    if (source instanceof ol.source.WMTS &&
        source.getLayer() === node.name) {
      treeCtrl.layer = l;
      break;
    } else if (source instanceof ol.source.ImageWMS &&
        source.getParams()['LAYERS'] === node.name) {
      treeCtrl.layer = l;
      break;
    }
  }
};


/**
 * Update the LAYERS parameter of the source of the given WMS layer.
 * @param {ol.layer.Image} layer The WMS layer.
 * @param {Array.<string>} names The array of names that will be used to set
 * the LAYERS parameter.
 * @private
 */
gmf.LayertreeController.prototype.updateWMSLayerState_ = function(layer,
    names) {
  // Don't send layer without parameters, hide layer instead;
  if (names.length <= 0) {
    layer.setVisible(false);
  } else {
    layer.setVisible(true);
    names.reverse();
    var source = /** @type {ol.source.ImageWMS} */ (layer.getSource());
    source.updateParams({'LAYERS': names.join(',')});
  }
};


/**
 * Get the icon image URL for the given treeCtrl's layer. It can only return a
 * string for internal WMS layers without multiple childlayers in the node.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {?string} The icon legend URL or null.
 * @export
 */
gmf.LayertreeController.prototype.getLegendIconURL = function(treeCtrl) {
  var node = /** @type {GmfThemesNode} */ (treeCtrl.node);
  var opt_legendRule = node.metadata['legendRule'];

  if (node.children !== undefined ||
      opt_legendRule === undefined ||
      node.type === 'WMTS' ||
      node.type === 'external WMS' ||
      node.childLayers !== undefined && node.childLayers.length > 1) {
    return null;
  }

  return this.getWMSLegendURL_(node, opt_legendRule);
};


/**
 * Get the legend URL for the given treeCtrl.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {?string} The legend URL or null.
 * @export
 */
gmf.LayertreeController.prototype.getLegendURL = function(treeCtrl) {
  var node = /** @type {GmfThemesNode} */ (treeCtrl.node);

  if (node.children !== undefined) {
    return null;
  }

  var layer = treeCtrl.layer;
  if (node.type === 'WMTS' && goog.isDefAndNotNull(layer)) {
    goog.asserts.assertInstanceof(layer, ol.layer.Tile);
    return this.getWMTSLegendURL_(layer);
  } else {
    return this.getWMSLegendURL_(node);
  }
};


/**
 * Get the WMTS legend URL for the given layer.
 * @param {ol.layer.Tile} layer Tile layer as returned by the
 * gmf layerHelper service.
 * @return {?string} The legend URL or null.
 * @private
 */
gmf.LayertreeController.prototype.getWMTSLegendURL_ = function(layer) {
  // FIXME case of multiple styles ?  case of multiple legendUrl ?
  var url;
  var styles = layer.get('capabilitiesStyles');
  if (styles !== undefined) {
    var legendURL = styles[0]['legendURL'];
    if (legendURL !== undefined) {
      url = legendURL[0]['href'];
    }
  }
  return url || null;
};


/**
 * Get the WMS legend URL for the given node.
 * @param {GmfThemesNode} node Layer tree node.
 * @param {string=} opt_legendRule rule parameters to add to the returned URL.
 * @return {?string} The legend URL or null.
 * @private
 */
gmf.LayertreeController.prototype.getWMSLegendURL_ = function(node,
    opt_legendRule) {
  var scale = this.getScale_();
  var url = node.url || this.gmfWmsUrl_;
  if (url !== undefined) {
    url = goog.uri.utils.setParam(url, 'FORMAT', 'image/png');
    url = goog.uri.utils.setParam(url, 'TRANSPARENT', true);
    url = goog.uri.utils.setParam(url, 'SERVICE', 'wms');
    url = goog.uri.utils.setParam(url, 'VERSION', '1.1.1');
    url = goog.uri.utils.setParam(url, 'REQUEST', 'GetLegendGraphic');
    url = goog.uri.utils.setParam(url, 'LAYER', node.name);
    url = goog.uri.utils.setParam(url, 'SCALE', scale);
    if (opt_legendRule !== undefined) {
      url = goog.uri.utils.setParam(url, 'RULE', opt_legendRule);
    }
  }
  return url || null;
};


/**
 * Return the current scale of the map.
 * @return {number} Scale.
 * @private
 */
gmf.LayertreeController.prototype.getScale_ = function() {
  var view = this.map.getView();
  var resolution = view.getResolution();
  var mpu = view.getProjection().getMetersPerUnit();
  var dpi = 25.4 / 0.28;
  return resolution * mpu * 39.37 * dpi;
};


/**
 * Display a ngeo.infoPopup with the content of the metadata url of a node.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @export
 */
gmf.LayertreeController.prototype.displayMetadata = function(treeCtrl) {
  var treeUid = treeCtrl['uid'].toString();
  var node = treeCtrl.node;
  var metadataURL = node.metadata['metadataUrl'];
  if (metadataURL !== undefined) {
    if (!(treeUid in this.promises_)) {
      this.promises_[treeUid] = this.$http_.get(metadataURL).then(
          function(resp) {
            var html = this.$sce_.trustAsHtml(resp.data);
            return html;
          }.bind(this));
    }
    var infoPopup = this.infoPopup_;
    this.promises_[treeUid].then(function(html) {
      infoPopup.setTitle(node.name);
      infoPopup.setContent(html);
      infoPopup.setOpen(true);
    });
  }
};


/**
 * Return 'noSource' if no source is defined in the given treeCtrl's WMTS layer.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {?string} 'noSource' or null
 * @export
 */
gmf.LayertreeController.prototype.getNoSourceStyle = function(treeCtrl) {
  var layer = treeCtrl.layer;
  if (layer !== undefined &&
      layer instanceof ol.layer.Tile &&
      layer.getSource !== undefined &&
      !goog.isDefAndNotNull(layer.getSource())) {
    return 'noSource';
  }
  return null;
};


/**
 * Set the resolution of the map with the max or min resolution of the node.
 * @param {GmfThemesNode} node Layer tree node.
 * @export
 */
gmf.LayertreeController.prototype.zoomToResolution = function(node) {
  var view = this.map.getView();
  var resolution = node.minResolutionHint || node.maxResolutionHint;
  if (resolution !== undefined) {
    view.setResolution(resolution);
  }
};


/**
 * Collect and return all ids of this node and all child nodes as well.
 * @param {GmfThemesNode} node Layer tree node.
 * @return {Array.<number|string>} Layer names.
 * @private
 */
gmf.LayertreeController.prototype.getNodeIds_ = function(node) {
  var ids = [];
  var children = node.children || node;
  if (children && children.length) {
    children.forEach(function(childNode) {
      ids = ids.concat(this.getNodeIds_(childNode));
    }, this);
  } else if (node.id !== undefined) {
    ids.push(node.id);
  }
  return ids;
};


gmf.module.controller('GmfLayertreeController', gmf.LayertreeController);
