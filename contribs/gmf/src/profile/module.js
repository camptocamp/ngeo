/**
 * @module gmf.profile.module
 */
import gmfProfileComponent from 'gmf/profile/component.js';
import gmfProfileDrawLineComponent from 'gmf/profile/drawLineComponent.js';

/**
 * @type {!angular.Module}
 */
const exports = angular.module('gmfProifleModule', [
  gmfProfileComponent.name,
  gmfProfileDrawLineComponent.name,
]);


export default exports;
