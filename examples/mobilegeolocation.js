goog.provide('app.mobilegeolocation');

goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');
goog.require('ol.style.Circle');
goog.require('ol.style.Style');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');

goog.require('ngeo.map.module');
goog.require('ngeo.geolocation.mobile');


/** @type {!angular.Module} **/
const module = angular.module('app', [
  ngeo.module.name,
  ngeo.geolocation.mobile.name,
  ngeo.map.module.name
]);


/**
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @constructor
 * @ngInject
 */
app.MainController = function($scope, ngeoFeatureOverlayMgr) {

  const positionFeatureStyle = new ol.style.Style({
    image: new ol.style.Circle({
      radius: 6,
      fill: new ol.style.Fill({color: 'rgba(230, 100, 100, 1)'}),
      stroke: new ol.style.Stroke({color: 'rgba(230, 40, 40, 1)', width: 2})
    })
  });

  const accuracyFeatureStyle = new ol.style.Style({
    fill: new ol.style.Fill({color: 'rgba(100, 100, 230, 0.3)'}),
    stroke: new ol.style.Stroke({color: 'rgba(40, 40, 230, 1)', width: 2})
  });

  /**
   * @type {ngeox.MobileGeolocationDirectiveOptions}
   * @export
   */
  this.mobileGeolocationOptions = {
    positionFeatureStyle: positionFeatureStyle,
    accuracyFeatureStyle: accuracyFeatureStyle,
    zoom: 17,
    autorotate: true
  };

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
      center: [0, 0],
      zoom: 4
    })
  });

  ngeoFeatureOverlayMgr.init(this.map);
};


module.controller('MainController', app.MainController);
