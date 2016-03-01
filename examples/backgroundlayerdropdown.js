goog.provide('backgroundlayerdropdown');

goog.require('ngeo.BackgroundLayerMgr');
goog.require('ngeo.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Image');
goog.require('ol.layer.Tile');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.OSM');
goog.require('ol.source.Stamen');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * The application-specific background layer directive.
 *
 * The directive is based on Bootstrap's dropdown jQuery plugin and on
 * the ngeoBackgroundLayerMgr service.
 *
 * @return {angular.Directive} Directive Defintion Object.
 */
app.backgroundlayerDirective = function() {
  return {
    restrict: 'E',
    scope: {
      'map': '=appBackgroundlayerMap'
    },
    templateUrl: 'partials/backgroundlayerdropdown.html',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: 'AppBackgroundlayerController'
  };
};


app.module.directive('appBackgroundlayer', app.backgroundlayerDirective);


/**
 * @constructor
 * @param {angular.$http} $http Angular http service.
 * @param {ngeo.BackgroundLayerMgr} ngeoBackgroundLayerMgr Background layer
 *     manager.
 * @export
 * @ngInject
 */
app.BackgroundlayerController = function($http, ngeoBackgroundLayerMgr) {
  $http.get('data/backgroundlayers.json').then(
      function(resp) {
        var bgLayers = resp.data;
        this['bgLayers'] = bgLayers;
        this.setLayer(bgLayers[0]);
      }.bind(this));

  /**
   * @type {ngeo.BackgroundLayerMgr}
   * @private
   */
  this.backgroundLayerMgr_ = ngeoBackgroundLayerMgr;
};


/**
 * Function called when the user selects a new background layer in the
 * dropdown. Called by the ng-click directive used in the partial.
 * @param {Object} layerSpec Layer specification object.
 * @export
 */
app.BackgroundlayerController.prototype.setLayer = function(layerSpec) {
  this['currentBgLayer'] = layerSpec;
  var layer = this.createLayer_(layerSpec['name']);
  this.backgroundLayerMgr_.set(this['map'], layer);
};


/**
 * @param {string} layerName Layer name.
 * @return {ol.layer.Tile} The layer.
 * @private
 */
app.BackgroundlayerController.prototype.createLayer_ = function(layerName) {
  var source;
  if (layerName === 'osm') {
    source = new ol.source.OSM();
  } else if (layerName === 'stamen') {
    source = new ol.source.Stamen({
      layer: 'watercolor'
    });
  }
  return new ol.layer.Tile({source: source});
};


app.module.controller('AppBackgroundlayerController',
    app.BackgroundlayerController);


/**
 * @constructor
 * @param {angular.Scope} $scope Controller scope.
 * @ngInject
 */
app.MainController = function($scope) {

  /**
   * @type {ol.Map}
   */
  var map = new ol.Map({
    view: new ol.View({
      center: [-10635142.37, 4813698.29],
      zoom: 4
    })
  });
  this['map'] = map;

  /**
   * An overlay layer.
   * @type {ol.layer.Image}
   */
  var overlay = new ol.layer.Image({
    source: new ol.source.ImageWMS({
      url: 'http://demo.boundlessgeo.com/geoserver/wms',
      params: {'LAYERS': 'topp:states'},
      serverType: 'geoserver'
    })
  });

  map.addLayer(overlay);

};


app.module.controller('MainController', app.MainController);
