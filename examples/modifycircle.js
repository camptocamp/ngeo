goog.provide('app.modifycircle');

// webpack: import './modifycircle.css';
// webpack: import './common_dependencies.js';
goog.require('ngeo.format.FeatureProperties');
goog.require('ngeo.interaction.ModifyCircle');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.OSM');
goog.require('ol.source.Vector');
goog.require('ol.geom.Circle');
goog.require('ol.geom.Polygon');
goog.require('ol.Collection');
goog.require('ol.Feature');

goog.require('ngeo');
goog.require('ngeo.map.module');


/** @type {!angular.Module} **/
const module = angular.module('app', [
  ngeo.map.module.name
]);


/**
 * @constructor
 * @ngInject
 */
app.modifycircle.MainController = function() {

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

  const circle = new ol.geom.Circle([-10691093, 4966327], 465000);

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
   */
  this.features = new ol.Collection();

  const circleFeature = new ol.Feature({
    geometry: ol.geom.Polygon.fromCircle(circle),
    color: '#000000',
    label: 'Circle 1',
    opacity: '0.5',
    stroke: '2'
  });

  circleFeature.set(ngeo.format.FeatureProperties.IS_CIRCLE, true);
  this.features.push(circleFeature);

  const vectorSource = new ol.source.Vector({
    features: this.features
  });
  const vectorLayer = new ol.layer.Vector({
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
    /** @type {olx.interaction.ModifyOptions} */({
      features: this.features
    }));

  const interaction = this.interaction;
  interaction.setActive(true);
  map.addInteraction(interaction);

};


module.controller('MainController', app.modifycircle.MainController);
