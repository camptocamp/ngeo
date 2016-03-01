goog.provide('backgroundlayer');

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
 * The directive is based on Angular's select, ngOptions, ngModel, and
 * ngChange directives. ngChange is used to avoid adding a watcher on
 * the ngModel expression.
 *
 * Note: we don't need two-way binding for ngModel here, but using ::
 * for the ngModel expression doesn't actually make a difference. This
 * is because ngModel doesn't actually watch the ngModel expression.
 *
 * @return {angular.Directive} Directive Defintion Object.
 */
app.backgroundlayerDirective = function() {
  return {
    restrict: 'E',
    scope: {
      'map': '=appBackgroundlayerMap'
    },
    templateUrl: 'partials/backgroundlayer.html',
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

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {Array.<Object>|undefined}
   * @export
   */
  this.bgLayers = undefined;

  /**
   * @type {Object}
   * @export
   */
  this.bgLayer = null;

  $http.get('data/backgroundlayers.json').then(
      function(resp) {
        this.bgLayers = resp.data;
        // use the first layer by default
        this.bgLayer = this.bgLayers[0];
      }.bind(this));

  /**
   * @type {ngeo.BackgroundLayerMgr}
   * @private
   */
  this.backgroundLayerMgr_ = ngeoBackgroundLayerMgr;
};


/**
 * Function called when the user selects a new background layer through
 * the select element. The ngChange directive used in the partial calls
 * it.
 * @export
 */
app.BackgroundlayerController.prototype.change = function() {
  var layerSpec = this.bgLayer;
  var layer = this.getLayer_(layerSpec['name']);
  this.backgroundLayerMgr_.set(this.map, layer);
};


/**
 * @param {string} layerName Layer name.
 * @return {ol.layer.Tile} The layer.
 * @private
 */
app.BackgroundlayerController.prototype.getLayer_ = function(layerName) {
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
   * @export
   */
  this.map = new ol.Map({
    view: new ol.View({
      center: [-10635142.37, 4813698.29],
      zoom: 4
    })
  });

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

  this.map.addLayer(overlay);

};


app.module.controller('MainController', app.MainController);
