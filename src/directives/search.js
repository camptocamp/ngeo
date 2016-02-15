goog.provide('ngeo.searchDirective');

goog.require('ngeo');


/**
 * Provides the "ngeoSearch" directive, which uses Twitter's
 * typeahead component to change an input text into a search field.
 *
 *     <input type="text"
 *       ngeo-search="ctrl.typeaheadOptions"
 *       ngeo-search-datasets="ctrl.typeaheadDatasets"
 *       ngeo-search-listeners="crtl.typeaheadListeners">
 *
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoSearch
 */
ngeo.searchDirective = function() {
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
          var typeaheadListeners = ngeo.searchDirective.adaptListeners_(
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
ngeo.searchDirective.adaptListeners_ = function(object) {
  /** @type {ngeox.SearchDirectiveListeners} */
  var typeaheadListeners;
  if (!goog.isDef(object)) {
    typeaheadListeners = {
      open: goog.nullFunction,
      close: goog.nullFunction,
      cursorchange: goog.nullFunction,
      select: goog.nullFunction,
      autocomplete: goog.nullFunction
    };
  } else {
    typeaheadListeners = {
      open: goog.isDef(object.open) ?
          object.open : goog.nullFunction,
      close: goog.isDef(object.close) ?
          object.close : goog.nullFunction,
      cursorchange: goog.isDef(object.cursorchange) ?
          object.cursorchange : goog.nullFunction,
      select: goog.isDef(object.select) ?
          object.select : goog.nullFunction,
      autocomplete: goog.isDef(object.autocomplete) ?
          object.autocomplete : goog.nullFunction
    };
  }
  return typeaheadListeners;
};


ngeo.module.directive('ngeoSearch', ngeo.searchDirective);
