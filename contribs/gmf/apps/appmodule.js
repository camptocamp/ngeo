/**
 * This file provides the "app" namespace, which is the
 * application's main namespace. And it defines the application's Angular
 * module.
 */
goog.provide('app');

goog.require('gmf');

goog.require('ngeo.utils');
goog.require('ngeo.misc.extraModule');
goog.require('gmf.layertree.module');
goog.require('gmf.search.module');
goog.require('gmf.authentication.module');


/**
 * @type {!angular.Module}
 */
app.module = angular.module('app', [
  ngeo.misc.extraModule.name,
  gmf.layertree.module.name,
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
