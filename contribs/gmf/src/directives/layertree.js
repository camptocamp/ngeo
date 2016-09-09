goog.provide('gmf.LayertreeController');
goog.provide('gmf.layertreeDirective');

goog.require('ngeo.SyncArrays');
goog.require('gmf');
goog.require('gmf.SyncLayertreeMap');
goog.require('gmf.Themes');
goog.require('gmf.TreeManager');
goog.require('gmf.WMSTime');
goog.require('ngeo.CreatePopup');
goog.require('ngeo.LayerHelper');
goog.require('ngeo.LayertreeController');
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
 * template. This default template can be overrided by setting the value
 * 'gmf.layertreeTemplateUrl' but you will have to adapt the
 * ngeoLayertreeTemplateUrl value too (to define the children's nodes template
 * path).
 *
 * Example:
 *
 *      <gmf-layertree
 *        gmf-layertree-source="ctrl.source"
 *        gmf-layertree-dimensions="ctrl.dimensions"
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
 *  * iconUrl: layer icon full URL.
 *  * legendRule: WMS rule used to get a layer icon.
 *  * isLegendExpanded: if 'true' the legend is expanded by default.
 *  * metadataUrl: Display a popup with the content of the given URL if
 *    possible also open a new window.
 *
 * @htmlAttribute {Object} gmf-layertree-source One theme (JSON).
 * @htmlAttribute {Object<string, string>|undefined} gmf-layertree-dimensions Global dimensions object.
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
      'dimensions': '=?gmfLayertreeDimensions',
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
 * @param {gmf.SyncLayertreeMap} gmfSyncLayertreeMap gmfSyncLayertreeMap service.
 * @param {ngeo.SyncArrays} ngeoSyncArrays ngeoSyncArrays service.
 * @param {gmf.WMSTime} gmfWMSTime wms time service.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname gmfLayertreeController
 */
gmf.LayertreeController = function($http, $sce, $scope, ngeoCreatePopup,
    ngeoLayerHelper, gmfWmsUrl, gmfTreeManager, gmfSyncLayertreeMap,
    ngeoSyncArrays, gmfWMSTime) {

  /**
   * @type {angular.Scope}
   * @private
   */
  this.scope_ = $scope;

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
   * @type {gmf.SyncLayertreeMap}
   * @private
   */
  this.gmfSyncLayertreeMap_ = gmfSyncLayertreeMap;

  /**
   * @type {gmf.WMSTime}
   * @private
   */
  this.gmfWMSTime_ = gmfWMSTime;

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

  // watch any change on dimensions object to refresh the layers
  $scope.$watchCollection(function() {
    return this.dimensions;
  }.bind(this), function() {
    this.updateDimensions_(this.gmfTreeManager_.tree);
  }.bind(this));

};


/**
 * @param {GmfThemesNode} node Layer tree node.
 * @private
 */
gmf.LayertreeController.prototype.updateDimensions_ = function(node) {
  node.children.forEach(function(childNode) {
    if (childNode.children) {
      this.updateDimensions_(childNode);
    } else if (childNode.dimensions) {
      var layersArray = this.map.getLayerGroup().getLayersArray();
      var layer = this.layerHelper_.getLayerByName(childNode.name, layersArray);
      if (layer) {
        goog.asserts.assertInstanceof(layer, ol.layer.Layer);
        this.updateLayerDimensions_(layer, childNode);
      }
    }
  }, this);
};


/**
 * @param {ol.layer.Layer} layer Layer to update.
 * @param {GmfThemesNode} node Layer tree node.
 * @private
 */
