goog.provide('gmfapp.search');

/** @suppress {extraRequire} */
goog.require('gmf.map.component');
goog.require('gmf.search.module');
goog.require('gmf.theme.Themes');
goog.require('ngeo.message.Notification');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ngeo.map.module');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


/** @type {!angular.Module} **/
gmfapp.module = angular.module('gmfapp', [
  gmf.module.name, // Change me when gmf.Theme and other dependencies are in a module
  gmf.map.component.name,
  gmf.search.module.name,
  gmf.theme.Themes.module.name,
  ngeo.map.module.name // for ngeo.map.FeatureOverlay, perhaps remove me
]);


gmfapp.module.value('gmfTreeUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/themes?version=2&background=background');

gmfapp.module.value('fulltextsearchUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/fulltextsearch?limit=30&partitionlimit=5&interface=desktop');

gmfapp.module.value('gmfLayersUrl',
  'https://geomapfish-demo.camptocamp.net/2.2/wsgi/layers/');

/**
 * @param {gmf.theme.Themes} gmfThemes Themes service.
 * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature overlay manager service.
 * @param {ngeo.message.Notification} ngeoNotification Ngeo notification service.
 * @constructor
 * @ngInject
 */
gmfapp.MainController = function(gmfThemes, ngeoFeatureOverlayMgr, ngeoNotification) {

  gmfThemes.loadThemes();

  ngeoFeatureOverlayMgr.init(this.map);

  /**
   * @type {Array.<gmfx.SearchComponentDatasource>}
   * @export
   */
  this.searchDatasources = [{
    groupValues: ['osm', 'district'],
    groupActions: [],
    labelKey: 'label',
    projection: 'EPSG:21781',
    bloodhoundOptions: {
      remote: {
        rateLimitWait: 250
      }
    },
    url: 'https://geomapfish-demo.camptocamp.net/2.2/wsgi/fulltextsearch'
  }];

  const fill = new ol.style.Fill({color: [255, 255, 255, 0.6]});
  const stroke = new ol.style.Stroke({color: [255, 0, 0, 1], width: 2});
  /**
   * @type {Object.<string, ol.style.Style>} Map of styles for search overlay.
   * @export
   */
  this.searchStyles = {
    'osm': new ol.style.Style({
      fill: fill,
      image: new ol.style.Circle({
        fill: fill,
        radius: 5,
        stroke: stroke
      }),
      stroke: stroke
    })
  };

  /**
   * @type {TypeaheadOptions}
   * @export
   */
  this.searchOptions = {
    minLength: 2
  };

  /**
   * @type {string}
   * @export
   */
  this.inputValue = '';

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

  /**
   * @type {function()}
   * @export
   */
  this.searchIsReady = () => {
    ngeoNotification.notify({
      msg: 'gmf-search initialized',
      target: angular.element('#message'),
      type: ngeo.message.Message.Type.SUCCESS
    });
  };
};

gmfapp.module.controller('MainController', gmfapp.MainController);
