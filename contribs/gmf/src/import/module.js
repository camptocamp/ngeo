/**
 * @module gmf.import.module
 */
import gmfImportImportdatasourceComponent from 'gmf/import/importdatasourceComponent.js';
import gmfImportWmsCapabilityLayertreeComponent from 'gmf/import/wmsCapabilityLayertreeComponent.js';
import gmfImportWmtsCapabilityLayertreeComponent from 'gmf/import/wmtsCapabilityLayertreeComponent.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfImportModule', [
  gmfImportImportdatasourceComponent.name,
  gmfImportWmsCapabilityLayertreeComponent.name,
  gmfImportWmtsCapabilityLayertreeComponent.name,
]);


export default exports;
