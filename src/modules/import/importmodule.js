goog.module('ngeo.import.importModule');
goog.module.declareLegacyNamespace();

const fileService = goog.require('ngeo.fileService');
const dnd = goog.require('ngeo.importDndDirective');
const local = goog.require('ngeo.importLocalDirective');
const online = goog.require('ngeo.importOnlineDirective');
const wmsGetCap = goog.require('ngeo.wmsGetCapDirective');
const wmsGetCapItem = goog.require('ngeo.wmsGetCapItemDirective');
const wmtsGetCap = goog.require('ngeo.wmtsGetCapDirective');
const wmtsGetCapItem = goog.require('ngeo.wmtsGetCapItemDirective');


exports.module = angular.module('ngeo.import', [
  fileService.module.name,
  dnd.module.name,
  local.module.name,
  online.module.name,
  wmsGetCap.module.name,
  wmsGetCapItem.module.name,
  wmtsGetCap.module.name,
  wmtsGetCapItem.module.name
]);
