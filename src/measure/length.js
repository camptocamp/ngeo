// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import ngeoDrawController from 'ngeo/draw/Controller';
import ngeoMiscFilters from 'ngeo/misc/filters';
import ngeoGeometryType from 'ngeo/GeometryType';
import ngeoInteractionMeasureLength from 'ngeo/interaction/MeasureLength';
import {listen} from 'ol/events';
import olStyleStyle from 'ol/style/Style';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoMeasurelength', [ngeoDrawController.name, ngeoMiscFilters.name]);

/**
 * @param {angular.ICompileService} $compile Angular compile service.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {angular.IFilterService} $filter Angular filter.
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @param {import('ngeo/options').ngeoMeasurePrecision} ngeoMeasurePrecision The precision.
 * @param {import('ngeo/options').ngeoSnappingTolerance} ngeoSnappingTolerance The tolerance.
 * @returns {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
function measureLengthComponent(
  $compile,
  gettextCatalog,
  $filter,
  $injector,
  ngeoMeasurePrecision,
  ngeoSnappingTolerance
) {
  return {
    restrict: 'A',
    require: '^^ngeoDrawfeature',
    /**
     * @param {angular.IScope} $scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {angular.IController} [drawFeatureCtrl] Controller.
     */
    link: ($scope, element, attrs, drawFeatureCtrl) => {
      if (!drawFeatureCtrl) {
        throw new Error('Missing drawFeatureCtrl');
      }

      const helpMsg = gettextCatalog.getString('Click to start drawing line');
      const contMsg = gettextCatalog.getString(
        'Click to continue drawing<br>' + 'Double-click or click last point to finish'
      );

      /** @type {import('ngeo/interaction/Measure').MeasureOptions} */
      const options = {
        style: new olStyleStyle(),
        startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
        continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0],
      };
      options.precision = ngeoMeasurePrecision;
      options.tolerance = ngeoSnappingTolerance;
      if ($injector.has('ngeoSnappingSource')) {
        options.source = $injector.get('ngeoSnappingSource');
      }
      const measureLength = new ngeoInteractionMeasureLength(
        $filter('ngeoUnitPrefix'),
        gettextCatalog,
        options
      );

      if (drawFeatureCtrl.uid) {
        measureLength.set('ngeo-interaction-draw-uid', `${drawFeatureCtrl.uid}-length`);
      }

      drawFeatureCtrl.registerInteraction(measureLength);
      drawFeatureCtrl.measureLength = measureLength;

      listen(
        measureLength,
        'measureend',
        drawFeatureCtrl.handleDrawEnd.bind(drawFeatureCtrl, ngeoGeometryType.LINE_STRING),
        drawFeatureCtrl
      );
      listen(measureLength, 'change:active', drawFeatureCtrl.handleActiveChange, drawFeatureCtrl);
    },
  };
}

myModule.directive('ngeoMeasurelength', measureLengthComponent);

export default myModule;
