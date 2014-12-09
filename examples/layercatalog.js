/**
 * @fileoverview This example shows how to create a layer catalog tree based
 * on ngeo's ngeoLayercatalog directive.
 */

goog.provide('layercatalog');

goog.require('ngeo.layercatalogDirective');
goog.require('ngeo.layercatalognodeDirective');
goog.require('ngeo.mapDirective');
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


// Use the default "layer catalog" template.
app.module.value('ngeoLayercatalogTemplateUrl',
    '../src/directives/partials/layercatalog.html');

// Use an application-specific "layer catalog node" template.
app.module.value('ngeoLayercatalognodeTemplateUrl',
    'partials/layercatalognode.html');


/**
 * An application-specific directive wrapping the ngeo catalog layer directive.
 * The directive includes a controller defining the catalog tree.
 * @return {angular.Directive} The Directive Definition Object.
 */
app.layercatalogDirective = function() {
  return {
    restrict: 'E',
    scope: {
      'map': '=appLayercatalogMap'
    },
    controller: 'AppLayercatalogController',
    controllerAs: 'ctrl',
    bindToController: true,
    template: '<div ngeo-layercatalog="ctrl.tree" ' +
        'ngeo-layercatalog-map="ctrl.map"></div>'
  };
};


app.module.directive('appLayercatalog', app.layercatalogDirective);



/**
 * @constructor
 * @param {angular.$http} $http Angular http service.
 * @ngInject
 * @export
 */
app.LayercatalogController = function($http) {
  $http.get('data/tree.json').then(angular.bind(this, function(resp) {
    this['tree'] = resp.data;
  }));
};


/**
 * @param {Object} node Tree node.
 * @param {ol.layer.Layer} layer Layer.
 * @export
 */
app.LayercatalogController.prototype.onButtonClick = function(node, layer) {
  window.alert(node['name']);
};


app.module.controller('AppLayercatalogController', app.LayercatalogController);


/**
 * A function that returns a layer for a node. A cache is used, so always the
 * same layer instance is returned for a given node. This function is used by
 * the ngeoLayercatalognode directive for creating layers from tree nodes.
 * The function returns `null` when no layer should be created for the node.
 * @param {Object} node Layer catalog node.
 * @return {ol.layer.Layer} Layer.
 */
app.layercatalogLayerFactory = (function() {
  /**
   * @type {Object.<string, ol.layer.Layer>}
   */
  var layerCache = {};
  return (
      /**
       * @param {Object} node Catalog node.
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
        layerCache[type] = layer;
        return layer;
      });
})();


app.module.value('ngeoLayercatalogLayerFactory', app.layercatalogLayerFactory);



/**
 * The application's main directive.
 * @constructor
 */
app.MainController = function() {
  /** @type {ol.Map} */
  this['map'] = new ol.Map({
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
