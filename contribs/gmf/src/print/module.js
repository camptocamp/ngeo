/**
 * @module gmf.print.module
 */
import gmfPrintComponent from 'gmf/print/component.js';

import './print.scss';

/**
 * @type {!angular.IModule}
 */
const exports = angular.module('gmfPrintModule', [
  gmfPrintComponent.name,
]);


export default exports;
