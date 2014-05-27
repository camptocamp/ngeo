


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.value(
    'gmfRasterUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/raster');

app.module.value(
    'gmfContextualdatacontentTemplateUrl',
    'partials/contextualdata.html');


/**
 * @constructor
 */
app.MainController = function() {

  var projection = ol.proj.get('EPSG:21781');

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
      projection: projection,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [600000, 200000],
      zoom: 3
    })
  });
};


/**
 * @param {ol.Coordinate} coordinate The coordinate for the right-clicked
 *     point.
 * @param {Object} data The data received from the raster service.
 * @return {Object} The additional data to add to the scope for the
 *     contextualdata popover.
 */
app.MainController.prototype.onRasterData = function(coordinate, data) {
  return {
    'elelvation_diff': data.srtm - data.aster
  };
};


app.module.controller('MainController', app.MainController);
