// The MIT License (MIT)
//
// Copyright (c) 2019-2021 Camptocamp SA
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

import ngeoQueryModeSelector from 'ngeo/query/ModeSelector';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoQueryPanel', [ngeoQueryModeSelector.name]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    $templateCache.put(
      'ngeo/src/query/panelComponent',
      // @ts-ignore: webpack
      require('./panelComponent.html')
    );
  }
);

myModule.value(
  'ngeoQueryPanelTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs.ngeoQueryPanelTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'ngeo/src/query/panelComponent';
  }
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoQueryPanelTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function ngeoQueryPanelTemplateUrl($attrs, ngeoQueryPanelTemplateUrl) {
  return ngeoQueryPanelTemplateUrl($attrs);
}

/**
 * @hidden
 */
export class QueryPanelController {
  /**
   * @param {import('ngeo/query/ModeSelector').QueryModeSelector} ngeoQueryModeSelector
   *     The ngeo query modeSelector service.
   * @ngInject
   * @ngdoc controller
   * @ngname NgeoQueryController
   */
  constructor(ngeoQueryModeSelector) {
    /**
     * @type {import('ngeo/query/ModeSelector').QueryModeSelector}
     */
    this.ngeoQueryModeSelector = ngeoQueryModeSelector;
  }
}

myModule.component('ngeoQueryPanel', {
  controller: QueryPanelController,
  templateUrl: ngeoQueryPanelTemplateUrl,
});

export default myModule;
