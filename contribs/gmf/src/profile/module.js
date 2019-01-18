/**
 */
import angular from 'angular';
import gmfProfileComponent from 'gmf/profile/component.js';
import gmfProfileDrawLineComponent from 'gmf/profile/drawLineComponent.js';

import './profile.scss';

/**
 * @type {!angular.IModule}
 */
export default angular.module('gmfProfileModule', [
  gmfProfileComponent.name,
  gmfProfileDrawLineComponent.name,
]);
