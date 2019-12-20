/**
 */
import angular from 'angular';
import gmfSpinnerDirective from 'gmf/spinner/directive.js';

import './loader.scss';

const module = angular.module('gmfSpinnerModule', [
  gmfSpinnerDirective.name,
]);

/**
 * @type {angular.IModule}
 */
export default module;
