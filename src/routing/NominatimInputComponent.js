import angular from 'angular';
import ngeoSearchSearchDirective from 'ngeo/search/searchDirective.js';
import ngeoRoutingNominatimService from 'ngeo/routing/NominatimService.js';


/**
 * @type {!angular.IModule}
 */
const module = angular.module('ngeoRoutingNominatimInputComponent', [
  ngeoSearchSearchDirective.name,
  ngeoRoutingNominatimService.name
]);

module.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('ngeo/routing/nominatiminput', require('./nominatiminput.html'));
});


module.value('ngeoRoutingNominatimInputComponentTemplateUrl',
  /**
   * @param {!angular.IAttributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($attrs) => {
    const templateUrl = $attrs['ngeoRoutingNominatimInputComponentTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'ngeo/routing/nominatiminput';
  }
);


/**
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!angular.IAttributes): string} ngeoRoutingNominatimInputComponentTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function ngeoRoutingNominatimInputComponentTemplateUrl($attrs, ngeoRoutingNominatimInputComponentTemplateUrl) {
  return ngeoRoutingNominatimInputComponentTemplateUrl($attrs);
}


/**
 * @param {!JQLite} $element Element.
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @param {!angular.IScope} $scope Scope.
 * @param {!import("ngeo/routing/NominatimService.js").NominatimService} ngeoNominatimService service for Nominatim
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoNominatimInputController
 */
function Controller($element, $injector, $scope, ngeoNominatimService) {

  /**
   * @type {!JQLite}
   * @private
   */
  this.element_ = $element;

  /**
   * @type {angular.IScope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {import("ngeo/routing/NominatimService.js").NominatimService}
   * @export
   */
  this.ngeoNominatimService = ngeoNominatimService;

  /**
   * @type {(function(Object): void|undefined)}
   * @export
   */
  this.onSelect;

  /**
   * @type {string}
   * @export
   */
  this.inputValue;

  /**
   * @type {Twitter.Typeahead.Options}
   * @export
   */
  this.options = /** @type {Twitter.Typeahead.Options} */ ({
  });

  /**
   * @type {Array.<Twitter.Typeahead.Dataset>}
   * @export
   */
  this.datasets = [/** @type {Twitter.Typeahead.Dataset} */({
    name: 'nominatim',
    display: 'name',
    source: this.ngeoNominatimService.typeaheadSourceDebounced
  })];

  /**
   * @type {import('ngeo/search/searchDirective.js').SearchDirectiveListeners}
   * @export
   */
  this.listeners = /** @type {import('ngeo/search/searchDirective.js').SearchDirectiveListeners} */({
    select: this.select_.bind(this)
  });

  /**
   * @type {string}
   * @export
   */
  this.placeholder = '';

}

/**
 * @param {JQueryEventObject} event Event.
 * @param {import('ngeo/routing/NominatimService').NominatimSearchResult} suggestion Suggestion.
 * @param {Twitter.Typeahead.Dataset} dataset Dataset.
 * @this {import("ngeo/routing/NominatimInputComponent.js").default.Controller}
 * @private
 */
Controller.prototype.select_ = function(event, suggestion, dataset) {
  if (this.onSelect) {
    this.onSelect(suggestion);
  }
};

/**
 * Input form field which provides Nominatim typeahead lookup using {@link import("ngeo/routing/NominatimService.js").default}.
 *
 * Example:
 *
 *     <ngeo-nominatim-input
 *         ngeo-nominatim-input-value="ctrl.label"
 *         ngeo-nominatim-input-placeholder="type to search"
 *         ngeo-nominatim-input-on-select="ctrl.onSelect">
 *
 * Is used in in the partial of {@link import("ngeo/routingFeatureComponent.js").default}.
 *
 * See the [../examples/routing.html](../examples/routing.html) example to see it in action.
 *
 * @htmlAttribute {function(import('ngeo/routing/NominatimService').NominatimSearchResult)} ngeo-nominatim-input-on-select
 *  Event fired when user selects a new suggestion.
 * @htmlAttribute {string} ngeo-nominatim-input-value
 *  Value of input field, will be set to the label of the search result.
 * @htmlAttribute {string} ngeo-nominatim-input-placeholder
 *  Placeholder text, when field is empty.
 * @ngdoc directive
 * @ngname ngeoNominatimInput
 */
const component = {
  controller: Controller,
  bindings: {
    'onSelect': '=?ngeoNominatimInputOnSelect',
    'inputValue': '=?ngeoNominatimInputValue',
    'placeholder': '@?ngeoNominatimInputPlaceholder'
  },
  templateUrl: ngeoRoutingNominatimInputComponentTemplateUrl
};

module.component('ngeoNominatimInput', component);


export default module;
