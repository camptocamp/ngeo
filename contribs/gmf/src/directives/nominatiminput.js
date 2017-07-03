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
 * @htmlAttribute {function} gmf-nominatim-input-on-select
 *  Event fired when user selects a new suggestion.
 *  Parameters: (event object, suggestion object)
 * @htmlAttribute {Object<string, string>} gmf-nominatim-input-search-deafault-params
 *  Default parameters to customize search.
 * @htmlAttribute {ol.Feature} gmf-nominatim-input-feature Feature
 * @ngdoc component
 * @ngname gmfNominatimInput
 */
gmf.nominatimInputComponent = {
  controller: 'GmfNominatimInputController as inputCtrl',
  bindings: {
    'onSelect': '=?gmfNominatimInputOnSelect',
    'searchDefaultParams': '=?gmfNominatimInputSearchDefaultParams',
    'feature': '=gmfNominatimInputFeature'
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
  this.searchDefaultParams_ = this.$scope_['searchDefaultParams'] || [];
  this.searchDefaultParams_['countrycodes'] = 'CH';

  /**
   * @type {gmf.NominatimService}
   * @export
   */
  this.gmfNominatimService = gmfNominatimService;
  this.gmfNominatimService.searchDefaultParams = this.searchDefaultParams_;

  /**
   * @type {function}
   * @export
   */
  this.onSelect;

  /**
   * @type {ol.Feature}
   */
  this.feature;

};

gmf.GmfNominatimInputController.prototype.$onInit = function() {
  $('.typeahead', $(this.element_)).typeahead(null, {
    name: 'nominatim',
    display: 'name',
    source: this.gmfNominatimService.typeaheadSourceDebounced
  });
};

gmf.module.controller('GmfNominatimInputController', gmf.GmfNominatimInputController);
