goog.provide('measure');

goog.require('ngeo.DecorateInteraction');
goog.require('ngeo.MeasureEvent');
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
goog.require('ol.control.ScaleLine');
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
      'map': '=appMeasuretoolsMap',
      'lang': '=appMeasuretoolsLang'
    },
    controller: 'AppMeasuretoolsController',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'partials/measuretools.html'
  };
};

app.module.directive('appMeasuretools', app.measuretoolsDirective);



/**
 * @param {angular.Scope} $scope Angular scope.
 * @param {angular.$compile} $compile Angular compile service.
 * @param {angular.$sce} $sce Angular sce service.
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @constructor
 * @ngInject
 */
app.MeasuretoolsController = function($scope, $compile, $sce,
    ngeoDecorateInteraction) {

  // Translations for the measure tools' tooltips.
  var measureStartMsgs = {
    'en': $sce.trustAsHtml('Click to start drawing.'),
    'fr': $sce.trustAsHtml('Cliquer pour commencer à dessiner.')
  };
  var measureLengthContinueMsgs = {
    'en': $sce.trustAsHtml('Click to continue drawing.<br>' +
        'Double-click or click last point to finish.'),
    'fr': $sce.trustAsHtml('Cliquer pour continuer le dessin.<br>' +
        'Double-cliquer ou cliquer sur dernier point pour finir.')
  };
  var measureAreaContinueMsgs = {
    'en': $sce.trustAsHtml('Click to continue drawing.<br>' +
        'Double-click or click starting point to finish.'),
    'fr': $sce.trustAsHtml('Cliquer pour continuer le dessin.<br>' +
        'Double-cliquer ou cliquer sur point de départ pour finir.')
  };
  var measureAzimutContinueMsgs = {
    'en': $sce.trustAsHtml('Click to finish.'),
    'fr': $sce.trustAsHtml('Cliquer pour finir.')
  };

  // Create elements for the measure tools' tooltips.
  var measureStartMsg = angular.element(
      '<span ng-bind-html="ctrl.measureStartMsg"></span>');
  measureStartMsg = $compile(measureStartMsg)($scope);
  var measureLengthContinueMsg = angular.element(
      '<span ng-bind-html="ctrl.measureLengthContinueMsg"></span>');
  measureLengthContinueMsg = $compile(measureLengthContinueMsg)($scope);
  var measureAreaContinueMsg = angular.element(
      '<span ng-bind-html="ctrl.measureAreaContinueMsg"></span>');
  measureAreaContinueMsg = $compile(measureAreaContinueMsg)($scope);
  var measureAzimutContinueMsg = angular.element(
      '<span ng-bind-html="ctrl.measureAzimutContinueMsg"></span>');
  measureAzimutContinueMsg = $compile(measureAzimutContinueMsg)($scope);

  // Watch the "lang" property and update the toolip messages
  // based on the selected language.
  $scope.$watch(angular.bind(this, function() {
    return this['lang'];
  }), angular.bind(this, function(newVal) {
    this['measureStartMsg'] = measureStartMsgs[newVal];
    this['measureLengthContinueMsg'] = measureLengthContinueMsgs[newVal];
    this['measureAreaContinueMsg'] = measureAreaContinueMsgs[newVal];
    this['measureAzimutContinueMsg'] = measureAzimutContinueMsgs[newVal];
  }));

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
    sketchStyle: style,
    startMsg: measureStartMsg[0],
    continueMsg: measureLengthContinueMsg[0]
  });
  measureLength.setActive(false);
  ngeoDecorateInteraction(measureLength);
  map.addInteraction(measureLength);
  this['measureLength'] = measureLength;

  /** @type {ngeo.interaction.MeasureArea} */
  var measureArea = new ngeo.interaction.MeasureArea({
    sketchStyle: style,
    startMsg: measureStartMsg[0],
    continueMsg: measureAreaContinueMsg[0]
  });
  measureArea.setActive(false);
  ngeoDecorateInteraction(measureArea);
  map.addInteraction(measureArea);
  this['measureArea'] = measureArea;

  /** @type {ngeo.interaction.MeasureAzimut} */
  var measureAzimut = new ngeo.interaction.MeasureAzimut({
    sketchStyle: style,
    startMsg: measureStartMsg[0],
    continueMsg: measureAzimutContinueMsg[0]
  });
  measureAzimut.setActive(false);
  ngeoDecorateInteraction(measureAzimut);
  map.addInteraction(measureAzimut);
  this['measureAzimut'] = measureAzimut;


  // the following code shows how one can add additional information to the
  // tooltip. This can be useful to display the elevation offset from the
  // 2 points of an azimut measurement.
  measureAzimut.on('measureend', function(evt) {
    var el = evt.target.getTooltipElement();
    el.innerHTML += '<br>Additional info';
  });
};

app.module.controller('AppMeasuretoolsController', app.MeasuretoolsController);



/**
 * @constructor
 */
app.MainController = function() {

  /** @type {string} */
  this['lang'] = 'en';

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

  map.addControl(new ol.control.ScaleLine());

};


app.module.controller('MainController', app.MainController);
