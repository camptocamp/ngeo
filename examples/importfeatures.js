goog.provide('app.importfeatures');

// webpack: import './importfeatures.css';
// webpack: import './common_dependencies.js';
goog.require('ngeo');
goog.require('ngeo.map.module');
/** @suppress {extraRequire} */
goog.require('ngeo.misc.filereaderComponent');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.extent');
goog.require('ol.format.KML');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.OSM');
goog.require('ol.source.Vector');


/** @type {!angular.Module} **/
app.importfeatures.module = angular.module('app', [
  ngeo.map.module.name,
  ngeo.misc.filereaderComponent.name,
]);


/**
 * @constructor
 * @param {angular.Scope} $scope Scope.
 * @export
 * @ngInject
 */
app.importfeatures.MainController = function($scope) {

  /**
   * @private
   * @type {ol.format.KML}
   */
  this.kmlFormat_ = new ol.format.KML();

  /**
   * @private
   * @type {ol.source.Vector}
   */
  this.vectorSource_ = new ol.source.Vector();

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      new ol.layer.Vector({
        source: this.vectorSource_
      })
    ],
    view: new ol.View({
      center: [0, 0],
      zoom: 2
    })
  });


  /**
   * @type {boolean|undefined}
   * @export
   */
  this.fileReaderSupported = undefined;

  /**
   * @type {string}
   * @export
   */
  this.fileContent = '';

  $scope.$watch(() => this.fileContent, this.importKml_.bind(this));

};


/**
 * @param {string} kml KML document.
 * @private
 */
app.importfeatures.MainController.prototype.importKml_ = function(kml) {
  const map = this.map;
  const vectorSource = this.vectorSource_;
  const features = this.kmlFormat_.readFeatures(kml, {
    featureProjection: 'EPSG:3857'
  });
  vectorSource.clear(true);
  vectorSource.addFeatures(features);
  const extent = vectorSource.getExtent();
  const mapSize = map.getSize();
  if (mapSize && !ol.extent.isEmpty(extent)) {
    map.getView().fit(extent, mapSize);
  }
};


app.importfeatures.module.controller('MainController', app.importfeatures.MainController);
