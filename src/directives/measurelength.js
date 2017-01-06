goog.provide('ngeo.measurelengthDirective');

goog.require('ngeo');
/** @suppress {extraRequire} */
goog.require('ngeo.filters');
goog.require('ngeo.interaction.MeasureLength');
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
ngeo.measurelengthDirective = function($compile, gettext, $filter) {
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

      const helpMsg = gettext('Click to start drawing line');
      const contMsg = gettext('Click to continue drawing<br/>' +
                            'Double-click or click last point to finish');

      const measureLength = new ngeo.interaction.MeasureLength($filter('ngeoUnitPrefix'), {
        style: new ol.style.Style(),
        startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
        continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0]
      });

      drawFeatureCtrl.registerInteraction(measureLength);
      drawFeatureCtrl.measureLength = measureLength;

      ol.events.listen(
          measureLength,
          ngeo.MeasureEventType.MEASUREEND,
          drawFeatureCtrl.handleDrawEnd.bind(
              drawFeatureCtrl, ngeo.GeometryType.LINE_STRING),
          drawFeatureCtrl
      );
      ol.events.listen(
          measureLength,
          ol.Object.getChangeEventType(
              ol.interaction.Interaction.Property.ACTIVE),
          drawFeatureCtrl.handleActiveChange,
          drawFeatureCtrl
      );
    }
  };
};


ngeo.module.directive('ngeoMeasurelength', ngeo.measurelengthDirective);
