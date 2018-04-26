/**
 * @module app.modifycircle
 */
const exports = {};

import './modifycircle.css';
import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';

import ngeoInteractionModifyCircle from 'ngeo/interaction/ModifyCircle.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceVector from 'ol/source/Vector.js';
import olGeomCircle from 'ol/geom/Circle.js';
import olGeomPolygon from 'ol/geom/Polygon.js';
import olCollection from 'ol/Collection.js';
import olFeature from 'ol/Feature.js';
import ngeoMapModule from 'ngeo/map/module.js';


/** @type {!angular.Module} **/
const appmodule = angular.module('app', [
  'gettext',
  ngeoMapModule.name
]);


/**
 * @constructor
 * @ngInject
 */
exports.MainController = function() {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM()
      })
    ],
    view: new olView({
      center: [-10997148, 4569099],
      zoom: 4
    })
  });

  const map = this.map;

  const circle = new olGeomCircle([-10691093, 4966327], 465000);

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
   */
  this.features = new olCollection();

  const circleFeature = new olFeature({
    geometry: olGeomPolygon.fromCircle(circle),
    color: '#000000',
    label: 'Circle 1',
    opacity: '0.5',
    stroke: '2'
  });

  circleFeature.set(ngeoFormatFeatureProperties.IS_CIRCLE, true);
  this.features.push(circleFeature);

  const vectorSource = new olSourceVector({
    features: this.features
  });
  const vectorLayer = new olLayerVector({
    source: vectorSource
  });

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(map);

  /**
   * @type {ngeo.interaction.ModifyCircle}
   * @export
   */
  this.interaction = new ngeoInteractionModifyCircle(
    /** @type {olx.interaction.ModifyOptions} */({
      features: this.features
    }));

  const interaction = this.interaction;
  interaction.setActive(true);
  map.addInteraction(interaction);

};


appmodule.controller('MainController', exports.MainController);


export default exports;
