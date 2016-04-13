goog.provide('modifycircle');

goog.require('ngeo.interaction.ModifyCircle');
goog.require('ngeo.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.MapQuest');
goog.require('ol.source.Vector');
goog.require('ol.geom.Circle');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
var module = angular.module('app', ['ngeo']);


/**
 * @constructor
 * @ngInject
 */
app.MainController = function() {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'sat'})
      })
    ],
    view: new ol.View({
      center: [-10997148, 4569099],
      zoom: 4
    })
  });

  var map = this.map;

  var circle = new ol.geom.Circle([-10691093, 4966327], 465000);

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
   */
  this.features = new ol.Collection();

  this.features.push(new ol.Feature({
    geometry: ol.geom.Polygon.fromCircle(circle),
    color: '#000000',
    label: 'Circle 1',
    opacity: '0.5',
    stroke: '2',
    isCircle: true
  }));

  var vectorSource = new ol.source.Vector({
    features: this.features
  });
  var vectorLayer = new ol.layer.Vector({
    source: vectorSource
  });

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(map);

  /**
   * @type {ngeo.interaction.ModifyCircle}
   * @export
   */
  this.interaction = new ngeo.interaction.ModifyCircle(
    /** @type {ngeox.interaction.ModifyOptions} */({
      features: this.features
    }));

  var interaction = this.interaction;
  interaction.setActive(true);
  map.addInteraction(interaction);

};


module.controller('MainController', app.MainController);
