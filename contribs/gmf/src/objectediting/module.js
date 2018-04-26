/**
 * @module gmf.objectediting.module
 */
import gmfObjecteditingComponent from 'gmf/objectediting/component.js';
import gmfObjecteditingGetWMSFeatureComponent from 'gmf/objectediting/getWMSFeatureComponent.js';
import gmfObjecteditingManager from 'gmf/objectediting/Manager.js';
import gmfObjecteditingQuery from 'gmf/objectediting/Query.js';
import gmfObjecteditingToolsComponent from 'gmf/objectediting/toolsComponent.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfObjecteditingModule', [
  gmfObjecteditingComponent.name,
  gmfObjecteditingGetWMSFeatureComponent.name,
  gmfObjecteditingManager.module.name,
  gmfObjecteditingQuery.module.name,
  gmfObjecteditingToolsComponent.name,
]);


export default exports;
