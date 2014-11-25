goog.provide('interactiontoggle');

goog.require('ngeo.DecorateInteraction');
goog.require('ngeo.mapDirective');
goog.require('ol.FeatureOverlay');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.interaction.Draw');
goog.require('ol.layer.Tile');
goog.require('ol.source.MapQuest');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
var module = angular.module('app', ['ngeo']);



/**
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @constructor
 * @ngInject
 */
app.MainController = function(ngeoDecorateInteraction) {

  /** @type {ol.Map} */
  var map = new ol.Map({
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
  this['map'] = map;

  var featureOverlay = new ol.FeatureOverlay();
  featureOverlay.setMap(map);

  /** @type {ol.interaction.Draw} */
  var interaction = new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'Point',
        features: featureOverlay.getFeatures()
      }));
  interaction.setActive(false);
  map.addInteraction(interaction);
  ngeoDecorateInteraction(interaction);
  this['interaction'] = interaction;

};


module.controller('MainController', app.MainController);
