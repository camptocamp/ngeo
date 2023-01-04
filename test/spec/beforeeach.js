/* eslint @openlayers/valid-tsdoc: 0 */
/* eslint valid-jsdoc: 0 */
import angular from 'angular';
import ngeoMainmodule from 'ngeo/mainmodule.js';

const module = angular.module('app', []);

beforeEach(() => {
  module.requires.push(ngeoMainmodule.name);
});

beforeEach(angular.mock.module('app'));

beforeEach(() => {
  jasmine.addMatchers({
    /**
     * A matcher similar to `expect(...).toBeCloseTo(...)` to check that
     * numbers in two arrays are almost equal.
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

export default module;
