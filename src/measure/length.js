import angular from 'angular';
import ngeoDrawController from 'ngeo/draw/Controller.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoInteractionMeasureLength from 'ngeo/interaction/MeasureLength.js';
import {listen} from 'ol/events.js';
import olStyleStyle from 'ol/style/Style.js';


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoMeasurelength', [
  ngeoDrawController.name,
  ngeoMiscFilters.name,
]);


/**
 * @param {angular.ICompileService} $compile Angular compile service.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {angular.IFilterService} $filter Angular filter.
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
function measureLengthComponent($compile, gettextCatalog, $filter, $injector) {
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

      const helpMsg = gettextCatalog.getString('Click to start drawing line');
      const contMsg = gettextCatalog.getString('Click to continue drawing<br>' +
          'Double-click or click last point to finish');

      /** @type {import('ngeo/interaction/Measure.js').MeasureOptions} */
      const options = {
        style: new olStyleStyle(),
        startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
        continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0],
      };
      if ($injector.has('ngeoMeasurePrecision')) {
        options.precision = $injector.get('ngeoMeasurePrecision');
      }
      if ($injector.has('ngeoSnappingTolerance')) {
        options.tolerance = $injector.get('ngeoSnappingTolerance');
      }
      if ($injector.has('ngeoSnappingSource')) {
        options.source = $injector.get('ngeoSnappingSource');
      }
      const measureLength = new ngeoInteractionMeasureLength(
        $filter('ngeoUnitPrefix'), gettextCatalog, options
      );

      if (drawFeatureCtrl.uid) {
        measureLength.set(
          'ngeo-interaction-draw-uid',
          `${drawFeatureCtrl.uid}-length`
        );
      }

      drawFeatureCtrl.registerInteraction(measureLength);
      drawFeatureCtrl.measureLength = measureLength;

      listen(measureLength, 'measureend',
        drawFeatureCtrl.handleDrawEnd.bind(drawFeatureCtrl, ngeoGeometryType.LINE_STRING),
        drawFeatureCtrl
      );
      listen(measureLength, 'change:active', drawFeatureCtrl.handleActiveChange, drawFeatureCtrl);
    }
  };
}


module.directive('ngeoMeasurelength', measureLengthComponent);


export default module;
