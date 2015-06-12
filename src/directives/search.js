/**
 * @fileoverview Provides the "ngeoSearch" directive, which uses Twitter's
 * typeahead component to change an input text into a search field.
 *
 * Example:
 *
 * <input type="text"
 *   ngeo-search="ctrl.typeaheadOptions"
 *   ngeo-search-datasets="ctrl.typeaheadDatasets"
 *   ngeo-search-listeners="crtl.typeaheadListeners">
 */
goog.provide('ngeo.searchDirective');

goog.require('goog.asserts');
goog.require('ngeo');


/**
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
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

          element.on('typeahead:opened', function() {
            scope.$apply(function() {
              typeaheadListeners.opened();
            });
          });

          element.on('typeahead:closed', function() {
            scope.$apply(function() {
              typeaheadListeners.closed();
            });
          });

          element.on('typeahead:cursorchanged',
              /**
               * @param {jQuery.Event} event Event.
               * @param {Object} suggestion Suggestion.
               * @param {TypeaheadDataset} dataset Dataset.
               */
              function(event, suggestion, dataset) {
                scope.$apply(function() {
                  typeaheadListeners.cursorchanged(event, suggestion, dataset);
                });
              });

          element.on('typeahead:selected',
              /**
               * @param {jQuery.Event} event Event.
               * @param {Object} suggestion Suggestion.
               * @param {TypeaheadDataset} dataset Dataset.
               */
              function(event, suggestion, dataset) {
                scope.$apply(function() {
                  typeaheadListeners.selected(event, suggestion, dataset);
                });
              });

          element.on('typeahead:autocompleted',
              /**
               * @param {jQuery.Event} event Event.
               * @param {Object} suggestion Suggestion.
               * @param {TypeaheadDataset} dataset Dataset.
               */
              function(event, suggestion, dataset) {
                scope.$apply(function() {
                  typeaheadListeners.autocompleted(event, suggestion, dataset);
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
      opened: goog.nullFunction,
      closed: goog.nullFunction,
      cursorchanged: goog.nullFunction,
      selected: goog.nullFunction,
      autocompleted: goog.nullFunction
    };
  } else {
    typeaheadListeners = {
      opened: goog.isDef(object.opened) ?
          object.opened : goog.nullFunction,
      closed: goog.isDef(object.closed) ?
          object.closed : goog.nullFunction,
      cursorchanged: goog.isDef(object.cursorchanged) ?
          object.cursorchanged : goog.nullFunction,
      selected: goog.isDef(object.selected) ?
          object.selected : goog.nullFunction,
      autocompleted: goog.isDef(object.autocompleted) ?
          object.autocompleted : goog.nullFunction
    };
  }
  return typeaheadListeners;
};


ngeoModule.directive('ngeoSearch', ngeo.searchDirective);
