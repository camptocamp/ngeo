/**
 * @module ngeo map namespace
 */
goog.provide('ngeo.download.module');

goog.require('ngeo');
goog.require('ngeo.download.Csv');
goog.require('ngeo.download.Service');

/**
 * @type {!angular.Module}
 */
ngeo.download.module = angular.module('ngeoDownloadModule', [
  ngeo.module.name, // Change me when all dependencies are in a module.
  ngeo.download.Csv.module.name,
  ngeo.download.Service.module.name
]);
