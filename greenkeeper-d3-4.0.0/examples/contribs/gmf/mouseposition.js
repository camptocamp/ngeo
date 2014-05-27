
/** @suppress {extraRequire} */


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


/**
 * @constructor
 * @ngInject
 */
app.MainController = function() {

  var epsg2056template = 'Coordinates (m)&#58; {x}, {y}';

  /**
   * @type {Array.<gmfx.MousePositionProjection>}
   * @export
   */
  this.projections = [{
    code: 'EPSG:2056',
    label: 'CH1903+ / LV03',
    filter: 'ngeoNumberCoordinates:0:' + epsg2056template
  }, {
    code: 'EPSG:21781',
    label: 'CH1903 / LV03',
    filter: 'ngeoNumberCoordinates:2:[{x} E; {y} N]'
  }, {
    code: 'EPSG:4326',
    label: 'WGS84',
    filter: 'ngeoDMSCoordinates:2'
  }];

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
      center: [828042, 5933739],
      zoom: 8
    })
  });
};

app.module.controller('MainController', app.MainController);
