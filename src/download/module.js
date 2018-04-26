/**
 * @module ngeo.download.module
 */
import ngeoDownloadCsv from 'ngeo/download/Csv.js';
import ngeoDownloadService from 'ngeo/download/service.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoDownloadModule', [
  ngeoDownloadCsv.module.name,
  ngeoDownloadService.name,
]);


export default exports;
