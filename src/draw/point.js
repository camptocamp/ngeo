import angular from 'angular';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import * as olEvents from 'ol/events.js';
import olInteractionDraw from 'ol/interaction/Draw.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoDrawpoint', []);

/**
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
function drawPointComponent() {
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
      const drawPoint = new olInteractionDraw({
        type: /** @type {import("ol/geom/GeometryType.js").default} */ ('Point'),
      });

      drawFeatureCtrl.registerInteraction(drawPoint);
      drawFeatureCtrl.drawPoint = drawPoint;

      olEvents.listen(
        drawPoint,
        'drawend',
        drawFeatureCtrl.handleDrawEnd.bind(drawFeatureCtrl, ngeoGeometryType.POINT),
        drawFeatureCtrl
      );
      olEvents.listen(drawPoint, 'change:active', drawFeatureCtrl.handleActiveChange, drawFeatureCtrl);
    },
  };
}

module.directive('ngeoDrawpoint', drawPointComponent);

export default module;
