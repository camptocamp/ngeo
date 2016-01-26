goog.provide('gmf-displayqueries');

goog.require('gmf.Displayqueries');
goog.require('gmf.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.proj');
goog.require('ol.source.OSM');


proj4.defs('EPSG:21781',
    '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 ' +
    '+x_0=600000 +y_0=200000 +ellps=bessel ' +
    '+towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);



/**
 * @param {gmf.Displayqueries} gmfDisplayqueries gmf Displayqueries service.
 * @constructor
 * @ngInject
 */
app.MainController = function(gmfDisplayqueries) {

  /**
   * @type {gmf.Displayqueries}
   * @private
   */
  this.displayqueries_ = gmfDisplayqueries;

  /**
   * @type {Array.<ol.Feature>}
   * @export
   */
  this.demoFeatures = [new ol.Feature({
    geometry: new ol.geom.Point([533065, 156135]),
    layer_name: 'Point',
    name: 'Point 1',
    id: '1234',
    foo: 'bar'
  }), new ol.Feature({
    geometry: new ol.geom.Point([535165, 152335]),
    layer_name: 'Point',
    name: 'Point 2',
    id: '5678',
    foo: 'bar'
  }), new ol.Feature({
    geometry: new ol.geom.Point([539565, 151935]),
    layer_name: 'Petit point',
    name: 'Point 3',
    id: '9101',
    foo: 'bar'
  })];

  /**
   * @type {Array.<Object>}
   * @export
   */
  this.queryResult = {
    sources: [{
      features: [
        new ol.Feature({
          geometry: new ol.geom.Point([533065, 156135]),
          name: 'Point 1',
          id: '1234',
          foo: 'barz'
        }),
        new ol.Feature({
          geometry: new ol.geom.Point([535165, 152335]),
          name: 'Point 2',
          id: '5678',
          foo: 'bary'
        })
      ],
      label: 'Bus Stop',
      name: 'bus_stop',
      pending: false
    }, {
      features: [
        new ol.Feature({
          geometry: new ol.geom.Point([539565, 151935]),
          name: 'Point 3',
          id: '9101',
          foo: 'barx'
        })
      ],
      label: 'Train station',
      name: 'train_station',
      pending: false
    }],
    'total': 0
  };

  this.simulateQuery = function() {
    this.displayqueries_.show(this.queryResult);
  };

  var projection = ol.proj.get('EPSG:21781');
  projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);

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
      projection: projection,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 3
    })
  });
};


app.module.controller('MainController', app.MainController);
