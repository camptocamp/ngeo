goog.provide('gmf.datasource.DataSourceBeingFiltered');

goog.require('gmf');


/**
 * @type {!angular.Module}
 */
gmf.datasource.DataSourceBeingFiltered.module = angular.module('gmfDataSourceBeingFiltered', []);
// type gmfx.datasource.DataSourceBeingFiltered
gmf.datasource.DataSourceBeingFiltered.module.value('gmfDataSourceBeingFiltered', {
  dataSource: null
});
gmf.module.requires.push(gmf.datasource.DataSourceBeingFiltered.module.name);
