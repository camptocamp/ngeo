// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
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
import 'jquery-ui/ui/widgets/sortable.js';
import 'ngeo/sass/jquery-ui.scss';
import 'jquery-ui-touch-punch';

/**
 * @typedef {Object} miscSortableOptions
 * @property {string} [handleClassName]
 * @property {string} [draggerClassName]
 * @property {string} [placeholderClassName]
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoSortable', []);

/**
 * Provides a directive that allows drag-and-dropping DOM items between them.
 * It also changes the order of elements in the given array.
 *
 * It is typically used together with `ng-repeat`, for example for re-ordering
 * layers in a map.
 *
 * Example:
 *
 *     <ul ngeo-sortable="ctrl.layers"
 *         ngeo-sortable-options="{handleClassName: 'ngeo-sortable-handle'}">
 *       <li ng-repeat="layer in ctrl.layers">
 *         <span class="ngeo-sortable-handle">handle</span>{{layer.get('name')}}
 *       </li>
 *     </ul>
 *
 * The value of the "ngeo-sortable" attribute is an expression which evaluates
 * to an array (an array of layers in the above example). This is the array
 * that is re-ordered after a drag-and-drop.
 *
 * The element with the class "ngeo-sortable-handle" is the "drag handle".
 * It is required.
 *
 * This directives uses `$watchCollection` to watch the "sortable" array. So
 * if some outside code adds/removes elements to/from the "sortable" array,
 * the "ngeoSortable" directive will pick it up.
 *
 * See our live example: [../examples/layerorder.html](../examples/layerorder.html)
 *
 * @htmlAttribute {Array<import("ol/layer/Base.js").default>} ngeo-sortable The layers to sort.
 * @htmlAttribute {miscSortableOptions} ngeo-sortable-options The options.
 * @htmlAttribute {Function(JQuery, Array)?} ngeo-sortable-callback
 *     Callback function called after the move end. The Function will be called
 *     with the element and the sort array as arguments.
 * @htmlAttribute {Object?} ngeo-sortable-callback-ctx Context to apply at
 *     the call of the callback function.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @return {angular.IDirective} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoSortable
 */
function sortableComponent($timeout) {
  return {
    restrict: 'A',
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     */
    link: (scope, element, attrs) => {
      const sortable = scope.$eval(attrs.ngeoSortable) || [];
      console.assert(Array.isArray(sortable));

      scope.$watchCollection(
        () => sortable,
        () => {
          sortable.length && $timeout(resetUpDragDrop, 0);
        }
      );

      const optionsObject = scope.$eval(attrs.ngeoSortableOptions);
      const options = getOptions(optionsObject);

      const callbackFn = scope.$eval(attrs.ngeoSortableCallback);
      const callbackCtx = scope.$eval(attrs.ngeoSortableCallbackCtx);

      /**
       * This function resets drag&drop for the list. It is called each
       * time the sortable array changes (see $watchCollection above).
       */
      function resetUpDragDrop() {
        // Add an index to the sortable to allow sorting of the
        // underlying data.
        const children = element.children();
        for (let i = 0; i < children.length; ++i) {
          angular.element(children[i]).data('idx', i);
        }

        const sortableElement = $(element);

        // the element is already sortable; reset it.
        if (sortableElement.data('ui-sortable')) {
          sortableElement.off('sortupdate');
          sortableElement.sortable('destroy');
        }

        /** @type {JQueryUI.SortableOptions} */
        const sortableOptions = {
          axis: 'y',
          // @ts-ignore
          classes: {
            'ui-sortable-helper': options.draggerClassName,
          },
        };

        // CSS class of the handle
        if (options.handleClassName) {
          sortableOptions.handle = `.${options.handleClassName}`;
        }

        // Placeholder for the item being dragged in the sortable list
        if (options.placeholderClassName) {
          sortableOptions.placeholder = options.placeholderClassName;
          sortableOptions.forcePlaceholderSize = true;
        }

        sortableElement.sortable(sortableOptions);

        // This event is triggered when the user stopped sorting and
        // the DOM position (i.e. order in the sortable list) has changed.
        sortableElement.on('sortupdate', (event, ui) => {
          const oldIndex = $(ui.item[0]).data('idx');
          const newIndex = ui.item.index();

          // Update (data)-index on dom element to its new position
          $(ui.item[0]).data('idx', newIndex);

          // Move dragged item to new position
          scope.$apply(() => {
            sortable.splice(newIndex, 0, sortable.splice(oldIndex, 1)[0]);
          });

          // Call the callback function if it exists.
          if (callbackFn instanceof Function) {
            callbackFn.apply(callbackCtx, [element, sortable]);
          }
        });
      }

      /**
       * @param {?} options Options after expression evaluation.
       * @return {miscSortableOptions} Options object.
       * @private
       */
      function getOptions(options) {
        let ret;
        const defaultHandleClassName = 'ngeo-sortable-handle';
        if (options === undefined) {
          ret = {'handleClassName': defaultHandleClassName};
        } else {
          if (options.handleClassName === undefined) {
            options.handleClassName = defaultHandleClassName;
          }
          ret = /** @type {miscSortableOptions} */ (options);
        }
        return ret;
      }
    },
  };
}

module.directive('ngeoSortable', sortableComponent);

export default module;
