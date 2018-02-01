goog.provide('app.scaleselector');

// webpack: import './scaleselector.css';
// webpack: import './common_dependencies.js';
/** @suppress {extraRequire} */
goog.require('ngeo.misc.filters');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');

goog.require('ngeo');
goog.require('ngeo.map.module');


/** @type {!angular.Module} **/
app.scaleselector.module = angular.module('app', [
  ngeo.module.name,
  ngeo.map.module.name,
  ngeo.misc.filters.name,
]);


/**
 * @constructor
 * @param {angular.Scope} $scope Controller scope.
 * @ngInject
 */
app.scaleselector.MainController = function($scope) {

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
      center: [-10635142.37, 4813698.29],
      zoom: 1,
      maxZoom: 4
    })
  });

  /**
   * The zoom level/scale map object for the ngeoScaleselector directive.
   * @type {!Array.<number>}
   * @const
   * @export
   */
  this.scales = [200000000, 100000000, 50000000, 25000000, 12000000];

  /**
   * Use the "dropup" variation of the Bootstrap dropdown.
   * @type {ngeox.ScaleselectorOptions}
   * @export
   */
  this.options = {
    dropup: true
  };

};


app.scaleselector.module.controller('MainController', app.scaleselector.MainController);
