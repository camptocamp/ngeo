goog.provide('ngeo.drawrectangleDirective');

goog.require('ngeo');
goog.require('ol.events');
goog.require('ol.interaction.Draw');
goog.require('ol.geom.Polygon');


/**
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawrectangle
 */
ngeo.drawrectangleDirective = function() {
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

      const drawRectangle = new ol.interaction.Draw({
        type: /** @type {ol.geom.GeometryType} */ ('LineString'),
        geometryFunction: (coordinates, geometry) => {
          if (!geometry) {
            geometry = new ol.geom.Polygon(null);
          }
          const start = coordinates[0];
          const end = coordinates[1];
          geometry.setCoordinates([
            [start, [start[0], end[1]], end, [end[0], start[1]], start]
          ]);
          return geometry;
        },
        maxPoints: 2
      });

      drawFeatureCtrl.registerInteraction(drawRectangle);
      drawFeatureCtrl.drawRectangle = drawRectangle;

      ol.events.listen(
        drawRectangle,
        'drawend',
        drawFeatureCtrl.handleDrawEnd.bind(
          drawFeatureCtrl, ngeo.GeometryType.RECTANGLE),
        drawFeatureCtrl
      );
      ol.events.listen(
        drawRectangle,
        'change:active',
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
};


ngeo.module.directive('ngeoDrawrectangle', ngeo.drawrectangleDirective);
