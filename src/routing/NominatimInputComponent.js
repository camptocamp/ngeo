// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import ngeoSearchSearchDirective from 'ngeo/search/searchDirective';
import ngeoRoutingNominatimService from 'ngeo/routing/NominatimService';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoRoutingNominatimInputComponent', [
  ngeoSearchSearchDirective.name,
  ngeoRoutingNominatimService.name,
]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('ngeo/routing/nominatiminput', require('./nominatiminput.html'));
  }
);

myModule.value(
  'ngeoRoutingNominatimInputComponentTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($attrs) => {
    const templateUrl = $attrs.ngeoRoutingNominatimInputComponentTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'ngeo/routing/nominatiminput';
  }
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoRoutingNominatimInputComponentTemplateUrl
 *    Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function ngeoRoutingNominatimInputComponentTemplateUrl(
  $attrs,
  ngeoRoutingNominatimInputComponentTemplateUrl
) {
  return ngeoRoutingNominatimInputComponentTemplateUrl($attrs);
}

/**
 * @param {JQuery} $element Element.
 * @param {angular.IScope} $scope Scope.
 * @param {import('ngeo/routing/NominatimService').NominatimService} ngeoNominatimService service for
 *    Nominatim
 * @class
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname NgeoNominatimInputController
 */
export function Controller($element, $scope, ngeoNominatimService) {
  /**
   * @type {JQuery}
   */
  this.element_ = $element;

  /**
   * @type {angular.IScope}
   */
  this.$scope_ = $scope;

  /**
   * @type {import('ngeo/routing/NominatimService').NominatimService}
   */
  this.ngeoNominatimService = ngeoNominatimService;

  /**
   * @type {?function(Object): void}
   */
  this.onSelect = null;

  /**
   * @type {?string}
   */
  this.inputValue = null;

  /**
   * @type {Twitter.Typeahead.Options}
   */
  this.options = /** @type {Twitter.Typeahead.Options} */ ({});

  /**
   * @type {Twitter.Typeahead.Dataset<import('./NominatimService').NominatimSearchResult>[]}
   */
  this.datasets = [
    {
      name: 'nominatim',
      display: 'name',
      source: this.ngeoNominatimService.typeaheadSourceDebounced,
    },
  ];

  /**
   * @type {import('ngeo/search/searchDirective').SearchDirectiveListeners<import('ngeo/routing/NominatimService').NominatimSearchResult>}
   */
  this.listeners = {
    select: this.select_.bind(this),
  };

  /**
   * @type {string}
   */
  this.placeholder = '';
}

/**
 * @param {JQueryEventObject} event Event.
 * @param {import('ngeo/routing/NominatimService').NominatimSearchResult} suggestion Suggestion.
 * @param {Twitter.Typeahead.Dataset<import('ngeo/routing/NominatimService').NominatimSearchResult>} dataset Dataset.
 * @hidden
 */
Controller.prototype.select_ = function (event, suggestion, dataset) {
  if (this.onSelect) {
    this.onSelect(suggestion);
  }
};

/**
 * Input form field which provides Nominatim typeahead lookup using
 * {@link import('ngeo/routing/NominatimService').default}.
 *
 * Example:
 *
 *     <ngeo-nominatim-input
 *         ngeo-nominatim-input-value="ctrl.label"
 *         ngeo-nominatim-input-placeholder="type to search"
 *         ngeo-nominatim-input-on-select="ctrl.onSelect">
 *
 * Is used in in the partial of {@link import('ngeo/routingFeatureComponent').default}.
 *
 * See the [../examples/routing.html](../examples/routing.html) example to see it in action.
 *
 * @htmlAttribute {function(import('ngeo/routing/NominatimService').NominatimSearchResult)}
 *    ngeo-nominatim-input-on-select Event fired when user selects a new suggestion.
 * @htmlAttribute {string} ngeo-nominatim-input-value
 *  Value of input field, will be set to the label of the search result.
 * @htmlAttribute {string} ngeo-nominatim-input-placeholder
 *  Placeholder text, when field is empty.
 * @ngdoc directive
 * @ngname ngeoNominatimInput
 */
const routingNominatimInputComponent = {
  controller: Controller,
  bindings: {
    'onSelect': '=?ngeoNominatimInputOnSelect',
    'inputValue': '=?ngeoNominatimInputValue',
    'placeholder': '@?ngeoNominatimInputPlaceholder',
  },
  templateUrl: ngeoRoutingNominatimInputComponentTemplateUrl,
};

myModule.component('ngeoNominatimInput', routingNominatimInputComponent);

export default myModule;
