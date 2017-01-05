goog.provide('gmf.LayertreeController');
goog.provide('gmf.layertreeDirective');

goog.require('ngeo.SyncArrays');
goog.require('gmf');
goog.require('gmf.Permalink');
goog.require('gmf.SyncLayertreeMap');
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
      return '<div ngeo-layertree="gmfLayertreeCtrl.root" ' +
          'ngeo-layertree-map="gmfLayertreeCtrl.map" ' +
          'ngeo-layertree-nodelayer="gmfLayertreeCtrl.getLayer(treeCtrl)" ' +
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
 *        gmf-layertree-dimensions="ctrl.dimensions"
 *        gmf-layertree-map="ctrl.map">
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
      'dimensions': '=?gmfLayertreeDimensions',
      'openLinksInNewWindowFn': '&gmfLayertreeOpenlinksinnewwindow'
    },
    bindToController: true,
    controller: 'GmfLayertreeController as gmfLayertreeCtrl',
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
 * @param {gmf.Permalink} gmfPermalink The gmf permalink service.
 * @param {gmf.TreeManager} gmfTreeManager gmf Tree Manager service.
 * @param {gmf.SyncLayertreeMap} gmfSyncLayertreeMap gmfSyncLayertreeMap service.
 * @param {ngeo.SyncArrays} ngeoSyncArrays ngeoSyncArrays service.
 * @param {gmf.WMSTime} gmfWMSTime wms time service.
 * @param {gmf.Themes} gmfThemes The gmf Themes service.
 * @constructor
 * @export
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname gmfLayertreeController
 */
gmf.LayertreeController = function($http, $sce, $scope, ngeoCreatePopup,
    ngeoLayerHelper, gmfPermalink, gmfTreeManager, gmfSyncLayertreeMap,
    ngeoSyncArrays, gmfWMSTime, gmfThemes) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {Object<string, string>|undefined}
   * @export
   */
  this.dimensions;

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
   * @type {ngeo.LayerHelper}
   * @private
   */
  this.layerHelper_ = ngeoLayerHelper;

  /**
   * @type {gmf.Permalink}
   * @private
   */
  this.gmfPermalink_ = gmfPermalink;

  /**
   * @type {gmf.TreeManager}
   * @private
   */
  this.gmfTreeManager_ = gmfTreeManager;

  /**
   * @type {gmfThemes.GmfRootNode}
   * @export
   */
  this.root = gmfTreeManager.root;

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
   * @type {function()|undefined}
   * @export
   */
  this.openLinksInNewWindowFn;

  /**
   * @type {boolean}
   * @export
   */
  this.openLinksInNewWindow = this.openLinksInNewWindowFn() === true ? true : false;

  /**
   * @type {ol.layer.Group}
   * @private
   */
  this.dataLayerGroup_ = this.layerHelper_.getGroupFromMap(this.map,
        gmf.DATALAYERGROUP_NAME);

  /**
   * @type {Array.<ol.layer.Base>}
   * @export
   */
  this.layers = [];

  /**
   * @type {gmf.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

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
    if (this.gmfTreeManager_.rootCtrl) {
      return this.dimensions;
    }
  }.bind(this), function(dimensions) {
    if (dimensions) {
      this.updateDimensions_(this.gmfTreeManager_.rootCtrl);
    }
  }.bind(this));
};


/**
 * @param {ngeo.LayertreeController} treeCtrl Layer tree controller.
 * @private
 */
gmf.LayertreeController.prototype.updateDimensions_ = function(treeCtrl) {
  treeCtrl.traverseDepthFirst(function(ctrl) {
    if (ctrl.node.dimensions) {
      var layer = ctrl.layer;
      goog.asserts.assertInstanceof(layer, ol.layer.Layer);
      this.updateLayerDimensions_(layer, ctrl.node);
    }
  }.bind(this));
};


/**
 * @param {ol.layer.Layer} layer Layer to update.
 * @param {gmfThemes.GmfGroup|gmfThemes.GmfLayer} node Layer tree node.
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
 * Use the gmfSyncLayertreeMap_ to create and get layer corresponding to this
 * treeCtrl. The layer will be inserted into the map. The layer can be null
 * if the treeCtrl is based on a node inside a mixed node. It this case, the
 * layer will be in the first parent declared as a mixed node.
 * @param {ngeo.LayertreeController} treeCtrl tree controller of the node
 * @return {ol.layer.Base|ol.layer.Group|null} The OpenLayers layer or group
 *     for the node.
 * @export
 */
