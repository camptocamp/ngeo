/**
 * @module gmf.datasource.module
 */
import gmfDatasourceDataSourceBeingFiltered from 'gmf/datasource/DataSourceBeingFiltered.js';
import gmfDatasourceExternalDataSourcesManager from 'gmf/datasource/ExternalDataSourcesManager.js';
import gmfDatasourceHelper from 'gmf/datasource/Helper.js';
import gmfDatasourceManager from 'gmf/datasource/Manager.js';
import gmfDatasourceWFSAliases from 'gmf/datasource/WFSAliases.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfDatasourceModule', [
  gmfDatasourceDataSourceBeingFiltered.module.name,
  gmfDatasourceExternalDataSourcesManager.module.name,
  gmfDatasourceHelper.module.name,
  gmfDatasourceManager.module.name,
  gmfDatasourceWFSAliases.module.name,
]);


export default exports;
