goog.provide('gmf.LayertreeController');
goog.provide('gmf.layertreeDirective');

goog.require('ngeo.SyncArrays');
goog.require('gmf');
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
      return '<div ngeo-layertree="gmfLayertreeCtrl.tree" ' +
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
 * @param {GmfThemesTheme|GmfThemesGroup|GmfThemesLeaf} node Layer tree node.
 * @private
 */
gmf.LayertreeController.prototype.updateDimensions_ = function(node) {
  node.children.forEach(function(childNode) {
    if (childNode.children) {
      this.updateDimensions_(childNode);
    } else if (childNode.dimensions) {
      var layersArray = this.map.getLayerGroup().getLayersArray();
      var childNodeName = childNode.name || '';
      var layer = this.layerHelper_.getLayerByName(childNodeName, layersArray);
      if (layer) {
        goog.asserts.assertInstanceof(layer, ol.layer.Layer);
        this.updateLayerDimensions_(layer, childNode);
      }
    }
  }, this);
};


/**
 * @param {ol.layer.Layer} layer Layer to update.
 * @param {GmfThemesGroup|GmfThemesLeaf} node Layer tree node.
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
 * TODO
 * @param {ngeo.LayertreeController} treeCtrl tree controller of the node
 * @return {ol.layer.Base|ol.layer.Group|null} The OpenLayers layer or group
 *     for the node.
 * @export
 */
gmf.LayertreeController.prototype.getLayer = function(treeCtrl) {
  //this.updateLayerDimensions_(/** @type {ol.layer.Layer} */ (layer), node);
  return this.gmfSyncLayertreeMap_.createLayer(treeCtrl, this.map,
          this.dataLayerGroup_);
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
 * @param {GmfThemesLeaf} node Layer tree node.
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
  var firstLevelTreeCtrl = this.gmfSyncLayertreeMap_.getFirstParentTree(treeCtrl);
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
 * Get the icon image URL for the given treeCtrl's layer. It can only return a
 * string for internal WMS layers without multiple childlayers in the node.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {?string} The icon legend URL or null.
 * @export
 */
gmf.LayertreeController.prototype.getLegendIconURL = function(treeCtrl) {
  var node = /** @type {GmfThemesLeaf} */ (treeCtrl.node);
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
  var node = /** @type {GmfThemesLeaf} */ (treeCtrl.node);
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
 * @param {GmfThemesGroup} node Layer tree node to remove.
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
  var node = /** @type {GmfThemesLeaf} */ (treeCtrl.node);
  var view = this.map.getView();
  var resolution = node.minResolutionHint || node.maxResolutionHint;
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
    toggle : true
  });
};


gmf.module.controller('GmfLayertreeController', gmf.LayertreeController);
