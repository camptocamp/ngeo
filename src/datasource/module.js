/**
 * @module ngeo.datasource.module
 */
import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources.js';
import ngeoDatasourceHelper from 'ngeo/datasource/Helper.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoDatasourceModule', [
  ngeoDatasourceDataSources.module.name,
  ngeoDatasourceHelper.module.name,
]);


export default exports;
