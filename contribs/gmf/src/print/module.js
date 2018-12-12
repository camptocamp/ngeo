/**
 * @module gmf.print.module
 */
import gmfPrintComponent from 'gmf/print/component.js';

import './print.scss';

/**
 * @type {!angular.IModule}
 */
export default angular.module('gmfPrintModule', [
  gmfPrintComponent.name,
]);
