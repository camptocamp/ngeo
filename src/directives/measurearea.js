goog.provide('ngeo.measureareaDirective');

goog.require('ngeo');
/** @suppress {extraRequire} */
goog.require('ngeo.filters');
goog.require('ngeo.interaction.MeasureArea');
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
ngeo.measureareaDirective = function($compile, gettext, $filter) {
  return {
    restrict: 'A',
    require: '^^ngeoDrawfeature',
    /**
     * @param {!angular.Scope} $scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @param {ngeo.DrawfeatureController} drawFeatureCtrl Controller.
     */
    link($scope, element, attrs, drawFeatureCtrl) {

      const helpMsg = gettext('Click to start drawing polygon');
      const contMsg = gettext('Click to continue drawing<br/>' +
          'Double-click or click starting point to finish');

      const measureArea = new ngeo.interaction.MeasureArea($filter('ngeoUnitPrefix'), {
        style: new ol.style.Style(),
        startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
        continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0]
      });

      drawFeatureCtrl.registerInteraction(measureArea);
      drawFeatureCtrl.measureArea = measureArea;

      ol.events.listen(
          measureArea,
          ngeo.MeasureEventType.MEASUREEND,
          drawFeatureCtrl.handleDrawEnd.bind(
              drawFeatureCtrl, ngeo.GeometryType.POLYGON),
          drawFeatureCtrl
      );
      ol.events.listen(
          measureArea,
          ol.Object.getChangeEventType(
              ol.interaction.Property.ACTIVE),
          drawFeatureCtrl.handleActiveChange,
          drawFeatureCtrl
      );
    }
  };
};


ngeo.module.directive('ngeoMeasurearea', ngeo.measureareaDirective);
