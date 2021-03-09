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

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoColorpicker', []);

myModule.value(
  'ngeoColorpickerTemplateUrl',
  /**
   * @param {JQuery} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @return {string} Template URL.
   */
  (element, attrs) => {
    const templateUrl = attrs['ngeoColorpickerTemplateurl'];
    return templateUrl !== undefined ? templateUrl : 'ngeo/misc/colorpickerComponent';
  }
);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('ngeo/misc/colorpickerComponent', require('./colorpickerComponent.html'));
  }
);

/**
 * Provides the "ngeoColorpicker" directive, a widget for
 * selecting a color among predefined ones.
 *
 * Example:
 *
 *     <div ngeo-colorpicker="ctrl.colors">
 *     </div>
 *
 *
 * @param {string|function(JQuery=, angular.IAttributes=): string} ngeoColorpickerTemplateUrl
 *     Template URL for the directive.
 * @return {angular.IDirective} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoColorpicker
 */
function colorPickerComponent(ngeoColorpickerTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      colors: '<?ngeoColorpicker',
      color: '=?ngeoColorpickerColor',
    },
    controller: 'NgeoColorpickerController as ctrl',
    bindToController: true,
    templateUrl: ngeoColorpickerTemplateUrl,
  };
}

myModule.directive('ngeoColorpicker', colorPickerComponent);

/**
 * Default colors for the colorpicker
 * @type {string[][]}
 * @private
 * @hidden
 */
const DEFAULT_COLORS = [
  [
    '#F4EB37',
    '#CDDC39',
    '#62AF44',
    '#009D57',
    '#0BA9CC',
    '#4186F0',
    '#3F5BA9',
    '#7C3592',
    '#A61B4A',
    '#DB4436',
    '#F8971B',
    '#F4B400',
    '#795046',
  ],
  [
    '#F9F7A6',
    '#E6EEA3',
    '#B7DBAB',
    '#7CCFA9',
    '#93D7E8',
    '#9FC3FF',
    '#A7B5D7',
    '#C6A4CF',
    '#D698AD',
    '#EE9C96',
    '#FAD199',
    '#FFDD5E',
    '#B29189',
  ],
  ['#ffffff', '#CCCCCC', '#777', '#000000'],
];

/**
 * @class
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoScaleselectorController
 */
export function Controller() {
  /**
   * The set of color
   * @type {string[][]}
   */
  this.colors = this.colors || DEFAULT_COLORS;

  /**
   * The selected color
   * @type {undefined|string}
   */
  this.color;
}

/**
 * @param {string} color The color to select.
 */
Controller.prototype.setColor = function (color) {
  this.color = color;
};

myModule.controller('NgeoColorpickerController', Controller);

export default myModule;
