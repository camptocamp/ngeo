goog.provide('ngeo.routing.NominatimInputComponent');

goog.require('ngeo'); // nowebpack
goog.require('ngeo.search.searchDirective');
goog.require('ngeo.routing.NominatimService');


/**
 * @type {!angular.Module}
 */
ngeo.routing.NominatimInputComponent.module = angular.module('ngeoRoutingNominatimInputComponent', [
  ngeo.search.searchDirective.module.name,
  ngeo.routing.NominatimService.module.name
]);

// webpack: exports.run(/* @ngInject */ ($templateCache) => {
// webpack:   $templateCache.put('ngeo/routing/nominatiminput', require('./nominatiminput.html'));
// webpack: });


ngeo.routing.NominatimInputComponent.module.value('ngeoRoutingNominatimInputComponentTemplateUrl',
  /**
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($attrs) => {
    const templateUrl = $attrs['ngeoRoutingNominatimInputComponentTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      `${ngeo.baseModuleTemplateUrl}/routing/nominatiminput.html`; // nowebpack
    // webpack: 'ngeo/routing/nominatiminput';
  }
);


/**
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.Attributes): string} ngeoRoutingNominatimInputComponentTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function ngeoRoutingNominatimInputComponentTemplateUrl($attrs, ngeoRoutingNominatimInputComponentTemplateUrl) {
  return ngeoRoutingNominatimInputComponentTemplateUrl($attrs);
}


/**
 * @param {!angular.JQLite} $element Element.
 * @param {angular.$injector} $injector Main injector.
 * @param {!angular.Scope} $scope Scope.
 * @param {!ngeo.routing.NominatimService} ngeoNominatimService service for Nominatim
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
   * @type {ngeo.routing.NominatimService}
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

/**
 * Input form field which provides Nominatim typeahead lookup using {@link ngeo.routing.NominatimService}.
 *
 * Example:
 *
 *     <ngeo-nominatim-input
 *         ngeo-nominatim-input-value="ctrl.label"
 *         ngeo-nominatim-input-placeholder="type to search"
 *         ngeo-nominatim-input-on-select="ctrl.onSelect">
 *
 * Is used in in the partial of {@link ngeo.routingFeatureComponent}.
 *
 * See the [../examples/routing.html](../examples/routing.html) example to see it in action.
 *
 * @htmlAttribute {function(ngeox.NominatimSearchResult)} ngeo-nominatim-input-on-select
 *  Event fired when user selects a new suggestion.
 * @htmlAttribute {string} ngeo-nominatim-input-value
 *  Value of input field, will be set to the label of the search result.
 * @htmlAttribute {string} ngeo-nominatim-input-placeholder
 *  Placeholder text, when field is empty.
 * @ngdoc directive
 * @ngname ngeoNominatimInput
 */
ngeo.routing.NominatimInputComponent.component_ = {
  controller: ngeo.NgeoNominatimInputController,
  bindings: {
    'onSelect': '=?ngeoNominatimInputOnSelect',
    'inputValue': '=?ngeoNominatimInputValue',
    'placeholder': '@?ngeoNominatimInputPlaceholder'
  },
  templateUrl: ngeoRoutingNominatimInputComponentTemplateUrl
};

ngeo.routing.NominatimInputComponent.module.component('ngeoNominatimInput', ngeo.routing.NominatimInputComponent.component_);
