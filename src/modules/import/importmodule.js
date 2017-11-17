goog.module('ngeo.import.importModule');
goog.module.declareLegacyNamespace();

const fileService = goog.require('ngeo.fileService');


exports.module = angular.module('ngeo.import', [
  fileService.module.name
]);
