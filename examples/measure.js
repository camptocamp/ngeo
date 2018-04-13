goog.provide('app.measure');

// webpack: import './measure.css';
goog.require('ngeo.interaction.MeasureArea');
goog.require('ngeo.interaction.MeasureAzimut');
goog.require('ngeo.interaction.MeasureLength');
goog.require('ngeo.map.module');
/** @suppress {extraRequire} */
goog.require('ngeo.misc.btnComponent');
goog.require('ngeo.misc.decorate');
goog.require('ngeo.misc.filters');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.control.ScaleLine');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');
goog.require('ol.style.Style');
goog.require('ol.style.Circle');
goog.require('ol.style.Stroke');
goog.require('ol.style.Fill');
// webpack: import 'angular-sanitize';


/** @type {!angular.Module} **/
app.measure.module = angular.module('app', [
  'gettext',
  ngeo.map.module.name,
  ngeo.misc.btnComponent.name,
  ngeo.misc.filters.name,
  'ngSanitize',
]);


/**
 * App-specific component wrapping the measure tools. The component's
 * controller has a property "map" including a reference to the OpenLayers
 * map.
 *
 * @type {!angular.Component}
 */
app.measure.measuretoolsComponent = {
  bindings: {
    'map': '=appMeasuretoolsMap',
    'lang': '=appMeasuretoolsLang'
  },
  controller: 'AppMeasuretoolsController',
  template: require('./partials/measuretools.html')
};

app.measure.module.component('appMeasuretools', app.measure.measuretoolsComponent);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {angular.$compile} $compile Angular compile service.
 * @param {angular.$sce} $sce Angular sce service.
 * @param {angular.$filter} $filter Angular filter service.
 * @param {!angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @constructor
 * @ngInject
 */
app.measure.MeasuretoolsController = function($scope, $compile, $sce,
  $filter, gettextCatalog) {

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {string}
   * @export
   */
  this.lang;

  /**
   * @type {Object}
   * @export
   */
  this.measureStartMsg = null;

  /**
   * @type {Object}
   * @export
   */
  this.measureLengthContinueMsg = null;


  /**
   * @type {Object}
   * @export
   */
  this.measureAreaContinueMsg = null;

  /**
   * @type {Object}
   * @export
   */
  this.measureAzimutContinueMsg = null;

  // Translations for the measure tools' tooltips.
  const measureStartMsgs = {
    'en': $sce.trustAsHtml('Click to start drawing.'),
    'fr': $sce.trustAsHtml('Cliquer pour commencer à dessiner.')
  };
  const measureLengthContinueMsgs = {
    'en': $sce.trustAsHtml('Click to continue drawing.<br>' +
        'Double-click or click last point to finish.'),
    'fr': $sce.trustAsHtml('Cliquer pour continuer le dessin.<br>' +
        'Double-cliquer ou cliquer sur dernier point pour finir.')
  };
  const measureAreaContinueMsgs = {
    'en': $sce.trustAsHtml('Click to continue drawing.<br>' +
        'Double-click or click starting point to finish.'),
    'fr': $sce.trustAsHtml('Cliquer pour continuer le dessin.<br>' +
        'Double-cliquer ou cliquer sur point de départ pour finir.')
  };
  const measureAzimutContinueMsgs = {
    'en': $sce.trustAsHtml('Click to finish.'),
    'fr': $sce.trustAsHtml('Cliquer pour finir.')
  };

  // Create elements for the measure tools' tooltips.
  let measureStartMsg = angular.element(
    '<span ng-bind-html="ctrl.measureStartMsg"></span>');
  measureStartMsg = $compile(measureStartMsg)($scope);
  let measureLengthContinueMsg = angular.element(
    '<span ng-bind-html="ctrl.measureLengthContinueMsg"></span>');
  measureLengthContinueMsg = $compile(measureLengthContinueMsg)($scope);
  let measureAreaContinueMsg = angular.element(
    '<span ng-bind-html="ctrl.measureAreaContinueMsg"></span>');
  measureAreaContinueMsg = $compile(measureAreaContinueMsg)($scope);
  let measureAzimutContinueMsg = angular.element(
    '<span ng-bind-html="ctrl.measureAzimutContinueMsg"></span>');
  measureAzimutContinueMsg = $compile(measureAzimutContinueMsg)($scope);

  // Watch the "lang" property and update the toolip messages
  // based on the selected language.
  $scope.$watch(() => this.lang, (newVal) => {
    this.measureStartMsg = measureStartMsgs[newVal];
    this.measureLengthContinueMsg = measureLengthContinueMsgs[newVal];
    this.measureAreaContinueMsg = measureAreaContinueMsgs[newVal];
    this.measureAzimutContinueMsg = measureAzimutContinueMsgs[newVal];
  });

  const style = new ol.style.Style({
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

  /**
   * @type {ngeo.interaction.MeasureLength}
   * @export
   */
  this.measureLength = new ngeo.interaction.MeasureLength($filter('ngeoUnitPrefix'), gettextCatalog, {
    sketchStyle: style,
    startMsg: measureStartMsg[0],
    continueMsg: measureLengthContinueMsg[0]
  });

  this.measureLength.setActive(false);
  ngeo.misc.decorate.interaction(this.measureLength);

  /**
   * @type {ngeo.interaction.MeasureArea}
   * @export
   */
  this.measureArea = new ngeo.interaction.MeasureArea($filter('ngeoUnitPrefix'), gettextCatalog, {
    sketchStyle: style,
    startMsg: measureStartMsg[0],
    continueMsg: measureAreaContinueMsg[0]
  });

  this.measureArea.setActive(false);
  ngeo.misc.decorate.interaction(this.measureArea);

  /**
   * @type {ngeo.interaction.MeasureAzimut}
   * @export
   */
  this.measureAzimut = new ngeo.interaction.MeasureAzimut(
    $filter('ngeoUnitPrefix'), $filter('ngeoNumber'), {
      sketchStyle: style,
      startMsg: measureStartMsg[0],
      continueMsg: measureAzimutContinueMsg[0]
    });

  this.measureAzimut.setActive(false);
  ngeo.misc.decorate.interaction(this.measureAzimut);


  // the following code shows how one can add additional information to the
  // tooltip. This can be useful to display the elevation offset from the
  // 2 points of an azimut measurement.
  this.measureAzimut.on('measureend', (evt) => {
    const el = evt.target.getTooltipElement();
    el.innerHTML += '<br>Additional info';
  });
};

app.measure.module.controller('AppMeasuretoolsController', app.measure.MeasuretoolsController);

app.measure.MeasuretoolsController.prototype.$onInit = function() {
  this.map.addInteraction(this.measureLength);
  this.map.addInteraction(this.measureArea);
  this.map.addInteraction(this.measureAzimut);
};

/**
 * @constructor
 * @ngInject
 */
app.measure.MainController = function() {

  /**
   * @type {string}
   * @export
   */
  this.lang = 'en';

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
      center: [692114.718759744, 5743119.914347709],
      zoom: 15
    })
  });

  this.map.addControl(new ol.control.ScaleLine());
};


app.measure.module.controller('MainController', app.measure.MainController);
