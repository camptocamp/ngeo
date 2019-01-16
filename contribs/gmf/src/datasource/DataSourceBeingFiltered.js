/**
 * @module gmf.datasource.DataSourceBeingFiltered
 */
const exports = {};

import angular from 'angular';

/**
 * @type {!angular.IModule}
 */
exports.module = angular.module('gmfDataSourceBeingFiltered', []);
// type gmfx.datasource.DataSourceBeingFiltered
exports.module.value('gmfDataSourceBeingFiltered', {
  dataSource: null
});


export default exports;
