import angular from 'angular';
import ngeoDrawController from 'ngeo/draw/Controller.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoInteractionMeasureArea from 'ngeo/interaction/MeasureArea.js';
import * as olEvents from 'ol/events.js';
import olStyleStyle from 'ol/style/Style.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoMeasurearea', [ngeoDrawController.name]);

/**
 * @param {!angular.ICompileService} $compile Angular compile service.
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext service.
 * @param {!angular.IFilterService} $filter Angular filter
 * @param {!angular.auto.IInjectorService} $injector Main injector.
 * @return {!angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
function measureAreaComponent($compile, gettextCatalog, $filter, $injector) {
  return {
    restrict: 'A',
    require: '^^ngeoDrawfeature',
    /**
     * @param {!angular.IScope} $scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {import('ngeo/draw/Controller.js').DrawController} drawFeatureCtrl Controller.
     */
    link: ($scope, element, attrs, drawFeatureCtrl) => {
      const helpMsg = gettextCatalog.getString('Click to start drawing polygon');
      const contMsg = gettextCatalog.getString(
        'Click to continue drawing<br>' + 'Double-click or click starting point to finish'
      );

      const measureArea = new ngeoInteractionMeasureArea($filter('ngeoUnitPrefix'), gettextCatalog, {
        style: new olStyleStyle(),
        startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
        continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0],
        precision: $injector.has('ngeoMeasurePrecision') ? $injector.get('ngeoMeasurePrecision') : undefined,
      });

      drawFeatureCtrl.registerInteraction(measureArea);
      drawFeatureCtrl.measureArea = measureArea;

      olEvents.listen(
        measureArea,
        'measureend',
        drawFeatureCtrl.handleDrawEnd.bind(drawFeatureCtrl, ngeoGeometryType.POLYGON),
        drawFeatureCtrl
      );
      olEvents.listen(measureArea, 'change:active', drawFeatureCtrl.handleActiveChange, drawFeatureCtrl);
    },
  };
}

module.directive('ngeoMeasurearea', measureAreaComponent);

export default module;
