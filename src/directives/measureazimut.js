goog.provide('ngeo.measureazimutDirective');

goog.require('ngeo');
/** @suppress {extraRequire} */
goog.require('ngeo.filters');
goog.require('ngeo.interaction.MeasureAzimut');
goog.require('ol.events');
goog.require('ol.Feature');
goog.require('ol.geom.Polygon');
goog.require('ol.style.Style');


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
ngeo.measureazimutDirective = function($compile, gettextCatalog, $filter, $injector) {
  return {
    restrict: 'A',
    require: '^^ngeoDrawfeature',
    /**
     * @param {!angular.Scope} $scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @param {ngeo.DrawfeatureController} drawFeatureCtrl Controller.
     */
    link: ($scope, element, attrs, drawFeatureCtrl) => {

      const helpMsg = gettextCatalog.getString('Click to start drawing circle');
      const contMsg = gettextCatalog.getString('Click to finish');

      const measureAzimut = new ngeo.interaction.MeasureAzimut(
        $filter('ngeoUnitPrefix'), $filter('number'), {
          style: new ol.style.Style(),
          startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
          continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0],
          precision: $injector.has('ngeoMeasurePrecision') ? $injector.get('ngeoMeasurePrecision') : undefined,
          decimals: $injector.has('ngeoMeasureDecimals') ? $injector.get('ngeoMeasureDecimals') : undefined
        });

      drawFeatureCtrl.registerInteraction(measureAzimut);
      drawFeatureCtrl.measureAzimut = measureAzimut;

      ol.events.listen(
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
          const polygon = ol.geom.Polygon.fromCircle(circle, 64);
          event.feature = new ol.Feature(polygon);
          const azimut = ngeo.interaction.MeasureAzimut.getAzimut(
            /** @type {ol.geom.LineString} */ (geometry.getGeometries()[0])
          );
          event.detail.feature.set('azimut', azimut);

          drawFeatureCtrl.handleDrawEnd(ngeo.GeometryType.CIRCLE, event);
        },
        drawFeatureCtrl
      );

      ol.events.listen(
        measureAzimut,
        'change:active',
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
};


ngeo.module.directive('ngeoMeasureazimut', ngeo.measureazimutDirective);
