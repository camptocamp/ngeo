import angular from 'angular';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import * as olEvents from 'ol/events.js';
import olInteractionDraw from 'ol/interaction/Draw.js';
import olGeomPolygon from 'ol/geom/Polygon.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoDrawrectangle', []);

/**
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawrectangle
 */
function drawRectangleComponent() {
  return {
    restrict: 'A',
    require: '^^ngeoDrawfeature',
    /**
     * @param {!angular.IScope} $scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {import("ngeo/draw/Controller.js").DrawController} drawFeatureCtrl Controller.
     */
    link: ($scope, element, attrs, drawFeatureCtrl) => {
      const drawRectangle = new olInteractionDraw({
        type: /** @type {import("ol/geom/GeometryType.js").default} */ ('LineString'),
        geometryFunction: (coordinates, geometry) => {
          if (!geometry) {
            geometry = new olGeomPolygon([]);
          }
          const start = coordinates[0];
          const end = coordinates[1];
          geometry.setCoordinates([[start, [start[0], end[1]], end, [end[0], start[1]], start]]);
          return geometry;
        },
        maxPoints: 2,
      });

      drawFeatureCtrl.registerInteraction(drawRectangle);
      drawFeatureCtrl.drawRectangle = drawRectangle;

      olEvents.listen(
        drawRectangle,
        'drawend',
        drawFeatureCtrl.handleDrawEnd.bind(drawFeatureCtrl, ngeoGeometryType.RECTANGLE),
        drawFeatureCtrl
      );
      olEvents.listen(drawRectangle, 'change:active', drawFeatureCtrl.handleActiveChange, drawFeatureCtrl);
    },
  };
}

module.directive('ngeoDrawrectangle', drawRectangleComponent);

export default module;
