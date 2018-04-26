/**
 * @module app
 */
const exports = {};

/**
 * This file provides the "app" namespace, which is the
 * application's main namespace. And it defines the application's Angular
 * module.
 */

import ngeoUtils from 'ngeo/utils.js';

/**
 * @type {!angular.Module}
 */
exports.module = angular.module('app', []);

exports.module.config(['$compileProvider', function($compileProvider) {
  if (!('debug' in ngeoUtils.decodeQueryString(window.location.search))) {
    // Disable the debug info
    $compileProvider.debugInfoEnabled(false);
  }
}]);


export default exports;
