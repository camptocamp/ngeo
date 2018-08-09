/**
 * @module ngeo.routing.module
 */
import ngeoRoutingRoutingComponent from 'ngeo/routing/RoutingComponent.js';

import './routing.scss';

/**
 * @type {angular.Module}
 */
const exports = angular.module('ngeoRoutingModule', [
  ngeoRoutingRoutingComponent.module.name
]);


export default exports;
