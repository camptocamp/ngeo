goog.provide('app.interactiontoggle');

goog.require('ngeo.DecorateInteraction');
/** @suppress {extraRequire} */
goog.require('ngeo.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.interaction.Draw');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.OSM');
goog.require('ol.source.Vector');


/** @type {!angular.Module} **/
const module = angular.module('app', ['ngeo']);


/**
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @constructor
 * @ngInject
 */
app.MainController = function(ngeoDecorateInteraction) {

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
      center: [-10997148, 4569099],
      zoom: 4
    })
  });

  const map = this.map;

  const vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector()
  });

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(map);

  /**
   * @type {ol.interaction.Draw}
   * @export
   */
  this.interaction = new ol.interaction.Draw(
      /** @type {olx.interaction.DrawOptions} */ ({
        type: 'Point',
        source: vectorLayer.getSource()
      }));

  const interaction = this.interaction;
  interaction.setActive(false);
  map.addInteraction(interaction);
  ngeoDecorateInteraction(interaction);

};


module.controller('MainController', app.MainController);
