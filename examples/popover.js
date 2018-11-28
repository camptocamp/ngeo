/**
 * @module app.popover
 */
const exports = {};

import './popover.css';
import ngeoMessagePopoverComponent from 'ngeo/message/popoverComponent.js';


/** @type {!angular.IModule} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMessagePopoverComponent.name,
]);


export default exports;
