goog.provide('gmfapp.wfspermalink');

/** @suppress {extraRequire} */
goog.require('gmf.mapDirective');
/** @suppress {extraRequire} */
goog.require('gmf.displayquerywindowComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');
goog.require('ol.style.Fill');
goog.require('ol.style.Circle');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', ['gmf']);


gmfapp.module.value('ngeoWfsPermalinkOptions',
    /** @type {ngeox.WfsPermalinkOptions} */ ({
      url: 'https://geomapfish-demo.camptocamp.net/2.2/wsgi/mapserv_proxy',
      wfsTypes: [
        {featureType: 'fuel', label: 'display_name'},
        {featureType: 'osm_scale', label: 'display_name'}
      ],
      defaultFeatureNS: 'http://mapserver.gis.umn.edu/mapserver',
      defaultFeaturePrefix: 'feature'
    }));

/**
 * @constructor
 * @ngInject
 */
gmfapp.MainController = function() {
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
      projection: 'EPSG:21781',
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 3
    })
  });

  const fill = new ol.style.Fill({color: [255, 170, 0, 0.6]});
  const stroke = new ol.style.Stroke({color: [255, 170, 0, 1], width: 2});

  /**
   * FeatureStyle used by the displayquerywindow directive
   * @type {ol.style.Style}
   * @export
   */
  this.featureStyle = new ol.style.Style({
    fill,
    image: new ol.style.Circle({fill, radius: 5, stroke}),
    stroke
  });
};

gmfapp.module.controller('MainController', gmfapp.MainController);
