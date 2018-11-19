/**
 * @module ngeo.measure.area
 */
import ngeoDrawController from 'ngeo/draw/Controller.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoInteractionMeasureArea from 'ngeo/interaction/MeasureArea.js';
import * as olEvents from 'ol/events.js';
import olStyleStyle from 'ol/style/Style.js';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('ngeoMeasurearea', [
  ngeoDrawController.module.name
]);


/**
 * @param {!angular.ICompileService} $compile Angular compile service.
 * @param {!angularGettext.Catalog} gettextCatalog Gettext service.
 * @param {!angular.$filter} $filter Angular filter
 * @param {!angular.IInjectorService} $injector Main injector.
 * @return {!angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
exports.directive_ = function($compile, gettextCatalog, $filter, $injector) {
  return {
    restrict: 'A',
    require: '^^ngeoDrawfeature',
    /**
     * @param {!angular.Scope} $scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @param {ngeo.draw.Controller} drawFeatureCtrl Controller.
     */
    link: ($scope, element, attrs, drawFeatureCtrl) => {

      const helpMsg = gettextCatalog.getString('Click to start drawing polygon');
      const contMsg = gettextCatalog.getString('Click to continue drawing<br>' +
          'Double-click or click starting point to finish');

      const measureArea = new ngeoInteractionMeasureArea($filter('ngeoUnitPrefix'), gettextCatalog, {
        style: new olStyleStyle(),
        startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
        continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0],
        precision: $injector.has('ngeoMeasurePrecision') ? $injector.get('ngeoMeasurePrecision') : undefined
      });

      drawFeatureCtrl.registerInteraction(measureArea);
      drawFeatureCtrl.measureArea = measureArea;

      olEvents.listen(
        measureArea,
        'measureend',
        drawFeatureCtrl.handleDrawEnd.bind(
          drawFeatureCtrl, ngeoGeometryType.POLYGON),
        drawFeatureCtrl
      );
      olEvents.listen(
        measureArea,
        'change:active',
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
};


exports.directive('ngeoMeasurearea', exports.directive_);


export default exports;
