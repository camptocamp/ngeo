/**
 */
import angular from 'angular';
import gmfImportImportdatasourceComponent from 'gmf/import/importdatasourceComponent.js';
import gmfImportWmsCapabilityLayertreeComponent from 'gmf/import/wmsCapabilityLayertreeComponent.js';
import gmfImportWmtsCapabilityLayertreeComponent from 'gmf/import/wmtsCapabilityLayertreeComponent.js';

import './import.scss';

/**
 * @type {angular.IModule}
 */
export default angular.module('gmfImportModule', [
  gmfImportImportdatasourceComponent.name,
  gmfImportWmsCapabilityLayertreeComponent.name,
  gmfImportWmtsCapabilityLayertreeComponent.name,
]);
