// The MIT License (MIT)
//
// Copyright (c) 2021 Camptocamp SA
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

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfHeader', []);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/header/component', require('./component.html'));
  }
);

myModule.value(
  'gmfHeaderTemplateUrl',
  /**
   * @param {JQuery} $element Element.
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} Template URL.
   */
  ($element, $attrs) => {
    const templateUrl = $attrs.gmfHeaderTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'gmf/header/component';
  }
);

/**
 * @param {JQuery} $element Element.
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(JQuery, angular.IAttributes): string} gmfHeaderTemplateUrl
 *    Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function gmfHeaderTemplateUrl($element, $attrs, gmfHeaderTemplateUrl) {
  return gmfHeaderTemplateUrl($element, $attrs);
}

/**
 * Provide an "header" component that only provide an html template. Do that instead of use
 * ng-include because otherwise it breaks the permalink (maybe related to the bug described in the
 * StatemanagerLocation in src/statemanager/Location.js)
 *
 * @ngdoc component
 * @ngname gmfHeader
 */
const headerComponent = {
  templateUrl: gmfHeaderTemplateUrl,
};

myModule.component('gmfHeader', headerComponent);

export default myModule;
