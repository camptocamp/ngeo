import angular from 'angular';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import * as olEvents from 'ol/events.js';
import olInteractionDraw from 'ol/interaction/Draw.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoDrawtext', []);

/**
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawtext
 */
function drawTextComponent() {
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
      const drawText = new olInteractionDraw({
        type: /** @type {import("ol/geom/GeometryType.js").default} */ ('Point'),
      });

      drawFeatureCtrl.registerInteraction(drawText);
      drawFeatureCtrl.drawText = drawText;

      olEvents.listen(
        drawText,
        'drawend',
        drawFeatureCtrl.handleDrawEnd.bind(drawFeatureCtrl, ngeoGeometryType.TEXT),
        drawFeatureCtrl
      );
      olEvents.listen(drawText, 'change:active', drawFeatureCtrl.handleActiveChange, drawFeatureCtrl);
    },
  };
}

module.directive('ngeoDrawtext', drawTextComponent);

export default module;
