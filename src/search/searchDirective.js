import angular from 'angular';

/**
 * @typedef {Object} SearchDirectiveListeners
 * @property {Function} [open]
 * @property {Function} [close]
 * @property {function(JQueryEventObject, Object, Twitter.Typeahead.Dataset): void} [cursorchange]
 * @property {function(JQueryEventObject, Object, Twitter.Typeahead.Dataset): void} [select]
 * @property {function(JQueryEventObject, Object, Twitter.Typeahead.Dataset): void} [autocomplete]
 * @property {function(JQueryEventObject, string, boolean): void} [datasetsempty]
 * @property {function(JQueryEventObject, string): void} [change]
 */

/**
 * Provides the "ngeoSearch" directive, which uses Twitter's
 * typeahead component to change an input text into a search field.
 *
 * Example:
 *
 *      <input type="text"
 *        ngeo-search="ctrl.typeaheadOptions"
 *        ngeo-search-datasets="ctrl.typeaheadDatasets"
 *        ngeo-search-listeners="crtl.typeaheadListeners">
 *
 * See our live example: [../examples/search.html](../examples/search.html)
 *
 * @htmlAttribute {Twitter.Typeahead.Options} ngeo-search The options.
 * @htmlAttribute {Array.<Twitter.Typeahead.Dataset>} ngeo-search-datasets The sources datasets.
 * @htmlAttribute {SearchDirectiveListeners} ngeo-search-listeners The listeners.
 * @return {angular.IDirective} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoSearch
 */
function searchComponent() {
  return {
    restrict: 'A',
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     */
    link: (scope, element, attrs) => {
      const typeaheadOptionsExpr = attrs['ngeoSearch'];
      /** @type {Twitter.Typeahead.Options} */
      const typeaheadOptions = scope.$eval(typeaheadOptionsExpr);

      const typeaheadDatasetsExpr = attrs['ngeoSearchDatasets'];
      /** @type {Array.<Twitter.Typeahead.Dataset>} */
      const typeaheadDatasets = scope.$eval(typeaheadDatasetsExpr);

      element.typeahead(typeaheadOptions, typeaheadDatasets);

      const typeaheadListenersExpr = attrs['ngeoSearchListeners'];
      /** @type {SearchDirectiveListeners} */
      const typeaheadListeners_ = scope.$eval(typeaheadListenersExpr);

      /**
       * @type {SearchDirectiveListeners}
       */
      const typeaheadListeners = adaptListeners_(typeaheadListeners_);

      element.on('typeahead:open', () => {
        scope.$apply(() => {
          typeaheadListeners.open();
        });
      });

      element.on('typeahead:close', () => {
        scope.$apply(() => {
          typeaheadListeners.close();
        });
      });

      element.on(
        'typeahead:cursorchange',
        /**
         * @param {JQueryEventObject} event Event.
         * @param {Object} suggestion Suggestion.
         * @param {Twitter.Typeahead.Dataset} dataset Dataset.
         */
        (event, suggestion, dataset) => {
          scope.$apply(() => {
            typeaheadListeners.cursorchange(event, suggestion, dataset);
          });
        }
      );

      element.on(
        'typeahead:select',
        /**
         * @param {JQueryEventObject} event Event.
         * @param {Object} suggestion Suggestion.
         * @param {Twitter.Typeahead.Dataset} dataset Dataset.
         */
        (event, suggestion, dataset) => {
          scope.$apply(() => {
            typeaheadListeners.select(event, suggestion, dataset);
          });
        }
      );

      element.on(
        'typeahead:autocomplete',
        /**
         * @param {JQueryEventObject} event Event.
         * @param {Object} suggestion Suggestion.
         * @param {Twitter.Typeahead.Dataset} dataset Dataset.
         */
        (event, suggestion, dataset) => {
          scope.$apply(() => {
            typeaheadListeners.autocomplete(event, suggestion, dataset);
          });
        }
      );

      element.on(
        'typeahead:asyncreceive',
        /**
         * @param {JQueryEventObject} event Event.
         * @param {Twitter.Typeahead.Dataset} dataset Dataset.
         * @param {string} query Query.
         */
        (event, dataset, query) => {
          scope.$apply(() => {
            const empty = element.data('tt-typeahead')['menu']['_allDatasetsEmpty']();
            typeaheadListeners.datasetsempty(event, query, empty);
          });
        }
      );

      element.on(
        'typeahead:change',
        /**
         * @param {JQueryEventObject} event Event.
         */
        (event) => {
          scope.$apply(() => {
            const query = element.data('tt-typeahead')['input']['query'];
            typeaheadListeners.change(event, query);
          });
        }
      );
    },
  };
}

/**
 * Create a real SearchDirectiveListeners object out of the object
 * returned by $eval.
 * @param {SearchDirectiveListeners} object Object.
 * @return {SearchDirectiveListeners} The listeners object.
 * @private
 * @hidden
 */
function adaptListeners_(object) {
  /** @type {SearchDirectiveListeners} */
  let typeaheadListeners;
  if (object === undefined) {
    typeaheadListeners = {
      open() {},
      close() {},
      cursorchange() {},
      datasetsempty() {},
      select() {},
      autocomplete() {},
      change() {},
    };
  } else {
    typeaheadListeners = {
      open: object.open !== undefined ? object.open : () => {},
      close: object.close !== undefined ? object.close : () => {},
      cursorchange: object.cursorchange !== undefined ? object.cursorchange : () => {},
      datasetsempty: object.datasetsempty !== undefined ? object.datasetsempty : () => {},
      select: object.select !== undefined ? object.select : () => {},
      autocomplete: object.autocomplete !== undefined ? object.autocomplete : () => {},
      change: object.change !== undefined ? object.change : () => {},
    };
  }
  return typeaheadListeners;
}

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoSearchDirective', []);

// Register the directive in the module
module.directive('ngeoSearch', searchComponent);

export default module;
