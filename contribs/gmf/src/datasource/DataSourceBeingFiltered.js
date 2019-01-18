/**
 */

import angular from 'angular';

/**
 * @type {!angular.IModule}
 */
const module = angular.module('gmfDataSourceBeingFiltered', []);
// type gmfx.datasource.DataSourceBeingFiltered
exports.module.value('gmfDataSourceBeingFiltered', {
  dataSource: null
});


export default exports;
