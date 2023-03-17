/**
 */
import angular from 'angular';
import gmfFloorFloorSelectorComponent from 'gmf/floor/floorselectorComponent.js';

import './floor.scss';

/**
 * @type {!angular.IModule}
 */
export default angular.module('gmfFloorModule', [gmfFloorFloorSelectorComponent.name]);
