/**
 * @module gmf.import.module
 */
import gmfImportImportdatasourceComponent from 'gmf/import/importdatasourceComponent.js';
import gmfImportWmsCapabilityLayertreeComponent from 'gmf/import/wmsCapabilityLayertreeComponent.js';
import gmfImportWmtsCapabilityLayertreeComponent from 'gmf/import/wmtsCapabilityLayertreeComponent.js';

import './import.scss';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('gmfImportModule', [
  gmfImportImportdatasourceComponent.name,
  gmfImportWmsCapabilityLayertreeComponent.name,
  gmfImportWmtsCapabilityLayertreeComponent.name,
]);


export default exports;