gmf.LayertreeController.prototype.updateLayerDimensions_ = function(layer, node) {
  if (this.dimensions && node.dimensions) {
    var dimensions = {};
    for (var key in node.dimensions) {
      var value = this.dimensions[key];
      if (value !== undefined) {
        dimensions[key] = value;
      }
    }
    if (!ol.obj.isEmpty(dimensions)) {
      var source = layer.getSource();
      if (source instanceof ol.source.WMTS) {
        source.updateDimensions(dimensions);
      } else if (source instanceof ol.source.TileWMS || source instanceof ol.source.ImageWMS) {
        source.updateParams(dimensions);
      } else {
        // the source is not ready yet
        layer.once('change:source', function() {
          goog.asserts.assertInstanceof(layer, ol.layer.Layer);
          this.updateLayerDimensions_(layer, node);
        }.bind(this));
      }
    }
  }
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
  var editableIds = gmf.LayertreeController.getLayerNodeIds(node, true);
  var childNodes = [], allChildNodesUnchecked;
  layer.set('querySourceIds', ids);
  layer.set('editableIds', editableIds);
  layer.set('layerNodeName', node.name);
  layer.set('disclaimers', this.getNodeDisclaimers_(node));

  var isMerged = type === gmf.Themes.NodeType.NOT_MIXED_GROUP;
  layer.set('isMerged', isMerged);

  // If layer is 'unchecked', set it to invisible.
  var metadata = node.metadata;
  if (isMerged) {
    //Case Non Mixed group -> Hide the layer if all child nodes have isChecked set to false
    gmf.Themes.getFlatNodes(node, childNodes);
    allChildNodesUnchecked = childNodes.every(function(childNode) {
      return !childNode.metadata || !childNode.metadata['isChecked'];
    });
    if (allChildNodesUnchecked) {
      //All children are unchecked
      layer.setVisible(false);
    }
  } else if (node.children === undefined && goog.isDefAndNotNull(metadata)) {
    //Case leaf in a mixed group
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
 *  - A 'querySourceIds' parameter with the node id as value.
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
  var timeParam, timeValues;

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
        throw new Error('Node wrong type: ' + type);
    }
    var position = this.gmfTreeManager_.tree.children.length -
        this.gmfTreeManager_.layersToAddAtOnce | 0;
    this.dataLayerGroup_.getLayers().insertAt(position, layer);
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
      break;
    case gmf.Themes.NodeType.WMTS:
      layer = this.getLayerCaseWMTS_(node);
      break;
    case gmf.Themes.NodeType.WMS:
      var url = node.url || this.gmfWmsUrl_;
      if (node.time) {
        var wmsTime = /** @type {ngeox.TimeProperty} */ (node.time);
        timeValues = this.gmfWMSTime_.getOptions(wmsTime)['values'];
        timeParam = this.gmfWMSTime_.formatWMSTimeParam(wmsTime, {
          start : timeValues[0] || timeValues,
          end : timeValues[1]
        });
      }
      layer = this.layerHelper_.createBasicWMSLayer(url, node.layers,
              node.serverType, timeParam);
      break;
    default:
      throw new Error('Node wrong type: ' + type);
  }
  this.prepareLayer_(node, layer);
  this.updateLayerDimensions_(/** @type {ol.layer.Layer} */ (layer), node);
  parentCtrl['layer'].getLayers().insertAt(0, layer);
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
  var childNodes = [];
  var timeParam, timeValues;

  gmf.Themes.getFlatNodes(node, childNodes);
  // layersNames come from the json theme nodes and will become the wms
  // LAYERS. It must be reversed to get the correct layer order on the map.
  var layersNames = childNodes.map(function(node) {
    return node['layers'];
  }).reverse().join(',');
  var url = node.url || this.gmfWmsUrl_;
  var serverType = node.children[0]['serverType'];
  var nodes = [node].concat(childNodes);
  var nodesWithTime = nodes.filter(hasTime);
  if (nodesWithTime.length) {
    var wmsTime = /**@type {ngeox.TimeProperty} */ (nodesWithTime[0]['time']);
    timeValues = this.gmfWMSTime_.getOptions(wmsTime)['values'];
    timeParam = this.gmfWMSTime_.formatWMSTimeParam(wmsTime, {
      start : timeValues[0] || timeValues,
      end : timeValues[1]
    });
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
  goog.asserts.assert(node.url);
  this.layerHelper_.createWMTSLayerFromCapabilitites(node.url, node.layer, node.dimensions)
    .then(function(layer) {
      newLayer.setSource(layer.getSource());
      newLayer.set('capabilitiesStyles', layer.get('capabilitiesStyles'));
    });
  return newLayer;
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
  gmf.Themes.getFlatNodes(node, nodes);
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
  treeCtrl.setState(treeCtrl.getState() === 'on' ? 'off' : 'on');
  var firstLevelTreeCtrl = this.retrieveFirstParentTree_(treeCtrl);
  this.gmfSyncLayertreeMap_.syncAll(this.map, firstLevelTreeCtrl);
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
  return treeCtrl.getState();
};

