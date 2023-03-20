/**
 */
import angular from 'angular';
import ngeoDownloadCsv from 'ngeo/download/Csv.js';
import ngeoDownloadService from 'ngeo/download/service.js';

/**
 * @type {!angular.IModule}
 */
export default angular.module('ngeoDownloadModule', [ngeoDownloadCsv.name, ngeoDownloadService.name]);
