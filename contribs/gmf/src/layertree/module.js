/**
 * @module gmf.layertree.module
 */
import gmfLayertreeComponent from 'gmf/layertree/component.js';
import gmfLayertreeDatasourceGroupTreeComponent from 'gmf/layertree/datasourceGroupTreeComponent.js';
import gmfLayertreeSyncLayertreeMap from 'gmf/layertree/SyncLayertreeMap.js';
import gmfLayertreeTimeSliderComponent from 'gmf/layertree/timeSliderComponent.js';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfLayertreeModule', [
  gmfLayertreeComponent.name,
  gmfLayertreeDatasourceGroupTreeComponent.name,
  gmfLayertreeSyncLayertreeMap.module.name,
  gmfLayertreeTimeSliderComponent.name,
  gmfLayertreeTreeManager.module.name,
]);


export default exports;
