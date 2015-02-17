goog.provide('measure');

goog.require('ngeo.DecorateInteraction');
goog.require('ngeo.btngroupDirective');
goog.require('ngeo.interaction.MeasureArea');
goog.require('ngeo.interaction.MeasureAzimut');
goog.require('ngeo.interaction.MeasureLength');
goog.require('ngeo.mapDirective');
goog.require('ol.FeatureOverlay');
goog.require('ol.Map');
goog.require('ol.Observable');
goog.require('ol.Overlay');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


/**
 * App-specific directive wrapping the measure tools. The directive's
 * controller has a property "map" including a reference to the OpenLayers
 * map.
 *
 * @return {angular.Directive} The directive specs.
 */
app.measuretoolsDirective = function() {
  return {
    restrict: 'A',
    scope: {
      'map': '=appMeasuretoolsMap'
    },
    controller: 'AppMeasuretoolsController',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'partials/measuretools.html'
  };
};

app.module.directive('appMeasuretools', app.measuretoolsDirective);



/**
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @constructor
 * @ngInject
 */
app.MeasuretoolsController = function(ngeoDecorateInteraction) {

  var style = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
      color: 'rgba(0, 0, 0, 0.5)',
      lineDash: [10, 10],
      width: 2
    }),
    image: new ol.style.Circle({
      radius: 5,
      stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.7)'
      }),
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      })
    })
  });

  var map = this['map'];

  /** @type {ngeo.interaction.MeasureLength} */
  var measureLength = new ngeo.interaction.MeasureLength({
    sketchStyle: style
  });
  measureLength.setActive(false);
  ngeoDecorateInteraction(measureLength);
  map.addInteraction(measureLength);
  this['measureLength'] = measureLength;

  /** @type {ngeo.interaction.MeasureArea} */
  var measureArea = new ngeo.interaction.MeasureArea({
    sketchStyle: style
  });
  measureArea.setActive(false);
  ngeoDecorateInteraction(measureArea);
  map.addInteraction(measureArea);
  this['measureArea'] = measureArea;

  /** @type {ngeo.interaction.MeasureAzimut} */
  var measureAzimut = new ngeo.interaction.MeasureAzimut({
    sketchStyle: style
  });
  measureAzimut.setActive(false);
  ngeoDecorateInteraction(measureAzimut);
  map.addInteraction(measureAzimut);
  this['measureAzimut'] = measureAzimut;
};

app.module.controller('AppMeasuretoolsController', app.MeasuretoolsController);



/**
 * @constructor
 */
app.MainController = function() {

  /** @type {ol.Map} */
  var map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: [692114.718759744, 5743119.914347709],
      zoom: 15
    })
  });
  this['map'] = map;

};


app.module.controller('MainController', app.MainController);
