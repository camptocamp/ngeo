goog.provide('ngeo.nominatimInputComponent');

goog.require('ngeo');
goog.require('ngeo.NominatimService');

ngeo.module.value('ngeoNominatimInputTemplateUrl',
  /**
   * @param {!angular.JQLite} $element Element.
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs['ngeoNominatimInputTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      `${ngeo.baseTemplateUrl}/nominatiminput.html`;
  }
);


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} ngeoNominatimInputTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function ngeoNominatimInputTemplateUrl($element, $attrs, ngeoNominatimInputTemplateUrl) {
  return ngeoNominatimInputTemplateUrl($element, $attrs);
}


/**
 * @htmlAttribute {function(ngeox.NominatimSearchResult)} ngeo-nominatim-input-on-select
 *  Event fired when user selects a new suggestion.
 * @htmlAttribute {Object<string, string>} ngeo-nominatim-input-search-default-params
 *  Default parameters to customize search.
 * @htmlAttribute {string} ngeo-nominatim-input-value Value of input field
 * @htmlAttribute {string} ngeo-nominatim-input-placeholder Placeholder
 * @ngdoc component
 * @ngname ngeoNominatimInput
 */
ngeo.nominatimInputComponent = {
  controller: 'NgeoNominatimInputController as inputCtrl',
  bindings: {
    'onSelect': '=?ngeoNominatimInputOnSelect',
    'searchDefaultParams': '<?ngeoNominatimInputSearchDefaultParams',
    'inputValue': '=?ngeoNominatimInputValue',
    'placeholder': '@?ngeoNominatimInputPlaceholder'
  },
  templateUrl: ngeoNominatimInputTemplateUrl
};

ngeo.module.component('ngeoNominatimInput', ngeo.nominatimInputComponent);


/**
 * @param {!angular.JQLite} $element Element.
 * @param {angular.$injector} $injector Main injector.
 * @param {!angular.Scope} $scope Scope.
 * @param {!ngeo.NominatimService} ngeoNominatimService service for Nominatim
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoNominatimInputController
 */
ngeo.NgeoNominatimInputController = function($element, $injector, $scope, ngeoNominatimService) {

  /**
   * @type {!angular.JQLite}
   * @private
   */
  this.element_ = $element;

  /**
   * @type {angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {Object<string, string>}
   * @private
   */
  this.searchDefaultParams;

  /**
   * @type {ngeo.NominatimService}
   * @export
   */
  this.ngeoNominatimService = ngeoNominatimService;

  /**
   * @type {(function(Object)|undefined)}
   * @export
   */
  this.onSelect;

  /**
   * @type {string}
   * @export
   */
  this.inputValue;

  /**
   * @type {TypeaheadOptions}
   * @export
   */
  this.options = /** @type {TypeaheadOptions} */ ({
  });

  /**
   * @type {Array.<TypeaheadDataset>}
   * @export
   */
  this.datasets = [/** @type {TypeaheadDataset} */({
    name: 'nominatim',
    display: 'name',
    source: this.ngeoNominatimService.typeaheadSourceDebounced
  })];

  /**
   * @type {ngeox.SearchDirectiveListeners}
   * @export
   */
  this.listeners = /** @type {ngeox.SearchDirectiveListeners} */({
    select: this.select_.bind(this)
  });

  /**
   * @type {string}
   * @export
   */
  this.placeholder = '';

};

ngeo.NgeoNominatimInputController.prototype.$onInit = function() {
  // TODO are injected services shared?
  this.ngeoNominatimService.searchDefaultParams = this.searchDefaultParams || {};
};

/**
 * @param {jQuery.Event} event Event.
 * @param {ngeox.NominatimSearchResult} suggestion Suggestion.
 * @param {TypeaheadDataset} dataset Dataset.
 * @this {ngeo.NgeoNominatimInputController}
 * @private
 */
ngeo.NgeoNominatimInputController.prototype.select_ = function(event, suggestion, dataset) {
  if (this.onSelect) {
    this.onSelect(suggestion);
  }
};


ngeo.module.controller('NgeoNominatimInputController', ngeo.NgeoNominatimInputController);
