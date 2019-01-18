/**
 */
import angular from 'angular';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import * as olEvents from 'ol/events.js';
import olInteractionDraw from 'ol/interaction/Draw.js';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('ngeoDrawpoint', []);


/**
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
function directive() {
  return {
    restrict: 'A',
    require: '^^ngeoDrawfeature',
    /**
     * @param {!angular.IScope} $scope Scope.
     * @param {JQLite} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {import("ngeo/draw/Controller.js").default} drawFeatureCtrl Controller.
     */
    link: ($scope, element, attrs, drawFeatureCtrl) => {

      const drawPoint = new olInteractionDraw({
        type: /** @type {import("ol/geom/GeometryType.js").default} */ ('Point')
      });

      drawFeatureCtrl.registerInteraction(drawPoint);
      drawFeatureCtrl.drawPoint = drawPoint;

      olEvents.listen(
        drawPoint,
        'drawend',
        drawFeatureCtrl.handleDrawEnd.bind(
          drawFeatureCtrl, ngeoGeometryType.POINT),
        drawFeatureCtrl
      );
      olEvents.listen(
        drawPoint,
        'change:active',
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
}


exports.directive('ngeoDrawpoint', directive);


export default exports;
