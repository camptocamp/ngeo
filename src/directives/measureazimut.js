goog.provide('ngeo.measureazimutDirective');

goog.require('ngeo');
/** @suppress {extraRequire} */
goog.require('ngeo.filters');
goog.require('ngeo.interaction.MeasureAzimut');
goog.require('ol.Feature');
goog.require('ol.geom.Polygon');
goog.require('ol.style.Style');


/**
 * @param {angular.$compile} $compile Angular compile service.
 * @param {gettext} gettext Gettext service.
 * @param {angular.$filter} $filter Angular filter
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
ngeo.measureazimutDirective = function($compile, gettext, $filter) {
  return {
    restrict: 'A',
    require: '^^ngeoDrawfeature',
    /**
     * @param {!angular.Scope} $scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @param {ngeo.DrawfeatureController} drawFeatureCtrl Controller.
     */
    link: function($scope, element, attrs, drawFeatureCtrl) {

      var helpMsg = gettext('Click to start drawing circle');
      var contMsg = gettext('Click to finish');

      var measureAzimut = new ngeo.interaction.MeasureAzimut($filter('ngeoUnitPrefix'), {
        style: new ol.style.Style(),
        startMsg: $compile('<div translate>' + helpMsg + '</div>')($scope)[0],
        continueMsg: $compile('<div translate>' + contMsg + '</div>')($scope)[0]
      });

      drawFeatureCtrl.registerInteraction(measureAzimut);
      drawFeatureCtrl.measureAzimut = measureAzimut;

      ol.events.listen(
          measureAzimut,
          ngeo.MeasureEventType.MEASUREEND,
          /**
           * @param {ngeo.MeasureEvent} event Event.
           */
          function(event) {
            // In the case of azimut measure interaction, the feature's
            // geometry is actually a collection (line + circle)
            // For our purpose here, we only need the circle, which gets
            // transformed into a polygon with 64 sides.
            var geometry = /** @type {ol.geom.GeometryCollection} */
                (event.feature.getGeometry());
            var circle = /** @type {ol.geom.Circle} */ (
                geometry.getGeometries()[1]);
            var polygon = ol.geom.Polygon.fromCircle(circle, 64);
            event.feature = new ol.Feature(polygon);
            var azimut = ngeo.interaction.MeasureAzimut.getAzimut(
              /** @type {ol.geom.LineString} */ (geometry.getGeometries()[0])
            );
            event.feature.set('azimut', azimut);

            drawFeatureCtrl.handleDrawEnd(ngeo.GeometryType.CIRCLE, event);
          },
          drawFeatureCtrl
      );

      ol.events.listen(
          measureAzimut,
          ol.Object.getChangeEventType(
              ol.interaction.Interaction.Property.ACTIVE),
          drawFeatureCtrl.handleActiveChange,
          drawFeatureCtrl
      );
    }
  };
};


ngeo.module.directive('ngeoMeasureazimut', ngeo.measureazimutDirective);
