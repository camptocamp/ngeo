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
 * @ngdoc component
 * @ngname gmfNominatimInput
 */
gmf.nominatimInputComponent = {
  controller: 'GmfNominatimInputController as inputCtrl',
  bindings: {
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
   * @type {gmf.NominatimService}
   * @export
   */
  this.gmfNominatimService = gmfNominatimService;
};

gmf.GmfNominatimInputController.prototype.$onInit = function() {
  $('.typeahead', $(this.element_)).typeahead(null, {
    name: 'nominatim',
    display: 'name',
    source: this.gmfNominatimService.typeaheadSourceDebounced
  });
};

gmf.module.controller('GmfNominatimInputController', gmf.GmfNominatimInputController);
