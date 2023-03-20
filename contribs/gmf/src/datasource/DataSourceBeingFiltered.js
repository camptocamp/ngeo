import angular from 'angular';

/**
 * @typedef {Object} DataSourceBeingFiltered
 * @property {gmf.datasource.OGC|null} dataSource
 */

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfDataSourceBeingFiltered', []);
// type DataSourceBeingFiltered
module.value('gmfDataSourceBeingFiltered', {
  dataSource: null,
});

export default module;
