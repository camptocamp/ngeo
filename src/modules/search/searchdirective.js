/**
 * @module ngeo search.directive namespace
 */
goog.provide('ngeo.search.searchDirective');


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
    link:
        /**
         * @param {angular.Scope} scope Scope.
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Attributes.
         */
        function(scope, element, attrs) {

          var typeaheadOptionsExpr = attrs['ngeoSearch'];
          var typeaheadOptions = /** @type {TypeaheadOptions} */
              (scope.$eval(typeaheadOptionsExpr));

          var typeaheadDatasetsExpr = attrs['ngeoSearchDatasets'];
          var typeaheadDatasets = /** @type {Array.<TypeaheadDataset>} */
              (scope.$eval(typeaheadDatasetsExpr));

          var args = typeaheadDatasets.slice();
          args.unshift(typeaheadOptions);

          element.typeahead.apply(element, args);

          var typeaheadListenersExpr = attrs['ngeoSearchListeners'];
          var typeaheadListeners_ =
              /** @type {ngeox.SearchDirectiveListeners} */
              (scope.$eval(typeaheadListenersExpr));

          /**
           * @type {ngeox.SearchDirectiveListeners}
           */
          var typeaheadListeners = ngeo.search.searchDirective.adaptListeners_(
              typeaheadListeners_);

          element.on('typeahead:open', function() {
            scope.$apply(function() {
              typeaheadListeners.open();
            });
          });

          element.on('typeahead:close', function() {
            scope.$apply(function() {
              typeaheadListeners.close();
            });
          });

          element.on('typeahead:cursorchange',
              /**
               * @param {jQuery.Event} event Event.
               * @param {Object} suggestion Suggestion.
               * @param {TypeaheadDataset} dataset Dataset.
               */
              function(event, suggestion, dataset) {
                scope.$apply(function() {
                  typeaheadListeners.cursorchange(event, suggestion, dataset);
                });
              });

          element.on('typeahead:select',
              /**
               * @param {jQuery.Event} event Event.
               * @param {Object} suggestion Suggestion.
               * @param {TypeaheadDataset} dataset Dataset.
               */
              function(event, suggestion, dataset) {
                scope.$apply(function() {
                  typeaheadListeners.select(event, suggestion, dataset);
                });
              });

          element.on('typeahead:autocomplete',
              /**
               * @param {jQuery.Event} event Event.
               * @param {Object} suggestion Suggestion.
               * @param {TypeaheadDataset} dataset Dataset.
               */
              function(event, suggestion, dataset) {
                scope.$apply(function() {
                  typeaheadListeners.autocomplete(event, suggestion, dataset);
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
  var typeaheadListeners;
  if (object === undefined) {
    typeaheadListeners = {
      open: ol.nullFunction,
      close: ol.nullFunction,
      cursorchange: ol.nullFunction,
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
