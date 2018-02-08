/**
 * This file provides the "app" namespace, which is the
 * application's main namespace. And it defines the application's Angular
 * module.
 */
goog.provide('app');

goog.require('gmf.controllers.defaultConfig');
//goog.require('ngeo.draw.module');
//goog.require('ngeo.query.module');
goog.require('ngeo.utils');

/**
 * @type {!angular.Module}
 */
app.module = angular.module('app', [
  gmf.controllers.defaultConfig.name,
  //ngeo.draw.module.name,
  //ngeo.query.module.name,
]);

app.module.config(['$compileProvider', function($compileProvider) {
  if (!('debug' in ngeo.utils.decodeQueryString(window.location.search))) {
    // Disable the debug info
    $compileProvider.debugInfoEnabled(false);
  }
}]);
