import angular from 'angular';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import {listen} from 'ol/events.js';
import olInteractionDraw from 'ol/interaction/Draw.js';


/**
 * @type {angular.IModule}
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
     * @param {angular.IScope} $scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {angular.IController=} drawFeatureCtrl Controller.
     */
    link: ($scope, element, attrs, drawFeatureCtrl) => {
      if (!drawFeatureCtrl) {
        throw new Error('Missing drawFeatureCtrl');
      }

      const drawText = new olInteractionDraw({
        type: /** @type {import("ol/geom/GeometryType.js").default} */ ('Point')
      });

      if (drawFeatureCtrl.uid) {
        drawText.set(
          'ngeo-interaction-draw-uid',
          `${drawFeatureCtrl.uid}-text`
        );
      }

      drawFeatureCtrl.registerInteraction(drawText);
      drawFeatureCtrl.drawText = drawText;

      listen(drawText, 'drawend', drawFeatureCtrl.handleDrawEnd.bind(
        drawFeatureCtrl, ngeoGeometryType.TEXT
      ), drawFeatureCtrl);
      listen(drawText, 'change:active', drawFeatureCtrl.handleActiveChange, drawFeatureCtrl);
    }
  };
}


module.directive('ngeoDrawtext', drawTextComponent);


export default module;
