import angular from 'angular';
import ngeoDrawController from 'ngeo/draw/Controller.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoInteractionMeasureAzimut, {getAzimut} from 'ngeo/interaction/MeasureAzimut.js';
import * as olEvents from 'ol/events.js';
import olFeature from 'ol/Feature.js';
import {fromCircle} from 'ol/geom/Polygon.js';
import olStyleStyle from 'ol/style/Style.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoMeasureazimut', [ngeoDrawController.name, ngeoMiscFilters.name]);

/**
 * @param {!angular.ICompileService} $compile Angular compile service.
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {!angular.IFilterService} $filter Angular filter
 * @param {!angular.auto.IInjectorService} $injector Main injector.
 * @return {!angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
function measureAzimutComponent($compile, gettextCatalog, $filter, $injector) {
  return {
    restrict: 'A',
    require: '^^ngeoDrawfeature',
    /**
     * @param {!angular.IScope} $scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {import("ngeo/draw/Controller.js").DrawController} drawFeatureCtrl Controller.
     */
    link: ($scope, element, attrs, drawFeatureCtrl) => {
      const helpMsg = gettextCatalog.getString('Click to start drawing circle');
      const contMsg = gettextCatalog.getString('Click to finish');

      const measureAzimut = new ngeoInteractionMeasureAzimut($filter('ngeoUnitPrefix'), $filter('number'), {
        style: new olStyleStyle(),
        startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
        continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0],
        precision: $injector.has('ngeoMeasurePrecision') ? $injector.get('ngeoMeasurePrecision') : undefined,
        decimals: $injector.has('ngeoMeasureDecimals') ? $injector.get('ngeoMeasureDecimals') : undefined,
      });

      drawFeatureCtrl.registerInteraction(measureAzimut);
      drawFeatureCtrl.measureAzimut = measureAzimut;

      olEvents.listen(
        measureAzimut,
        'measureend',
        /**
         * @param {import('ngeo/interaction/Measure.js').MeasureEvent} event Event.
         */
        (event) => {
          // In the case of azimut measure interaction, the feature's
          // geometry is actually a collection (line + circle)
          // For our purpose here, we only need the circle, which gets
          // transformed into a polygon with 64 sides.
          const geometry =
            /** @type {import("ol/geom/GeometryCollection.js").default} */
            (event.detail.feature.getGeometry());
          const circle = /** @type {import("ol/geom/Circle.js").default} */ (geometry.getGeometries()[1]);
          const polygon = fromCircle(circle, 64);
          event.detail.feature = new olFeature(polygon);
          const azimut = getAzimut(
            /** @type {import("ol/geom/LineString.js").default} */ (geometry.getGeometries()[0])
          );
          event.detail.feature.set('azimut', azimut);

          drawFeatureCtrl.handleDrawEnd(ngeoGeometryType.CIRCLE, event);
        },
        drawFeatureCtrl
      );

      olEvents.listen(measureAzimut, 'change:active', drawFeatureCtrl.handleActiveChange, drawFeatureCtrl);
    },
  };
}

module.directive('ngeoMeasureazimut', measureAzimutComponent);

export default module;
