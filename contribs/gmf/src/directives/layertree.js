goog.provide('gmf.LayertreeController');
goog.provide('gmf.layertreeDirective');

goog.require('gmf');
goog.require('ngeo.LayerHelper');
goog.require('ngeo.LayertreeController');
goog.require('ngeo.layertreeDirective');
goog.require('ol.Collection');
goog.require('ol.layer.Group');
goog.require('ol.layer.Image');
goog.require('ol.layer.Tile');
goog.require('ol.source.ImageWMS');


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
          'ngeo-layertree-templateurl="' + subTemplateUrl + '"' +
          '</div>';
    });


// Overrides the path to the layertree template (used by each nodes, except
// the root node that path is defined in the gmfLayertreeTemplate value.
ngeoModule.value('ngeoLayertreeTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     */
    function(element, attrs) {
      return gmf.baseTemplateUrl + '/layertree.html';
    });


/**
 * This directive creates a layertree based on a c2cgeoportal JSON themes source
 * and a ngeo.Layertree. The controller used by this directive defines some
 * fonctions for each node that are created by a default template. This
 * default template can be overrided by setting the constant
 * 'gmf.layertreeTemplateUrl' but you will must adapt the
 * ngeoLayertreeTemplateUrl value too (to define the children's nodes template
 * path).
 *
 * @example
 * <gmf-layertree
 *   gmf-layertree-source="ctrl.source"
 *   gmf-layertree-map="ctrl.map"
 *   gmf-layertree-wmsurl="ctrl.wmsUrl"
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
      'getWmsUrlFn': '&gmfLayertreeWmsurl',
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
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname gmfLayertreeController
 */
gmf.LayertreeController = function($scope, ngeoLayerHelper) {

  var wmsUrl = this['getWmsUrlFn']();
  goog.asserts.assert(goog.isString(wmsUrl));

  /**
   * @type {string}
   * @private
   */
  this.wmsUrl_ = wmsUrl;

  /**
   * @type {ngeo.LayerHelper}
   * @private
   */
  this.layerHelper_ = ngeoLayerHelper;
  this.layerHelper_.init(this.map);

  /**
   * @type {Array.<ol.layer.Layer>}
   * @private
   */
  this.existingLayers_ = [];
};


/**
 * Create and return a layer corresponding to the ngeo.layerTree's node.
 * Can currently only creates WMS layers (internal or external) and WMTS layers.
 * @param {GmfThemesNode} node Layer tree node.
 * @return {ol.layer.Base} The OpenLayers layer or group for the node.
 * @export
 */
gmf.LayertreeController.prototype.getLayer = function(node) {
  var layer;
  var layerName = node.name;
  var layerURL = node.url || this.wmsUrl_;
  var i, children = node.children;

  // If node is a group.
  if (goog.isDef(children)) {
    var layers = new ol.Collection();
    for (i = 0; i < children.length; i++) {
      layers.push(this.getLayer(children[i]));
    }
    return this.layerHelper_.createBasicGroup(layers);
  }

  // If node describe a layer that was already created.
  layer = this.layerHelper_.findLayer(this.existingLayers_,
      this.layerHelper_.makeHelperID(layerURL, layerName));
  if (goog.isDefAndNotNull(layer)) {
    return layer;
  }

  // If node describe a layer that was not already created.
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
  return layer;
};


/**
 * Return a 'light' class if the current resolution of the map is out of
 * the min/max resolution in the node.
 * @param {GmfThemesNode} node Layer tree node.
 * @return {?string} 'light' or null.
 * @export
 */
gmf.LayertreeController.prototype.getResolutionStyle = function(node) {
  var style;
  var resolution = this.map.getView().getResolution();
  var maxExtent = node.maxResolutionHint;
  var minExtent = node.minResolutionHint;
  if (goog.isDef(minExtent) && resolution < minExtent ||
      goog.isDef(maxExtent) && resolution > maxExtent) {
    style = 'light';
  }
  return style || null;
};


/**
 * Toggle activation of a node by adding or removing relative(s) layer(s) on
 * the map.
 * @param {ngeo.LayertreeController} treeCtrl Layer tree controller, from the
 *     current node.
 * @export
 */
gmf.LayertreeController.prototype.toggleActive = function(treeCtrl) {
  var layer = treeCtrl.layer;
  // Check if the current node state is 'activated'.
  var add = (this.getSetActive(treeCtrl) === 'on') ? false : true;
  // Add/remove layers
  var layers = this.layerHelper_.getFlatLayers(layer);
  this.layerHelper_.moveInOutLayers(layers, add);
};


/**
 * Return a class name that match with the current node activation state.
 * @param {ngeo.LayertreeController} treeCtrl Layer tree controller, from the
 *     current node.
 * @return {string} The name of de class to apply (on/off/indeterminate).
 * @export
 */
gmf.LayertreeController.prototype.getSetActive = function(treeCtrl) {
  var style;
  var node = treeCtrl.node;
  var layer = treeCtrl.layer;

  if (goog.isDef(node.children)) {
    // Find number of actives layers on the map from this layer group.
    var i, nbrLayerOnMap = 0;
    var layers = this.layerHelper_.getFlatLayers(layer);
    for (i = 0; i < layers.length; i++) {
      if (this.layerHelper_.getLayerIndex(layers[i]) >= 0) {
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
    // Get style of this node depending if the corresponding layer is on
    // the map.
    style = (this.layerHelper_.getLayerIndex(layer) >= 0) ? 'on' : 'off';
  }
  return style;
};


/**
 * Return "noSource" if no source is defined in the given treeCtrl's layer.
 * @param {ngeo.LayertreeController} treeCtrl Layer tree controller, from the
 *     current node.
 * @return {?string}
 * @export
 */
gmf.LayertreeController.prototype.getNoSourceStyle = function(treeCtrl) {
  var layer = treeCtrl.layer;
  if (goog.isDef(layer.getSource)) {
    if (!goog.isDefAndNotNull(layer.getSource())) {
      return 'no-source';
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
