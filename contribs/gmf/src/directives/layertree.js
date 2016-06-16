goog.provide('gmf.LayertreeController');
goog.provide('gmf.layertreeDirective');

goog.require('ngeo.SyncArrays');
goog.require('gmf');
goog.require('gmf.Themes');
goog.require('gmf.TreeManager');
goog.require('ngeo.CreatePopup');
goog.require('ngeo.LayerHelper');
goog.require('ngeo.LayertreeController');
goog.require('ol.array');
goog.require('ol.layer.Tile');

/** @suppress {extraRequire} */
goog.require('ngeo.popoverDirective');

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
          'ngeo-layertree-nodelayer="gmfLayertreeCtrl.getLayer(node, parentCtrl, depth)" ' +
          'ngeo-layertree-listeners="gmfLayertreeCtrl.listeners(treeScope, treeCtrl)" ' +
          'ngeo-layertree-templateurl="' + subTemplateUrl + '">' +
          '</div>';
    });


// Overrides the path to the layertree template (used by each node, except
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
 * directive defines some functions for each node that are created by a default
 * template. This default template can be overrided by setting the constant
 * 'gmf.layertreeTemplateUrl' but you will have to adapt the
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
 * Used UI metadata:
 *
 *  * isChecked: if 'false' the layer visibility will be set to false.
 *  * legendRule: WMS rule used to get a layer icon.
 *  * isLegendExpanded: if 'true' the legend is expanded by default.
 *  * metadataUrl: Display a popup with the content of the given URL if
 *    possible also open a new window.
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
 * @param {!angular.Scope} $scope Angular scope.
 * @param {ngeo.CreatePopup} ngeoCreatePopup Popup service.
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {string} gmfWmsUrl URL to the wms service to use by default.
 * @param {gmf.TreeManager} gmfTreeManager gmf Tree Manager service.
 * @param {ngeo.SyncArrays} ngeoSyncArrays ngeoSyncArrays service.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname gmfLayertreeController
 */
gmf.LayertreeController = function($http, $sce, $scope, ngeoCreatePopup,
    ngeoLayerHelper, gmfWmsUrl, gmfTreeManager, ngeoSyncArrays) {

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
   * @type {gmf.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;

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
        gmf.DATALAYERGROUP_NAME);

  /**
   * @type Array.<ol.layer.Base>
   * @export
   */
  this.layers = [];

  ngeoSyncArrays(this.dataLayerGroup_.getLayers().getArray(), this.layers, true, $scope, function() {
    return true;
  });

  // watch any change on layers array to refresh the map
  $scope.$watchCollection(function() {
    return this.layers;
  }.bind(this),
  function() {
    this.map.render();
  }.bind(this));
};

/**
 * LayertreeController.prototype.prepareLayer_ - inject metadata into the layer
 * @private
 * @param {GmfThemesNode} node Layer tree node.
 * @param {ol.layer.Base} layer The OpenLayers layer or group for the node.
 */
gmf.LayertreeController.prototype.prepareLayer_ = function(node, layer) {
  var type = gmf.Themes.getNodeType(node);
  var ids =  gmf.LayertreeController.getLayerNodeIds(node);
  layer.set('querySourceIds', ids);
  layer.set('layerName', node.name);
  layer.set('disclaimers', this.getNodeDisclaimers_(node));

  var isMerged = type === gmf.Themes.NodeType.NOT_MIXED_GROUP;
  layer.set('isMerged', isMerged);

  // If layer is 'unchecked', set it to invisible.
  var metadata = node.metadata;
  if (node.children === undefined && goog.isDefAndNotNull(metadata)) {
    if (!metadata['isChecked']) {
      layer.setVisible(false);
    }
  }
};


/**
 * Create and return a layer corresponding to the ngeo layertree's node.
 * This function will only create a layer for each "top-level" (depth 1) groups.
 *
 * On "not mixed" type nodes, the returned layer will be an ol.layer.Image (WMS)
 * with each name of node's children as LAYERS parameters.
 *
 * On "mixed" type node, the returned  layer will be an ol.layer.Group
 *
 * If the parent node is "mixed", the child layer freshly created will be added to it
 *
 * All layer created will receive:
 *  - A 'querySourceId' parameter with the node id as value.
 *  - A 'layerName' parameter with the node name as value.
 *
 * All layer created will be added at the top of the map and with a Z Index
 * value of 1.
 *
 * If the node metadata 'isChecked' value is 'true', the layer visibility will
 * be set to true.
 * @param {GmfThemesNode} node Layer tree node.
 * @param {ngeo.LayertreeController} parentCtrl parent controller of the node
 * @param {number} depth ngeo layertree node depth.
 * @return {ol.layer.Base} The OpenLayers layer or group for the node.
 * @export
 */
