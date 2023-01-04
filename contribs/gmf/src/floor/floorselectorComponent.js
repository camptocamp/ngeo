import angular from 'angular';
import {findIndex as findIndexInArray} from 'ol/array.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfFloorSelector', []);

module.run(
  /* @ngInject */ ($templateCache) => {
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
 * @private
 * @hidden
 */
class Controller {
  /**
   * @param {angular.IScope} $scope Angular scope.
   * @param {JQuery} $element Element.
   * @param {Array<Object<string, string>>} gmfFloors Floor dimension values and labels.
   * @private
   * @ngInject
   * @ngdoc controller
   * @ngname GmfFilterselectorController
   */
  constructor($scope, $element, gmfFloors) {
    /**
     * @type {Array<Object<string, string>>}
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
    this.currentIndex = findIndexInArray(this.items, function (item) {
      return item.value === value;
    });
    console.assert(this.currentIndex > -1);

    const buttonGroup = this.element.find('.btn-group-floors');

    const buttonUp = this.element.find('.btn-floor-up');
    const maxTop = buttonUp.position().top + buttonUp.outerHeight(true);

    const buttonDown = this.element.find('.btn-floor-down');
    const minTop = buttonDown.position().top - buttonGroup.outerHeight(true);

    const currentButton = this.element.find(`.btn-floor:nth(${this.currentIndex})`);
    let top =
      this.element.innerHeight() / 2 - currentButton.position().top - currentButton.outerHeight(true) / 2;
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
