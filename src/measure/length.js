goog.provide('ngeo.measure.length');

goog.require('ngeo');
goog.require('ngeo.draw.Controller');
goog.require('ngeo.misc.filters');
goog.require('ngeo.GeometryType');
goog.require('ngeo.interaction.MeasureLength');
goog.require('ol.events');
goog.require('ol.style.Style');

/**
 * @type {!angular.Module}
 */
ngeo.measure.length = angular.module('ngeoMeasurelength', [
  ngeo.draw.Controller.module.name,
  ngeo.misc.filters.name,
]);


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
ngeo.measure.length.directive_ = function($compile, gettextCatalog, $filter, $injector) {
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


ngeo.measure.length.directive('ngeoMeasurelength', ngeo.measure.length.directive_);
