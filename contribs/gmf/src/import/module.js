goog.provide('gmf.import.module');

goog.require('gmf.import.importdatasourceComponent');
goog.require('gmf.import.wmsCapabilityLayertreeComponent');
goog.require('gmf.import.wmtsCapabilityLayertreeComponent');


/**
 * @type {!angular.Module}
 */
gmf.import.module = angular.module('gmfImportModule', [
  gmf.import.importdatasourceComponent.name,
  gmf.import.wmsCapabilityLayertreeComponent.name,
  gmf.import.wmtsCapabilityLayertreeComponent.name,
]);
