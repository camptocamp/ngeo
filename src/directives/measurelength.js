goog.provide('ngeo.measurelengthDirective');

goog.require('ngeo');
goog.require('ngeo.interaction.MeasureLength');
goog.require('ol.style.Style');


/**
 * @param {angular.$compile} $compile Angular compile service.
 * @param {gettext} gettext Gettext service.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
ngeo.measurelengthDirective = function($compile, gettext) {
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

      var helpMsg = gettext('Click to start drawing length');
      var contMsg = gettext('Click to continue drawing<br/>' +
                            'Double-click or click last point to finish');

      var measureLength = new ngeo.interaction.MeasureLength({
        style: new ol.style.Style(),
        startMsg: $compile('<div translate>' + helpMsg + '</div>')($scope)[0],
        continueMsg: $compile('<div translate>' + contMsg + '</div>')($scope)[0]
      });

      drawFeatureCtrl.registerInteraction(measureLength);
      drawFeatureCtrl.measureLength = measureLength

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
              ol.interaction.InteractionProperty.ACTIVE),
          drawFeatureCtrl.handleActiveChange,
          drawFeatureCtrl
      );
    }
  };
};


ngeo.module.directive('ngeoMeasurelength', ngeo.measurelengthDirective);
