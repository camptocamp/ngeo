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
import ngeoMiscFilters from 'ngeo/misc/filters.js';
import ngeoInteractionMeasureLengthMobile from 'ngeo/interaction/MeasureLengthMobile.js';
import {MeasueMobileBaseController} from 'gmf/mobile/measure/baseComponent.js';
import {buildStyle} from 'ngeo/options.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfMobileMeasureLength', [ngeoMiscFilters.name]);

myModule.value(
  'gmfMobileMeasureLengthTemplateUrl',
  /**
   * @param {JQuery} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @return {string} The template url.
   */
  (element, attrs) => {
    const templateUrl = attrs.gmfMobileMeasureLengthTemplateurl;
    return templateUrl !== undefined ? templateUrl : 'gmf/measure/lengthComponent';
  }
);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/measure/lengthComponent', require('./baseComponent.html'));
  }
);

/**
 * Provide a directive to do a length measure on the mobile devices.
 *
 * Example:
 *
 *      <div gmf-mobile-measurelength
 *        gmf-mobile-measurelength-active="ctrl.measureLengthActive"
 *        gmf-mobile-measurelength-map="::ctrl.map">
 *      </div>
 *
 * @htmlAttribute {boolean} gmf-mobile-measurelength-active Used to active
 * or deactivate the component.
 * @htmlAttribute {import("ol/Map.js").default} gmf-mobile-measurelength-map The map.
 * @param {string|function(JQuery=, angular.IAttributes=):string} gmfMobileMeasureLengthTemplateUrl
 *     Template URL for the directive.
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfMobileMeasureLength
 */
function mobileMeasureLenthComponent(gmfMobileMeasureLengthTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      'active': '=gmfMobileMeasurelengthActive',
      'map': '=gmfMobileMeasurelengthMap',
    },
    controller: 'GmfMobileMeasureLengthController as ctrl',
    bindToController: true,
    templateUrl: gmfMobileMeasureLengthTemplateUrl,
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {angular.IController} [controller] Controller.
     */
    link: (scope, element, attrs, controller) => {
      if (!controller) {
        throw new Error('Missing controller');
      }
      controller.init();
    },
  };
}

myModule.directive('gmfMobileMeasurelength', mobileMeasureLenthComponent);

/**
 * @hidden
 */
export class Controller extends MeasueMobileBaseController {
  /**
   * @param {angular.IScope} $scope Angular scope.
   * @param {angular.IFilterService} $filter Angular filter
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import('gmf/options.js').gmfMobileMeasureLengthOptions} gmfMobileMeasureLengthOptions The options.
   * @ngInject
   */
  constructor($scope, $filter, gettextCatalog, gmfMobileMeasureLengthOptions) {
    super($scope, $filter, gettextCatalog);
    /**
     * @type {import('gmf/options.js').gmfMobileMeasureLengthOptions}
     */
    this.options = gmfMobileMeasureLengthOptions;

    /**
     * @type {?import("ngeo/interaction/MeasureLengthMobile.js").default}
     */
    this.measure = null;
  }

  /**
   * Initialise the controller.
   */
  init() {
    this.measure = new ngeoInteractionMeasureLengthMobile(
      this.filter('ngeoUnitPrefix'),
      this.gettextCatalog,
      {
        precision: this.options.precision || 3,
        sketchStyle: buildStyle(this.options.sketchStyle),
      }
    );

    super.init();
  }

  /**
   * Add current sketch point to line measure
   */
  addPoint() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.addToDrawing();
  }

  /**
   * Clear the sketch feature
   */
  clear() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.clearDrawing();
  }

  /**
   * Finish line measure
   */
  finish() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.finishDrawing();
  }

  /**
   * Deactivate the directive.
   */
  deactivate() {
    this.active = false;
  }
}

myModule.controller('GmfMobileMeasureLengthController', Controller);

export default myModule;
