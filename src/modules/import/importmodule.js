goog.module('ngeo.import.importModule');
goog.module.declareLegacyNamespace();

var fileService = goog.require('ngeo.fileService');
var dnd = goog.require('ngeo.importDndDirective');
var local = goog.require('ngeo.importLocalDirective');
var online = goog.require('ngeo.importOnlineDirective');
var wmsGetCap = goog.require('ngeo.wmsGetCapDirective');
var wmsGetCapItem = goog.require('ngeo.wmsGetCapItemDirective');


exports.module = angular.module('ngeo.import', [
  fileService.module.name,
  dnd.module.name,
  local.module.name,
  online.module.name,
  wmsGetCap.module.name,
  wmsGetCapItem.module.name
]);
