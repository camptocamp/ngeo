


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @param {ngeo.DecorateGeolocation} ngeoDecorateGeolocation Decorate
 *     Geolocation service.
 * @constructor
 * @ngInject
 */
app.MainController = function(ngeoDecorateGeolocation) {
  var view = new ol.View({
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

  var map = this.map;

  /**
   * @type {ol.Geolocation}
   * @export
   */
  this.geolocation = new ol.Geolocation({
    projection: view.getProjection()
  });

  var geolocation = this.geolocation;

  var positionPoint = new ol.geom.Point([0, 0]);
  var positionFeature = new ol.Feature(positionPoint);

  var accuracyFeature = new ol.Feature();
  geolocation.on('change:accuracyGeometry', function() {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
  });

  var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [positionFeature, accuracyFeature]
    })
  });

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(map);

  geolocation.on('change:position', function(e) {
    var position = /** @type {ol.Coordinate} */ (geolocation.getPosition());
    positionPoint.setCoordinates(position);
    map.getView().setCenter(position);
    map.getView().setZoom(17);
  });

  ngeoDecorateGeolocation(geolocation);
};


app.module.controller('MainController', app.MainController);
