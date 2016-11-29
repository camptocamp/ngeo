goog.provide('ngeo.import');

goog.require('ngeo.fileService');
goog.require('ngeo.importDndDirective');
goog.require('ngeo.importLocalDirective');
goog.require('ngeo.importOnlineDirective');
goog.require('ngeo.wmsGetCapDirective');
goog.require('ngeo.wmsGetCapItemDirective');

(function() {

  var module = angular.module('ngeo.import', [
    ngeo.fileService.module.name,
    ngeo.importDndDirective.module.name,
    ngeo.importLocalDirective.module.name,
    ngeo.importOnlineDirective.module.name,
    ngeo.wmsGetCapDirective.module.name,
    ngeo.wmsGetCapItemDirective.module.name
  ]);
  ngeo.import.module = module;
})();
