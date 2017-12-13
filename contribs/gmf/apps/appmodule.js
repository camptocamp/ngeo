/**
 * This file provides the "app" namespace, which is the
 * application's main namespace. And it defines the application's Angular
 * module.
 */
goog.provide('app');

goog.require('gmf');

goog.require('ngeo.utils.module');
goog.require('gmf.search.module');
goog.require('gmf.authentication.module');


/**
 * @type {!angular.Module}
 */
app.module = angular.module('app', [
  ngeo.utils.module.module.name,
  gmf.search.module.name,
  gmf.authentication.module.name,
  gmf.module.name
]);

app.module.config(['$compileProvider', function($compileProvider) {
  if (!('debug' in ngeo.utils.decodeQueryString(window.location.search))) {
    // Disable the debug info
    $compileProvider.debugInfoEnabled(false);
  }
}]);