/**
 * Search if a substring representing layers names are in the string representing
 * all the layers names of the WM(T)S layer
 * @param  {string} allLayersNames all layers names currently enable for the
 * WM(T)S layer
 * @param  {string} subLayersNames layers names to search on allLayersNames
 * @return {boolean} true if subLayersNames is in allLayersNames
 * @private
 */
gmf.LayertreeController.prototype.searchLayersNames_ = function(allLayersNames,
  subLayersNames) {
  var layersNames = allLayersNames.split(',');
  var layersNamesToFind = subLayersNames.split(',');
  var found;
  found = layersNamesToFind.every(function(lname) {
    return layersNames.indexOf(lname) >= 0;
  });
  return found;
};

/**
 * Get the layer(s) name(s) Attached to the node param, regarding its type
 * @param  {GmfThemesNode} node The tree node
 * @return {string} name(s) of the layer(s) attached to this node regarind its type
 * @private
 */
gmf.LayertreeController.prototype.getLayersNames_ = function(node) {
  var type = gmf.Themes.getNodeType(node);
  switch (type) {
    case gmf.Themes.NodeType.WMS:
      return node.layers;
    case gmf.Themes.NodeType.WMTS:
      return node.layer;
    default:
      throw new Error('Node wrong type to get layer(s) name(s): ' + type);
  }
};

/**
 * Update the TIME parameter of the source of the layer attached to the given
 * layertree contoller
 * LayertreeController.prototype.updateWMSTimeLayerState - description
 * @param {ngeo.LayertreeController} layertreeCtrl ngeo layertree controller
 * @param {{start : number, end : number}} time The start
 * and optionally the end datetime (for time range selection) selected by user
 * @export
 */
gmf.LayertreeController.prototype.updateWMSTimeLayerState = function(layertreeCtrl, time) {
  var node = /** @type {GmfThemesNode} */ (layertreeCtrl.node);
  var wmsTime = /** @type {ngeox.TimeProperty} */ (node.time);
  if (time) {
    var layer = /** @type {ol.layer.Image} */ (layertreeCtrl.layer || this.retrieveFirstParentTree_(layertreeCtrl).layer);
    if (layer) {
      var source = /** @type {ol.source.ImageWMS} */ (layer.getSource());
      var timeParam = this.gmfWMSTime_.formatWMSTimeParam(wmsTime, time);
      this.layerHelper_.updateWMSLayerState(layer, source.getParams()['LAYERS'], timeParam);
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
  var opt_iconUrl = node.metadata['iconUrl'];

  if (opt_iconUrl !== undefined) {
    return opt_iconUrl;
  }

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
  return this.layerHelper_.getWMSLegendURL(url, layerName, undefined,
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
 * @param {boolean=} opt_editable Whether the node needs to be editable to
 *     have its id returned.
 * @return {Array.<number|string>} Layer names.
 */
gmf.LayertreeController.getLayerNodeIds = function(node, opt_editable) {
  var editable = opt_editable === true;
  var ids = [];
  var children = node.children || node;
  if (children && children.length) {
    children.forEach(function(childNode) {
      ids = ids.concat(
        gmf.LayertreeController.getLayerNodeIds(childNode, editable)
      );
    });
  } else if (node.id !== undefined && (!editable || node.editable)) {
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
