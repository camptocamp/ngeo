/**
 */

import './popover.css';
import angular from 'angular';
import ngeoMessagePopoverComponent from 'ngeo/message/popoverComponent.js';


/** @type {!angular.IModule} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoMessagePopoverComponent.name,
]);


export default exports;
