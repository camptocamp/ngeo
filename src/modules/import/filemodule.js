goog.module('ngeo.fileService');
goog.module.declareLegacyNamespace();

goog.require('ngeo.File');
goog.require('ngeo');

exports.module = angular.module('ngeo.fileService', []);

/**
 * Read/load a file then returns the content.
 */
exports.module.service('ngeoFile', ngeo.File);
ngeo.module.requires.push(exports.module.name);
