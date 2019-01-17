/**
 * @module import("gmf/contextualdata/module.js").default
 */
import angular from 'angular';
import gmfContextualdataComponent from 'gmf/contextualdata/component.js';

import './contextualdata.scss';

/**
 * @type {!angular.IModule}
 */
export default angular.module('gmfContextualdataModule', [
  gmfContextualdataComponent.name,
]);
