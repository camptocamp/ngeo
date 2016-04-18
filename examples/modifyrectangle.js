goog.provide('modifyrectangle');

goog.require('ngeo.interaction.ModifyRectangle');
goog.require('ngeo.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.MapQuest');
goog.require('ol.source.Vector');
goog.require('ol.geom.Polygon');


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

  var rectangle = new ol.geom.Polygon([[
              [-9e6, 4e6], [-11e6, 4e6], [-11e6, 6e6], [-9e6, 6e6]
  ]]);

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
   */
  this.features = new ol.Collection();

  this.features.push(new ol.Feature({
    geometry: rectangle,
    color: '#000000',
    opacity: '0.5',
    stroke: '2'
  }));

  /**
   * @type {ngeo.interaction.ModifyRectangle}
   * @export
   */
  this.interaction = new ngeo.interaction.ModifyRectangle(
    /** @type {olx.interaction.ModifyOptions} */({
      features: this.features
    }));

  var interaction = this.interaction;
  interaction.setActive(true);
  map.addInteraction(interaction);

};


module.controller('MainController', app.MainController);
