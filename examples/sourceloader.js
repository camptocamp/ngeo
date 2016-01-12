goog.provide('sourceloader');

goog.require('ngeo.SourceLoaderController');
goog.require('ngeo.filereaderDirective');
goog.require('ngeo.mapDirective');
goog.require('ngeo.sourceLoaderDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.proj');
goog.require('ol.source.OSM');
goog.require('ol.source.TileWMS');


proj4.defs('EPSG:21781',
    '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 ' +
    '+x_0=600000 +y_0=200000 +ellps=bessel ' +
    '+towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);



/**
 * @constructor
 */
app.MainController = function() {

  /**
   * List of preconfigured WMS and WMTS servers.
   * @type {Array.<{label: string, url: string, type: string}>}
   * @export
   */
  this.externalUrls = [
    {
      'type': 'wms',
      'label': 'demo opengeo',
      'url': 'http://demo.opengeo.org/geoserver/wms'
    }, {
      'type': 'wms',
      'url': 'https://wms.geo.admin.ch/'
    }, {
      'type': 'wmts',
      'label': 'heig vd',
      'url': 'http://ogc.heig-vd.ch/mapserver/wms'
    }
  ];

  /**
   * @type {ol.Map}
   * @export
   */
  window.map = this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: [829330, 5933916],
      zoom: 7
    })
  });
};


/**
 * @param {ngeo.CapLayer} layer
 */
app.MainController.prototype.addLayerToMap = function(layer) {
  // Reproject extent to view extent.
  // Could search the bounding boxes if one for the target SRS exists.
  var extent = ol.proj.transformExtent(
      layer.BoundingBox[0].extent,
      layer.BoundingBox[0].crs,
      this.map.getView().getProjection());

  // Does not work for some reason, using this instead:
  if (!extent.every(isFinite)) {
    // Ex: http://demo.opengeo.org/geoserver/wms Tasmania
    extent = this.map.getView().getProjection().getExtent();
  }
  console.log(extent);

  var olLayer = new ol.layer.Tile({
    extent: extent,
    source: new ol.source.TileWMS({
      url: layer.wmsUrl,
      params: {'LAYERS': layer.Name}
    })
  });
  this.map.addLayer(olLayer);
};

app.module.controller('MainController', app.MainController);
