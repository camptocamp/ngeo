/**
 * @module ngeo search.directive namespace
 */
goog.provide('ngeo.search.searchDirective');

goog.require('ol');


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
 * @htmlAttribute {ngeox.SearchDirectiveListeners} ngeo-search-listeners The listeners.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoSearch
 */
ngeo.search.searchDirective = function() {
  return {
    restrict: 'A',
    /**
     * @param {angular.Scope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Atttributes.
     */
    link(scope, element, attrs) {

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
              /** @type {ngeox.SearchDirectiveListeners} */
              (scope.$eval(typeaheadListenersExpr));

          /**
           * @type {ngeox.SearchDirectiveListeners}
           */
      const typeaheadListeners = ngeo.search.searchDirective.adaptListeners_(
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
 * Create a real ngeox.SearchDirectiveListeners object out of the object
 * returned by $eval.
 * @param {ngeox.SearchDirectiveListeners} object Object.
 * @return {ngeox.SearchDirectiveListeners} The listeners object.
 * @private
 */
ngeo.search.searchDirective.adaptListeners_ = function(object) {
  /** @type {ngeox.SearchDirectiveListeners} */
  let typeaheadListeners;
  if (object === undefined) {
    typeaheadListeners = {
      open: ol.nullFunction,
      close: ol.nullFunction,
      cursorchange: ol.nullFunction,
      datasetsempty: ol.nullFunction,
      select: ol.nullFunction,
      autocomplete: ol.nullFunction
    };
  } else {
    typeaheadListeners = {
      open: object.open !== undefined ?
        object.open : ol.nullFunction,
      close: object.close !== undefined ?
        object.close : ol.nullFunction,
      cursorchange: object.cursorchange !== undefined ?
        object.cursorchange : ol.nullFunction,
      datasetsempty: object.datasetsempty !== undefined ?
        object.datasetsempty : ol.nullFunction,
      select: object.select !== undefined ?
        object.select : ol.nullFunction,
      autocomplete: object.autocomplete !== undefined ?
        object.autocomplete : ol.nullFunction
    };
  }
  return typeaheadListeners;
};


/**
 * @type {!angular.Module}
 */
ngeo.search.searchDirective.module = angular.module('ngeoSearchDirective', []);


// Register the directive in the module
ngeo.search.searchDirective.module.directive('ngeoSearch', ngeo.search.searchDirective);
