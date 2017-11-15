goog.provide('ngeo.sortableDirective');

goog.require('ngeo');


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
 * @htmlAttribute {Array.<ol.layer.Base>} ngeo-sortable The layers to sort.
 * @htmlAttribute {!ngeox.SortableOptions} ngeo-sortable-options The options.
 * @htmlAttribute {Function(angular.JQLite, Array)?} ngeo-sortable-callback
 *     Callback function called after the move end. The Function will be called
 *     with the element and the sort array as arguments.
 * @htmlAttribute {Object?} ngeo-sortable-callback-ctx Context to apply at
 *     the call of the callback function.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoSortable
 */
ngeo.sortableDirective = function($timeout) {
  return {
    restrict: 'A',
    /**
     * @param {angular.Scope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Atttributes.
     */
    link: (scope, element, attrs) => {

      const sortable = /** @type {Array} */
              (scope.$eval(attrs['ngeoSortable'])) || [];
      goog.asserts.assert(Array.isArray(sortable));

      scope.$watchCollection(() => sortable, () => {
        sortable.length && $timeout(resetUpDragDrop, 0);
      });

      const optionsObject = scope.$eval(attrs['ngeoSortableOptions']);
      const options = getOptions(optionsObject);

      const callbackFn = scope.$eval(attrs['ngeoSortableCallback']);
      const callbackCtx = scope.$eval(attrs['ngeoSortableCallbackCtx']);

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

        const sortableElement = $(element[0]);

        sortableElement.sortable({
          handle: `.${options['handleClassName']}`
        });

        // Add draggerClass to element being dragged
        sortableElement.on('sortstart', (event, ui) => {
          if (options['draggerClassName']) {
            $(ui.item).addClass(options['draggerClassName']);
          }
        });

        // Remove draggerClass from element not being dragged anymore
        sortableElement.on('sortstop', (event, ui) => {
          if (options['draggerClassName']) {
            $(ui.item).removeClass(options['draggerClassName']);
          }
        });

        // This event is triggered when the user stopped sorting and
        // the DOM position has changed.
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
            callbackFn.apply(callbackCtx, [element, sortable]); // TODO: test
          }
        });
      }

      /**
       * @param {?} options Options after expression evaluation.
       * @return {!ngeox.SortableOptions} Options object.
       * @private
       */
      function getOptions(options) {
        let ret;
        const defaultHandleClassName = 'ngeo-sortable-handle';
        if (options === undefined) {
          ret = {'handleClassName': defaultHandleClassName};
        } else {
          if (options['handleClassName'] === undefined) {
            options['handleClassName'] = defaultHandleClassName;
          }
          ret = /** @type {ngeox.SortableOptions} */ (options);
        }
        return ret;
      }

    }
  };
};

ngeo.module.directive('ngeoSortable', ngeo.sortableDirective);
