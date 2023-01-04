import './measure.css';
import angular from 'angular';
import ngeoInteractionMeasureArea from 'ngeo/interaction/MeasureArea.js';

import ngeoInteractionMeasureAzimut from 'ngeo/interaction/MeasureAzimut.js';
import ngeoInteractionMeasureLength from 'ngeo/interaction/MeasureLength.js';
import ngeoMapModule from 'ngeo/map/module.js';

import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';

import {interactionDecoration} from 'ngeo/misc/decorate.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olControlScaleLine from 'ol/control/ScaleLine.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleFill from 'ol/style/Fill.js';
import 'angular-sanitize';

/** @type {!angular.IModule} **/
const module = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscFilters.name,
  'ngSanitize',
]);

module.run(
  /* @ngInject */ ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('partials/measuretools', require('./partials/measuretools.html'));
  }
);

/**
 * App-specific component wrapping the measure tools. The component's
 * controller has a property "map" including a reference to the OpenLayers
 * map.
 *
 * @type {!angular.IComponentOptions}
 */
const measuretoolsComponent = {
  bindings: {
    'map': '=appMeasuretoolsMap',
    'lang': '=appMeasuretoolsLang',
  },
  controller: 'AppMeasuretoolsController',
  templateUrl: 'partials/measuretools',
};

module.component('appMeasuretools', measuretoolsComponent);

/**
 * @param {!angular.IScope} $scope Angular scope.
 * @param {angular.ICompileService} $compile Angular compile service.
 * @param {angular.ISCEService} $sce Angular sce service.
 * @param {angular.IFilterService} $filter Angular filter service.
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @constructor
 * @ngInject
 */
function MeasuretoolsController($scope, $compile, $sce, $filter, gettextCatalog) {
  /**
   * @type {import("ol/Map.js").default}
   */
  this.map;

  /**
   * @type {string}
   */
  this.lang;

  /**
   * @type {Object}
   */
  this.measureStartMsg = null;

  /**
   * @type {Object}
   */
  this.measureLengthContinueMsg = null;

  /**
   * @type {Object}
   */
  this.measureAreaContinueMsg = null;

  /**
   * @type {Object}
   */
  this.measureAzimutContinueMsg = null;

  // Translations for the measure tools' tooltips.
  const measureStartMsgs = {
    'en': $sce.trustAsHtml('Click to start drawing.'),
    'fr': $sce.trustAsHtml('Cliquer pour commencer à dessiner.'),
  };
  const measureLengthContinueMsgs = {
    'en': $sce.trustAsHtml('Click to continue drawing.<br>' + 'Double-click or click last point to finish.'),
    'fr': $sce.trustAsHtml(
      'Cliquer pour continuer le dessin.<br>' + 'Double-cliquer ou cliquer sur dernier point pour finir.'
    ),
  };
  const measureAreaContinueMsgs = {
    'en': $sce.trustAsHtml(
      'Click to continue drawing.<br>' + 'Double-click or click starting point to finish.'
    ),
    'fr': $sce.trustAsHtml(
      'Cliquer pour continuer le dessin.<br>' + 'Double-cliquer ou cliquer sur point de départ pour finir.'
    ),
  };
  const measureAzimutContinueMsgs = {
    'en': $sce.trustAsHtml('Click to finish.'),
    'fr': $sce.trustAsHtml('Cliquer pour finir.'),
  };

  // Create elements for the measure tools' tooltips.
  let measureStartMsg = angular.element('<span ng-bind-html="ctrl.measureStartMsg"></span>');
  measureStartMsg = $compile(measureStartMsg)($scope);
  let measureLengthContinueMsg = angular.element(
    '<span ng-bind-html="ctrl.measureLengthContinueMsg"></span>'
  );
  measureLengthContinueMsg = $compile(measureLengthContinueMsg)($scope);
  let measureAreaContinueMsg = angular.element('<span ng-bind-html="ctrl.measureAreaContinueMsg"></span>');
  measureAreaContinueMsg = $compile(measureAreaContinueMsg)($scope);
  let measureAzimutContinueMsg = angular.element(
    '<span ng-bind-html="ctrl.measureAzimutContinueMsg"></span>'
  );
  measureAzimutContinueMsg = $compile(measureAzimutContinueMsg)($scope);

  // Watch the "lang" property and update the toolip messages
  // based on the selected language.
  $scope.$watch(
    () => this.lang,
    (newVal) => {
      this.measureStartMsg = measureStartMsgs[newVal];
      this.measureLengthContinueMsg = measureLengthContinueMsgs[newVal];
      this.measureAreaContinueMsg = measureAreaContinueMsgs[newVal];
      this.measureAzimutContinueMsg = measureAzimutContinueMsgs[newVal];
    }
  );

  const style = new olStyleStyle({
    fill: new olStyleFill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new olStyleStroke({
      color: 'rgba(0, 0, 0, 0.5)',
      lineDash: [10, 10],
      width: 2,
    }),
    image: new olStyleCircle({
      radius: 5,
      stroke: new olStyleStroke({
        color: 'rgba(0, 0, 0, 0.7)',
      }),
      fill: new olStyleFill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
    }),
  });

  /**
   * @type {import("ngeo/interaction/MeasureLength.js").default}
   */
  this.measureLength = new ngeoInteractionMeasureLength($filter('ngeoUnitPrefix'), gettextCatalog, {
    sketchStyle: style,
    startMsg: measureStartMsg[0],
    continueMsg: measureLengthContinueMsg[0],
  });

  this.measureLength.setActive(false);
  interactionDecoration(this.measureLength);

  /**
   * @type {import("ngeo/interaction/MeasureArea.js").default}
   */
  this.measureArea = new ngeoInteractionMeasureArea($filter('ngeoUnitPrefix'), gettextCatalog, {
    sketchStyle: style,
    startMsg: measureStartMsg[0],
    continueMsg: measureAreaContinueMsg[0],
  });

  this.measureArea.setActive(false);
  interactionDecoration(this.measureArea);

  /**
   * @type {import("ngeo/interaction/MeasureAzimut.js").default}
   */
  this.measureAzimut = new ngeoInteractionMeasureAzimut($filter('ngeoUnitPrefix'), $filter('ngeoNumber'), {
    sketchStyle: style,
    startMsg: measureStartMsg[0],
    continueMsg: measureAzimutContinueMsg[0],
  });

  this.measureAzimut.setActive(false);
  interactionDecoration(this.measureAzimut);

  // the following code shows how one can add additional information to the
  // tooltip. This can be useful to display the elevation offset from the
  // 2 points of an azimut measurement.
  this.measureAzimut.on('measureend', (evt) => {
    const el = evt.target.getTooltipElement();
    el.innerHTML += '<br>Additional info';
  });
}

module.controller('AppMeasuretoolsController', MeasuretoolsController);

MeasuretoolsController.prototype.$onInit = function () {
  this.map.addInteraction(this.measureLength);
  this.map.addInteraction(this.measureArea);
  this.map.addInteraction(this.measureAzimut);
};

/**
 * @constructor
 * @ngInject
 */
function MainController() {
  /**
   * @type {string}
   */
  this.lang = 'en';

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
    ],
    view: new olView({
      center: [692114.718759744, 5743119.914347709],
      zoom: 15,
    }),
  });

  this.map.addControl(new olControlScaleLine());
}

module.controller('MainController', MainController);

export default module;
