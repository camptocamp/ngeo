/**
 * This file provides the "app" namespace, which is the
 * application's main namespace. And it defines the application's Angular
 * module.
 */
goog.provide('app');

goog.require('gmf.authentication.module');
goog.require('gmf.contextualdata.module');
goog.require('gmf.controllers.defaultConfig');
goog.require('gmf.datasource.module');
goog.require('gmf.drawing.module');
goog.require('gmf.editing.module');
goog.require('gmf.filters.module');
goog.require('gmf.layertree.module');
goog.require('gmf.map.module');
goog.require('gmf.permalink.shareComponent');
goog.require('gmf.print.component');
goog.require('gmf.profile.module');
goog.require('gmf.query.extraModule');
goog.require('gmf.raster.component');
goog.require('gmf.search.module');
goog.require('ngeo.draw.module');
goog.require('ngeo.misc.extraModule');
goog.require('ngeo.query.module');
goog.require('ngeo.utils');

/**
 * @type {!angular.Module}
 */
app.module = angular.module('app', [
  gmf.authentication.module.name,
  gmf.contextualdata.module.name,
  gmf.controllers.defaultConfig.name,
  gmf.datasource.module.name,
  gmf.drawing.module.name,
  gmf.editing.module.name,
  gmf.filters.module.name,
  gmf.layertree.module.name,
  gmf.map.module.name,
  gmf.permalink.shareComponent.name,
  gmf.print.component.name,
  gmf.profile.module.name,
  gmf.query.extraModule.name,
  gmf.raster.component.name,
  gmf.search.module.name,
  ngeo.draw.module.name,
  ngeo.misc.extraModule.name,
  ngeo.query.module.name,
]);

app.module.config(['$compileProvider', function($compileProvider) {
  if (!('debug' in ngeo.utils.decodeQueryString(window.location.search))) {
    // Disable the debug info
    $compileProvider.debugInfoEnabled(false);
  }
}]);
