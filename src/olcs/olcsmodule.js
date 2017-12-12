/**
 * @module ngeo olcs namespace
 */
goog.module('ngeo.olcs.olcsModule');
goog.module.declareLegacyNamespace();

goog.require('ngeo.Debounce');
goog.require('ngeo.Location');
goog.require('ngeo.StateManager');

const Service = goog.require('ngeo.olcs.Service');
const control = goog.require('ngeo.olcs.controls3d');


/**
 * @type {!angular.Module}
 */
const m = angular.module('ngeoOlcsModule', [
  control.name,
  Service.module.name
]);

exports = m;
