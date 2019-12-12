import angular from 'angular';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import {listen} from 'ol/events.js';
import olInteractionDraw from 'ol/interaction/Draw.js';


/**
 * @type {angular.IModule}
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
     * @param {angular.IScope} $scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {angular.IController=} drawFeatureCtrl Controller.
     */
    link: ($scope, element, attrs, drawFeatureCtrl) => {
      if (!drawFeatureCtrl) {
        throw new Error('Missing drawFeatureCtrl');
      }

      const drawPoint = new olInteractionDraw({
        type: /** @type {import("ol/geom/GeometryType.js").default} */ ('Point')
      });

      if (drawFeatureCtrl.uid) {
        drawPoint.set(
          'ngeo-interaction-draw-uid',
          `${drawFeatureCtrl.uid}-point`
        );
      }

      drawFeatureCtrl.registerInteraction(drawPoint);
      drawFeatureCtrl.drawPoint = drawPoint;

      listen(drawPoint, 'drawend', drawFeatureCtrl.handleDrawEnd.bind(
        drawFeatureCtrl, ngeoGeometryType.POINT
      ), drawFeatureCtrl);
      listen(drawPoint, 'change:active', drawFeatureCtrl.handleActiveChange, drawFeatureCtrl);
    }
  };
}


module.directive('ngeoDrawpoint', drawPointComponent);


export default module;
