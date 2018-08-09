/**
 * @module ngeo.measure.azimut
 */
import ngeoDrawController from 'ngeo/draw/Controller.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoInteractionMeasureAzimut from 'ngeo/interaction/MeasureAzimut.js';
import * as olEvents from 'ol/events.js';
import olFeature from 'ol/Feature.js';
import {fromCircle} from 'ol/geom/Polygon.js';
import olStyleStyle from 'ol/style/Style.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoMeasureazimut', [
  ngeoDrawController.module.name,
  ngeoMiscFilters.name,
]);


/**
 * @param {!angular.$compile} $compile Angular compile service.
 * @param {!angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {!angular.$filter} $filter Angular filter
 * @param {!angular.$injector} $injector Main injector.
 * @return {!angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
exports.directive_ = function($compile, gettextCatalog, $filter, $injector) {
  return {
    restrict: 'A',
    require: '^^ngeoDrawfeature',
    /**
     * @param {!angular.Scope} $scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @param {ngeo.draw.Controller} drawFeatureCtrl Controller.
     */
    link: ($scope, element, attrs, drawFeatureCtrl) => {

      const helpMsg = gettextCatalog.getString('Click to start drawing circle');
      const contMsg = gettextCatalog.getString('Click to finish');

      const measureAzimut = new ngeoInteractionMeasureAzimut(
        $filter('ngeoUnitPrefix'), $filter('number'), {
          style: new olStyleStyle(),
          startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
          continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0],
          precision: $injector.has('ngeoMeasurePrecision') ? $injector.get('ngeoMeasurePrecision') : undefined,
          decimals: $injector.has('ngeoMeasureDecimals') ? $injector.get('ngeoMeasureDecimals') : undefined
        });

      drawFeatureCtrl.registerInteraction(measureAzimut);
      drawFeatureCtrl.measureAzimut = measureAzimut;

      olEvents.listen(
        measureAzimut,
        'measureend',
        /**
         * @param {ngeox.MeasureEvent} event Event.
         */
        (event) => {
          // In the case of azimut measure interaction, the feature's
          // geometry is actually a collection (line + circle)
          // For our purpose here, we only need the circle, which gets
          // transformed into a polygon with 64 sides.
          const geometry = /** @type {ol.geom.GeometryCollection} */
                (event.detail.feature.getGeometry());
          const circle = /** @type {ol.geom.Circle} */ (
            geometry.getGeometries()[1]);
          const polygon = fromCircle(circle, 64);
          event.detail.feature = new olFeature(polygon);
          const azimut = ngeoInteractionMeasureAzimut.getAzimut(
            /** @type {ol.geom.LineString} */ (geometry.getGeometries()[0])
          );
          event.detail.feature.set('azimut', azimut);

          drawFeatureCtrl.handleDrawEnd(ngeoGeometryType.CIRCLE, event);
        },
        drawFeatureCtrl
      );

      olEvents.listen(
        measureAzimut,
        'change:active',
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
};


exports.directive('ngeoMeasureazimut', exports.directive_);


export default exports;
