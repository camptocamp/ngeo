/**
 * @module gmf.contextualdata.module
 */
import gmfContextualdataComponent from 'gmf/contextualdata/component.js';

import './contextualdata.scss';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfContextualdataModule', [
  gmfContextualdataComponent.name,
]);


export default exports;
