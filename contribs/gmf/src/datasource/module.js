goog.provide('gmf.datasource.module');

goog.require('gmf.datasource.DataSourceBeingFiltered');
goog.require('gmf.datasource.ExternalDataSourcesManager');
goog.require('gmf.datasource.Helper');
goog.require('gmf.datasource.Manager');


/**
 * @type {!angular.Module}
 */
gmf.datasource.module = angular.module('gmfDatasourceModule', [
  gmf.datasource.DataSourceBeingFiltered.module.name,
  gmf.datasource.ExternalDataSourcesManager.module.name,
  gmf.datasource.Helper.module.name,
  gmf.datasource.Manager.module.name,
]);
