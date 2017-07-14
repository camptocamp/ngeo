goog.provide('app.layervisibility');

goog.require('ngeo.DecorateLayer');
/** @suppress {extraRequire} */
goog.require('ngeo.mapDirective');
goog.require('ngeo.source.AsitVD');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.TileWMS');


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @param {ngeo.DecorateLayer} ngeoDecorateLayer Decorate layer service.
 * @constructor
 * @ngInject
 */
app.MainController = function(ngeoDecorateLayer) {

  /**
   * @type {ol.layer.Tile}
   * @export
   */
  this.layer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'https://wms.geo.admin.ch',
      params: {'LAYERS': 'ch.swisstopo.geologie-gravimetrischer_atlas'},
      serverType: 'mapserver'
    })
  });

  const wmsLayer = this.layer;
  ngeoDecorateLayer(wmsLayer);

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ngeo.source.AsitVD({
          layer: 'asitvd.fond_couleur'
        })
      }),
      wmsLayer
    ],
    view: new ol.View({
      projection: 'EPSG:21781',
      resolutions: [1000, 500, 200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [600000, 200000],
      zoom: 1
    })
  });
};


app.module.controller('MainController', app.MainController);
