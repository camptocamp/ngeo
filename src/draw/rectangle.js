import angular from 'angular';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import {listen} from 'ol/events.js';
import olInteractionDraw from 'ol/interaction/Draw.js';
import olGeomPolygon from 'ol/geom/Polygon.js';


/**
 * @type {angular.IModule}
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
     * @param {angular.IScope} $scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {angular.IController=} drawFeatureCtrl Controller.
     */
    link: ($scope, element, attrs, drawFeatureCtrl) => {
      if (!drawFeatureCtrl) {
        throw new Error('Missing drawFeatureCtrl');
      }

      const drawRectangle = new olInteractionDraw({
        type: 'LineString',
        geometryFunction: (coordinates, geometry) => {
          if (!geometry) {
            geometry = new olGeomPolygon([]);
          }
          const start = coordinates[0];
          if (!(Array.isArray(start))) {
            throw new Error('Wrong coordinates type');
          }
          const end = coordinates[1];
          if (!(Array.isArray(end))) {
            throw new Error('Wrong coordinates type');
          }
          geometry.setCoordinates([
            [start, [start[0], end[1]], end, [end[0], start[1]], start]
          ]);
          return geometry;
        },
        maxPoints: 2
      });

      if (drawFeatureCtrl.uid) {
        drawRectangle.set(
          'ngeo-interaction-draw-uid',
          `${drawFeatureCtrl.uid}-rectangle`
        );
      }

      drawFeatureCtrl.registerInteraction(drawRectangle);
      drawFeatureCtrl.drawRectangle = drawRectangle;

      listen(drawRectangle, 'drawend', drawFeatureCtrl.handleDrawEnd.bind(
        drawFeatureCtrl, ngeoGeometryType.RECTANGLE
      ), drawFeatureCtrl);
      listen(drawRectangle, 'change:active', drawFeatureCtrl.handleActiveChange, drawFeatureCtrl);
    }
  };
}


module.directive('ngeoDrawrectangle', drawRectangleComponent);


export default module;
