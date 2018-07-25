/**
 * @module gmf.lidarprofile.module
 */
import gmfLidarprofileComponent from 'gmf/lidarprofile/component.js';
import gmfLidarprofilePanelComponent from 'gmf/lidarprofile/panelComponent.js';
import gmfLidarprofileConfig from 'gmf/lidarprofile/Config.js';
import gmfLidarprofileManager from 'gmf/lidarprofile/Manager.js';

import './lidarprofile.scss';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfLidarprofileModule', [
  gmfLidarprofileComponent.name,
  gmfLidarprofilePanelComponent.name,
  gmfLidarprofileConfig.module.name,
  gmfLidarprofileManager.module.name,
]);


export default exports;
