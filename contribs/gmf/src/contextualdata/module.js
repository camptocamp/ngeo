/**
 * @module gmf.contextualdata.module
 */
import gmfContextualdataComponent from 'gmf/contextualdata/component.js';

import './contextualdata.scss';

/**
 * @type {!angular.IModule}
 */
export default angular.module('gmfContextualdataModule', [
  gmfContextualdataComponent.name,
]);
