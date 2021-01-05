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

/**
 * @ngInject
 * @param {angular.IHttpService} $http Angular HTTP service.
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngdoc directive
 * @ngname gmfLoaderSpinner
 */
const loaderSpinner = function ($http) {
  return {
    restrict: 'A',
    scope: true,
    link:
      /**
       * @param {angular.IScope} scope Scope.
       * @param {JQuery} el Element.
       * @param {angular.IAttributes} attrs Attributes.
       */
      (scope, el, attrs) => {
        scope.$watch(
          () => $http.pendingRequests.length,
          () => {
            if ($http.pendingRequests.length > 0) {
              el[0].style.display = 'block';
            } else {
              el[0].style.display = 'none';
            }
          }
        );
      },
  };
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfLoaderSpinner', []);

myModule.directive('gmfLoaderSpinner', loaderSpinner);

export default myModule;
