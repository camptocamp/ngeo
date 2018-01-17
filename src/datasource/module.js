goog.provide('ngeo.datasource.module');

goog.require('ngeo.datasource.DataSources');
goog.require('ngeo.datasource.Helper');


/**
 * @type {!angular.Module}
 */
ngeo.datasource.module = angular.module('ngeoDatasourceModule', [
  ngeo.datasource.DataSources.module.name,
  ngeo.datasource.Helper.module.name,
]);
