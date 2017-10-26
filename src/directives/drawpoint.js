goog.provide('ngeo.drawpointDirective');

goog.require('ngeo');
goog.require('ol.geom.GeometryType');
goog.require('ol.interaction.Draw');
goog.require('ol.interaction.DrawEventType');


/**
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
ngeo.drawpointDirective = function() {
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

      const drawPoint = new ol.interaction.Draw({
        type: ol.geom.GeometryType.POINT
      });

      drawFeatureCtrl.registerInteraction(drawPoint);
      drawFeatureCtrl.drawPoint = drawPoint;

      ol.events.listen(
        drawPoint,
        ol.interaction.DrawEventType.DRAWEND,
        drawFeatureCtrl.handleDrawEnd.bind(
          drawFeatureCtrl, ngeo.GeometryType.POINT),
        drawFeatureCtrl
      );
      ol.events.listen(
        drawPoint,
        ol.Object.getChangeEventType(
          ol.interaction.Property.ACTIVE),
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
};


ngeo.module.directive('ngeoDrawpoint', ngeo.drawpointDirective);
