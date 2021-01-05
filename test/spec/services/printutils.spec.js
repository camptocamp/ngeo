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
import {DOTS_PER_INCH, INCHES_PER_METER} from 'ngeo/print/Utils.js';

describe('ngeo.print.Utils', () => {
  /** @type {import('ngeo/print/Utils.js').PrintUtils} */
  let ngeoPrintUtilsService;

  beforeEach(() => {
    angular.mock.inject((ngeoPrintUtils) => {
      ngeoPrintUtilsService = ngeoPrintUtils;
    });
  });

  describe('#getOptimalResolution', () => {
    it('returns the optimal resolution', () => {
      const mapSize = [2, 1]; // px
      const printMapSize = [
        (640 * DOTS_PER_INCH) / INCHES_PER_METER / 2,
        (320 * DOTS_PER_INCH) / INCHES_PER_METER / 2,
      ]; // dots
      const printScale = 10; // scale denominator
      const optimalResolution = ngeoPrintUtilsService.getOptimalResolution(mapSize, printMapSize, printScale);
      expect(optimalResolution).toBe(1.0322601290363873);
    });
  });
});
