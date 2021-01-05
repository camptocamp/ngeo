// The MIT License (MIT)
//
// Copyright (c) 2019-2021 Camptocamp SA
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
import {findIndex as findIndexInArray} from 'ol/array.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfFloorSelector', []);

module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/floor/floorselectorcomponent', require('./floorselectorcomponent.html'));
  }
);

module.value(
  'gmfFloorselectorTemplateUrl',
  /**
   * @param {!angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs.gmfFloorselectorTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'gmf/floor/floorselectorcomponent';
  }
);

/**
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!angular.IAttributes): string} gmfFloorselectorTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function gmfFloorselectorTemplateUrl($attrs, gmfFloorselectorTemplateUrl) {
  return gmfFloorselectorTemplateUrl($attrs);
}

/**
 * @hidden
 */
export class Controller {
  /**
   * @param {angular.IScope} $scope Angular scope.
   * @param {JQuery} $element Element.
   * @param {import('gmf/options.js').gmfFloors} gmfFloors Floor dimension values and labels.
   * @ngInject
   * @ngdoc controller
   * @ngname GmfFilterselectorController
   */
  constructor($scope, $element, gmfFloors) {
    /**
     * @type {import('gmf/options.js').gmfFloors}
     */
    this.items = gmfFloors;

    /**
     * @type {number}
     */
    this.size;

    /**
     * @type {string}
     */
    this.value;

    /**
     * @type {number}
     */
    this.currentIndex;

    /**
     * @type {number}
     * @private
     */
    this.lowerBound_;

    /**
     * @type {number}
     * @private
     */
    this.upperBound_;

    this.scope = $scope;
    this.element = $element;
  }

  $postLink() {
    this.scope.$watch(
      () => {
        return this.value;
      },
      () => {
        this.valueChanged_();
      }
    );

    this.element[0].addEventListener('wheel', (event) => {
      this.scope.$apply(() => {
        const delta = event.deltaY > 0 ? -1 : 1;
        this.move(delta);
      });
    });
  }

  /**
   * @private
   */
  valueChanged_() {
    const value = this.value;

    // Update currentIndex
    this.currentIndex = findIndexInArray(
      this.items,
      /**
       * @param {Object<string, string>} item
       * @returns {boolean}
       */
      function (item) {
        return item.value === value;
      }
    );
    console.assert(this.currentIndex > -1);

    const buttonGroup = this.element.find('.btn-group-floors');

    const buttonUp = this.element.find('.btn-floor-up');
    const buttonUpOuterHeight = buttonUp.outerHeight(true);
    if (buttonUpOuterHeight === undefined) {
      throw new Error('Missing buttonUp.outerHeight');
    }
    const maxTop = buttonUp.position().top + buttonUpOuterHeight;

    const buttonDown = this.element.find('.btn-floor-down');
    const buttonGroupOuterHeight = buttonGroup.outerHeight(true);
    if (buttonGroupOuterHeight === undefined) {
      throw new Error('Missing buttonGroup.outerHeight');
    }
    const minTop = buttonDown.position().top - buttonGroupOuterHeight;

    const currentButton = this.element.find(`.btn-floor:nth(${this.currentIndex})`);
    const innerHeight = this.element.innerHeight();
    if (innerHeight === undefined) {
      throw new Error('Missing innerHeight');
    }
    const currentButtonOuterHeight = currentButton.outerHeight(true);
    if (currentButtonOuterHeight === undefined) {
      throw new Error('Missing currentButton.outerHeight');
    }
    let top = innerHeight / 2 - currentButton.position().top - currentButtonOuterHeight / 2;
    top = Math.min(top, maxTop);
    top = Math.max(top, minTop);
    buttonGroup.css('top', top);
  }

  /**
   * @param {number} delta Signed number of floors to move.
   */
  move(delta) {
    const newindex = this.currentIndex - delta; // Items are in reversed order
    if (newindex >= 0 && newindex < this.items.length) {
      this.value = this.items[newindex].value;
    }
  }
}

/**
 * Provide a floor selector component.
 * Note that it is not limited to floors, but allows selecting a dimension value
 * from any list of values with labels.
 *
 * Example:
 *
 *      <gmf-floorselector class="gmf-floorselector ol-unselectable ol-control"
 *        value="mainCtrl.dimensions.FLOOR">
 *      </gmf-floorselector>
 *
 * With the injected value `gmfFloors` with:
 *
 *      [
 *        {value: 'value1', label: 'label1'},
 *        {value: 'value2', label: 'label2'},
 *        ...
 *      ];
 *
 * @htmlAttribute {string} value Current floor value.
 *
 * @ngdoc component
 * @ngname gmfFloorselector
 */
const floorSelectorComponent = {
  bindings: {
    value: '=',
  },
  controller: Controller,
  templateUrl: gmfFloorselectorTemplateUrl,
};

module.component('gmfFloorselector', floorSelectorComponent);

export default module;
