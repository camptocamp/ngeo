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
import ngeoDrawController from 'ngeo/draw/Controller.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoInteractionMeasureArea from 'ngeo/interaction/MeasureArea.js';
import {listen} from 'ol/events.js';
import olStyleStyle from 'ol/style/Style.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoMeasurearea', [ngeoDrawController.name]);

/**
 * @param {angular.ICompileService} $compile Angular compile service.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext service.
 * @param {angular.IFilterService} $filter Angular filter
 * @param {import('ngeo/options.js').ngeoMeasurePrecision} ngeoMeasurePrecision The precision.
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawpoint
 */
function measureAreaComponent($compile, gettextCatalog, $filter, ngeoMeasurePrecision) {
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
      const contMsg = gettextCatalog.getString(
        'Click to continue drawing<br>' + 'Double-click or click starting point to finish'
      );

      /** @type {import('ngeo/interaction/Measure.js').MeasureOptions} */
      const options = {
        style: new olStyleStyle(),
        startMsg: $compile(`<div translate>${helpMsg}</div>`)($scope)[0],
        continueMsg: $compile(`<div translate>${contMsg}</div>`)($scope)[0],
      };
      options.precision = ngeoMeasurePrecision;

      const measureArea = new ngeoInteractionMeasureArea($filter('ngeoUnitPrefix'), gettextCatalog, options);

      if (drawFeatureCtrl.uid) {
        measureArea.set('ngeo-interaction-draw-uid', `${drawFeatureCtrl.uid}-area`);
      }

      drawFeatureCtrl.registerInteraction(measureArea);
      drawFeatureCtrl.measureArea = measureArea;

      listen(
        measureArea,
        'measureend',
        drawFeatureCtrl.handleDrawEnd.bind(drawFeatureCtrl, ngeoGeometryType.POLYGON),
        drawFeatureCtrl
      );
      listen(measureArea, 'change:active', drawFeatureCtrl.handleActiveChange, drawFeatureCtrl);
    },
  };
}

module.directive('ngeoMeasurearea', measureAreaComponent);

export default module;
