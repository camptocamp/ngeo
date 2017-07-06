goog.provide('gmf.nominatimInputComponent');

goog.require('gmf');
goog.require('gmf.NominatimService');

gmf.module.value('gmfNominatimInputTemplateUrl',
  /**
   * @param {!angular.JQLite} $element Element.
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs['gmfNominatimInputTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      `${gmf.baseTemplateUrl}/nominatiminput.html`;
  }
);


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} gmfNominatimInputTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfNominatimInputTemplateUrl($element, $attrs, gmfNominatimInputTemplateUrl) {
  return gmfNominatimInputTemplateUrl($element, $attrs);
}


/**
 * @htmlAttribute {function(gmfx.NominatimSearchResult)} gmf-nominatim-input-on-select
 *  Event fired when user selects a new suggestion.
 * @htmlAttribute {Object<string, string>} gmf-nominatim-input-search-default-params
 *  Default parameters to customize search.
 * @htmlAttribute {string} gmf-nominatim-input-value Value of input field
 * @htmlAttribute {string} gmf-nominatim-input-placeholder Placeholder
 * @ngdoc component
 * @ngname gmfNominatimInput
 */
gmf.nominatimInputComponent = {
  controller: 'GmfNominatimInputController as inputCtrl',
  bindings: {
    'onSelect': '=?gmfNominatimInputOnSelect',
    'searchDefaultParams': '<?gmfNominatimInputSearchDefaultParams',
    'inputValue': '=?gmfNominatimInputValue',
    'placeholder': '@?gmfNominatimInputPlaceholder'
  },
  templateUrl: gmfNominatimInputTemplateUrl
};

gmf.module.component('gmfNominatimInput', gmf.nominatimInputComponent);


/**
 * @param {!angular.JQLite} $element Element.
 * @param {angular.$injector} $injector Main injector.
 * @param {!angular.Scope} $scope Scope.
 * @param {!gmf.NominatimService} gmfNominatimService service for Nominatim
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfNominatimInputController
 */
gmf.GmfNominatimInputController = function($element, $injector, $scope, gmfNominatimService) {

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
   * @type {gmf.NominatimService}
   * @export
   */
  this.gmfNominatimService = gmfNominatimService;

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
    source: this.gmfNominatimService.typeaheadSourceDebounced
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

gmf.GmfNominatimInputController.prototype.$onInit = function() {
  this.gmfNominatimService['searchDefaultParams'] = this.searchDefaultParams || {};
};

/**
 * @param {jQuery.Event} event Event.
 * @param {gmfx.NominatimSearchResult} suggestion Suggestion.
 * @param {TypeaheadDataset} dataset Dataset.
 * @this {gmf.GmfNominatimInputController}
 * @private
 */
gmf.GmfNominatimInputController.prototype.select_ = function(event, suggestion, dataset) {
  if (this.onSelect) {
    this.onSelect(suggestion);
  }
};


gmf.module.controller('GmfNominatimInputController', gmf.GmfNominatimInputController);
