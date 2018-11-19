/**
 * @module ngeo.routing.module
 */
import ngeoRoutingRoutingComponent from 'ngeo/routing/RoutingComponent.js';

import './routing.scss';

/**
 * @type {angular.IModule}
 */
const exports = angular.module('ngeoRoutingModule', [
  ngeoRoutingRoutingComponent.module.name
]);


export default exports;
