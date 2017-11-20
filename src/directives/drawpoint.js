goog.provide('ngeo.drawpointDirective');

goog.require('ngeo');
goog.require('ol.events');
goog.require('ol.interaction.Draw');


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
    link: ($scope, element, attrs, drawFeatureCtrl) => {

      const drawPoint = new ol.interaction.Draw({
        type: /** @type {ol.geom.GeometryType} */ ('Point')
      });

      drawFeatureCtrl.registerInteraction(drawPoint);
      drawFeatureCtrl.drawPoint = drawPoint;

      ol.events.listen(
        drawPoint,
        'drawend',
        drawFeatureCtrl.handleDrawEnd.bind(
          drawFeatureCtrl, ngeo.GeometryType.POINT),
        drawFeatureCtrl
      );
      ol.events.listen(
        drawPoint,
        'change:active',
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
};


ngeo.module.directive('ngeoDrawpoint', ngeo.drawpointDirective);
