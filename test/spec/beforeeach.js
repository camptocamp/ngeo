// The MIT License (MIT)
//
// Copyright (c) 2014-2022 Camptocamp SA
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

// @ts-nocheck
/* eslint valid-jsdoc: 0 */
import angular from 'angular';
import ngeoMainmodule from 'ngeo/mainmodule';
import i18next from 'i18next';

const myModule = angular.module('app', []);

beforeEach(() => {
  myModule.requires.push(ngeoMainmodule.name);
});

beforeEach(
  angular.mock.module(
    'app',
    /**
     * @param {angular.IModule} $provide
     */
    ($provide) => {
      $provide.value('ngeoScaleSelectorOptions', {
        'values': [500, 1000, 5000, 25000, 50000],
      });
      $provide.value('ngeoTilesPreloadingLimit', 0);
    }
  )
);

beforeEach(() => {
  jasmine.addMatchers({
    /**
     * A matcher similar to `expect(...).toBeCloseTo(...)` to check that
     * numbers in two arrays are almost equal.
     *
     * @param {?} util
     * @param {?} customEqualityTesters
     * @returns {jasmine.CustomMatcherFactory}
     */
    arrayToBeCloseTo(util, customEqualityTesters) {
      return {
        compare(actual, expected, precision) {
          if (precision !== 0) {
            precision = precision || 2;
          }

          if (expected === undefined) {
            expected = [];
          }

          const result = {pass: true};

          const len1 = actual.length;
          if (len1 !== expected.length) {
            result.pass = false;
          } else {
            for (let i = 0; i < len1; i++) {
              if (!(Math.abs(actual[i] - expected[i]) < Math.pow(10, -precision) / 2)) {
                result.pass = false;
                break;
              }
            }
          }

          result.message = `expected ${actual} to sort of equal ${expected}`;

          return result;
        },
      };
    },
  });
});

beforeEach(() => {
  i18next.init({
    debug: true,
    lng: 'en',
  });
});

export default myModule;
