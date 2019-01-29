import angular from 'angular';
import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources.js';
import ngeoDatasourceHelper from 'ngeo/datasource/Helper.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('ngeoDatasourceModule', [
  ngeoDatasourceDataSources.name,
  ngeoDatasourceHelper.name,
]);
