goog.provide('app.offline');

// webpack: import './offline.less';
// webpack: import './common_dependencies.js';
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

goog.require('ngeo');
goog.require('ngeo.map.module');
goog.require('ngeo.offline.module');

// Useful to work on example - remove me later
// webpack: import 'bootstrap/js/modal.js';
// webpack: import 'jquery-ui/ui/widgets/resizable.js'
// webpack: import 'jquery-ui/ui/widgets/draggable.js';
// webpack: ngeoBase.baseModuleTemplateUrl = '../../src/';

/** @type {!angular.Module} **/
app.offline.module = angular.module('app', [
  'gettext',
  ngeo.module.name,
  ngeo.map.module.name,
  ngeo.offline.module.name
]);


/**
 * @param {ngeoFeatureOverlayMgr} ngeoFeatureOverlayMgr ngeo feature overlay manager service.
 * @constructor
 * @ngInject
 */
app.offline.MainController = function(ngeoFeatureOverlayMgr) {

  /**
   * Save a square of 10 km sideways (Map's unit is the meter).
   * @type {number}
   * @export
   */
  this.offlineExtentSize = 10000;

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

  ngeoFeatureOverlayMgr.init(this.map);
};


app.offline.module.controller('MainController', app.offline.MainController);
