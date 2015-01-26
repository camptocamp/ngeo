goog.provide('layerorder');

goog.require('ngeo.DecorateLayer');
goog.require('ngeo.mapDirective');
goog.require('ngeo.sortableDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.MapQuest');
goog.require('ol.source.TileWMS');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);



/**
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.DecorateLayer} ngeoDecorateLayer Decorate layer service.
 * @constructor
 * @ngInject
 */
app.MainController = function($scope, ngeoDecorateLayer) {

  /** @type {ol.layer.Tile} */
  var mapquest = new ol.layer.Tile({
    source: new ol.source.MapQuest({layer: 'sat'})
  });
  mapquest.set('name', 'MapQuest');

  /** @type {ol.layer.Tile} */
  var boundaries = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'http://demo.opengeo.org/geoserver/wms',
      params: {'LAYERS': 'topp:tasmania_state_boundaries'},
      serverType: 'geoserver'
    })
  });
  boundaries.set('name', 'Boundaries');

  /** @type {ol.layer.Tile} */
  var roads = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'http://demo.opengeo.org/geoserver/wms',
      params: {'LAYERS': 'topp:tasmania_roads'},
      serverType: 'geoserver'
    })
  });
  roads.set('name', 'Roads');

  /** @type {ol.layer.Tile} */
  var waterBodies = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'http://demo.opengeo.org/geoserver/wms',
      params: {'LAYERS': 'topp:tasmania_water_bodies'},
      serverType: 'geoserver'
    })
  });
  waterBodies.set('name', 'Water bodies');

  /** @type {ol.layer.Tile} */
  var cities = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'http://demo.opengeo.org/geoserver/wms',
      params: {'LAYERS': 'topp:tasmania_cities'},
      serverType: 'geoserver'
    })
  });
  cities.set('name', 'Cities');


  /** @type {ol.Map} */
  this['map'] = new ol.Map({
    layers: [
      mapquest,
      boundaries,
      roads,
      waterBodies,
      cities
    ],
    view: new ol.View({
      center: [16339075, -5194965],
      zoom: 7
    })
  });

  var map = this['map'];

  /** @type {Array.<ol.layer.Layer>} */
  this['layers'] = map.getLayers().getArray();
  var layers = this['layers'];

  // watch any change on layers array to refresh the map
  $scope.$watchCollection(function() {
    return layers;
  }, function() {
    map.render();
  });
};


app.module.controller('MainController', app.MainController);
