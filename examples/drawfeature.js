goog.provide('app.drawfeature');

// webpack: import './drawfeature.css';
// webpack: import './common_dependencies.js';
goog.require('ngeo');
goog.require('ngeo.draw.module');
goog.require('ngeo.map.module');
goog.require('ngeo.misc.ToolActivate');
goog.require('ngeo.misc.ToolActivateMgr');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.OSM');
goog.require('ol.source.Vector');


/** @type {!angular.Module} **/
app.drawfeature.module = angular.module('app', [
  ngeo.module.name,
  ngeo.draw.module.name,
  ngeo.map.module.name,
  ngeo.misc.ToolActivateMgr.module.name,
]);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {ol.Collection.<ol.Feature>} ngeoFeatures Collection of features.
 * @param {ngeo.misc.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @ngInject
 * @constructor
 */
app.drawfeature.MainController = function($scope, ngeoFeatures, ngeoToolActivateMgr) {

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  const vector = new ol.layer.Vector({
    source: new ol.source.Vector({
      wrapX: false,
      features: ngeoFeatures
    })
  });

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      vector
    ],
    view: new ol.View({
      center: [0, 0],
      zoom: 3
    })
  });

  /**
   * @type {boolean}
   * @export
   */
  this.drawActive = false;

  const drawToolActivate = new ngeo.misc.ToolActivate(this, 'drawActive');
  ngeoToolActivateMgr.registerTool('mapTools', drawToolActivate, false);

  /**
   * @type {boolean}
   * @export
   */
  this.dummyActive = true;

  const dummyToolActivate = new ngeo.misc.ToolActivate(this, 'dummyActive');
  ngeoToolActivateMgr.registerTool('mapTools', dummyToolActivate, true);
};


app.drawfeature.module.controller('MainController', app.drawfeature.MainController);
