import angular from 'angular';
import gmfDatasourceDataSourceBeingFiltered from 'gmf/datasource/DataSourceBeingFiltered.js';
import gmfDatasourceExternalDataSourcesManager from 'gmf/datasource/ExternalDataSourcesManager.js';
import gmfDatasourceHelper from 'gmf/datasource/Helper.js';
import gmfDatasourceManager from 'gmf/datasource/Manager.js';
import gmfDatasourceWFSAliases from 'gmf/datasource/WFSAliases.js';

/**
 * @type {angular.IModule}
 */
export default angular.module('gmfDatasourceModule', [
  gmfDatasourceDataSourceBeingFiltered.name,
  gmfDatasourceExternalDataSourcesManager.name,
  gmfDatasourceHelper.name,
  gmfDatasourceManager.name,
  gmfDatasourceWFSAliases.name,
]);
