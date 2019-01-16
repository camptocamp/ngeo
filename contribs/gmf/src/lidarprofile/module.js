/**
 * @module gmf.lidarprofile.module
 */
import angular from 'angular';
import gmfLidarprofileComponent from 'gmf/lidarprofile/component.js';
import gmfLidarprofilePanelComponent from 'gmf/lidarprofile/panelComponent.js';
import gmfLidarprofileConfig from 'gmf/lidarprofile/Config.js';
import gmfLidarprofileManager from 'gmf/lidarprofile/Manager.js';

import './lidarprofile.scss';

/**
 * @type {!angular.IModule}
 */
export default angular.module('gmfLidarprofileModule', [
  gmfLidarprofileComponent.name,
  gmfLidarprofilePanelComponent.name,
  gmfLidarprofileConfig.module.name,
  gmfLidarprofileManager.module.name,
]);
