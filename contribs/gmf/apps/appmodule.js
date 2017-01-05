/**
 * @module app
 */
/**
 * This file provides the "app" namespace, which is the
 * application's main namespace. And it defines the application's Angular
 * module.
 */
goog.provide('app');

goog.require('gmf');
goog.require('goog.Uri');

goog.require('ngeo.import.importModule');


/**
 * @type {!angular.Module}
 */
app.module = angular.module('app', [
  ngeo.import.importModule.module.name,
  gmf.module.name
]);

app.module.config(['$compileProvider', function($compileProvider) {
  const uri = goog.Uri.parse(location);
  if (!uri.getQueryData().containsKey('debug')) {
    // Disable the debug info
    $compileProvider.debugInfoEnabled(false);
  }
}]);
