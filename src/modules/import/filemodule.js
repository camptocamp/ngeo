goog.provide('ngeo.fileService');

goog.require('ngeo.File');

(function() {

  var module = angular.module('ngeo.fileService', []);
  ngeo.fileService.module = module;

  /**
   * Read/load a file then returns the content.
   */
  module.service('ngeoFile', ngeo.File);
})();
