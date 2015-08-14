/**
 * @fileoverview This file provides the "layertree" directive for GeoMapFish
 * applications.
 *
 * FIXME
 */
goog.provide('gmf.layertreeDirective');

goog.require('gmf');
goog.require('ngeo.LayertreeController');
goog.require('ngeo.layertreeDirective');
goog.require('ol.layer.Image');
goog.require('ol.source.ImageWMS');


/**
 * @const
 */
gmf.layertreeTemplateUrl = '../src/directives/partials/gmflayertree.html';


/**
 * @return {angular.Directive} The directive Definition Object.
 * @ngInject
 */
gmf.layertreeDirective = function() {
  return {
    scope: {
      'getMapFn': '&gmfLayertreeMap',
      'getWmsUrlFn': '&gmfLayertreeWmsurl',
      'themes': '=gmfLayertreeThemes'
    },
    controller: 'GmfLayertreeController',
    controllerAs: 'gmfLayertreeCtrl',
    template:
        '<div ngeo-layertree="gmfLayertreeCtrl.tree" ' +
        'ngeo-layertree-map="gmfLayertreeCtrl.map" ' +
        'ngeo-layertree-nodelayer="gmfLayertreeCtrl.getLayer(node)" ' +
        'ngeo-layertree-templateurl="' + gmf.layertreeTemplateUrl + '"' +
        '<div>'
  };
};

gmfModule.directive('gmfLayertree', gmf.layertreeDirective);



/**
 * @constructor
 * @param {angular.Scope} $scope The directive's scope.
 * @export
 * @ngInject
 */
gmf.LayertreeController = function($scope) {

  var map = $scope['getMapFn']();
  goog.asserts.assertInstanceof(map, ol.Map);

  /**
   * @type {!ol.Map}
   * @export
   */
  this.map = map;

  var wmsUrl = $scope['getWmsUrlFn']();
  goog.asserts.assert(goog.isString(wmsUrl));

  /**
   * @type {string}
   * @private
   */
  this.wmsUrl_ = wmsUrl;

  /**
   * @type {Object.<string, function((boolean|undefined)):(boolean|undefined)>}
   * @private
   */
  this.checkboxGettersSetters_ = {};

  $scope.$watch('themes', goog.bind(function(newVal) {
    if (goog.isDef(newVal)) {
      this['tree'] = newVal[0];
    }
  }, this));
};


/**
 * @param {Object} node Layer tree node.
 * @return {ol.layer.Layer} The OpenLayers layer for the node. `null`
 * if no layer should be associated to that node.
 * @export
 */
gmf.LayertreeController.prototype.getLayer = function(node) {
  var layer = null;
  if (node['isInternalWMS']) {
    // collect WMS layers for this node
    node.layers = [];
    var children = node.children;
    for (var i = 0; i < children.length; ++i) {
      var child = children[i];
      if (child['type'] == 'internal WMS') {
        node.layers.push(child.name);
      }
    }
    // create OpenLayers layer for this node
    layer = new ol.layer.Image({
      source: new ol.source.ImageWMS({
        url: this.wmsUrl_,
        params: {}
      })
    });
  }
  return layer;
};


/**
 * @param {ngeo.LayertreeController} treeCtrl Layer tree controller.
 * @return {function((boolean|undefined)):(boolean|undefined)} The checkbox
 *     model getter setter to use for this layer tree controller.
 * @export
 */
gmf.LayertreeController.prototype.getCheckboxGetterSetter =
    function(treeCtrl) {
  var treeCtrlUid = treeCtrl.uid.toString();
  /** @type {function((boolean|undefined)):(boolean|undefined)} */
  var getterSetter = this.checkboxGettersSetters_[treeCtrlUid];
  if (!goog.isDef(getterSetter)) {
    var map = this.map;
    getterSetter = function(val) {
      return gmf.LayertreeController.checkboxGetterSetter_(
          treeCtrl, map, val);
    };
    this.checkboxGettersSetters_[treeCtrlUid] = getterSetter;
  }
  return getterSetter;
};


/**
 * @param {ngeo.LayertreeController} treeCtrl Layer tree controller.
 * @param {ol.Map} map OpenLayers map.
 * @param {boolean|undefined} val Value.
 * @return {boolean|undefined} Value.
 * @private
 */
gmf.LayertreeController.checkboxGetterSetter_ = function(treeCtrl, map, val) {
  var node = treeCtrl.node;
  var layer = treeCtrl.scope['layer'];
  var source = layer.getSource();
  var layers, layersParam;
  if (goog.isDef(val)) {
    if (val) {
      if (node['isInternalWMS']) {
        layers = node.layers;
      } else if (node['type'] == 'internal WMS') {
        layersParam = source.getParams()['layers'];
        layers = layersParam.length > 0 ? layersParam.split(',') : [];
        if (layers.indexOf(node['name']) < 0) {
          layers.push(node['name']);
        }
      }
      if (goog.isDef(layers)) {
        source.updateParams({'layers': layers.join(',')});
        if (map.getLayers().getArray().indexOf(layer) < 0) {
          map.addLayer(layer);
        }
      }
    } else {
      if (node['isInternalWMS']) {
        layers = [];
      } else if (node['type'] == 'internal WMS') {
        layers = source.getParams()['layers'].split(',');
        var idx = layers.indexOf(node['name']);
        if (idx >= 0) {
          layers.splice(idx, 1);
        }
      }
      if (goog.isDef(layers)) {
        source.updateParams({'layers': layers.join(',')});
        if (layers.length <= 0) {
          map.removeLayer(layer);
        }
      }
    }
  } else {
    var state = map.getLayers().getArray().indexOf(layer) >= 0;
    var checkbox = treeCtrl.element.find('input');
    if (!state) {
      if (node['isInternalWMS']) {
        goog.asserts.assert(checkbox.length > 0);
        checkbox[0].indeterminate = false;
      }
      return state;
    }
    if (node['isInternalWMS']) {
      layersParam = source.getParams()['layers'];
      goog.asserts.assert(layersParam.length > 0);
      layers = layersParam.split(',');
      goog.asserts.assert(checkbox.length > 0);
      checkbox[0].indeterminate = !goog.array.equals(
          layers.sort(), node.layers.slice().sort());
      state = true;
    } else if (node['type'] == 'internal WMS') {
      layers = source.getParams()['layers'].split(',');
      state = layers.indexOf(node['name']) >= 0;
    }
    return state;
  }
};

gmfModule.controller('GmfLayertreeController', gmf.LayertreeController);
