/**
 * @module ngeo.polyfill
 */
const exports = {};

exports.fill = function() {

  // Add String.prototype.startsWith function
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    };
  }

  // Add Number.isInteger function
  Number.isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' &&
      isFinite(value) &&
      Math.floor(value) === value;
  };

  // Add Object.prototype.assign function
  if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, 'assign', {
      value: function assign(target, varArgs) { // .length of function is 2
        'use strict';
        if (target === null) { // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }

        const to = Object(target);

        for (let index = 1; index < arguments.length; index++) {
          const nextSource = arguments[index];

          if (nextSource !== null) { // Skip over if undefined or null
            for (const nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }

};

export default exports;
