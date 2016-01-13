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
      'type': 'wms',
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
 * @param {ngeox.LayerItem} layerItem
 */
app.MainController.prototype.addLayerToMap = function(layerItem) {
  // TODO: handle WMS

  var olLayer = layerItem.layer;
  if (!olLayer) {
    if (layerItem.type === 'wms') {
      var raw = /** @type {ngeo.WMSCapLayer} */ (layerItem.raw);
      layerItem.layer = olLayer = new ol.layer.Tile({
        extent: layerItem.extent,
        source: new ol.source.TileWMS({
          url: layerItem.url,
          params: {
            'LAYERS': raw.Name
          }
        })
      });
    } else if (layerItem.type === 'wmts') {
      console.log('Implement WMTS support');
      // TODO
      // var options = ol.source.WMTS.optionsFromCapabilities(capability, raw);
      // layerItem.layer = olLayer = ol.layer.Tile({
      //   extent: layerItem.extent,
      //   source: new ol.source.TileWMTS(options)
      // });
    }
  }
  if (olLayer) {
    this.map.addLayer(olLayer);
  }
};

app.module.controller('MainController', app.MainController);
