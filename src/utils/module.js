goog.module('ngeo.utils.module');
goog.module.declareLegacyNamespace();

const fileService = goog.require('ngeo.utils.File');

exports.module = angular.module('ngeo.utils', [
  fileService.module.name
]);
