goog.provide('gmf-locationchooser');

goog.require('gmf.locationchooserDirective');
goog.require('gmf.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);



/**
 * @constructor
 * @ngInject
 */
app.MainController = function() {

  /**
   * @type {Array.<gmfx.LocationchooserLocation>}
   * @export
   */
  this.locations = [{
    label: 'Europa',
    extent: [-1898084, 4676723, 3972279, 8590299]
  }, {
    label: 'Switzerland',
    extent: [727681, 5784754, 1094579, 6029353]
  }, {
    label: 'Iceland',
    extent: [-2778639, 9133308, -1311048, 10111701]
  }, {
    label: 'Australia',
    extent: [12044030, -4921322, 17914393, -1007746]
  }];


  /**
   * @type {gmfx.LocationchooserLocation}
   * @export
   */
  this.selectedLocation = this.locations[2];

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
};


app.module.controller('MainController', app.MainController);
