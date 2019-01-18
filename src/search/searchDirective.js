/**
 */
import angular from 'angular';


/**
 * @typedef {{
 *   open: (function()|undefined),
 *   close: (function()|undefined),
 *   cursorchange: (function(jQuery.Event, Object,
 *       TypeaheadDataset)|undefined),
 *   select: (function(jQuery.Event, Object,
 *       TypeaheadDataset)|undefined),
 *   autocomplete: (function(jQuery.Event, Object,
 *       TypeaheadDataset)|undefined),
 *   datasetsempty: (function(jQuery.Event, string, boolean)|undefined)
 * }} SearchDirectiveListeners
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
 * @htmlAttribute {TypeaheadOptions} ngeo-search The options.
 * @htmlAttribute {Array.<TypeaheadDataset>} ngeo-search-datasets The sources datasets.
 * @htmlAttribute {SearchDirectiveListeners} ngeo-search-listeners The listeners.
 * @return {angular.IDirective} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoSearch
 */
const exports = function() {
  return {
    restrict: 'A',
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQLite} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     */
    link: (scope, element, attrs) => {

      const typeaheadOptionsExpr = attrs['ngeoSearch'];
      const typeaheadOptions = /** @type {TypeaheadOptions} */
              (scope.$eval(typeaheadOptionsExpr));

      const typeaheadDatasetsExpr = attrs['ngeoSearchDatasets'];
      const typeaheadDatasets = /** @type {Array.<TypeaheadDataset>} */
              (scope.$eval(typeaheadDatasetsExpr));

      const args = typeaheadDatasets.slice();
      args.unshift(typeaheadOptions);

      element.typeahead(...args);

      const typeaheadListenersExpr = attrs['ngeoSearchListeners'];
      const typeaheadListeners_ =
              /** @type {SearchDirectiveListeners} */
              (scope.$eval(typeaheadListenersExpr));

      /**
       * @type {SearchDirectiveListeners}
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
         * @param {jQuery.Event} event Event.
         * @param {Object} suggestion Suggestion.
         * @param {TypeaheadDataset} dataset Dataset.
         */
        (event, suggestion, dataset) => {
          scope.$apply(() => {
            typeaheadListeners.cursorchange(event, suggestion, dataset);
          });
        });

      element.on('typeahead:select',
        /**
         * @param {jQuery.Event} event Event.
         * @param {Object} suggestion Suggestion.
         * @param {TypeaheadDataset} dataset Dataset.
         */
        (event, suggestion, dataset) => {
          scope.$apply(() => {
            typeaheadListeners.select(event, suggestion, dataset);
          });
        });

      element.on('typeahead:autocomplete',
        /**
         * @param {jQuery.Event} event Event.
         * @param {Object} suggestion Suggestion.
         * @param {TypeaheadDataset} dataset Dataset.
         */
        (event, suggestion, dataset) => {
          scope.$apply(() => {
            typeaheadListeners.autocomplete(event, suggestion, dataset);
          });
        });

      element.on('typeahead:asyncreceive',
        /**
         * @param {jQuery.Event} event Event.
         * @param {TypeaheadDataset} dataset Dataset.
         * @param {string} query Query.
         */
        (event, dataset, query) => {
          scope.$apply(() => {
            const empty = element.data('tt-typeahead')['menu']['_allDatasetsEmpty']();
            typeaheadListeners.datasetsempty(event, query, empty);
          });
        });

    }
  };
};


/**
 * Create a real SearchDirectiveListeners object out of the object
 * returned by $eval.
 * @param {SearchDirectiveListeners} object Object.
 * @return {SearchDirectiveListeners} The listeners object.
 * @private
 */
exports.adaptListeners_ = function(object) {
  /** @type {SearchDirectiveListeners} */
  let typeaheadListeners;
  if (object === undefined) {
    typeaheadListeners = {
      open() {},
      close() {},
      cursorchange() {},
      datasetsempty() {},
      select() {},
      autocomplete() {}
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
        object.autocomplete : () => {}
    };
  }
  return typeaheadListeners;
};


/**
 * @type {!angular.IModule}
 */
const module = angular.module('ngeoSearchDirective', []);


// Register the directive in the module
module.directive('ngeoSearch', exports);


export default module;
