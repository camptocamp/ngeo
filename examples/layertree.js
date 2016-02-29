/**
 * This example shows how to create a layer tree tree based
 * on ngeo's ngeoLayertree directive.
 */

goog.provide('layertree');

goog.require('ngeo.CreatePopup');
goog.require('ngeo.layertreeDirective');
goog.require('ngeo.mapDirective');
goog.require('ngeo.popupDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.MapQuest');
goog.require('ol.source.OSM');
goog.require('ol.source.Stamen');


/** @const */
var app = {};


/** @type {!angular.Module} */
app.module = angular.module('app', ['ngeo']);


/**
 * An application-specific directive wrapping the ngeo tree layer directive.
 * The directive includes a controller defining the tree tree.
 * @return {angular.Directive} The Directive Definition Object.
 */
app.layertreeDirective = function() {
  return {
    restrict: 'E',
    scope: {
      'map': '=appLayertreeMap'
    },
    controller: 'AppLayertreeController',
    controllerAs: 'ctrl',
    bindToController: true,
    // use "::ctrl.tree" for the "tree" expression as we know the
    // layer tree won't change
    template:
        '<div ngeo-layertree="::ctrl.tree" ' +
        'ngeo-layertree-templateurl="partials/layertree.html" ' +
        'ngeo-layertree-map="ctrl.map" ' +
        'ngeo-layertree-nodelayer="ctrl.getLayer(node)">' +
        '</div>'
  };
};


app.module.directive('appLayertree', app.layertreeDirective);


/**
 * @constructor
 * @param {angular.$http} $http Angular http service.
 * @param {angular.$sce} $sce Angular sce service.
 * @param {function(Object):ol.layer.Layer} appGetLayer Get layer service.
 * @param {ngeo.CreatePopup} ngeoCreatePopup Popup service.
 * @ngInject
 * @export
 */
app.LayertreeController = function($http, $sce, appGetLayer, ngeoCreatePopup) {

  /**
   * @type {Object|undefined}
   * @export
   */
  this.tree = undefined;

  $http.get('data/tree.json').then(function(resp) {
    this.tree = resp.data;
  }.bind(this));

  /**
   * @private
   * @type {angular.$http}
   */
  this.http_ = $http;

  /**
   * @private
   * @type {angular.$sce}
   */
  this.sce_ = $sce;

  /**
   * @private
   * @type {function(Object):ol.layer.Layer}
   */
  this.getLayer_ = appGetLayer;

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
};


/**
 * Function called by the ngeo-layertree directives to create a layer
 * from a tree node. The function should return `null` if no layer should
 * be associated to the node (because it's not a leaf).
 * @param {Object} node Node object.
 * @return {ol.layer.Layer} The layer for this node.
 * @export
 */
app.LayertreeController.prototype.getLayer = function(node) {
  return this.getLayer_(node);
};


/**
 * @param {Object} node Tree node.
 * @param {ol.layer.Layer} layer Layer.
 * @export
 */
app.LayertreeController.prototype.onButtonClick = function(node, layer) {
  var layerType = node['layerType'];
  if (!(layerType in this.promises_)) {
    this.promises_[layerType] = this.http_.get('data/metadata.html').then(
        function(resp) {
          var html = this.sce_.trustAsHtml(resp.data);
          return html;
        }.bind(this)
    );
  }
  var infoPopup = this.infoPopup_;
  this.promises_[layerType].then(function(html) {
    infoPopup.setTitle(node['name']);
    infoPopup.setContent(html);
    infoPopup.setOpen(true);
  });
};


app.module.controller('AppLayertreeController', app.LayertreeController);


/**
 * A function that returns a layer for a node. A cache is used, so always the
 * same layer instance is returned for a given node. This function is called by
 * the ngeoLayertree directive for creating layers from tree nodes. The
 * function returns `null` when no layer should be created for the node.
 *
 * @param {Object} node Layer tree node.
 * @return {ol.layer.Layer} Layer.
 */
app.getLayer = (function() {
  /**
   * @type {Object.<string, ol.layer.Layer>}
   */
  var layerCache = {};
  return (
      /**
       * @param {Object} node Tree node.
       * @return {ol.layer.Layer} Layer.
       */
      function(node) {
        if (!('layerType' in node)) {
          return null;
        }
        var type = node['layerType'];
        if (type in layerCache) {
          return layerCache[type];
        }
        var source;
        if (type == 'stamenWatercolor') {
          source = new ol.source.Stamen({
            layer: 'watercolor'
          });
        } else if (type == 'stamenTerrain-labels') {
          source = new ol.source.Stamen({
            layer: 'terrain-labels'
          });
        } else if (type == 'mapquestOsm') {
          source = new ol.source.MapQuest({
            layer: 'osm'
          });
        } else if (type == 'mapquestSat') {
          source = new ol.source.MapQuest({
            layer: 'sat'
          });
        } else if (type == 'mapquestHyb') {
          source = new ol.source.MapQuest({
            layer: 'hyb'
          });
        } else {
          source = new ol.source.OSM();
        }
        var layer = new ol.layer.Tile({
          source: source
        });
        layer.set('type', type);
        layerCache[type] = layer;
        return layer;
      });
})();


app.module.value('appGetLayer', app.getLayer);


/**
 * The application's main directive.
 * @constructor
 */
app.MainController = function() {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: [-10983710.59086991, 4686507.078220731],
      zoom: 4
    })
  });
};


app.module.controller('MainController', app.MainController);
