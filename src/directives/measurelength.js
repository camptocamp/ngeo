goog.provide('ngeo.measurelengthDirective');

goog.require('ngeo');
goog.require('ol.events');
/** @suppress {extraRequire} */
goog.require('ngeo.filters');
goog.require('ngeo.interaction.MeasureLength');
goog.require('ol.style.Style');


/**
 * @param {!angular.$compile} $compile Angular compile service.
 * @param {!angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {!angular.$filter} $filter Angular filter.
 * @param {!angular.$injector} $injector Main injector.
 * @return {!angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
ngeo.measurelengthDirective = function($compile, gettextCatalog, $filter, $injector) {
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

      const helpMsg = gettextCatalog.getString('Click to start drawing line');
      const contMsg = gettextCatalog.getString('Click to continue drawing<br/>' +
          'Double-click or click last point to finish');

      const measureLength = new ngeo.interaction.MeasureLength($filter('ngeoUnitPrefix'), {
        style: new ol.style.Style(),
        startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
        continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0],
        precision: $injector.has('ngeoMeasurePrecision') ? $injector.get('ngeoMeasurePrecision') : undefined
      });

      drawFeatureCtrl.registerInteraction(measureLength);
      drawFeatureCtrl.measureLength = measureLength;

      ol.events.listen(
        measureLength,
        'measureend',
        drawFeatureCtrl.handleDrawEnd.bind(
          drawFeatureCtrl, ngeo.GeometryType.LINE_STRING),
        drawFeatureCtrl
      );
      ol.events.listen(
        measureLength,
        'change:active',
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
};


ngeo.module.directive('ngeoMeasurelength', ngeo.measurelengthDirective);