gmf.LayertreeController.prototype.getLayer = function(treeCtrl) {
  var opt_position;
  if (treeCtrl.parent.isRoot) {
    this.gmfTreeManager_.rootCtrl = treeCtrl.parent;
    // Precise the index to add first level groups.
    opt_position = this.gmfTreeManager_.root.children.length -
        this.gmfTreeManager_.numberOfGroupsToAddInThisDigestLoop || 0;
  }

  var layer = this.gmfSyncLayertreeMap_.createLayer(treeCtrl, this.map,
          this.dataLayerGroup_, opt_position);

  if (layer instanceof ol.layer.Layer) {
    var node = /** @type {gmfThemes.GmfGroup|gmfThemes.GmfLayer} */ (treeCtrl.node);
    this.updateLayerDimensions_(layer, node);
  }

  return layer;
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
 * @param {gmfThemes.GmfLayerWMS} gmfLayerWMS the GeoMapFish Layer WMS.
 * @return {?string} 'out-of-resolution' or null.
 * @export
 */
gmf.LayertreeController.prototype.getResolutionStyle = function(gmfLayerWMS) {
  var style;
  var resolution = this.map.getView().getResolution();
  var maxExtent = gmfLayerWMS.maxResolutionHint;
  var minExtent = gmfLayerWMS.minResolutionHint;
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
 * Update the TIME parameter of the source of the layer attached to the given
 * layertree contoller
 * LayertreeController.prototype.updateWMSTimeLayerState - description
 * @param {ngeo.LayertreeController} layertreeCtrl ngeo layertree controller
 * @param {{start : number, end : number}} time The start
 * and optionally the end datetime (for time range selection) selected by user
 * @export
 */
gmf.LayertreeController.prototype.updateWMSTimeLayerState = function(
        layertreeCtrl, time) {
  if (!time) {
    return;
  }
  var layer = /** @type {ol.layer.Image} */ (
      gmf.SyncLayertreeMap.getLayer(layertreeCtrl));
  if (layer) {
    var node = /** @type {gmfThemes.GmfGroup} */ (layertreeCtrl.node);
    var wmsTime = /** @type {ngeox.TimeProperty} */ (node.time);
    var source = /** @type {ol.source.ImageWMS} */ (layer.getSource());
    var timeParam = this.gmfWMSTime_.formatWMSTimeParam(wmsTime, time);
    this.layerHelper_.updateWMSLayerState(layer, source.getParams()['LAYERS'], timeParam);
  }
};


/**
 * Get the icon image URL for the given treeCtrl's layer. It can only return a
 * string for internal WMS layers without multiple childlayers in the node.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {string|undefined} The icon legend URL or undefined.
 * @export
 */
gmf.LayertreeController.prototype.getLegendIconURL = function(treeCtrl) {
  var iconUrl = treeCtrl.node.metadata.iconUrl;

  if (iconUrl !== undefined) {
    return iconUrl;
  }

  if (treeCtrl.node.children !== undefined) {
    return undefined;
  }

  var gmfLayer = /** @type {gmfThemes.GmfLayer} */ (treeCtrl.node);
  if (gmfLayer.type !== 'WMS') {
    return undefined;
  }

  var gmfLayerWMS = /** @type {gmfThemes.GmfLayerWMS} */ (gmfLayer);

  var legendRule = gmfLayerWMS.metadata.legendRule;

  if (legendRule === undefined) {
    return undefined;
  }

  //In case of multiple layers for a gmfLayerWMS, always take the first layer
  //name to get the icon
  var layerName = gmfLayerWMS.layers.split(',')[0];
  var gmfOgcServer = this.gmfTreeManager_.getOgcServer(treeCtrl);
  return this.layerHelper_.getWMSLegendURL(
    gmfOgcServer.url, layerName, undefined, legendRule
  );
};


/**
 * Get the legend URL for the given treeCtrl.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {string|undefined} The legend URL or undefined.
 * @export
 */
gmf.LayertreeController.prototype.getLegendURL = function(treeCtrl) {
  if (/** @type gmfThemes.GmfGroup */ (treeCtrl.node).children !== undefined) {
    return undefined;
  }

  var gmfLayer = /** @type {gmfThemes.GmfLayer} */ (treeCtrl.node);
  var layersNames;

  if (gmfLayer.metadata.legendImage) {
    return gmfLayer.metadata.legendImage;
  }

  var layer = treeCtrl.layer;
  if (gmfLayer.type === 'WMTS' && layer) {
    goog.asserts.assertInstanceof(layer, ol.layer.Tile);
    return this.layerHelper_.getWMTSLegendURL(layer);
  } else {
    var gmfLayerWMS = /** @type {gmfThemes.GmfLayerWMS} */ (gmfLayer);
    layersNames = gmfLayerWMS.layers.split(',');
    if (layersNames.length > 1) {
      // not supported, the administrator should give a legendImage metadata
      return undefined;
    }
    var gmfOgcServer = this.gmfTreeManager_.getOgcServer(treeCtrl);
    return this.layerHelper_.getWMSLegendURL(gmfOgcServer.url, layersNames[0], this.getScale_());
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
  var treeUid = treeCtrl.uid.toString();
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
 * Update the layers order in the map and the treeCtrl in the treeManager after
 * a reorder of the first-level groups. Then update the permalink.
 * @export
 */
gmf.LayertreeController.prototype.afterReorder = function() {
  var groupNodes = this.gmfTreeManager_.rootCtrl.node.children;
  var currentTreeCtrls = this.gmfTreeManager_.rootCtrl.children;
  var treeCtrls = [];

  // Get order of first-level groups for treectrl and layers;
  groupNodes.forEach(function(node) {
    currentTreeCtrls.some(function(treeCtrl) {
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
  var gmfLayer = /** @type {gmfThemes.GmfLayerWMS} */ (treeCtrl.node);
  var view = this.map.getView();
  var resolution = gmfLayer.minResolutionHint || gmfLayer.maxResolutionHint;
  if (resolution !== undefined) {
    view.setResolution(view.constrainResolution(resolution, 0, 1));
  }
};


/**
 * Toggle the legend for a node
 * @param {string} legendNodeId The DOM node legend id to toggle
 * @export
 */
gmf.LayertreeController.prototype.toggleNodeLegend = function(legendNodeId) {
  $(legendNodeId).toggle({
    toggle: true
  });
};


/**
 * Get the snapping configuration object from a Layertree controller
 *
 * @param {ngeo.LayertreeController} treeCtrl Layertree controller,
 * @return {?gmfThemes.GmfSnappingConfig} Snapping configuration, if found.
 * @export
 */
gmf.LayertreeController.getSnappingConfig = function(treeCtrl) {
  var node = /** @type {gmfThemes.GmfLayer} */ (treeCtrl.node);
  var config = (node.metadata && node.metadata.snappingConfig !== undefined) ?
      node.metadata.snappingConfig : null;
  return config;
};

gmf.module.controller('GmfLayertreeController', gmf.LayertreeController);
