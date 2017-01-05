goog.provide('app.geolocation');

goog.require('ngeo.DecorateGeolocation');
/** @suppress {extraRequire} */
goog.require('ngeo.mapDirective');
goog.require('ol.Feature');
goog.require('ol.Geolocation');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.geom.Point');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.OSM');
goog.require('ol.source.Vector');


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @param {ngeo.DecorateGeolocation} ngeoDecorateGeolocation Decorate
 *     Geolocation service.
 * @constructor
 * @ngInject
 */
app.MainController = function(ngeoDecorateGeolocation) {
  const view = new ol.View({
    center: [647019, 6239641],
    zoom: 4
  });

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
    view: view
  });

  const map = this.map;

  /**
   * @type {ol.Geolocation}
   * @export
   */
  this.geolocation = new ol.Geolocation({
    projection: view.getProjection()
  });

  const geolocation = this.geolocation;

  const positionPoint = new ol.geom.Point([0, 0]);
  const positionFeature = new ol.Feature(positionPoint);

  const accuracyFeature = new ol.Feature();
  geolocation.on('change:accuracyGeometry', function() {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
  });

  const vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [positionFeature, accuracyFeature]
    })
  });

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(map);

  geolocation.on('change:position', function(e) {
    const position = /** @type {ol.Coordinate} */ (geolocation.getPosition());
    positionPoint.setCoordinates(position);
    map.getView().setCenter(position);
    map.getView().setZoom(17);
  });

  ngeoDecorateGeolocation(geolocation);
};


app.module.controller('MainController', app.MainController);
