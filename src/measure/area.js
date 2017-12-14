goog.provide('ngeo.measure.area');

goog.require('ngeo');
goog.require('ol.events');
goog.require('ol.style.Style');

goog.require('ngeo.interaction.MeasureArea');


/**
 * @type {!angular.Module}
 */
ngeo.measure.area = angular.module('ngeoMeasurearea', [
  // FIXME add requires
]);

ngeo.module.requires.push(ngeo.measure.area.name);


/**
 * @param {!angular.$compile} $compile Angular compile service.
 * @param {!angularGettext.Catalog} gettextCatalog Gettext service.
 * @param {!angular.$filter} $filter Angular filter
 * @param {!angular.$injector} $injector Main injector.
 * @return {!angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
ngeo.measure.area.directive_ = function($compile, gettextCatalog, $filter, $injector) {
  return {
    restrict: 'A',
    require: '^^ngeoDrawfeature',
    /**
     * @param {!angular.Scope} $scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @param {ngeo.DrawfeatureController} drawFeatureCtrl Controller.
     */
    link: ($scope, element, attrs, drawFeatureCtrl) => {

      const helpMsg = gettextCatalog.getString('Click to start drawing polygon');
      const contMsg = gettextCatalog.getString('Click to continue drawing<br/>' +
          'Double-click or click starting point to finish');

      const measureArea = new ngeo.interaction.MeasureArea($filter('ngeoUnitPrefix'), {
        style: new ol.style.Style(),
        startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
        continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0],
        precision: $injector.has('ngeoMeasurePrecision') ? $injector.get('ngeoMeasurePrecision') : undefined
      });

      drawFeatureCtrl.registerInteraction(measureArea);
      drawFeatureCtrl.measureArea = measureArea;

      ol.events.listen(
        measureArea,
        'measureend',
        drawFeatureCtrl.handleDrawEnd.bind(
          drawFeatureCtrl, ngeo.GeometryType.POLYGON),
        drawFeatureCtrl
      );
      ol.events.listen(
        measureArea,
        'change:active',
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
};


ngeo.measure.area.directive('ngeoMeasurearea', ngeo.measure.area.directive_);
