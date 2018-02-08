/**
 * This file provides the "app" namespace, which is the
 * application's main namespace. And it defines the application's Angular
 * module.
 */
goog.provide('app');

goog.require('ngeo.utils');

/**
 * @type {!angular.Module}
 */
app.module = angular.module('app', []);

app.module.config(['$compileProvider', function($compileProvider) {
  if (!('debug' in ngeo.utils.decodeQueryString(window.location.search))) {
    // Disable the debug info
    $compileProvider.debugInfoEnabled(false);
  }
}]);
