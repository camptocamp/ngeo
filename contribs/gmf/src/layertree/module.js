/**
 * @module gmf.layertree.module
 */
import angular from 'angular';
import gmfLayertreeComponent from 'gmf/layertree/component.js';
import gmfLayertreeDatasourceGroupTreeComponent from 'gmf/layertree/datasourceGroupTreeComponent.js';
import gmfLayertreeSyncLayertreeMap from 'gmf/layertree/SyncLayertreeMap.js';
import gmfLayertreeTimeSliderComponent from 'gmf/layertree/timeSliderComponent.js';
import gmfLayertreeTreeManager from 'gmf/layertree/TreeManager.js';

import './common.scss';

/**
 * @type {!angular.IModule}
 */
export default angular.module('gmfLayertreeModule', [
  gmfLayertreeComponent.name,
  gmfLayertreeDatasourceGroupTreeComponent.name,
  gmfLayertreeSyncLayertreeMap.module.name,
  gmfLayertreeTimeSliderComponent.name,
  gmfLayertreeTreeManager.module.name,
]);
