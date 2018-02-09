goog.provide('ngeo.download.module');

goog.require('ngeo');
goog.require('ngeo.download.Csv');
goog.require('ngeo.download.service');

/**
 * @type {!angular.Module}
 */
ngeo.download.module = angular.module('ngeoDownloadModule', [
  ngeo.download.Csv.module.name,
  ngeo.download.service.name,
]);
