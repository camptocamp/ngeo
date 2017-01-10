goog.provide('app.importfeatures');

/** @suppress {extraRequire} */
goog.require('ngeo.filereaderDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.extent');
goog.require('ol.format.KML');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.OSM');
goog.require('ol.source.Vector');


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * @constructor
 * @param {angular.Scope} $scope Scope.
 * @export
 * @ngInject
 */
app.MainController = function($scope) {

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
app.MainController.prototype.importKml_ = function(kml) {
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


app.module.controller('MainController', app.MainController);
