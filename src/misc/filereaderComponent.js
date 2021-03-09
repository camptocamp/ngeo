// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
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
const myModule = angular.module('ngeoFilereader', []);

/**
 * This directive is to used on an input file element. When a file is selected
 * the directive uses the browser `FileReader` API to read the file. The file
 * content is provided to the directive user through the assignable expression.
 * Only works for text files (`readAsText` used for reading the file). And does
 * not work in Internet Explorer 9.
 *
 * Example:
 *
 *      <input type="file" ngeo-filereader="ctrl.fileContent"
 *        ngeo-filereader-supported="ctrl.supported"/>
 *
 * See our live example: [../examples/importfeatures.html](../examples/importfeatures.html)
 *
 * @htmlAttribute {string} ngeo-filereader The content of the file read.
 * @htmlAttribute {boolean} [ngeo]-filereader-supported Whether the FileReader API is supported.
 * @param {angular.IWindowService} $window The Angular $window service.
 * @return {angular.IDirective} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoFilereader
 * @private
 * @hidden
 */
function filereaderComponent($window) {
  return {
    restrict: 'A',
    scope: {
      'fileContent': '=ngeoFilereader',
      'supported': '=?ngeoFilereaderSupported',
    },
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     */
    link: (scope, element) => {
      const supported = 'FileReader' in $window;
      // @ts-ignore: scope ...
      scope.supported = supported;
      if (!supported) {
        return;
      }

      /**
       * @param {JQuery.ChangeEvent<unknown, unknown, unknown, HTMLInputElement>} changeEvent The event
       */
      const ce = (changeEvent) => {
        /** @type {FileReader} */
        const fileReader = new $window.FileReader();
        fileReader.onload =
          /**
           * @param {ProgressEvent} evt Event.
           */
          function (evt) {
            const target = /** @type {FileReader} */ (evt.target);
            scope.$apply(() => {
              // @ts-ignore: scope ...
              scope.fileContent = target.result;
            });
          };
        const files = changeEvent.target.files;
        if (!files) {
          throw new Error('Missing files');
        }
        fileReader.readAsText(files[0]);
      };
      element.on({change: ce});
    },
  };
}

myModule.directive('ngeoFilereader', filereaderComponent);

export default myModule;