gmf.LayertreeController.prototype.getLayer = function(node, parentCtrl, depth) {
  var type = gmf.Themes.getNodeType(node);
  var layer = null;

  if (depth === 1) {
    switch (type) {
      case gmf.Themes.NodeType.MIXED_GROUP:
        layer = this.getLayerCaseMixedGroup_(node);
        break;
      case gmf.Themes.NodeType.NOT_MIXED_GROUP:
        layer = this.getLayerCaseNotMixedGroup_(node);
        this.prepareLayer_(node, layer);
        break;
      default:
        throw new Error('node wrong type: ' + type);
    }
    this.dataLayerGroup_.getLayers().insertAt(0, layer);
    return layer;
  }

  //depth > 1 && parent is not a MIXED_GROUP;
  if (!parentCtrl || gmf.Themes.getNodeType(parentCtrl['node']) !== gmf.Themes.NodeType.MIXED_GROUP) {
    return null;
  }
  //depth > 1 && parent is a MIXED group
  switch (type) {
    case gmf.Themes.NodeType.MIXED_GROUP:
      layer = this.getLayerCaseMixedGroup_(node);
      break;
    case gmf.Themes.NodeType.NOT_MIXED_GROUP:
      layer = this.getLayerCaseNotMixedGroup_(node);
      this.prepareLayer_(node, layer);
      break;
    case gmf.Themes.NodeType.WMTS:
      layer = this.getLayerCaseWMTS_(node);
      break;
    case gmf.Themes.NodeType.WMS:
      var url = node.url || this.gmfWmsUrl_;
      var time = this.nodeTimeToISO_(node);
      layer = this.layerHelper_.createBasicWMSLayer(url, node.layers,
              node.serverType, time);
      break;
    default:
      throw new Error('node wrong type: ' + type);
  }
  this.prepareLayer_(node, layer);
  parentCtrl['layer'].getLayers().push(layer);
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
  var group = this.layerHelper_.createBasicGroup();
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
  var childs = [];
  var timeParam;

  this.getFlatNodes_(node, childs);
  var layersNames = childs.map(function(node) {
    return node['layers'];
  }).join(',');
  var url = node.url || this.gmfWmsUrl_;
  var serverType = node.children[0]['serverType'];
  var nodes = [node].concat(childs);
  var nodesWithTime = nodes.filter(hasTime);
  if (nodesWithTime.length) {
    timeParam = this.nodeTimeToISO_(nodesWithTime[0]);
  }

  var layer = this.layerHelper_.createBasicWMSLayer(url, layersNames, serverType, timeParam);
  // Keep a reference to this group with all layer name inside.
  this.groupNodeStates_[goog.getUid(layer)] = [];

  /**
   * hasTime - filter function to get node with time param
   * @param  {GmfThemesNode} node the tested node
   * @return {boolean} node with a time parameter
   */
  function hasTime(node) {
    return node.time && node.time['minValue'];
  }

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
        (goog.isDefAndNotNull(metadata) && metadata['isChecked'])) {
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
 * Return 'out-of-resolution' if the current resolution of the map is out of
 * the min/max resolution in the node.
 * @param {GmfThemesNode} node Layer tree node.
 * @return {?string} 'out-of-resolution' or null.
 * @export
 */
gmf.LayertreeController.prototype.getResolutionStyle = function(node) {
  var style;
  var resolution = this.map.getView().getResolution();
  var maxExtent = node.maxResolutionHint;
  var minExtent = node.minResolutionHint;
  if (minExtent !== undefined && resolution < minExtent ||
      maxExtent !== undefined && resolution > maxExtent) {
    style = 'out-of-resolution';
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
  var childNodes = [];
  var type = gmf.Themes.getNodeType(node);
  var layer = treeCtrl.layer;
  var i, layers, layersNames;
  var firstParentTree = this.retrieveFirstParentTree_(treeCtrl);
  var firstParentTreeLayer = firstParentTree.layer;
  // Check if the current node state is 'activated'.
  var isActive = (this.getNodeState(treeCtrl) === 'on') ? true : false;

  // Deactivate/activate the corresponding layer(s).
  switch (type) {
    case gmf.Themes.NodeType.WMS:
    case gmf.Themes.NodeType.WMTS:

      // If layer is in a mixed group
      if (firstParentTreeLayer instanceof ol.layer.Group) {
        layer.setVisible(!isActive);

      } else {
        // If layer of the group is a wms in a not mixed group:
        var firstParentTreeSource = /** @type {ol.source.ImageWMS} */
            (firstParentTreeLayer.getSource());
        var firstParentTreeNode =  /** @type {GmfThemesNode} */
            (firstParentTree.node);
        var currentLayersNames = (firstParentTreeLayer.getVisible()) ?
            firstParentTreeSource.getParams()['LAYERS'] : '';
        var newLayersNames = [];
        this.getFlatNodes_(firstParentTreeNode, childNodes);
        // Add/remove layer and keep order of layers in layergroup.
        for (i = 0; i < childNodes.length; i++) {
          layersNames = childNodes[i].layers;
          if (layersNames === node.layers) {
            if (!isActive) {
              newLayersNames.push(layersNames);
            }
          } else if (currentLayersNames.search(new RegExp(layersNames)) >= 0) {
            newLayersNames.push(layersNames);
          }
        }
        goog.asserts.assertInstanceof(firstParentTreeLayer, ol.layer.Image);
        this.updateWMSLayerState_(firstParentTreeLayer, newLayersNames.join(','));
      }
      break;

    case gmf.Themes.NodeType.MIXED_GROUP:
      var nodeLayers = [];
      var l, source;
      this.getFlatNodes_(node, childNodes);
      layersNames = childNodes.map(function(node) {
        return node.layers;
      }).join(',');
      layers = this.layerHelper_.getFlatLayers(firstParentTreeLayer);
      for (i = 0; i < layers.length; i++) {
        l = layers[i];
        source = layers[i].getSource();
        if (source instanceof ol.source.WMTS) {
          if (layersNames.search(source.getLayer()) >= 0) {
            nodeLayers.push(l);
          }
        } else if (source instanceof ol.source.ImageWMS) {
          if (layersNames.search(source.getParams()['LAYERS']) >= 0) {
            nodeLayers.push(l);
          }
        }
      }
      for (i = 0; i < nodeLayers.length; i++) {
        nodeLayers[i].setVisible(!isActive);
      }
      break;

    case gmf.Themes.NodeType.NOT_MIXED_GROUP:
      this.getFlatNodes_(node, childNodes);
      layersNames = childNodes.map(function(node) {
        return node.layers;
      });
      source = /** @type {ol.source.ImageWMS} */
          (firstParentTreeLayer.getSource());
      layers = (firstParentTreeLayer.getVisible() &&
          source.getParams()['LAYERS'].trim() !== '' &&
          source.getParams()['LAYERS'].split(','))  || [];
      if (isActive) {
        for (i = 0; i < layersNames.length; i++) {
          ol.array.remove(layers, layersNames[i]);
        }
      } else {
        for (i = 0; i < layersNames.length; i++) {
          if (!ol.array.includes(layers, layersNames[i])) {
            layers.push(layersNames[i]);
          }
        }
      }
      firstParentTreeLayer = /** @type {ol.layer.Image} */
          (firstParentTreeLayer);
      this.updateWMSLayerState_(firstParentTreeLayer, layers.join(','));
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
  var type = gmf.Themes.getNodeType(node);
  var firstParentTree = this.retrieveFirstParentTree_(treeCtrl);
  var firstParentTreeLayer = firstParentTree.layer;
  var firstParentTreeSource;
  var currentNodeState = this.groupNodeStates_[
      goog.getUid(firstParentTreeLayer)];

  switch (type) {
    case gmf.Themes.NodeType.WMS:
    case gmf.Themes.NodeType.WMTS:
      if (firstParentTreeLayer instanceof ol.layer.Group) {
        // Get style of this node depending if the relative layer is visible.
        style = goog.isDefAndNotNull(layer) && layer.getVisible() ?
            'on' : 'off';

      } else {
        // If layer of the group is a wms in a not mixed group:
        firstParentTreeSource = /** @type {ol.source.ImageWMS} */
            (firstParentTreeLayer.getSource());
        var layersNames =
            firstParentTreeSource.getParams()['LAYERS'];
        // Get style for this layer depending if the layer is on the map or not
        // and if the layer is visible;
        style = layersNames.search(node.layers) < 0 ||
            !firstParentTreeLayer.getVisible() ? 'off' : 'on';
      }

      // Update group state
      if (style === 'on') {
        if (!ol.array.includes(currentNodeState, node.name)) {
          currentNodeState.push(node.name);
        }
      } else {
        ol.array.remove(currentNodeState, node.name);
      }

      break;

    case gmf.Themes.NodeType.MIXED_GROUP:
    case gmf.Themes.NodeType.NOT_MIXED_GROUP:
      var nodeNames = this.retrieveNodeNames_(node);
      var i, found = 0;
      for (i = 0; i < nodeNames.length; i++) {
        if (currentNodeState.indexOf(nodeNames[i]) >= 0) {
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
 * Transform date object to an ISO date string without millesceond
 *
 * @param  {Object} date The date object
 * @return {string} ISO date string without millesceond
 * @private
 */
gmf.LayertreeController.prototype.toISOdateString_ = function(date) {
  return date.toISOString().replace(/\.\d{3}/, '');
};


/**
 * LayertreeController.prototype.nodeTimeToISO_ - get the ISO-8601 string duration/time
 * for the node using its time parameter
 * @private
 * @param  {GmfThemesNode} node node
 * @return {string|undefined} ISO-8601 string duration/time
 */
gmf.LayertreeController.prototype.nodeTimeToISO_ = function(node) {
  if (!node.time) {
    return undefined;
  }

  return node.time['maxValue']
    ? this.toISOdateString_(new Date(node.time['minValue'])) + '/' + this.toISOdateString_(new Date(node.time['maxValue']))
    : this.toISOdateString_(new Date(node.time['minValue']));
};


/**
 * Update the TIME parameter of the source of the layer attached to the given
 * layertree contoller
 * LayertreeController.prototype.updateWMSTimeLayerState - description
 * @param {ngeo.LayertreeController} layertreeCtrl ngeo layertree controller
 * @param {{start : Object, end : Object}} time The start
 * and optionally the end datetime (for time range selection) selected by user
 * @export
 */
gmf.LayertreeController.prototype.updateWMSTimeLayerState = function(layertreeCtrl, time) {
  if (time) {
    var layer = /** @type {ol.layer.Image} */ (layertreeCtrl.layer || this.retrieveFirstParentTree_(layertreeCtrl).layer);
    if (layer) {
      var source = /** @type {ol.source.ImageWMS} */ (layer.getSource());
      var timeParam = time.end
        ? this.toISOdateString_(time.start) + '/' + this.toISOdateString_(time.end)
        : this.toISOdateString_(time.start);
      this.updateWMSLayerState_(layer, source.getParams()['LAYERS'], timeParam);
    }
  }
};


/**
 * Update the LAYERS parameter of the source of the given WMS layer.
 * @param {ol.layer.Image} layer The WMS layer.
 * @param {string} names The names that will be used to set
 * the LAYERS parameter.
 * @param {string=} opt_time The start
 * and optionally the end datetime (for time range selection) selected by user
 * in a ISO-8601 string datetime or time interval format
 * @private
 */
gmf.LayertreeController.prototype.updateWMSLayerState_ = function(layer,
    names, opt_time) {
  // Don't send layer without parameters, hide layer instead;
  if (names.length <= 0) {
    layer.setVisible(false);
  } else {
    layer.setVisible(true);
    var source = /** @type {ol.source.ImageWMS} */ (layer.getSource());
    var prevNames = source.getParams()['LAYERS'];
    var prevTime = source.getParams()['TIME'];
    if (names !== prevNames || opt_time !== prevTime) {
      if (opt_time) {
        source.updateParams({'LAYERS': names, 'TIME' : opt_time});
      } else {
        source.updateParams({'LAYERS': names});
      }
    }
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

  //In case of multiple layers for a node, always take the first layer name to get the icon
  var layerName = node.layers.split(',')[0];
  var url = node.url || this.gmfWmsUrl_;
  return this.layerHelper_.getWMSLegendURL(url, layerName, this.getScale_(),
    opt_legendRule);
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
  var layersNames;
  if (node.children !== undefined) {
    return null;
  }

  if (node.metadata['legendImage']) {
    return node.metadata['legendImage'];
  }

  var layer = treeCtrl.layer;
  if (node.type === 'WMTS' && goog.isDefAndNotNull(layer)) {
    goog.asserts.assertInstanceof(layer, ol.layer.Tile);
    return this.layerHelper_.getWMTSLegendURL(layer);
  } else {
    var url = node.url || this.gmfWmsUrl_;
    layersNames = node.layers.split(',');
    if (layersNames.length > 1) {
      //not supported, the administrator should give a legendImage metadata
      return null;
    }
    return this.layerHelper_.getWMSLegendURL(url, layersNames[0], this.getScale_());
  }
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
 * Return 'no-source' if no source is defined in the given treeCtrl's WMTS layer.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {?string} 'no-source' or null
 * @export
 */
gmf.LayertreeController.prototype.getNoSourceStyle = function(treeCtrl) {
  var layer = treeCtrl.layer;
  if (layer !== undefined &&
      layer instanceof ol.layer.Tile &&
      layer.getSource !== undefined &&
      !goog.isDefAndNotNull(layer.getSource())) {
    return 'no-source';
  }
  return null;
};


/**
 * @param {GmfThemesNode} node Layer tree node to remove.
 * @export
 */
gmf.LayertreeController.prototype.removeNode = function(node) {
  this.gmfTreeManager_.removeGroup(node);
};


/**
 * Set the resolution of the map with the max or min resolution of the node.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @export
 */
gmf.LayertreeController.prototype.zoomToResolution = function(treeCtrl) {
  var node = /** @type {GmfThemesNode} */ (treeCtrl.node);
  var view = this.map.getView();
  var resolution = node.minResolutionHint || node.maxResolutionHint;
  if (resolution !== undefined) {
    view.setResolution(view.constrainResolution(resolution, 0, 1));
  }
};


/**
 * Collect and return all ids of this layer node and all child nodes as well.
 * @param {GmfThemesNode} node Layer tree node.
 * @return {Array.<number|string>} Layer names.
 */
gmf.LayertreeController.getLayerNodeIds = function(node) {
  var ids = [];
  var children = node.children || node;
  if (children && children.length) {
    children.forEach(function(childNode) {
      ids = ids.concat(gmf.LayertreeController.getLayerNodeIds(childNode));
    });
  } else if (node.id !== undefined) {
    ids.push(node.id);
  }
  return ids;
};


/**
 * Toggle the legend for a node
 * @param {string} legendNodeId The DOM node legend id to toggle
 * @export
 */
gmf.LayertreeController.prototype.toggleNodeLegend = function(legendNodeId) {
  $(legendNodeId).toggle({
    toggle : true
  });
};


/**
 * Collect and return all disclaimer strings of this node and all child nodes
 * as well.
 * @param {GmfThemesNode} node Layer tree node.
 * @return {Array.<number|string>} Disclaimer strings
 * @private
 */
gmf.LayertreeController.prototype.getNodeDisclaimers_ = function(node) {
  var disclaimers = [];
  var children = node.children || node;
  if (children && children.length) {
    children.forEach(function(childNode) {
      var childDisclaimers = this.getNodeDisclaimers_(childNode);
      childDisclaimers.forEach(function(childDisclaimer) {
        if (disclaimers.indexOf(childDisclaimer) === -1) {
          disclaimers.push(childDisclaimer);
        }
      });
    }, this);
  } else if (node.metadata !== undefined &&
             node.metadata['disclaimer'] !== undefined &&
             disclaimers.indexOf(node.metadata['disclaimer']) === -1) {
    disclaimers.push(node.metadata['disclaimer']);
  }
  return disclaimers;
};


gmf.module.controller('GmfLayertreeController', gmf.LayertreeController);
