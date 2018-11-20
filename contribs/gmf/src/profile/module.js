/**
 * @module gmf.profile.module
 */
import gmfProfileComponent from 'gmf/profile/component.js';
import gmfProfileDrawLineComponent from 'gmf/profile/drawLineComponent.js';

import './profile.scss';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('gmfProfileModule', [
  gmfProfileComponent.name,
  gmfProfileDrawLineComponent.name,
]);


export default exports;
