/**
 * @module ngeo.measure.length
 */
import ngeoDrawController from 'ngeo/draw/Controller.js';
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoInteractionMeasureLength from 'ngeo/interaction/MeasureLength.js';
import * as olEvents from 'ol/events.js';
import olStyleStyle from 'ol/style/Style.js';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('ngeoMeasurelength', [
  ngeoDrawController.module.name,
  ngeoMiscFilters.name,
]);


/**
 * @param {!angular.ICompileService} $compile Angular compile service.
 * @param {!angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {!angular.IFilterService} $filter Angular filter.
 * @param {!angular.auto.IInjectorService} $injector Main injector.
 * @return {!angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
exports.directive_ = function($compile, gettextCatalog, $filter, $injector) {
  return {
    restrict: 'A',
    require: '^^ngeoDrawfeature',
    /**
     * @param {!angular.IScope} $scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @param {ngeo.draw.Controller} drawFeatureCtrl Controller.
     */
    link: ($scope, element, attrs, drawFeatureCtrl) => {

      const helpMsg = gettextCatalog.getString('Click to start drawing line');
      const contMsg = gettextCatalog.getString('Click to continue drawing<br>' +
          'Double-click or click last point to finish');

      const measureLength = new ngeoInteractionMeasureLength($filter('ngeoUnitPrefix'), gettextCatalog, {
        style: new olStyleStyle(),
        startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
        continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0],
        precision: $injector.has('ngeoMeasurePrecision') ? $injector.get('ngeoMeasurePrecision') : undefined
      });

      drawFeatureCtrl.registerInteraction(measureLength);
      drawFeatureCtrl.measureLength = measureLength;

      olEvents.listen(
        measureLength,
        'measureend',
        drawFeatureCtrl.handleDrawEnd.bind(
          drawFeatureCtrl, ngeoGeometryType.LINE_STRING),
        drawFeatureCtrl
      );
      olEvents.listen(
        measureLength,
        'change:active',
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
};


exports.directive('ngeoMeasurelength', exports.directive_);


export default exports;
