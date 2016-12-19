/*eslint valid-jsdoc: 0 */
beforeEach(function() {
  module('ngeo');

  jasmine.addMatchers({
    /**
     * A matcher similar to `expect(...).toBeCloseTo(...)` to check that
     * numbers in two arrays are almost equal.
     */
    arrayToBeCloseTo: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected, precision) {
          if (precision !== 0) {
            precision = precision || 2;
          }

          if (expected === undefined) {
            expected = [];
          }

          var result = {pass: true};

          var len1 = actual.length;
          if (len1 !== expected.length) {
            result.pass = false;
          } else {
            for (var i = 0; i < len1; i++) {
              if (!(Math.abs(actual[i] - expected[i]) < (Math.pow(10, -precision) / 2))) {
                result.pass = false;
                break;
              }
            }
          }

          result.message =  'expected ' + actual + ' to sort of equal ' + expected;

          return result;
        }
      };
    }
  });
});
