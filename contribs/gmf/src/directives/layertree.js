goog.provide('gmf.LayertreeController');
goog.provide('gmf.layertreeDirective');

goog.require('gmf');
goog.require('ngeo.LayerHelper');
goog.require('ngeo.LayertreeController');
goog.require('ol.Collection');
goog.require('ol.layer.Tile');


gmfModule.value('gmfLayertreeTemplate',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     */
    function(element, attrs) {
      var subTemplateUrl = gmf.baseTemplateUrl + '/layertree.html';
      return '<div ngeo-layertree="gmfLayertreeCtrl.tree" ' +
          'ngeo-layertree-map="gmfLayertreeCtrl.map" ' +
          'ngeo-layertree-nodelayer="gmfLayertreeCtrl.getLayer(node)" ' +
          'ngeo-layertree-listeners="gmfLayertreeCtrl.listeners(treeScope, ' +
          'treeCtrl)" ' +
          'ngeo-layertree-templateurl="' + subTemplateUrl + '"' +
          '</div>';
    });


// Overrides the path to the layertree template (used by each nodes, except
// the root node that path is defined by the gmfLayertreeTemplate value.
ngeoModule.value('ngeoLayertreeTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
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
 * @example
 * <gmf-layertree
 *   gmf-layertree-source="ctrl.source"
 *   gmf-layertree-map="ctrl.map"
 * </gmf-layertree>
 *
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
      'tree': '=gmfLayertreeSource'
    },
    bindToController: true,
    controller: 'GmfLayertreeController',
    controllerAs: 'gmfLayertreeCtrl',
    template: gmfLayertreeTemplate
  };
};

gmfModule.directive('gmfLayertree', gmf.layertreeDirective);



/**
 * @param {angular.Scope} $scope The directive's scope.
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {string} gmfWmsUrl URL to the wms service to use by default.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname gmfLayertreeController
 */
gmf.LayertreeController = function($scope, ngeoLayerHelper, gmfWmsUrl) {

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
   * @type {Array.<ol.layer.Layer>}
   * @private
   */
  this.existingLayers_ = [];
};


/**
 * Create and return a layer corresponding to the ngeo layertree's node.
 * Currently only creates WMS layers (internal or external) and WMTS layers.
 * @param {GmfThemesNode} node Layer tree node.
 * @return {ol.layer.Base} The OpenLayers layer or group for the node.
 * @export
 */
gmf.LayertreeController.prototype.getLayer = function(node) {
  var layer;
  var layerName = node.name;
  var layerURL = node.url || this.gmfWmsUrl_;
  var i, children = node.children;

  // If node is a group.
  if (goog.isDef(children)) {
    var layers = new ol.Collection();
    for (i = 0; i < children.length; i++) {
      layers.push(this.getLayer(children[i]));
    }
    return this.layerHelper_.createBasicGroup(layers);
  }

  // If node describes a layer that was already created.
  layer = this.layerHelper_.findLayer(this.existingLayers_,
      this.layerHelper_.makeHelperID(layerURL, layerName));
  if (goog.isDefAndNotNull(layer)) {
    return layer;
  }

  // If node describes a layer that was not already created.
  if (node.type === 'WMTS') {
    var newLayer = new ol.layer.Tile();
    this.layerHelper_.setHelperID(newLayer, layerURL, layerName);
    var promise = this.layerHelper_.createWMTSLayerFromCapabilitites(layerURL,
        layerName);
    promise.then(function(layer) {
      if (goog.isDef(layer)) {
        newLayer.setSource(layer.getSource());
      }
    });
    layer = newLayer;
  } else {
    layer = this.layerHelper_.createBasicWMSLayer(layerURL, layerName);
  }
  this.existingLayers_.push(layer);

  // If layer is 'checked', add it on the map.
  var metadata = node['metadata'];
  if (goog.isDefAndNotNull(metadata)) {
    if (metadata['is_checked'] == 'true') {
      this.layerHelper_.addLayerToMap(this.map, layer);
    }
  }

  return layer;
};


/**
 * Remove layer from map and from this gmf-layertree's existing layers when the
 * relative layertree of the layer catch an on destroy event.
 * @param {angular.Scope} scope treeCtrl scope.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @export
 */
gmf.LayertreeController.prototype.listeners = function(scope, treeCtrl) {
  var existingLayers = this.existingLayers_;
  scope.$on('$destroy', angular.bind(treeCtrl, function() {
    var i, l;
    // Remove treeCtrl.layer from  map.
    treeCtrl.map.removeLayer(treeCtrl.layer);
    // Remove the treeCtrl.layer from gmf layertree's layers.
    for (i = 0; i < existingLayers.length; i++) {
      l = existingLayers[i];
      if (l === treeCtrl.layer) {
        existingLayers.splice(i, 1);
        break;
      }
    }
  }));
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
  if (goog.isDef(minExtent) && resolution < minExtent ||
      goog.isDef(maxExtent) && resolution > maxExtent) {
    style = 'outOfResolution';
  }
  return style || null;
};


/**
 * Toggle activation of a node by adding or removing relative(s) layer(s) on
 * the map.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @export
 */
gmf.LayertreeController.prototype.toggleActive = function(treeCtrl) {
  var layer = treeCtrl.layer;
  // Check if the current node state is 'activated'.
  var add = (this.getNodeState(treeCtrl) === 'on') ? false : true;
  // Add/remove layers
  var layers = this.layerHelper_.getFlatLayers(layer);
  this.layerHelper_.moveInOutLayers(this.map, layers, add);
};


/**
 * Return a class name that match with the current node activation state.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {string} 'on' or 'off' or 'indeterminate'.
 * @export
 */
gmf.LayertreeController.prototype.getNodeState = function(treeCtrl) {
  var style;
  var node = treeCtrl.node;
  var layer = treeCtrl.layer;

  if (goog.isDef(node.children)) {
    // Find number of actives layers on the map for this layer group.
    var i, nbrLayerOnMap = 0;
    var layers = this.layerHelper_.getFlatLayers(layer);
    for (i = 0; i < layers.length; i++) {
      if (this.layerHelper_.getLayerIndex(this.map, layers[i]) >= 0) {
        nbrLayerOnMap++;
      }
    }
    // Get style for this layer group node state
    if (nbrLayerOnMap === layers.length) {
      style = 'on';
    } else if (nbrLayerOnMap > 0) {
      style = 'indeterminate';
    } else {
      style = 'off';
    }
  } else {
    // Get style of this node depending if the relative layer is on the map.
    style = (this.layerHelper_.getLayerIndex(this.map, layer) >= 0) ?
        'on' : 'off';
  }
  return style;
};


/**
 * Return 'noSource' if no source is defined in the given treeCtrl's layer.
 * @param {ngeo.LayertreeController} treeCtrl ngeo layertree controller, from
 *     the current node.
 * @return {?string} 'noSource' or null
 * @export
 */
gmf.LayertreeController.prototype.getNoSourceStyle = function(treeCtrl) {
  var layer = treeCtrl.layer;
  if (goog.isDef(layer.getSource)) {
    if (!goog.isDefAndNotNull(layer.getSource())) {
      return 'noSource';
    }
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
  var extent = node.maxResolutionHint || node.minResolutionHint;
  if (goog.isDef(extent)) {
    view.setResolution(extent);
  }
};


gmfModule.controller('GmfLayertreeController', gmf.LayertreeController);
