goog.provide('geolocation');

goog.require('ngeo.DecorateGeolocation');
goog.require('ngeo.mapDirective');
goog.require('ol.Feature');
goog.require('ol.FeatureOverlay');
goog.require('ol.Geolocation');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.MapQuest');


/** @const **/
var app = {};


var module = angular.module('app', ['ngeo']);



/**
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.DecorateGeolocation} ngeoDecorateGeolocation Decorate
 *     Geolocation service.
 * @constructor
 * @ngInject
 */
app.MainController = function($scope, ngeoDecorateGeolocation) {
  var view = new ol.View({
    center: [647019, 6239641],
    zoom: 4
  });

  /** @type {ol.Map} */
  var map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: view
  });
  this['map'] = map;

  var geolocation = new ol.Geolocation({
    projection: view.getProjection()
  });
  this['geolocation'] = geolocation;

  var positionPoint = new ol.geom.Point([0, 0]);
  var positionFeature = new ol.Feature(positionPoint);

  var accuracyFeature = new ol.Feature();
  accuracyFeature.bindTo('geometry', geolocation, 'accuracyGeometry');

  var featureOverlay = new ol.FeatureOverlay({
    features: [positionFeature, accuracyFeature]
  });
  featureOverlay.setMap(map);

  geolocation.on('change:position', function(e) {
    var position = /** @type {ol.Coordinate} */ (geolocation.getPosition());
    positionPoint.setCoordinates(position);
    map.getView().setCenter(position);
    map.getView().setZoom(17);
  });

  ngeoDecorateGeolocation(geolocation);
};


module.controller('MainController', app.MainController);
