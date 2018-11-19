/**
 * @module app.popover
 */
const exports = {};

import './popover.css';
/** @suppress {extraRequire} */
import ngeoMessagePopoverComponent from 'ngeo/message/popoverComponent.js';


/** @type {!angular.IModule} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMessagePopoverComponent.name,
]);


export default exports;
