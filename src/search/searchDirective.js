import angular from 'angular';


/**
 * @typedef {Object} SearchDirectiveListeners
 * @property {Function} [open]
 * @property {Function} [close]
 * @property {function(JQueryEventObject, Object, Twitter.Typeahead.Dataset<T>): void} [cursorchange]
 * @property {function(JQueryEventObject, Object, Twitter.Typeahead.Dataset<T>): void} [select]
 * @property {function(JQueryEventObject, Object, Twitter.Typeahead.Dataset<T>): void} [autocomplete]
 * @property {function(JQueryEventObject, string, boolean): void} [datasetsempty]
 * @property {function(JQueryEventObject, string): void} [change]
 * @template T
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
 * @htmlAttribute {Array<Twitter.Typeahead.Dataset>} ngeo-search-datasets The sources datasets.
 * @htmlAttribute {SearchDirectiveListeners} ngeo-search-listeners The listeners.
 * @return {angular.IDirective} Directive Definition Object.
 * @ngInject
 * @template T
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

      const typeaheadOptionsExpr = attrs.ngeoSearch;
      /** @type {Twitter.Typeahead.Options} */
      const typeaheadOptions = scope.$eval(typeaheadOptionsExpr);

      const typeaheadDatasetsExpr = attrs.ngeoSearchDatasets;
      /** @type {Array<Twitter.Typeahead.Dataset<T>>} */
      const typeaheadDatasets = scope.$eval(typeaheadDatasetsExpr);

      element.typeahead(typeaheadOptions, typeaheadDatasets);

      const typeaheadListenersExpr = attrs.ngeoSearchListeners;
      /** @type {SearchDirectiveListeners<T>} */
      const typeaheadListeners_ = scope.$eval(typeaheadListenersExpr);

      /**
       * @type {SearchDirectiveListeners<T>}
       */
      const typeaheadListeners = adaptListeners_(
        typeaheadListeners_);

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

      element.on('typeahead:cursorchange',
        /**
         * @param {JQueryEventObject} event Event.
         * @param {Object} suggestion Suggestion.
         * @param {Twitter.Typeahead.Dataset<T>} dataset Dataset.
         */
        (event, suggestion, dataset) => {
          scope.$apply(() => {
            typeaheadListeners.cursorchange(event, suggestion, dataset);
          });
        });

      element.on('typeahead:select',
        /**
         * @param {JQueryEventObject} event Event.
         * @param {Object} suggestion Suggestion.
         * @param {Twitter.Typeahead.Dataset<T>} dataset Dataset.
         */
        (event, suggestion, dataset) => {
          scope.$apply(() => {
            typeaheadListeners.select(event, suggestion, dataset);
          });
        });

      element.on('typeahead:autocomplete',
        /**
         * @param {JQueryEventObject} event Event.
         * @param {Object} suggestion Suggestion.
         * @param {Twitter.Typeahead.Dataset<T>} dataset Dataset.
         */
        (event, suggestion, dataset) => {
          scope.$apply(() => {
            typeaheadListeners.autocomplete(event, suggestion, dataset);
          });
        });

      element.on('typeahead:asyncreceive',
        /**
         * @param {JQueryEventObject} event Event.
         * @param {Twitter.Typeahead.Dataset<T>} dataset Dataset.
         * @param {string} query Query.
         */
        (event, dataset, query) => {
          scope.$apply(() => {
            const empty = element.data('tt-typeahead').menu._allDatasetsEmpty();
            typeaheadListeners.datasetsempty(event, query, empty);
          });
        });

      element.on('typeahead:change',
        /**
         * @param {JQueryEventObject} event Event.
         */
        (event) => {
          scope.$apply(() => {
            const query = element.data('tt-typeahead').input.query;
            typeaheadListeners.change(event, query);
          });
        });

      //show spinning gif while waiting for the results
      // on the closest span from the input in which it is being typed
      element.on('typeahead:asyncrequest', () => {
        element.parent().addClass('search-loading');
      });

      // on results received or canceled -> remove the loading spiner
      element.on('typeahead:asynccancel typeahead:asyncreceive', () => {
        // sometimes the classes are not removed/added in the correct order
        // and jQuery thinks there is nothing to remove when called immediately. Sic!
        setTimeout(() => {
          element.parent().removeClass('search-loading');
        }, 50);
      });
    }
  };
}


/**
 * Create a real SearchDirectiveListeners object out of the object
 * returned by $eval.
 * @param {SearchDirectiveListeners<T>} object Object.
 * @return {SearchDirectiveListeners<T>} The listeners object.
 * @private
 * @hidden
 * @template T
 */
function adaptListeners_(object) {
  /** @type {SearchDirectiveListeners<T>} */
  let typeaheadListeners;
  if (object === undefined) {
    typeaheadListeners = {
      open() {},
      close() {},
      cursorchange() {},
      datasetsempty() {},
      select() {},
      autocomplete() {},
      change() {}
    };
  } else {
    typeaheadListeners = {
      open: object.open !== undefined ?
        object.open : () => {},
      close: object.close !== undefined ?
        object.close : () => {},
      cursorchange: object.cursorchange !== undefined ?
        object.cursorchange : () => {},
      datasetsempty: object.datasetsempty !== undefined ?
        object.datasetsempty : () => {},
      select: object.select !== undefined ?
        object.select : () => {},
      autocomplete: object.autocomplete !== undefined ?
        object.autocomplete : () => {},
      change: object.change !== undefined ?
        object.change : () => {}
    };
  }
  return typeaheadListeners;
}


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoSearchDirective', []);


// Register the directive in the module
module.directive('ngeoSearch', searchComponent);


export default module;
