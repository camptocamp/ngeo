import angular from 'angular';
import ngeoDrawController from 'ngeo/draw/Controller.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoInteractionMeasureArea from 'ngeo/interaction/MeasureArea.js';
import {listen} from 'ol/events.js';
import olStyleStyle from 'ol/style/Style.js';


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoMeasurearea', [
  ngeoDrawController.name
]);


/**
 * @param {angular.ICompileService} $compile Angular compile service.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext service.
 * @param {angular.IFilterService} $filter Angular filter
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
function measureAreaComponent($compile, gettextCatalog, $filter, $injector) {
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

      const helpMsg = gettextCatalog.getString('Click to start drawing polygon');
      const contMsg = gettextCatalog.getString('Click to continue drawing<br>' +
          'Double-click or click starting point to finish');

      /** @type {import('ngeo/interaction/Measure.js').MeasureOptions} */
      const options = {
        style: new olStyleStyle(),
        startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
        continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0],
      };
      if ($injector.has('ngeoMeasurePrecision')) {
        options.precision = $injector.get('ngeoMeasurePrecision');
      }
      const measureArea = new ngeoInteractionMeasureArea($filter('ngeoUnitPrefix'), gettextCatalog, options);

      if (drawFeatureCtrl.uid) {
        measureArea.set(
          'ngeo-interaction-draw-uid',
          `${drawFeatureCtrl.uid}-area`
        );
      }

      drawFeatureCtrl.registerInteraction(measureArea);
      drawFeatureCtrl.measureArea = measureArea;

      listen(measureArea, 'measureend', drawFeatureCtrl.handleDrawEnd.bind(
        drawFeatureCtrl, ngeoGeometryType.POLYGON
      ), drawFeatureCtrl);
      listen(measureArea, 'change:active', drawFeatureCtrl.handleActiveChange, drawFeatureCtrl);
    }
  };
}


module.directive('ngeoMeasurearea', measureAreaComponent);


export default module;
