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

describe('ngeo.misc.filereaderComponent', () => {
  /** @type {JQuery<HTMLElement>} */
  let element;
  /** @type {angular.IScope} */
  let rootScope;

  beforeEach(() => {
    element = angular.element('<input type="file" ngeo-filereader="fileContent" />');

    angular.mock.module(
      /**
       * @param {angular.IModule} $provide
       */
      ($provide) => {
        const FileReader = function () {};
        FileReader.prototype.readAsText =
          /**
           * @param {string} file
           */
          function (file) {
            const progressEvent = {
              target: {
                result: '<kml></kml>',
              },
            };
            // @ts-ignore
            this.onload(progressEvent);
          };
        $provide.value('$window', {FileReader: FileReader, angular: angular});
      }
    );

    angular.mock.inject(($rootScope, $compile) => {
      $compile(element)($rootScope);
      rootScope = $rootScope;
    });
  });

  it('sets the file content onto the scope', () => {
    const input = element[0];
    const customEvent = document.createEvent('CustomEvent');
    customEvent.initCustomEvent('change', true, true, {});
    input.dispatchEvent(customEvent);
    // @ts-ignore: scope ...
    expect(rootScope.fileContent).toBe('<kml></kml>');
  });
});
