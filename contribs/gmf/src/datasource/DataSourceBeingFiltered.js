import angular from 'angular';


/**
 * @typedef {{
 *  dataSource : (gmf.datasource.OGC|null)
 * }} DataSourceBeingFiltered
 */


/**
 * @type {!angular.IModule}
 */
const module = angular.module('gmfDataSourceBeingFiltered', []);
// type DataSourceBeingFiltered
module.value('gmfDataSourceBeingFiltered', {
  dataSource: null
});


export default module;
