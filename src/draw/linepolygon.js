import angular from 'angular';
import ngeoDrawController from 'ngeo/draw/Controller.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoInteractionMeasureLength from 'ngeo/interaction/MeasureLength.js';
import * as olEvents from 'ol/events.js';
import olStyleStyle from 'ol/style/Style.js';

import olFeature from 'ol/Feature.js';

import Point from 'ol/geom/Point.js';
import Polygon from 'ol/geom/Polygon.js';
import LineString from 'ol/geom/LineString.js';
import LinearRing from 'ol/geom/LinearRing.js';
import MultiPoint from 'ol/geom/MultiPoint.js';
import MultiLineString from 'ol/geom/MultiLineString.js';
import MultiPolygon from 'ol/geom/MultiPolygon.js';
import GeometryCollection from 'ol/geom/GeometryCollection.js';
// @ts-ignore: not supported import
import {OL3Parser} from 'jsts/io';
import 'jsts/monkey.js';


/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoDrawlinepolygon', [
  ngeoDrawController.name,
  ngeoMiscFilters.name,
]);

const INTERACTION_NAME = 'gr-draw-line-polygon';
const BUFFER_NAME = 'buffer';


/**
 * @param {!angular.ICompileService} $compile Angular compile service.
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {!angular.IFilterService} $filter Angular filter.
 * @param {!angular.auto.IInjectorService} $injector Main injector.
 * @return {!angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
function measureLengthComponent($compile, gettextCatalog, $filter, $injector) {
  return {
    restrict: 'A',
    require: '^^ngeoDrawfeature',
    /**
     * @param {!angular.IScope} $scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {import('ngeo/draw/Controller.js').DrawController} drawFeatureCtrl Controller.
     */
    link: ($scope, element, attrs, drawFeatureCtrl) => {

      const helpMsg = gettextCatalog.getString('Click to start drawing line');
      const contMsg = gettextCatalog.getString('Click to continue drawing<br>' +
          'Double-click or click last point to finish');

      const measureLength = new ngeoInteractionMeasureLength($filter('ngeoUnitPrefix'), gettextCatalog, {
        style: new olStyleStyle(),
        startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
        continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0],
        precision: $injector.has('ngeoMeasurePrecision') ? $injector.get('ngeoMeasurePrecision') : undefined,
        tolerance: $injector.has('ngeoSnappingTolerance') ? $injector.get('ngeoSnappingTolerance') :
          undefined,
        source: $injector.has('ngeoSnappingSource') ? $injector.get('ngeoSnappingSource') : undefined,
      });

      drawFeatureCtrl.registerInteraction(measureLength);
      drawFeatureCtrl.drawLinePolygon = measureLength;

      measureLength.set(INTERACTION_NAME, true);

      const jstsOL3Parser = new OL3Parser(undefined, {
        geom: {
          Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon, GeometryCollection
        }
      });

      const handleDrawEnd = (event) => {
        const buffer = measureLength.get(BUFFER_NAME);
        const line = event.detail.feature;
        let jstsLine = jstsOL3Parser.read(line.getGeometry());
        jstsLine = jstsLine.buffer(buffer, 8, 2);
        event.detail.feature = new olFeature({
          geometry: jstsOL3Parser.write(jstsLine),
        })
        const type = ngeoGeometryType.POLYGON;
        drawFeatureCtrl.handleDrawEnd(type, event);
      };

      olEvents.listen(
        measureLength,
        'measureend',
        handleDrawEnd.bind(drawFeatureCtrl),
      );

      olEvents.listen(
        measureLength,
        'change:active',
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
}


module.directive('ngeoDrawlinepolygon', measureLengthComponent);

/**
 * @param {!angular.IScope} $scope Scope.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext service.
 * @param {import("ngeo/misc/FeatureHelper.js").FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {import("ol/Collection.js").default.<import("ol/Feature.js").default>} ngeoFeatures Collection of
 *    features.
 * @constructor
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoDrawfeatureController
 * @hidden
 */
export function bufferController($scope, gettextCatalog) {

  /**
   * @type {boolean}
   */
  this.active = false;

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map;

  /**
   * @type {number}
   */
  this.buffer;

  /**
   * @type {?}
   * @private
   */
  this.drawLinePolygonInteraction_;
}

bufferController.prototype.$onInit = function() {
  console.log(this.map);
  this.active = true;
  this.drawLinePolygonInteraction_ = this.map.getInteractions().getArray().find(
    (interaction) => interaction.get(INTERACTION_NAME) === true
  );
  this.drawLinePolygonInteraction_.getActive();
  this.drawLinePolygonInteraction_.set(BUFFER_NAME, 10);
}

module.controller('ngeoDrawlinepolygonbufferController', bufferController);

/**
 * Directive to be able to use ng-model with getter-setter (to access a layer.get(...) property)
 * with a param (here the layer).
 * @return {angular.Directive} The directive specs.
 * @ngInject
 */
const drawLinePolygonBuffer = function () {
  return {
    restrict: 'E',
    controller: 'ngeoDrawlinepolygonbufferController as ctrl',
    scope: {
      'active': '=',
      'map': '<',
    },
    bindToController: true,
    template: '<input type="number" ng-model=ctrl.buffer>',
  };
};

module.directive('ngeoDrawlinepolygonbuffer', drawLinePolygonBuffer);


export default module;
