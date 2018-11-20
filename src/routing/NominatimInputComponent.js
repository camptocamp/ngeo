/**
 * @module ngeo.routing.NominatimInputComponent
 */
const exports = {};
import ngeoSearchSearchDirective from 'ngeo/search/searchDirective.js';
import ngeoRoutingNominatimService from 'ngeo/routing/NominatimService.js';


/**
 * @type {!angular.IModule}
 */
exports.module = angular.module('ngeoRoutingNominatimInputComponent', [
  ngeoSearchSearchDirective.module.name,
  ngeoRoutingNominatimService.module.name
]);

exports.module.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('ngeo/routing/nominatiminput', require('./nominatiminput.html'));
});


exports.module.value('ngeoRoutingNominatimInputComponentTemplateUrl',
  /**
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($attrs) => {
    const templateUrl = $attrs['ngeoRoutingNominatimInputComponentTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'ngeo/routing/nominatiminput';
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
 * @param {angular.IInjectorService} $injector Main injector.
 * @param {!angular.Scope} $scope Scope.
 * @param {!ngeo.routing.NominatimService} ngeoNominatimService service for Nominatim
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoNominatimInputController
 */
exports.Controller = function($element, $injector, $scope, ngeoNominatimService) {

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
 * @this {ngeo.routing.NominatimInputComponent.Controller}
 * @private
 */
exports.Controller.prototype.select_ = function(event, suggestion, dataset) {
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
const component = {
  controller: exports.Controller,
  bindings: {
    'onSelect': '=?ngeoNominatimInputOnSelect',
    'inputValue': '=?ngeoNominatimInputValue',
    'placeholder': '@?ngeoNominatimInputPlaceholder'
  },
  templateUrl: ngeoRoutingNominatimInputComponentTemplateUrl
};

exports.module.component('ngeoNominatimInput', component);


export default exports;
