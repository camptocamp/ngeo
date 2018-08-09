/**
 * @module gmf.datasource.DataSourceBeingFiltered
 */
const exports = {};


/**
 * @type {!angular.Module}
 */
exports.module = angular.module('gmfDataSourceBeingFiltered', []);
// type gmfx.datasource.DataSourceBeingFiltered
exports.module.value('gmfDataSourceBeingFiltered', {
  dataSource: null
});


export default exports;
