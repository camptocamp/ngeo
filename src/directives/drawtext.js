goog.provide('ngeo.drawtextDirective');

goog.require('ngeo');
goog.require('ol.geom.GeometryType');
goog.require('ol.interaction.Draw');


/**
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawtext
 */
ngeo.drawtextDirective = function() {
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

      const drawText = new ol.interaction.Draw({
        type: ol.geom.GeometryType.POINT
      });

      drawFeatureCtrl.registerInteraction(drawText);
      drawFeatureCtrl.drawText = drawText;

      ol.events.listen(
          drawText,
          ol.interaction.Draw.EventType.DRAWEND,
          drawFeatureCtrl.handleDrawEnd.bind(
              drawFeatureCtrl, ngeo.GeometryType.TEXT),
          drawFeatureCtrl
      );
      ol.events.listen(
          drawText,
          ol.Object.getChangeEventType(
              ol.interaction.Property.ACTIVE),
          drawFeatureCtrl.handleActiveChange,
          drawFeatureCtrl
      );
    }
  };
};


ngeo.module.directive('ngeoDrawtext', ngeo.drawtextDirective);
