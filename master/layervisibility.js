


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);



/**
 * @param {ngeo.DecorateLayer} ngeoDecorateLayer Decorate layer service.
 * @constructor
 * @ngInject
 */
app.MainController = function(ngeoDecorateLayer) {

  /** @type {ol.layer.Tile} */
  var wmsLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'http://demo.opengeo.org/geoserver/wms',
      params: {'LAYERS': 'topp:states'},
      serverType: 'geoserver',
      extent: [-13884991, 2870341, -7455066, 6338219]
    })
  });
  ngeoDecorateLayer(wmsLayer);
  this['layer'] = wmsLayer;

  /** @type {ol.Map} */
  this['map'] = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'sat'})
      }),
      wmsLayer
    ],
    view: new ol.View({
      center: [-10997148, 4569099],
      zoom: 4
    })
  });
};


app.module.controller('MainController', app.MainController);
