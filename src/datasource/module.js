/**
 * @module import("ngeo/datasource/module.js").default
 */
import angular from 'angular';
import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources.js';
import ngeoDatasourceHelper from 'ngeo/datasource/Helper.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('ngeoDatasourceModule', [
  ngeoDatasourceDataSources.module.name,
  ngeoDatasourceHelper.module.name,
]);
